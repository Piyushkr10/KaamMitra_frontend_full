// import React, { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { ArrowLeft } from "lucide-react";
// import * as Framer from "framer-motion";

// const API_BASE = "http://localhost:5000/api/v1";

// /* ===========================
//    HELPER FUNCTIONS
// =========================== */
// const getAccessToken = () => localStorage.getItem("accessToken");

// const buildHeaders = (auth = false) => {
//   const headers = { "Content-Type": "application/json" };
//   const token = getAccessToken();
//   if (auth && token) headers.Authorization = `Bearer ${token}`;
//   return headers;
// };

// const request = async (url, options = {}, auth = false) => {
//   const res = await fetch(url, {
//     ...options,
//     headers: { ...buildHeaders(auth), ...(options.headers || {}) },
//     credentials: "include",
//   });

//   let data = {};
//   try {
//     data = await res.json();
//   } catch (err) {}

//   if (!res.ok) throw new Error(data.error || data.message || "Request failed");
//   return data;
// };

// /* ===========================
//    SUCCESS MODAL
// =========================== */
// const SuccessModal = ({ message, onClose }) => (
//   <Framer.AnimatePresence>
//     <Framer.motion.div
//       initial={{ opacity: 0, scale: 0.9 }}
//       animate={{ opacity: 1, scale: 1 }}
//       exit={{ opacity: 0, scale: 0.9 }}
//       className="fixed inset-0 bg-gray-900 bg-opacity-75 z-50 flex items-center justify-center p-4"
//     >
//       <div className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-sm w-full">
//         <div className="flex items-center justify-center mb-4">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-16 w-16 text-green-500"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//             strokeWidth={2}
//           >
//             <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//           </svg>
//         </div>
//         <h3 className="text-xl font-bold text-gray-800 mb-2">Payment Successful!</h3>
//         <p className="text-gray-600 mb-6">{message}</p>
//         <button
//           onClick={onClose}
//           className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:bg-blue-700"
//         >
//           Close
//         </button>
//       </div>
//     </Framer.motion.div>
//   </Framer.AnimatePresence>
// );

// /* ===========================
//    PAYMENT PAGE
// =========================== */
// const PaymentPage = ({ darkMode }) => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { booking } = location.state || {};
//   const [showSuccessModal, setShowSuccessModal] = useState(false);

//   if (!booking) return <p className="text-center mt-8">Booking details not found</p>;

//   const totalAmount = booking.price;

//   const handlePayment = async () => {
//     try {
//       // Create full payment order
//       const data = await request(
//         `${API_BASE}/payment/full`,
//         {
//           method: "POST",
//           body: JSON.stringify({ bookingId: booking._id, method: "Razorpay" }),
//         },
//         true
//       );

//       const { order, key } = data;

//       const options = {
//         key,
//         amount: order.amount,
//         currency: order.currency,
//         name: "Kaam Mitra",
//         description: "Full Payment",
//         order_id: order.id,
//         handler: async (response) => {
//           // Verify payment
//           await request(
//             `${API_BASE}/payment/verify`,
//             {
//               method: "POST",
//               body: JSON.stringify({ ...response, bookingId: booking._id }),
//             },
//             true
//           );

//           setShowSuccessModal(true);
//           setTimeout(() => {
//             setShowSuccessModal(false);
//             navigate("/book-history");
//           }, 2000);
//         },
//         prefill: {
//           name: booking.name,
//           email: booking.email || "",
//           contact: booking.phone || "",
//         },
//         theme: { color: "#1E40AF" },
//       };

//       new window.Razorpay(options).open();
//     } catch (err) {
//       console.error("Payment error:", err);
//       alert("Payment initiation failed. Please try again.");
//     }
//   };

//   return (
//     <div className={`min-h-screen flex flex-col items-center justify-center p-4 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"}`}>
//       <div className={`w-full max-w-xl md:max-w-2xl p-6 rounded-xl shadow-2xl ${darkMode ? "bg-gray-800" : "bg-white"}`}>
//         <button onClick={() => navigate(-1)} className="flex items-center text-blue-600 mb-6 hover:text-blue-800">
//           <ArrowLeft size={20} className="mr-2" /> Back
//         </button>

//         <h1 className="text-3xl font-extrabold text-center mb-8">FULL PAYMENT</h1>

//         <div className="space-y-4 text-center">
//           <p><strong>User Name:</strong> {booking.name}</p>
//           <p><strong>Service:</strong> {booking.service}</p>
//           <p><strong>Total Price:</strong> ₹{totalAmount}</p>
//         </div>

//         <div className="mt-6">
//           <button
//             onClick={handlePayment}
//             className="w-full bg-blue-800 text-white py-3 rounded-md font-semibold hover:bg-blue-900"
//           >
//             PAY ₹{totalAmount} VIA RAZORPAY
//           </button>
//         </div>
//       </div>

//       <Framer.AnimatePresence>
//         {showSuccessModal && (
//           <SuccessModal
//             message={`Your payment of ₹${totalAmount} for ${booking.service} was successful!`}
//             onClose={() => setShowSuccessModal(false)}
//           />
//         )}
//       </Framer.AnimatePresence>
//     </div>
//   );
// };

// export default PaymentPage;



import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import * as Framer from "framer-motion";

const API_BASE = "http://localhost:5000/api/v1";

const getAccessToken = () => localStorage.getItem("accessToken");

const buildHeaders = (auth = false) => {
  const headers = { "Content-Type": "application/json" };
  const token = getAccessToken();
  if (auth && token) headers.Authorization = `Bearer ${token}`;
  return headers;
};

const request = async (url, options = {}, auth = false) => {
  const res = await fetch(url, {
    ...options,
    headers: { ...buildHeaders(auth), ...(options.headers || {}) },
    credentials: "include",
  });

  let data = {};
  try {
    data = await res.json();
  } catch {}

  if (!res.ok) throw new Error(data.error || data.message || "Request failed");
  return data;
};

/* ===========================
   SUCCESS MODAL
=========================== */
const SuccessModal = ({ message, onClose }) => (
  <Framer.AnimatePresence>
    <Framer.motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 bg-gray-900 bg-opacity-75 z-50 flex items-center justify-center p-4"
    >
      <div className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-sm w-full">
        <div className="flex items-center justify-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          Payment Successful!
        </h3>
        <p className="text-gray-600 mb-6">{message}</p>
        <button
          onClick={onClose}
          className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </Framer.motion.div>
  </Framer.AnimatePresence>
);

/* ===========================
   PAYMENT PAGE
=========================== */
const PaymentPage = ({ darkMode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { booking } = location.state || {};
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  if (!booking)
    return <p className="text-center mt-8">Booking details not found</p>;

  const totalAmount = booking.price;

  const handlePayment = async () => {
    try {
      const data = await request(
        `${API_BASE}/payment/full`,
        {
          method: "POST",
          body: JSON.stringify({
            bookingId: booking._id,
            method: "Razorpay",
          }),
        },
        true
      );

      const { order, key } = data;

      const options = {
        key,
        amount: order.amount,
        currency: order.currency,
        name: "Kaam Mitra",
        description: "Full Payment",
        order_id: order.id,
        handler: async (response) => {
          await request(
            `${API_BASE}/payment/verify`,
            {
              method: "POST",
              body: JSON.stringify({
                ...response,
                bookingId: booking._id,
              }),
            },
            true
          );

          setShowSuccessModal(true);
          setTimeout(() => {
            setShowSuccessModal(false);
            navigate("/book-history");
          }, 2000);
        },
        prefill: {
          name: booking.name,
          email: booking.email || "",
          contact: booking.phone || "",
        },
        theme: { color: "#1E40AF" },
      };

      new window.Razorpay(options).open();
    } catch (err) {
      console.error("Payment error:", err);
      alert("Payment initiation failed. Please try again.");
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-4 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
      }`}
    >
      <div
        className={`w-full max-w-xl md:max-w-2xl p-6 rounded-xl shadow-2xl ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 mb-6 hover:text-blue-800"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back
        </button>

        <h1 className="text-3xl font-extrabold text-center mb-8">
          FULL PAYMENT
        </h1>

        <div className="space-y-4 text-center">

          {/* 🔥 USER NAME REMOVED — DESIGN LEFT INTACT */}
          {/* <p><strong>User Name:</strong> {booking.name}</p> */}

          <p>
            <strong>Service:</strong> {booking.service}
          </p>
          <p>
            <strong>Total Price:</strong> ₹{totalAmount}
          </p>
        </div>

        <div className="mt-6">
          <button
            onClick={handlePayment}
            className="w-full bg-blue-800 text-white py-3 rounded-md font-semibold hover:bg-blue-900"
          >
            PAY ₹{totalAmount} VIA RAZORPAY
          </button>
        </div>
      </div>

      <Framer.AnimatePresence>
        {showSuccessModal && (
          <SuccessModal
            message={`Your payment of ₹${totalAmount} for ${booking.service} was successful!`}
            onClose={() => setShowSuccessModal(false)}
          />
        )}
      </Framer.AnimatePresence>
    </div>
  );
};

export default PaymentPage;
