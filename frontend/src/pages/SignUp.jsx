

import React, { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, XCircle } from "lucide-react";
import { requestOtp, verifyOtp, signup, getProfile } from "../services/api";

// OTP Verification Component
const OtpVerification = ({ phoneNumber, onVerify, onBack }) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const inputRefs = useRef([]);

  const handleOtpChange = (e, index) => {
    const value = e.target.value.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value && index < 3) inputRefs.current[index + 1]?.focus();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    try {
      const res = await verifyOtp({ phoneNumber, otp: enteredOtp });
      onVerify(res.user);
    } catch (err) {
      setError(err?.message || "OTP verification failed");
    }
  };

  return (
    <div className="p-8 rounded-xl shadow-lg w-full max-w-md bg-white dark:bg-gray-800 relative transition-colors duration-300">
      <button onClick={onBack} className="absolute top-4 left-4 text-gray-700 dark:text-gray-300">
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

      <p className="text-center mt-4 text-sm text-gray-700 dark:text-gray-300">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
};

// Address Form Component
const AddressForm = ({ user, onAddressSubmit, onBack }) => {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup({ userId: user.id, address, city, state });
      await onAddressSubmit(); // fetch updated profile
    } catch (err) {
      setError(err?.message || "Failed to save address");
    }
  };

  return (
    <div className="p-8 rounded-xl shadow-lg w-full max-w-md bg-white dark:bg-gray-800 relative transition-colors duration-300">
      <button onClick={onBack} className="absolute top-4 left-4 text-gray-700 dark:text-gray-300">
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

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-1 text-gray-800 dark:text-white">Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="w-full rounded-md border px-4 py-2 focus:border-blue-500 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-800 dark:text-white">City</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
            className="w-full rounded-md border px-4 py-2 focus:border-blue-500 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700"
          />
        </div>

        <div>
          <label className="block mb-1 text-gray-800 dark:text-white">State</label>
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
            className="w-full rounded-md border px-4 py-2 focus:border-blue-500 focus:ring-blue-500 bg-gray-50 dark:bg-gray-700"
          />
        </div>

        <div className="text-center pt-4">
          <button
            type="submit"
            className="py-2 px-8 rounded-3xl text-white bg-blue-600 hover:bg-blue-700"
          >
            Submit
          </button>
        </div>

        <p className="text-center mt-4 text-sm text-gray-700 dark:text-gray-300">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
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
  // correct div for sticking  page
    <div className="min-h-[calc(100vh-104px)] bg-gray-100 dark:bg-gray-900 transition-colors duration-300 px-4 py-6 overflow-y-auto flex flex-col items-center">

      <h1 className="text-3xl font-semibold mb-8 text-gray-800 dark:text-white text-center">
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