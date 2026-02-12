import React, { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { XCircle, ArrowLeft } from "lucide-react";
import { requestOtp, verifyOtp } from "../services/api"; // Import backend API


export default function Login({ onLoginComplete }) {
  const [mobile, setMobile] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  // Send OTP via backend
  const handleSendOtp = async () => {
    if (mobile.length === 10) {
      try {
        setLoading(true);
        await requestOtp({ fullName: "temp", phoneNumber: mobile });
        setOtpSent(true);
        setMessage("OTP sent successfully. Please check your phone.");
      } catch (err) {
        setMessage(err.message || "Failed to send OTP. Try again later.");
      } finally {
        setLoading(false);
      }
    } else {
      setMessage("Please enter a valid 10-digit mobile number.");
    }
  };

  // Handle OTP input changes
  const handleChangeOtp = (index, value) => {
    if (/^\d?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (value && index < 3) inputRefs.current[index + 1].focus();
    }
  };

  // Verify OTP via backend
  const handleVerifyOtp = async () => {
    const otpCode = otp.join("");
    if (otpCode.length !== 4) {
      setMessage("Please enter the complete 4-digit OTP.");
      return;
    }
    try {
      setLoading(true);
      const res = await verifyOtp({ phoneNumber: mobile, otp: otpCode });
      // Check for Token and store it in LocalStorage
      if(res.accessToken){
        localStorage.setItem("token", res.accessToken);
        console.log("Token Stored: ",res.accessToken);
      } else{
        console.log("No token received");
      }

      //Update Global State
      onLoginComplete(res.user.fullName, res.user.phoneNumber);


      setMessage("Login Successful!");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      setMessage(err.message || "OTP verification failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300 px-4">
      <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white p-6 rounded-xl shadow-md w-full max-w-md relative transition-colors duration-300">
        <Link to="/" className="absolute top-4 left-4 text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300">
          <ArrowLeft size={24} />
        </Link>
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        {message && (
          <div className="flex items-center gap-2 p-3 mb-4 text-sm text-black dark:text-white rounded-lg bg-green-100 dark:bg-green-900 transition-colors duration-300">
            <XCircle size={20} />
            <span>{message}</span>
          </div>
        )}

        {!otpSent ? (
          <>
            <label className="block text-sm font-medium mb-2">Mobile Number</label>
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
              New to our app? <Link to="/signup" className="text-blue-600 dark:text-blue-400 hover:underline">Sign up here</Link>
            </p>
          </>
        ) : (
          <>
            <label className="block text-sm font-medium mb-2">Enter OTP</label>
            <div className="flex justify-between mb-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  value={digit}
                  maxLength={1}
                  onChange={(e) => handleChangeOtp(index, e.target.value)}
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
