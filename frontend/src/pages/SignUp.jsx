import React, { useState, useRef } from "react";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import { ArrowLeft, XCircle } from "lucide-react";
import { requestOtp, verifyOtp, signup, getProfile } from "../services/api";
import { useNavigate, Link } from "react-router-dom";

/* ================= GOOGLE CONFIG ================= */

const GOOGLE_MAP_KEY = import.meta.env.VITE_GOOGLE_MAP_KEY;
const GOOGLE_LIBRARIES = ["places"];

/* =====================================================
   MAIN SIGNUP
===================================================== */

export default function SignUp() {
  const [step, setStep] = useState(1);
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  /* ================= STEP 1 ================= */

  const handleSendOtp = async () => {
    if (!fullName.trim() || phoneNumber.trim().length !== 10) {
      setMessage("Enter valid name & 10 digit phone number");
      return;
    }

    try {
      await requestOtp({ fullName, phoneNumber });
      setStep(2);
    } catch {
      setMessage("Failed to send OTP");
    }
  };

  /* ================= STEP 2 ================= */

  const handleVerify = async (otp) => {
    try {
      const res = await verifyOtp({ phoneNumber, otp });
      setUser(res.user);
      setStep(3);
    } catch {
      setMessage("Invalid OTP");
    }
  };

  /* ================= STEP 3 ================= */

  const handleAddressSubmit = async (formData) => {
    try {
      await signup({
        userId: user.id,
        ...formData,
      });

      const profile = await getProfile();
      localStorage.setItem("user", JSON.stringify(profile.user));

      navigate("/");
    } catch (err) {
      console.error(err);
      setMessage("Failed to complete signup");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center p-4">

      <h1 className="text-3xl font-semibold mb-8 text-gray-800 dark:text-white">
        Customer Registration
      </h1>

      {message && (
        <div className="flex items-center gap-2 p-3 mb-4 text-sm text-red-800 bg-red-100 rounded-lg">
          <XCircle size={18} />
          <span>{message}</span>
        </div>
      )}

      {step === 1 && (
        <StepOne
          fullName={fullName}
          setFullName={setFullName}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          onSubmit={handleSendOtp}
        />
      )}

      {step === 2 && (
        <StepTwo
          phoneNumber={phoneNumber}
          onVerify={handleVerify}
          onBack={() => setStep(1)}
        />
      )}

      {step === 3 && (
        <StepThree
          onSubmit={handleAddressSubmit}
          onBack={() => setStep(2)}
        />
      )}
    </div>
  );
}

/* =====================================================
   STEP 1
===================================================== */

const StepOne = ({
  fullName,
  setFullName,
  phoneNumber,
  setPhoneNumber,
  onSubmit,
}) => (
  <div className="p-8 rounded-xl shadow-lg w-full max-w-md bg-white dark:bg-gray-800">
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <input
        placeholder="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        required
        className="w-full border px-4 py-2 rounded"
      />

      <input
        placeholder="Phone Number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        required
        className="w-full border px-4 py-2 rounded"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        Send OTP
      </button>

      <p className="text-center text-sm">
        Already have account?{" "}
        <Link to="/login" className="text-blue-600">
          Login
        </Link>
      </p>
    </form>
  </div>
);

/* =====================================================
   STEP 2
===================================================== */

const StepTwo = ({ phoneNumber, onVerify, onBack }) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const refs = useRef([]);

  const handleChange = (value, index) => {
    const updated = [...otp];
    updated[index] = value.slice(-1);
    setOtp(updated);

    if (value && index < 3) {
      refs.current[index + 1]?.focus();
    }
  };

  return (
    <div className="p-8 rounded-xl shadow-lg w-full max-w-md bg-white dark:bg-gray-800">
      <button onClick={onBack}>
        <ArrowLeft />
      </button>

      <p className="text-center mb-4">
        OTP sent to {phoneNumber}
      </p>

      <div className="flex gap-3 justify-center">
        {otp.map((digit, i) => (
          <input
            key={i}
            ref={(el) => (refs.current[i] = el)}
            type="tel"
            maxLength="1"
            value={digit}
            onChange={(e) => handleChange(e.target.value, i)}
            className="w-12 h-12 text-center border rounded text-xl"
          />
        ))}
      </div>

      <button
        onClick={() => onVerify(otp.join(""))}
        className="w-full bg-blue-600 text-white py-2 rounded mt-6"
      >
        Verify OTP
      </button>
    </div>
  );
};

/* =====================================================
   STEP 3 (GOOGLE ADDRESS CLEAN VERSION)
===================================================== */

const StepThree = ({ onSubmit, onBack }) => {

  const autocompleteRef = useRef(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAP_KEY,
    libraries: GOOGLE_LIBRARIES,
  });

  const [form, setForm] = useState({
    houseNo: "",
    flatNo: "",
    landMark: "",
    addressLine: "",
    city: "",
    state: "",
    pincode: "",
    latitude: null,
    longitude: null,
  });

  const handlePlaceChange = () => {
    const place = autocompleteRef.current?.getPlace();
    if (!place || !place.geometry) return;

    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();

    let city = "";
    let state = "";
    let pin = "";

    place.address_components?.forEach((component) => {
      const types = component.types;

      if (types.includes("locality")) city = component.long_name;
      if (types.includes("administrative_area_level_1"))
        state = component.long_name;
      if (types.includes("postal_code")) pin = component.long_name;
    });

    setForm((prev) => ({
      ...prev,
      addressLine: place.formatted_address || "",
      city,
      state,
      pincode: pin,
      latitude: lat,
      longitude: lng,
    }));
  };

  if (!isLoaded) return <div>Loading Google Maps...</div>;

  return (
    <div className="p-8 rounded-xl shadow-lg w-full max-w-md bg-white dark:bg-gray-800">

      <button onClick={onBack}>
        <ArrowLeft />
      </button>

      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();

          if (!form.city || !form.state || !form.pincode) {
            alert("Select address from suggestions");
            return;
          }

          onSubmit(form);
        }}
      >
        <input
          placeholder="House No (Optional)"
          value={form.houseNo}
          onChange={(e) =>
            setForm({ ...form, houseNo: e.target.value })
          }
          className="w-full border px-4 py-2 rounded"
        />

        <Autocomplete
          onLoad={(ref) => (autocompleteRef.current = ref)}
          onPlaceChanged={handlePlaceChange}
        >
          <input
            placeholder="Search Address"
            value={form.addressLine}
            onChange={(e) =>
              setForm({ ...form, addressLine: e.target.value })
            }
            className="w-full border px-4 py-2 rounded"
          />
        </Autocomplete>

        <input
          placeholder="Landmark (Optional)"
          value={form.landMark}
          onChange={(e) =>
            setForm({ ...form, landMark: e.target.value })
          }
          className="w-full border px-4 py-2 rounded"
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded">
          Complete Signup
        </button>

      </form>
    </div>
  );
};