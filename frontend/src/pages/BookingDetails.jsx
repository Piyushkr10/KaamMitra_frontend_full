// import React,{useEffect,useState} from "react";
// import Footer from "../components/Footer";
// import PremiumPaymentModal from "../components/PaymentModal";
// import FeedbackModal from "../components/FeedbackModal";
// import { motion } from "framer-motion";
// import { getBookingDetails } from "../services/api";

// import {
//   MapPin,
//   Phone,
//   User,
//   Clock,
//   Calendar,
//   Info,
//   CheckCircle2,
//   Navigation,
//   CreditCard,
//   Download,
//   ShieldCheck,
//   ChevronRight,
// } from "lucide-react";

// export default function BookingDetails({ darkMode }) {
//   const containerVariants = {
//     hidden: { opacity: 0, y: 30 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { 
//         duration: 0.6, 
//         ease: "easeOut",
//         staggerChildren: 0.1 
//       },
//     },
//   };

// const [bookingData, setBookingData] = useState(null);
// const [loading,setLoading] = useState(null);
// const [error,setError] = useState(null);


// const [sliderX, setSliderX] = React.useState(0);
// const [showPaymentModal, setShowPaymentModal] = React.useState(false);
// const [paymentDone, setPaymentDone] = React.useState(false);
// const [showFeedbackModal, setShowFeedbackModal] = React.useState(false);


// import { useEffect, useState } from "react";
// import { getBookingDetails } from "../api/api";

// const [bookingData, setBookingData] = useState(null);
// const [loading, setLoading] = useState(true);
// const [error, setError] = useState(null);

// useEffect(() => {
//   const fetchBooking = async () => {
//     try {
//       const data = await getBookingDetails(bookingId);
//       setBookingData(data);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchBooking();
// }, [bookingId]);


// const maxSlide = 230;
//   const itemVariants = {
//     hidden: { opacity: 0, x: -10 },
//     visible: { opacity: 1, x: 0 },
//   };

//   // Frontend logic (Replace with API data later)
// //   const totalAmount = 3000;
// // const tokenPaid = 900;

// const totalAmount = bookingData?.paymentSummary?.totalAmount || 0;
// const tokenPaid = bookingData?.paymentSummary?.tokenPaid || 0;
// const calculatedRemaining =
//   bookingData?.paymentSummary?.remainingAmount || 0;

// const paymentProgress =
//   bookingData?.paymentSummary?.settlementProgress || 0;


//   return (
//     <div
//       className={`min-h-screen flex flex-col selection:bg-blue-100 selection:text-blue-900 ${
//         darkMode
//           ? "bg-gray-950 text-white"
//           : "bg-gray-50 text-gray-900"
//       }`}
//     >
//       <div className="flex-grow">

//         {/* ================= MAP SECTION ================= */}
//         <motion.div
//           initial="hidden"
//           animate="visible"
//           variants={containerVariants}
//           className="w-full flex justify-center pt-8 px-4"
//         >
//           <div className="w-full max-w-6xl rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800 group relative">
//             <div className="absolute inset-0 bg-blue-600/5 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
//             <img
//               src="www.map.png"
//               alt="Live Location Map"
//               className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-105"
//             />
//             <div className="absolute bottom-6 left-6 z-20">
//               <button className="bg-white/90 backdrop-blur-md text-blue-700 px-5 py-2.5 rounded-xl font-bold shadow-lg flex items-center gap-2 hover:bg-white transition-all active:scale-95">
//                 <Navigation size={18} />
//                 Open in Maps
//               </button>
//             </div>
//           </div>
//         </motion.div>

//         {/* ================= SUPPORT BAR (GLASSMORPHISM) ================= */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.3 }}
//           className="relative max-w-6xl mx-auto mt-10 px-4 group"
//         >
//           <div className="absolute inset-0 bg-blue-600 blur-2xl opacity-10 group-hover:opacity-20 transition-opacity" />
//           <div className="relative bg-gradient-to-r from-blue-700/95 to-indigo-600/95 backdrop-blur-xl text-white py-5 px-8 flex flex-col md:flex-row justify-between items-center rounded-2xl shadow-xl border border-white/20">
//             <div className="flex items-center gap-4 mb-4 md:mb-0">
//               <div className="p-3 bg-white/20 rounded-xl ring-1 ring-white/30">
//                 <Info size={22} className="text-white" />
//               </div>
//               <div>
//                 <p className="text-sm text-blue-100/80 font-semibold uppercase tracking-widest">Customer Support</p>
//                 <p className="text-lg font-bold">Premium assistance is active</p>
//               </div>
//             </div>
            
//             <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 md:border-l border-white/20 pt-4 md:pt-0 md:pl-8">
//               <div className="text-center md:text-left">
//                 <p className="text-blue-100/70 text-xs font-bold uppercase mb-0.5">Estimated Arrival</p>
//                 <div className="flex items-center gap-2 font-black text-xl">
//                   <Clock size={20} className="text-blue-300" />
//                   15 <span className="text-sm font-normal text-blue-200">mins</span>
//                 </div>
//               </div>
//               <div className="text-center md:text-left">
//                 <p className="text-blue-100/70 text-xs font-bold uppercase mb-0.5">Distance</p>
//                 <div className="flex items-center gap-2 font-black text-xl">
//                   <Navigation size={20} className="text-blue-300" />
//                   3.2 <span className="text-sm font-normal text-blue-200">km</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </motion.div>

//         {/* ================= JOB + SERVICE DETAILS (INTERACTIVE) ================= */}
//         <div className="max-w-6xl mx-auto mt-12 mb-12 px-4">
//           <motion.div
//             initial="hidden"
//             animate="visible"
//             variants={containerVariants}
//             className="grid md:grid-cols-2 gap-8"
//           >
//             {/* Left - Job Info Card */}
//          {/* Left - Job Info Card */}
//             <motion.div 
//               whileHover={{ y: -5 }}
//               className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl shadow-slate-200/40 dark:shadow-none border border-slate-200/60 dark:border-slate-800 relative overflow-hidden group h-full flex flex-col"
//             >
//               <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
              
//               <div className="flex items-center gap-4 mb-10 relative z-10">
//                 <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-2xl border border-blue-100 dark:border-blue-800">
//                   <User className="text-blue-600 dark:text-blue-400" size={28} />
//                 </div>
//                 <h2 className="text-2xl font-black text-slate-800 dark:text-white">Job Details</h2>
//               </div>

//               <ul className="space-y-8 relative z-10 flex-grow">
//                 {[
//                   { icon: MapPin, label: "Service Address", value: "Flat 402, KaamMitra Residency, New Delhi", sub: "Gate 2 access preferred" },
//                   { icon: Phone, label: "Contact Hotline", value: "+91 98765 43210", highlight: true },
//                   { icon: CheckCircle2, label: "Assigned Provider", value: "Elite Cleaning Pros", sub: "Diamond Certified" },
//                 ].map((item, index) => (
//                   <motion.li key={index} variants={itemVariants} className="flex items-start gap-4 group/item">
//                     <div className="mt-1 p-2 bg-slate-50 dark:bg-slate-800 rounded-lg group-hover/item:bg-blue-50 dark:group-hover/item:bg-blue-900/20 transition-colors">
//                       <item.icon size={18} className="text-slate-400 group-hover/item:text-blue-500 transition-colors" />
//                     </div>
//                     <div className="flex-grow">
//                       <div className="flex justify-between items-start">
//                         <p className="text-[11px] uppercase tracking-widest text-slate-400 font-black mb-1">{item.label}</p>
//                         {item.action && <button className="text-[10px] font-bold text-blue-600 hover:underline">{item.action}</button>}
//                       </div>
//                       <p className={`font-bold leading-tight ${item.highlight ? "text-blue-600 text-lg" : "text-slate-700 dark:text-slate-200"}`}>{item.value}</p>
//                       {item.sub && <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{item.sub}</p>}
//                     </div>
//                   </motion.li>
//                 ))}
//               </ul>
//             </motion.div>

//             {/* Right - Service Details Card */}
//             <motion.div 
//               whileHover={{ y: -5 }}
//               className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl shadow-slate-200/40 dark:shadow-none border border-slate-200/60 dark:border-slate-800 relative overflow-hidden group h-full flex flex-col"
//             >
//               <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />

//               <div className="flex items-center gap-4 mb-10 relative z-10">
//                 <div className="p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl border border-indigo-100 dark:border-indigo-800">
//                   <Calendar className="text-indigo-600 dark:text-indigo-400" size={28} />
//                 </div>
//                 <h2 className="text-2xl font-black text-slate-800 dark:text-white">Service Scope</h2>
//               </div>

//               <ul className="space-y-8 relative z-10 flex-grow">
//                 {[
//                   { icon: Info, label: "Selected Category", value: "Full-Home Deep Santization", sub: "Eco-friendly chemicals included" },
//                   { icon: Clock, label: "Work Duration", value: "~ 4.5 Standard Hours" },
//                   { icon: Calendar, label: "Scheduled Slot", value: "Oct 24, 2023", sub: "Starts at 10:30 AM IST" },
//                   { icon: ShieldCheck, label: "Service Protocol", value: "Contactless & Secured", sub: "Background verified staff only" },
//                 ].map((item, index) => (
//                   <motion.li key={index} variants={itemVariants} className="flex items-start gap-4 group/item">
//                     <div className="mt-1 p-2 bg-slate-50 dark:bg-slate-800 rounded-lg group-hover/item:bg-indigo-50 dark:group-hover/item:bg-indigo-900/20 transition-colors">
//                       <item.icon size={18} className="text-slate-400 group-hover/item:text-indigo-500 transition-colors" />
//                     </div>
//                     <div className="flex-grow">
//                       <p className="text-[11px] uppercase tracking-widest text-slate-400 font-black mb-1">{item.label}</p>
//                       <p className="font-bold leading-tight text-slate-700 dark:text-slate-200">{item.value}</p>
//                       {item.sub && <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{item.sub}</p>}
//                     </div>
//                   </motion.li>
//                 ))}
//               </ul>
//             </motion.div>
//           </motion.div>
//         </div>

//       {/* ================= MODERN PAYMENT SUMMARY ================= */}
// {/* ================= PAYMENT SUMMARY ================= */}

// <div className={`max-w-5xl mx-auto my-16 px-6`}>
//   <div
//     className={`rounded-[2rem] p-10 transition-all duration-300 ${
//       darkMode
//         ? "bg-slate-900 border border-slate-800 shadow-2xl"
//         : "bg-white border border-slate-100 shadow-2xl shadow-slate-200/50"
//     }`}
//   >

//     {/* ================= LOGIC ADDED ================= */}
//     {/*
//       paymentDone → becomes true after modal payment
//     */}

  
//     {/* ================= HEADER ================= */}
//     <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
//       <div>
//         <h2 className="text-3xl font-bold tracking-tight mb-1">
//           Payment Summary
//         </h2>
//       </div>

//       <div
//         className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase flex items-center gap-2 ${
//           calculatedRemaining > 0
//             ? "bg-amber-500/10 text-amber-600 border border-amber-500/20"
//             : "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
//         }`}
//       >
//         <div
//           className={`w-2 h-2 rounded-full ${
//             calculatedRemaining > 0
//               ? "bg-amber-500"
//               : "bg-emerald-500"
//           } animate-pulse`}
//         />

//         {calculatedRemaining > 0
//           ? "Payment Pending"
//           : "Payment Completed"}
//       </div>
//     </div>

//     {/* ================= STATS ================= */}
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">

//       {/* Total */}
//       <div className="space-y-1">
//         <p className="text-xs font-bold uppercase tracking-widest text-slate-400">
//           Total Valuation
//         </p>
//         <p className="text-3xl font-bold tracking-tighter">
//           ₹{totalAmount.toLocaleString()}
//         </p>
//       </div>

//       {/* Paid */}
//       <div className="space-y-1">
//         <p className="text-xs font-bold uppercase tracking-widest text-emerald-500/80">
//           Amount Realized
//         </p>
//         <p className="text-3xl font-bold tracking-tighter text-emerald-500">
//           ₹
//           {(paymentDone
//             ? totalAmount
//             : tokenPaid
//           ).toLocaleString()}
//         </p>
//       </div>

//       {/* Remaining */}
//       <div className="space-y-1">
//         <p className="text-xs font-bold uppercase tracking-widest text-blue-600">
//           Net Payables
//         </p>
//         <p className="text-3xl font-extrabold tracking-tighter">
//           ₹{calculatedRemaining.toLocaleString()}
//         </p>
//       </div>
//     </div>

//     {/* Progress Bar Layer */}
//     <div className="mb-12">
//       <div className="flex justify-between items-center mb-3">
//         <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
//           Settlement Progress
//         </span>

//         <span className="text-sm font-bold text-blue-600 italic">
//           {Math.round(paymentProgress)}% Completed
//         </span>
//       </div>

//       <div
//         className={`h-3 w-full rounded-full overflow-hidden ${
//           darkMode ? "bg-slate-800" : "bg-slate-100"
//         }`}
//       >
//         <motion.div
//           key={paymentDone}   // ✅ re-animate when paid
//           initial={{ width: 0 }}
//           animate={{ width: `${paymentProgress}%` }}
//           transition={{ duration: 1.2, ease: "easeOut" }}
//           className="h-full bg-blue-600 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.4)]"
//         />
//       </div>
//     </div>

     
// {/* ================= Footer / Action Layer ================= */}
// <div
//   className={`flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-2xl ${
//     darkMode ? "bg-slate-800/50" : "bg-slate-50"
//   }`}
// >
//   <p className="text-sm font-medium text-slate-500 max-w-sm">
//     {calculatedRemaining > 0
//       ? "Please proceed with the payment to finalize your booking and secure the transaction."
//       : "Your booking is fully settled."}
//   </p>

//   {calculatedRemaining > 0 && (
//     <div className="flex justify-center">

//       {/* ================= PREMIUM SLIDER ================= */}
//    <div className="flex justify-end">

// <div
//   className={`relative w-[280px] h-[54px] rounded-full overflow-hidden
//   transition-all duration-300
//   ${
//     paymentDone
//       ? "bg-emerald-500"
//       : darkMode
//       ? "bg-slate-800 border border-slate-700"
//       : "bg-slate-100 border border-slate-200"
//   }`}
// >

// {/* ===== SLIDE COLOR FILL ===== */}
// <motion.div
//   style={{
//     width: paymentDone
//       ? "100%"
//       : sliderX + 52,
//   }}
//   className="
//     absolute left-0 top-0 bottom-0
//     rounded-full
//     bg-gradient-to-r
//     from-indigo-500 via-blue-500 to-emerald-400
//   "
// />

// {/* ===== TEXT ===== */}
// <div
//  className="
// absolute inset-0
// flex items-center justify-center
// pointer-events-none
// text-[15px]
// font-semibold
// tracking-wide
// text-slate-700 dark:text-white
// "
// >
//   {paymentDone ? "Payment Completed ✅" : "Slide to Pay"}
// </div>

// {/* ===== KNOB ===== */}
// {!paymentDone && (
// <motion.div
//   drag="x"
//   dragConstraints={{ left: 0, right: maxSlide }}
//   dragElastic={0}

// animate={{ x: sliderX }}
// transition={{ type: "tween", ease: "linear" }}

//   whileTap={{ scale: 0.92 }}

//   onDrag={(e, info) => {
//     const x = Math.min(Math.max(info.offset.x, 0), maxSlide);
//     setSliderX(x);
//   }}

//   onDragEnd={(e, info) => {
//     if (info.offset.x > maxSlide - 15) {
//       setSliderX(maxSlide);
//       setShowPaymentModal(true);
//     } else {
//       setSliderX(0); // ✅ reset smoothly
//     }
//   }}

//  className="
// absolute left-1 top-1 
// w-11 h-11
// rounded-full
// bg-white
// shadow-xl
// border border-slate-200
// flex items-center justify-center
// cursor-grab active:cursor-grabbing
// "
// >

// {/* PREMIUM MOVING ARROW */}
// <motion.div
//   animate={{ x: [0, 5, 0] }}
//   transition={{
//     repeat: Infinity,
//     duration: 1.2,
//     ease: "easeInOut",
//   }}
//   className="text-indigo-600 text-2xl font-bold"
// >
//   →
// </motion.div>

// </motion.div>
// )}

// </div>
// </div>
//           </div>
//   )}
// </div>
// {/* ================= PAYMENT MODAL ================= */}
// <PremiumPaymentModal
//   isOpen={showPaymentModal}
//   onClose={() => {
//   setShowPaymentModal(false);
//   setSliderX(0); // ✅ BALL RETURNS
// }}
//  onSuccess={() => {
//   setPaymentDone(true);
//   setShowPaymentModal(false);
//   setSliderX(0);

//   // ⭐ open feedback after short delay
//   setTimeout(() => {
//     setShowFeedbackModal(true);
//   }, 800);
// }}
//   amount={calculatedRemaining}
//   darkMode={darkMode}
// />

// {/* ================= FEEDBACK MODAL ================= */}
// <FeedbackModal
//   isOpen={showFeedbackModal}
//   onClose={() => setShowFeedbackModal(false)}
//   onSubmitSuccess={() => {
//     setShowFeedbackModal(false);
//   }}
// />

//   </div>
// </div>

// </div>

//       <Footer />
//     </div>
//   );
// }














// import React from "react";
// import { useParams } from "react-router-dom";
// import { motion } from "framer-motion";
// import Footer from "../components/Footer";
// import PremiumPaymentModal from "../components/PaymentModal";
// import FeedbackModal from "../components/FeedbackModal";
// import { getBookingById } from "../services/api";

// import {
//   MapPin,
//   Phone,
//   User,
//   Clock,
//   Calendar,
//   Info,
//   CheckCircle2,
//   Navigation,
//   ShieldCheck,
// } from "lucide-react";

// export default function BookingDetails({ darkMode }) {
//   const { id } = useParams();

//   const [booking, setBooking] = React.useState(null);
//   const [loading, setLoading] = React.useState(true);

//   const [sliderX, setSliderX] = React.useState(0);
//   const [showPaymentModal, setShowPaymentModal] = React.useState(false);
//   const [paymentDone, setPaymentDone] = React.useState(false);
//   const [showFeedbackModal, setShowFeedbackModal] = React.useState(false);

//   const maxSlide = 230;

//   /* ================= FETCH BOOKING ================= */
//   React.useEffect(() => {
//     const fetchBooking = async () => {
//       try {
//         const data = await getBookingById(id);
//         setBooking(data.booking);
//       } catch (err) {
//         console.error(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBooking();
//   }, [id]);

//   if (loading) return <div className="p-10">Loading booking...</div>;
//   if (!booking) return <div className="p-10">Booking not found</div>;

//   /* ================= PAYMENT LOGIC ================= */
//   const totalAmount = booking.totalPrice;
//   const tokenPaid = booking.tokenAmount;

//   const calculatedRemaining =
//     paymentDone ? 0 : totalAmount - tokenPaid;

//   const paymentProgress =
//     paymentDone ? 100 : (tokenPaid / totalAmount) * 100;

//   /* ================= ANIMATIONS ================= */
//   const containerVariants = {
//     hidden: { opacity: 0, y: 30 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.6, ease: "easeOut" },
//     },
//   };

//   return (
//     <div
//       className={`min-h-screen flex flex-col ${
//         darkMode ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-900"
//       }`}
//     >
//       <div className="flex-grow">

//         {/* ================= MAP SECTION ================= */}
//         <motion.div
//           initial="hidden"
//           animate="visible"
//           variants={containerVariants}
//           className="w-full flex justify-center pt-8 px-4"
//         >
//           <div className="w-full max-w-6xl rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800">
//             <img
//               src="www.map.png"
//               alt="Map"
//               className="w-full h-80 object-cover"
//             />
//           </div>
//         </motion.div>

//         {/* ================= DETAILS SECTION ================= */}
//         <div className="max-w-6xl mx-auto mt-12 px-4 grid md:grid-cols-2 gap-8">

//           {/* JOB DETAILS */}
//           <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl border">
//             <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
//               <User /> Job Details
//             </h2>

//             <ul className="space-y-6">
//               <li className="flex gap-4">
//                 <MapPin /> 
//                 <div>
//                   <p className="text-xs uppercase text-slate-400">Service Address</p>
//                   <p className="font-semibold">{booking.address}</p>
//                 </div>
//               </li>

//               <li className="flex gap-4">
//                 <Phone />
//                 <div>
//                   <p className="text-xs uppercase text-slate-400">Contact</p>
//                   <p className="font-semibold">{booking.phoneNumber}</p>
//                 </div>
//               </li>

//               <li className="flex gap-4">
//                 <CheckCircle2 />
//                 <div>
//                   <p className="text-xs uppercase text-slate-400">Provider</p>
//                   <p className="font-semibold">
//                     {booking.providerId?.name}
//                   </p>
//                 </div>
//               </li>
//             </ul>
//           </div>

//           {/* SERVICE DETAILS */}
//           <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl border">
//             <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
//               <Calendar /> Service Scope
//             </h2>

//             <ul className="space-y-6">
//               <li className="flex gap-4">
//                 <Info />
//                 <div>
//                   <p className="text-xs uppercase text-slate-400">Category</p>
//                   <p className="font-semibold">{booking.serviceName}</p>
//                 </div>
//               </li>

//               <li className="flex gap-4">
//                 <Info />
//                 <div>
//                   <p className="text-xs uppercase text-slate-400">Sub Service</p>
//                   <p className="font-semibold">{booking.subServiceType}</p>
//                 </div>
//               </li>

//               <li className="flex gap-4">
//                 <Clock />
//                 <div>
//                   <p className="text-xs uppercase text-slate-400">Schedule</p>
//                   <p className="font-semibold">
//                     {booking.scheduleDate} | {booking.scheduleTime}
//                   </p>
//                 </div>
//               </li>
//             </ul>
//           </div>
//         </div>

//         {/* ================= PAYMENT SUMMARY ================= */}
//         <div className="max-w-5xl mx-auto my-16 px-6">
//           <div className="rounded-3xl p-10 bg-white dark:bg-slate-900 shadow-2xl">

//             <h2 className="text-3xl font-bold mb-10">Payment Summary</h2>

//             <div className="grid md:grid-cols-3 gap-8 mb-10">
//               <div>
//                 <p className="text-xs uppercase text-slate-400">Total</p>
//                 <p className="text-3xl font-bold">₹{totalAmount}</p>
//               </div>

//               <div>
//                 <p className="text-xs uppercase text-emerald-500">Paid</p>
//                 <p className="text-3xl font-bold text-emerald-500">
//                   ₹{paymentDone ? totalAmount : tokenPaid}
//                 </p>
//               </div>

//               <div>
//                 <p className="text-xs uppercase text-blue-600">Remaining</p>
//                 <p className="text-3xl font-bold">
//                   ₹{calculatedRemaining}
//                 </p>
//               </div>
//             </div>

//             {/* SLIDER */}
//             {calculatedRemaining > 0 && (
//               <div className="relative w-[280px] h-[54px] rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">

//                 <motion.div
//                   style={{
//                     width: paymentDone
//                       ? "100%"
//                       : sliderX + 52,
//                   }}
//                   className="absolute left-0 top-0 bottom-0 bg-blue-600"
//                 />

//                 <div className="absolute inset-0 flex items-center justify-center pointer-events-none font-semibold">
//                   {paymentDone ? "Payment Completed ✅" : "Slide to Pay"}
//                 </div>

//                 {!paymentDone && (
//                   <motion.div
//                     drag="x"
//                     dragConstraints={{ left: 0, right: maxSlide }}
//                     dragElastic={0}
//                     onDrag={(e, info) => {
//                       const x = Math.min(Math.max(info.offset.x, 0), maxSlide);
//                       setSliderX(x);
//                     }}
//                     onDragEnd={(e, info) => {
//                       if (info.offset.x > maxSlide - 15) {
//                         setSliderX(maxSlide);
//                         setShowPaymentModal(true);
//                       } else {
//                         setSliderX(0);
//                       }
//                     }}
//                     className="absolute left-1 top-1 w-11 h-11 bg-white rounded-full shadow cursor-grab"
//                   />
//                 )}
//               </div>
//             )}

//           </div>
//         </div>

//       </div>

//       {/* ================= MODALS ================= */}
//       <PremiumPaymentModal
//         isOpen={showPaymentModal}
//         onClose={() => {
//           setShowPaymentModal(false);
//           setSliderX(0);
//         }}
//         onSuccess={() => {
//           setPaymentDone(true);
//           setShowPaymentModal(false);
//           setSliderX(0);
//           setTimeout(() => setShowFeedbackModal(true), 800);
//         }}
//         amount={calculatedRemaining}
//         darkMode={darkMode}
//       />

//       <FeedbackModal
//         isOpen={showFeedbackModal}
//         bookingId={booking.id}
//         onClose={() => setShowFeedbackModal(false)}
//         onSubmitSuccess={() => setShowFeedbackModal(false)}
//       />

//       <Footer />
//     </div>
//   );
// }











//Note:-  feedback model is not add 



import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import PremiumPaymentModal from "../components/PaymentModal";
import FeedbackModal from "../components/FeedbackModal";
import { motion } from "framer-motion";
import { getBookingDetails } from "../services/api";

import {
  MapPin,
  Phone,
  User,
  Clock,
  Calendar,
  Info,
  CheckCircle2,
  Navigation,
  ShieldCheck,
} from "lucide-react";

export default function BookingDetails({ darkMode }) {
  const { bookingId } = useParams();

  /* ================= STATE ================= */

  const [bookingData, setBookingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [sliderX, setSliderX] = useState(0);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  const maxSlide = 230;

  /* ================= FETCH DATA ================= */

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const data = await getBookingDetails(bookingId);
        setBookingData(data);

        if (data?.paymentSummary?.remainingAmount === 0) {
          setPaymentDone(true);
        }
      } catch (err) {
        setError(err?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    if (bookingId) fetchBooking();
  }, [bookingId]);

  /* ================= SAFE DATA ================= */

  const booking = bookingData?.booking;
  const provider = bookingData?.provider;
  const liveTracking = bookingData?.liveTracking;
  const paymentSummary = bookingData?.paymentSummary;

  // ✅ FIXED (safe optional chaining — no crash)
  const latitude = bookingData?.location?.lat;
  const longitude = bookingData?.location?.lng;

  const totalAmount = paymentSummary?.totalAmount || 0;
  const tokenPaid = paymentSummary?.tokenPaid || 0;
  const calculatedRemaining = paymentSummary?.remainingAmount || 0;
  const paymentProgress = paymentSummary?.settlementProgress || 0;

  /* ================= LOADING / ERROR ================= */

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading booking details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {error}
      </div>
    );
  }

  /* ================= ANIMATIONS ================= */

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  /* ================= UI ================= */

  return (
    <div
      className={`min-h-screen flex flex-col ${
        darkMode ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="flex-grow">

        {/* ================= MAP SECTION ================= */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="w-full flex justify-center pt-8 px-4"
        >
          <div className="w-full max-w-6xl rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800 relative">

            {latitude && longitude ? (
              <iframe
                title="Live Location Map"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`}
                className="w-full h-80"
              />
            ) : (
              <div className="w-full h-80 flex items-center justify-center bg-gray-200 dark:bg-slate-800">
                Location not available
              </div>
            )}

            <div className="absolute bottom-6 left-6">
              {latitude && longitude && (
                <a
                  href={`https://www.google.com/maps?q=${latitude},${longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/90 text-blue-700 px-5 py-2.5 rounded-xl font-bold shadow-lg flex items-center gap-2"
                >
                  <Navigation size={18} />
                  Open in Maps
                </a>
              )}
            </div>

          </div>
        </motion.div>

        {/* ================= SUPPORT BAR ================= */}
        <div className="relative max-w-6xl mx-auto mt-10 px-4">
          <div className="relative bg-gradient-to-r from-blue-700/95 to-indigo-600/95 text-white py-5 px-8 flex flex-col md:flex-row justify-between items-center rounded-2xl shadow-xl">
            <div className="flex items-center gap-4 mb-4 md:mb-0">
              <Info size={22} />
              <div>
                <p className="text-sm uppercase tracking-widest">
                  Customer Support
                </p>
                <p className="text-lg font-bold">
                  Premium assistance is active
                </p>
              </div>
            </div>

            <div className="flex items-center gap-8">
              <div>
                <p className="text-xs uppercase">Estimated Arrival</p>
                <div className="flex items-center gap-2 font-bold text-xl">
                  <Clock size={20} />
                  {liveTracking?.estimatedArrival ?? "--"} mins
                </div>
              </div>

              <div>
                <p className="text-xs uppercase">Distance</p>
                <div className="flex items-center gap-2 font-bold text-xl">
                  <Navigation size={20} />
                  {liveTracking?.distanceKm ?? "--"} km
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= JOB + SERVICE DETAILS ================= */}
        <div className="max-w-6xl mx-auto mt-12 mb-12 px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="grid md:grid-cols-2 gap-8"
          >

            {/* LEFT CARD */}
            <motion.div
              variants={itemVariants}
              className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl border"
            >
              <div className="flex items-center gap-4 mb-10">
                <User size={28} />
                <h2 className="text-2xl font-black">Job Details</h2>
              </div>

              <ul className="space-y-8">
                <li className="flex gap-4">
                  <MapPin size={18} />
                  <div>
                    <p className="text-xs uppercase">Service Address</p>
                    <p className="font-bold">{booking?.address}</p>
                  </div>
                </li>

                <li className="flex gap-4">
                  <Phone size={18} />
                  <div>
                    <p className="text-xs uppercase">Contact Hotline</p>
                    <p className="font-bold text-blue-600">
                      {provider?.phoneNumber}
                    </p>
                  </div>
                </li>

                <li className="flex gap-4">
                  <CheckCircle2 size={18} />
                  <div>
                    <p className="text-xs uppercase">Assigned Provider</p>
                    <p className="font-bold">
                      {provider?.fullName}
                    </p>
                  </div>
                </li>
              </ul>
            </motion.div>

            {/* RIGHT CARD */}
            <motion.div
              variants={itemVariants}
              className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl border"
            >
              <div className="flex items-center gap-4 mb-10">
                <Calendar size={28} />
                <h2 className="text-2xl font-black">Service Scope</h2>
              </div>

              <ul className="space-y-8">
                <li className="flex gap-4">
                  <Info size={18} />
                  <div>
                    <p className="text-xs uppercase">Selected Category</p>
                    <p className="font-bold">{booking?.service}</p>
                  </div>
                </li>

                <li className="flex gap-4">
                  <Clock size={18} />
                  <div>
                    <p className="text-xs uppercase">Work Duration</p>
                    <p className="font-bold">~ 4.5 Standard Hours</p>
                  </div>
                </li>

                <li className="flex gap-4">
                  <Calendar size={18} />
                  <div>
                    <p className="text-xs uppercase">Scheduled Slot</p>
                    <p className="font-bold">
                      {booking?.date} — {booking?.time}
                    </p>
                  </div>
                </li>

                <li className="flex gap-4">
                  <ShieldCheck size={18} />
                  <div>
                    <p className="text-xs uppercase">Service Protocol</p>
                    <p className="font-bold">Contactless & Secured</p>
                  </div>
                </li>
              </ul>
            </motion.div>

          </motion.div>
        </div>

        {/* ================= PAYMENT SUMMARY ================= */}
        <div className="max-w-5xl mx-auto my-16 px-6">
          <div className={`rounded-[2rem] p-10 ${darkMode ? "bg-slate-900" : "bg-white"} shadow-2xl`}>

            <div className="flex justify-between mb-12">
              <h2 className="text-3xl font-bold">Payment Summary</h2>

              <div className={`px-4 py-2 rounded-full text-xs font-bold ${
                calculatedRemaining > 0
                  ? "bg-amber-500/10 text-amber-600"
                  : "bg-emerald-500/10 text-emerald-600"
              }`}>
                {calculatedRemaining > 0
                  ? "Payment Pending"
                  : "Payment Completed"}
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div>
                <p className="text-xs uppercase">Total Valuation</p>
                <p className="text-3xl font-bold">
                  ₹{totalAmount.toLocaleString()}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase">Amount Realized</p>
                <p className="text-3xl font-bold text-emerald-500">
                  ₹{(paymentDone ? totalAmount : tokenPaid).toLocaleString()}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase">Net Payables</p>
                <p className="text-3xl font-bold">
                  ₹{calculatedRemaining.toLocaleString()}
                </p>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-3">
                <span className="text-xs uppercase">
                  Settlement Progress
                </span>
                <span className="text-sm font-bold">
                  {paymentProgress}% Completed
                </span>
              </div>

              <div className={`h-3 rounded-full ${darkMode ? "bg-slate-800" : "bg-slate-100"}`}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${paymentProgress}%` }}
                  transition={{ duration: 1 }}
                  className="h-full bg-blue-600 rounded-full"
                />
              </div>
            </div>

          </div>
        </div>

      </div>

      <Footer />
    </div>
  );
}