import React, { useState, useRef } from "react";
import { useJsApiLoader, Autocomplete } from "@react-google-maps/api";
import { ArrowLeft, XCircle } from "lucide-react";
import { requestOtp, verifyOtp, signup, getProfile } from "../services/api";
import { useNavigate, Link } from "react-router-dom";

const GOOGLE_MAP_KEY = "AIzaSyCfjZv9DH1nFe8W3vCP3DpoJo4vPGO3Dag";

export default function SignUp() {
  const [step, setStep] = useState(1);
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  /* ================= STEP 1 ================= */

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await requestOtp({ fullName, phoneNumber });
      setStep(2);
    } catch (err) {
      setError(err?.response?.data?.error || "Failed to send OTP");
    }
  };

  /* ================= STEP 2 ================= */

  const handleVerifyOtp = async (otp) => {
    setError("");

    try {
      const res = await verifyOtp({ phoneNumber, otp });
      setUser(res.user);
      setStep(3);
    } catch (err) {
      setError(err?.response?.data?.error || "Invalid OTP");
    }
  };

  /* ================= STEP 3 ================= */

  const handleAddressSubmit = async (addressData) => {
    setError("");

    try {
      await signup({
        userId: user.id,
        ...addressData,
      });

      const profile = await getProfile();
      localStorage.setItem("user", JSON.stringify(profile.user));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data?.error || "Failed to complete signup");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center p-4">
      
      <h1 className="text-3xl font-semibold mb-8 text-gray-800 dark:text-white">
        Customer Registration
      </h1>

      {step === 1 && (
        <StepOne
          fullName={fullName}
          setFullName={setFullName}
          phoneNumber={phoneNumber}
          setPhoneNumber={setPhoneNumber}
          onSubmit={handleSendOtp}
          error={error}
        />
      )}

      {step === 2 && (
        <StepTwo
          phoneNumber={phoneNumber}
          onBack={() => setStep(1)}
          onVerify={handleVerifyOtp}
          error={error}
        />
      )}

      {step === 3 && (
        <StepThree
          user={user}
          onBack={() => setStep(2)}
          onSubmit={handleAddressSubmit}
          error={error}
        />
      )}
    </div>
  );
}

/* =====================================
   STEP 1 → PERSONAL INFO
===================================== */

const StepOne = ({
  fullName,
  setFullName,
  phoneNumber,
  setPhoneNumber,
  onSubmit,
  error,
}) => (
  <div className="p-8 rounded-xl shadow-lg w-full max-w-md bg-white dark:bg-gray-800 transition-colors duration-300">
    
    <h2 className="text-xl font-bold mb-6 text-center text-gray-800 dark:text-white">
      Personal Information
    </h2>

    {error && (
      <div className="flex items-center gap-2 p-3 mb-4 text-sm text-red-800 dark:text-red-300 rounded-lg bg-red-100 dark:bg-red-900">
        <XCircle size={20} />
        <span>{error}</span>
      </div>
    )}

    <form onSubmit={onSubmit} className="space-y-6">

      <div>
        <label className="block mb-1 text-gray-800 dark:text-white">
          Full Name
        </label>
        <input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          className="w-full rounded-md border px-4 py-2 focus:border-blue-500 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div>

      <div>
        <label className="block mb-1 text-gray-800 dark:text-white">
          Phone Number
        </label>
        <input
          type="tel"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
          className="w-full rounded-md border px-4 py-2 focus:border-blue-500 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 px-4 rounded-md text-white bg-blue-600 hover:bg-blue-700"
      >
        SEND OTP
      </button>

      <p className="text-center mt-4 text-sm text-gray-700 dark:text-gray-300">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 hover:underline">
          Login
        </Link>
      </p>
    </form>
  </div>
);

/* =====================================
   STEP 2 → OTP VERIFICATION
===================================== */

const StepTwo = ({ phoneNumber, onBack, onVerify, error }) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);

  const handleOtpChange = (e, index) => {
    const value = e.target.value.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 3) inputRefs.current[index + 1]?.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onVerify(otp.join(""));
  };

  return (
    <div className="p-8 rounded-xl shadow-lg w-full max-w-md bg-white dark:bg-gray-800 relative transition-colors duration-300">

      <button
        onClick={onBack}
        className="absolute top-4 left-4 text-gray-700 dark:text-gray-300"
      >
        <ArrowLeft size={24} />
      </button>

      <h2 className="text-xl font-bold text-center mb-4 text-gray-800 dark:text-white">
        Verify Your Phone
      </h2>

      <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
        Enter the OTP sent to {phoneNumber}
      </p>

      {error && (
        <div className="flex items-center gap-2 p-3 mb-4 text-sm text-red-800 dark:text-red-300 rounded-lg bg-red-100 dark:bg-red-900">
          <XCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-center gap-4">
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={(el) => (inputRefs.current[i] = el)}
              type="tel"
              maxLength="1"
              className="w-12 h-12 text-center text-2xl font-bold border rounded-md text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700 focus:border-blue-500 focus:ring-blue-500"
              value={digit}
              onChange={(e) => handleOtpChange(e, i)}
              required
            />
          ))}
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="py-2 px-8 rounded-3xl text-white bg-blue-600 hover:bg-blue-700"
          >
            VERIFY OTP
          </button>
        </div>
      </form>
    </div>
  );
};

/* =====================================
   STEP 3 → ADDRESS FORM
===================================== */

const StepThree = ({ user, onBack, onSubmit, error }) => {
  const autocompleteRef = useRef(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAP_KEY,
    libraries: ["places"],
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

  /* ================= ROBUST GOOGLE EXTRACTION ================= */

  const onPlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();
    if (!place || !place.geometry) return;

    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();

    let city = "";
    let state = "";
    let pin = "";

    place.address_components.forEach((component) => {
      const types = component.types;

      // ✅ City handling (covers all Indian cases)
      if (
        types.includes("locality") ||
        types.includes("sublocality") ||
        types.includes("sublocality_level_1") ||
        types.includes("administrative_area_level_2")
      ) {
        if (!city) city = component.long_name;
      }

      // ✅ State
      if (types.includes("administrative_area_level_1")) {
        state = component.long_name;
      }

      // ✅ Pincode
      if (types.includes("postal_code")) {
        pin = component.long_name;
      }
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

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="p-8 rounded-xl shadow-lg w-full max-w-md bg-white dark:bg-gray-800 relative transition-colors duration-300">

      <button
        onClick={onBack}
        className="absolute top-4 left-4 text-gray-700 dark:text-gray-300"
      >
        <ArrowLeft size={24} />
      </button>

      <h2 className="text-xl font-bold text-center mb-6 text-gray-800 dark:text-white">
        Address Details
      </h2>

      {error && (
        <div className="flex items-center gap-2 p-3 mb-4 text-sm text-red-800 dark:text-red-300 rounded-lg bg-red-100 dark:bg-red-900">
          <XCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();

          // ✅ Prevent backend 400
          if (!form.city || !form.state || !form.pincode) {
            alert("Please select address properly from suggestions");
            return;
          }

          if (form.latitude == null || form.longitude == null) {
            alert("Invalid location selected");
            return;
          }

          onSubmit(form);
        }}
        className="space-y-6"
      >

        <input
          placeholder="House No (Optional)"
          value={form.houseNo}
          onChange={(e) =>
            setForm({ ...form, houseNo: e.target.value })
          }
          className="w-full rounded-md border px-4 py-2 focus:border-blue-500 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700"
        />

        <input
          placeholder="Flat No (Optional)"
          value={form.flatNo}
          onChange={(e) =>
            setForm({ ...form, flatNo: e.target.value })
          }
          className="w-full rounded-md border px-4 py-2 focus:border-blue-500 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700"
        />

        <Autocomplete
          onLoad={(ref) => (autocompleteRef.current = ref)}
          onPlaceChanged={onPlaceChanged}
        >
          <input
            placeholder="Colony / Street"
            value={form.addressLine}
            onChange={(e) =>
              setForm({ ...form, addressLine: e.target.value })
            }
            className="w-full rounded-md border px-4 py-2 focus:border-blue-500 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700"
            required
          />
        </Autocomplete>

        <input
          placeholder="Landmark (Optional)"
          value={form.landMark}
          onChange={(e) =>
            setForm({ ...form, landMark: e.target.value })
          }
          className="w-full rounded-md border px-4 py-2 focus:border-blue-500 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700"
        />

        <div className="text-center pt-4">
          <button
            type="submit"
            className="py-2 px-8 rounded-3xl text-white bg-blue-600 hover:bg-blue-700"
          >
            Complete Signup
          </button>
        </div>
      </form>
    </div>
  );
};

// Main Signup Component
export default function SignUp() {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleSendOtp = async () => {
    if (fullName.trim() === "" || phoneNumber.trim().length !== 10) {
      setMessage("Please enter a valid full name and 10-digit phone number.");
      return;
    }
    setMessage("");
    try {
      await requestOtp({ fullName, phoneNumber });
      setStep(2);
    } catch {
      setMessage("Failed to send OTP");
    }
  };

  const handleVerificationSuccess = (userData) => {
    setUser(userData);
    setStep(3);
  };

  const handleAddressSubmit = async () => {
    try {
      const profile = await getProfile();
      localStorage.setItem("user", JSON.stringify(profile));
      navigate("/");
    } catch (err) {
      console.error("Profile fetch failed after signup:", err);
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center p-4">
      <h1 className="text-3xl font-semibold mb-8 text-gray-800 dark:text-white">
        Customer Registration
      </h1>

      {message && (
        <div className="flex items-center gap-2 p-3 mb-4 text-sm text-red-800 dark:text-red-300 rounded-lg bg-red-100 dark:bg-red-900">
          <XCircle size={20} />
          <span>{message}</span>
        </div>
      )}

      {step === 1 && (
        <div className="p-8 rounded-xl shadow-lg w-full max-w-md bg-white dark:bg-gray-800">
          <h2 className="text-xl font-bold mb-6 text-center">Personal Information</h2>
          <form className="space-y-6">
            <div>
              <label className="block mb-1 text-gray-800 dark:text-white">Full Name</label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                className="w-full rounded-md border px-4 py-2 focus:border-blue-500 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700"
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-800 dark:text-white">Phone Number</label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                className="w-full rounded-md border px-4 py-2 focus:border-blue-500 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700"
              />
            </div>
            <button
              type="button"
              onClick={handleSendOtp}
              className="w-full py-2 px-4 rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              SEND OTP
            </button>

            <p className="text-center mt-4 text-sm text-gray-700 dark:text-gray-300">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">
                Login
              </Link>
            </p>
          </form>
        </div>
      )}

      {step === 2 && (
        <OtpVerification
          phoneNumber={phoneNumber}
          onVerify={handleVerificationSuccess}
          onBack={() => setStep(1)}
        />
      )}

      {step === 3 && (
        <AddressForm
          user={user}
          onAddressSubmit={handleAddressSubmit}
          onBack={() => setStep(2)}
        />
      )}
    </div>
  );
}