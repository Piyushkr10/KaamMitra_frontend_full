import React, { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { XCircle, ArrowLeft } from "lucide-react";
import { requestOtp, verifyOtp } from "../services/api";

export default function Login({ onLoginComplete }) {
  const [mobile, setMobile] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // success | error
  const [loading, setLoading] = useState(false);

  const inputRefs = useRef([]);
  const navigate = useNavigate();

  // ---------------- SEND OTP ----------------
  const handleSendOtp = async () => {
    try {
      if (mobile.length !== 10) {
        setMessage("Please enter a valid 10-digit mobile number.");
        setMessageType("error");
        return;
      }

      setLoading(true);

      const res = await requestOtp({
        fullName: "temp",
        phoneNumber: mobile,
      });

      //  Message from backend
      setMessage(res.message);
      setMessageType("success");

      setOtpSent(true);
    } catch (err) {
      setMessage(err.message || err.error || "Something went wrong");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  // ---------------- OTP INPUT ----------------
  const handleChangeOtp = (index, value) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 3) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  // ---------------- VERIFY OTP ----------------
  const handleVerifyOtp = async () => {
    try {
      const otpCode = otp.join("");

      if (otpCode.length !== 4) {
        setMessage("Please enter the complete 4-digit OTP.");
        setMessageType("error");
        return;
      }

      setLoading(true);

      const res = await verifyOtp({
        phoneNumber: mobile,
        otp: otpCode,
      });

      //  Store token
      if (res.accessToken) {
        localStorage.setItem("token", res.accessToken);
      }

      onLoginComplete(res.user.fullName, res.user.phoneNumber);

      //  Message from backend
      setMessage(res.message);
      setMessageType("success");

      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setMessage(err.message || err.error || "Verification failed");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
       // correct div for sticking  page
  <div className="flex justify-center items-center min-h-[calc(100vh-104px)] bg-gray-100 dark:bg-gray-900 transition-colors duration-300 px-4">

      <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white p-6 rounded-xl shadow-md w-full max-w-md relative transition-colors duration-300">

        <Link
          to="/"
          className="absolute top-4 left-4 text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300"
        >
          <ArrowLeft size={24} />
        </Link>

        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        {/*  Dynamic Alert (Design Same) */}
        {message && (
          <div
            className={`flex items-center gap-2 p-3 mb-4 text-sm rounded-lg transition-colors duration-300
              ${messageType === "error"
                ? "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300"
                : "bg-green-100 dark:bg-green-900 text-black dark:text-white"
              }`}
          >
            <XCircle size={20} />
            <span>{message}</span>
          </div>
        )}

        {!otpSent ? (
          <>
            <label className="block text-sm font-medium mb-2">
              Mobile Number
            </label>

            <input
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
              maxLength={10}
              placeholder="Enter your mobile number"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 text-black dark:text-white"
            />

            <button
              onClick={handleSendOtp}
              disabled={loading}
              className="w-full bg-blue-600 text-white mt-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>

            <p className="mt-4 text-center text-sm text-gray-700 dark:text-gray-300">
              New to our app?{" "}
              <Link
                to="/signup"
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                Sign up here
              </Link>
            </p>
          </>
        ) : (
          <>
            <label className="block text-sm font-medium mb-2">
              Enter OTP
            </label>

            <div className="flex justify-between mb-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  value={digit}
                  maxLength={1}
                  onChange={(e) =>
                    handleChangeOtp(index, e.target.value)
                  }
                  ref={(el) => (inputRefs.current[index] = el)}
                  className="w-12 h-12 text-center border rounded-lg text-lg focus:outline-none focus:ring focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 text-black dark:text-white"
                />
              ))}
            </div>

            <button
              onClick={handleVerifyOtp}
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
