// import { Link, useLocation } from "react-router-dom";
// import axios from "axios";

// const TokenPayment = ({ darkMode }) => {
//   const location = useLocation();
//   const bookingData = location.state?.formData;

//   if (!bookingData) {
//     return (
//       <div
//         className={`min-h-screen flex items-center justify-center text-center p-4 ${
//           darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
//         }`}
//       >
//         <div
//           className={`p-8 rounded-lg shadow-lg ${
//             darkMode ? "bg-gray-800" : "bg-white"
//           }`}
//         >
//           <h2 className="text-2xl font-bold mb-4">No Booking Details Found</h2>
//           <p>
//             Please go back to the{" "}
//             <Link to="/" className="text-blue-600 hover:underline">
//               home page
//             </Link>{" "}
//             to make a booking first.
//           </p>
//         </div>
//       </div>
//     );
//   }

//   // ✅ Always use real DB price
//   const servicePrice = Number(bookingData.price);

//   if (!servicePrice || servicePrice <= 0) {
//     console.error("❌ Invalid price in booking:", bookingData);
//     return <p>Error: Invalid or missing service price.</p>;
//   }

//   const tokenAmount = (servicePrice * 0.3).toFixed(2);
//   const remainingAmount = (servicePrice - tokenAmount).toFixed(2);

//   // Razorpay handler
//   const handleRazorpayPayment = async () => {
//     try {
//       const { data } = await axios.post(
//         "/api/v1/payment/order",
//         {
//           bookingId: bookingData._id,
//           amount: remainingAmount,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );

//       const options = {
//         key: import.meta.env.VITE_RAZORPAY_KEY_ID,
//         amount: data.amount,
//         currency: data.currency,
//         name: "Kaam Mitra",
//         description: "Complete Remaining Payment",
//         order_id: data.id,
//         handler: async (response) => {
//           await axios.post(
//             "/api/v1/payment/verify",
//             { ...response, bookingId: bookingData._id },
//             { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
//           );
//           alert("Payment Successful!");
//         },
//         prefill: {
//           name: bookingData.name,
//           email: bookingData.email,
//           contact: bookingData.phone,
//         },
//         theme: {
//           color: "#1E3A8A",
//         },
//       };

//       new window.Razorpay(options).open();
//     } catch (error) {
//       console.error("Payment Error:", error);
//       alert("Payment initiation failed.");
//     }
//   };

//   return (
//     <div
//       className={`min-h-screen flex flex-col ${
//         darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-800"
//       }`}
//     >
//       <main className="flex-grow flex flex-col items-center justify-center p-4 md:p-8">
//         <h1 className="text-4xl font-extrabold text-blue-800 mb-8 mt-4">TOKEN PAYMENT</h1>

//         <div
//           className={`w-full max-w-5xl flex flex-col md:flex-row items-center p-6 rounded-lg shadow-xl ${
//             darkMode ? "bg-gray-800" : "bg-white"
//           }`}
//         >
//           {/* Left Info Section */}
//           <div className="w-full md:w-1/2 p-6 space-y-4">
//             <InfoRow label="Customer Name" value={bookingData.name} />
//             <InfoRow label="Address" value={bookingData.address} />
//             <InfoRow label="Service" value={bookingData.subService} />
//             <InfoRow label="City" value={bookingData.city} />
//             <InfoRow label="Date" value={bookingData.date} />
//             <InfoRow label="Time" value={bookingData.time} />

//             <InfoRow label="Token Payment (Paid)" value={`₹${tokenAmount}`} highlight="green" />
//             <InfoRow label="Remaining Payment" value={`₹${remainingAmount}`} highlight="yellow" />
//           </div>

//           {/* Right Logo */}
//           <div className="flex items-center justify-end w-full md:w-1/2">
//             <div className="flex flex-col items-end text-right gap-2">
//               <div className="h-32 w-32 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-5xl">
//                 K
//               </div>
//               <span className="text-2xl font-bold text-blue-800">Kaam Mitra</span>
//               <span className="text-sm font-light text-gray-500">Kaam Ka Yaar, Har Waqt Tayyar</span>
//             </div>
//           </div>
//         </div>

//         {/* Buttons */}
//         <div className="w-full max-w-lg mt-8 flex flex-col gap-4">
//           <button
//             onClick={handleRazorpayPayment}
//             className="w-full bg-blue-800 text-white py-3 rounded-md font-semibold hover:bg-blue-900"
//           >
//             COMPLETE REST PAYMENT
//           </button>
//         </div>
//       </main>
//     </div>
//   );
// };

// // Small reusable component
// const InfoRow = ({ label, value, highlight }) => (
//   <div className="flex justify-between">
//     <span className="font-semibold text-gray-600">{label}</span>
//     <span
//       className={`font-bold ${
//         highlight === "green"
//           ? "text-green-600"
//           : highlight === "yellow"
//           ? "text-yellow-600"
//           : ""
//       }`}
//     >
//       {value}
//     </span>
//   </div>
// );

// export default TokenPayment;


import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import axios from "axios";
import * as Framer from "framer-motion";

// ✅ Success Modal
const SuccessModal = ({ message, onClose }) => (
  <Framer.AnimatePresence>
    <Framer.motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 bg-gray-900 bg-opacity-75 z-50 flex items-center justify-center p-4"
    >
      <div className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-sm w-full">
        <h3 className="text-xl font-bold text-gray-800 mb-2">Payment Successful!</h3>
        <p className="text-gray-600 mb-6">{message}</p>
        <button
          onClick={onClose}
          className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </Framer.motion.div>
  </Framer.AnimatePresence>
);

const TokenPaymentPage = ({ darkMode }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { formData } = location.state || {};
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // ✅ Fetch booking details
  useEffect(() => {
    async function fetchBooking() {
      try {
        if (!formData?.bookingId) throw new Error("Booking ID missing");
        const token = localStorage.getItem("token");
        const res = await axios.get(`/api/v1/bookings/${formData.bookingId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBooking(res.data);
      } catch (err) {
        console.error("Failed to fetch booking:", err);
        alert("Booking not found");
        navigate("/");
      } finally {
        setLoading(false);
      }
    }
    fetchBooking();
  }, [formData?.bookingId, navigate]);

  if (loading) return <p className="text-center mt-8">Loading booking details...</p>;
  if (!booking) return null;

  const totalPrice = Number(booking.price);
  const tokenAmount = (totalPrice * 0.3).toFixed(2); // 30% token

  // ✅ Razorpay token payment handler
  const handleRazorpayPayment = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "/api/v1/payment/token",
        { bookingId: booking._id, method: "Razorpay" },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const { order, key } = res.data;

      const options = {
        key,
        amount: order.amount,
        currency: order.currency,
        name: "Kaam Mitra",
        description: "Token Payment",
        order_id: order.id,
        handler: async (response) => {
          await axios.post(
            "/api/v1/payment/verify",
            { ...response, bookingId: booking._id },
            { headers: { Authorization: `Bearer ${token}` } }
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

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Razorpay payment error:", err);
      alert("Payment failed. Try again.");
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
          <ArrowLeft size={20} className="mr-2" /> Back
        </button>

        <h1 className="text-3xl font-extrabold text-center mb-8">TOKEN PAYMENT</h1>

        {/* Booking Info */}
        <div className="space-y-3 text-center mb-6">
          <p><strong>Service:</strong> {booking.serviceType || booking.service}</p>
          <p><strong>Total Price:</strong> ₹{totalPrice}</p>
          <p><strong>Token Amount (30%):</strong> ₹{tokenAmount}</p>
        </div>

        {/* Pay Button */}
        <button
          onClick={handleRazorpayPayment}
          className="w-full bg-blue-800 text-white py-3 rounded-md font-semibold hover:bg-blue-900"
        >
          PAY ₹{tokenAmount} VIA RAZORPAY
        </button>
      </div>

      {/* Success Modal */}
      <Framer.AnimatePresence>
        {showSuccessModal && (
          <SuccessModal
            message={`Your ₹${tokenAmount} token payment for ${booking.serviceType || booking.service} was successful!`}
            onClose={() => setShowSuccessModal(false)}
          />
        )}
      </Framer.AnimatePresence>
    </div>
  );
};

export default TokenPaymentPage;
