import React from "react";
import Footer from "../components/Footer";

import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Phone,
  User,
  Clock,
  Calendar,
  Info,
  CheckCircle2,
  Navigation,
  CreditCard,
  Download,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

export default function BookingDetails({ darkMode }) {
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut",
        staggerChildren: 0.1 
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  // ✅ Frontend logic (Replace with API data later)
  const totalAmount = 3000;
  const tokenPaid = 900;
  const remainingAmount = totalAmount - tokenPaid;
  const paymentProgress = (tokenPaid / totalAmount) * 100;

  return (
    <div
      className={`min-h-screen flex flex-col selection:bg-blue-100 selection:text-blue-900 ${
        darkMode
          ? "bg-gray-950 text-white"
          : "bg-gray-50 text-gray-900"
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
          <div className="w-full max-w-6xl rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800 group relative">
            <div className="absolute inset-0 bg-blue-600/5 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
            <img
              src="www.map.png"
              alt="Live Location Map"
              className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute bottom-6 left-6 z-20">
              <button className="bg-white/90 backdrop-blur-md text-blue-700 px-5 py-2.5 rounded-xl font-bold shadow-lg flex items-center gap-2 hover:bg-white transition-all active:scale-95">
                <Navigation size={18} />
                Open in Maps
              </button>
            </div>
          </div>
        </motion.div>

        {/* ================= SUPPORT BAR (GLASSMORPHISM) ================= */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative max-w-6xl mx-auto mt-10 px-4 group"
        >
          <div className="absolute inset-0 bg-blue-600 blur-2xl opacity-10 group-hover:opacity-20 transition-opacity" />
          <div className="relative bg-gradient-to-r from-blue-700/95 to-indigo-600/95 backdrop-blur-xl text-white py-5 px-8 flex flex-col md:flex-row justify-between items-center rounded-2xl shadow-xl border border-white/20">
            <div className="flex items-center gap-4 mb-4 md:mb-0">
              <div className="p-3 bg-white/20 rounded-xl ring-1 ring-white/30">
                <Info size={22} className="text-white" />
              </div>
              <div>
                <p className="text-sm text-blue-100/80 font-semibold uppercase tracking-widest">Customer Support</p>
                <p className="text-lg font-bold">Premium assistance is active</p>
              </div>
            </div>
            
            <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 md:border-l border-white/20 pt-4 md:pt-0 md:pl-8">
              <div className="text-center md:text-left">
                <p className="text-blue-100/70 text-xs font-bold uppercase mb-0.5">Estimated Arrival</p>
                <div className="flex items-center gap-2 font-black text-xl">
                  <Clock size={20} className="text-blue-300" />
                  15 <span className="text-sm font-normal text-blue-200">mins</span>
                </div>
              </div>
              <div className="text-center md:text-left">
                <p className="text-blue-100/70 text-xs font-bold uppercase mb-0.5">Distance</p>
                <div className="flex items-center gap-2 font-black text-xl">
                  <Navigation size={20} className="text-blue-300" />
                  3.2 <span className="text-sm font-normal text-blue-200">km</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ================= JOB + SERVICE DETAILS (INTERACTIVE) ================= */}
        <div className="max-w-6xl mx-auto mt-12 mb-12 px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="grid md:grid-cols-2 gap-8"
          >
            {/* Left - Job Info Card */}
         {/* Left - Job Info Card */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl shadow-slate-200/40 dark:shadow-none border border-slate-200/60 dark:border-slate-800 relative overflow-hidden group h-full flex flex-col"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
              
              <div className="flex items-center gap-4 mb-10 relative z-10">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-2xl border border-blue-100 dark:border-blue-800">
                  <User className="text-blue-600 dark:text-blue-400" size={28} />
                </div>
                <h2 className="text-2xl font-black text-slate-800 dark:text-white">Job Details</h2>
              </div>
 
              <ul className="space-y-12 relative z-10 flex-grow">
                {[
                  { icon: User, label: "Customer Name", value: "Rahul Sharma" },
                  { icon: MapPin, label: "Service Address", value: "Flat 402, KaamMitra Residency, New Delhi", sub: "Gate 2 access preferred" },
                  { icon: CheckCircle2, label: "Assigned Provider", value: "Elite Cleaning Pros", sub: "Diamond Certified" },
                ].map((item, index) => (
                  <motion.li key={index} variants={itemVariants} className="flex items-start gap-4 group/item">
                    <div className="mt-1 p-2 bg-slate-50 dark:bg-slate-800 rounded-lg group-hover/item:bg-blue-50 dark:group-hover/item:bg-blue-900/20 transition-colors">
                      <item.icon size={18} className="text-slate-400 group-hover/item:text-blue-500 transition-colors" />
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <p className="text-[11px] uppercase tracking-widest text-slate-400 font-black mb-1">{item.label}</p>
                        {item.action && <button className="text-[10px] font-bold text-blue-600 hover:underline">{item.action}</button>}
                      </div>
                      <p className={`font-bold leading-tight ${item.highlight ? "text-blue-600 text-lg" : "text-slate-700 dark:text-slate-200"}`}>{item.value}</p>
                      {item.sub && <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{item.sub}</p>}
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Right - Service Details Card */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-xl shadow-slate-200/40 dark:shadow-none border border-slate-200/60 dark:border-slate-800 relative overflow-hidden group h-full flex flex-col"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />

              <div className="flex items-center gap-4 mb-10 relative z-10">
                <div className="p-4 bg-indigo-50 dark:bg-indigo-900/30 rounded-2xl border border-indigo-100 dark:border-indigo-800">
                  <Calendar className="text-indigo-600 dark:text-indigo-400" size={28} />
                </div>
                <h2 className="text-2xl font-black text-slate-800 dark:text-white">Service Scope</h2>
              </div>

              <ul className="space-y-6 relative z-10 flex-grow">
                {/* Regular Items */}
                {[
                  { icon: User, label: "Provider Name", value: "Aniket" },
                  { icon: Info, label: "Selected Category", value: "Full-Home Deep Santization", sub: "Eco-friendly chemicals included" },
                ].map((item, index) => (
                  <motion.li key={index} variants={itemVariants} className="flex items-start gap-4 group/item">
                    <div className="mt-1 p-2 bg-slate-50 dark:bg-slate-800 rounded-lg group-hover/item:bg-indigo-50 dark:group-hover/item:bg-indigo-900/20 transition-colors">
                      <item.icon size={18} className="text-slate-400 group-hover/item:text-indigo-500 transition-colors" />
                    </div>
                    <div className="flex-grow">
                      <p className="text-[11px] uppercase tracking-widest text-slate-400 font-black mb-1">{item.label}</p>
                      <p className="font-bold leading-tight text-slate-700 dark:text-slate-200">{item.value}</p>
                      {item.sub && <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{item.sub}</p>}
                    </div>
                  </motion.li>
                ))}

                {/* Combined Row: Duration & Schedule */}
                <motion.li variants={itemVariants} className="grid grid-cols-2 gap-6">
                  {[
                    { icon: Clock, label: "Work Duration", value: "~ 4.5 hrs" },
                    { icon: Calendar, label: "Slot", value: "Oct 24, 2023", sub: "10:30 AM" },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 group/item">
                      <div className="mt-1 p-2 bg-slate-50 dark:bg-slate-800 rounded-lg group-hover/item:bg-indigo-50 dark:group-hover/item:bg-indigo-900/20 transition-colors">
                        <item.icon size={16} className="text-slate-400 group-hover/item:text-indigo-500 transition-colors" />
                      </div>
                      <div className="flex-grow">
                        <p className="text-[10px] uppercase tracking-widest text-slate-400 font-black mb-1">{item.label}</p>
                        <p className="font-bold text-sm leading-tight text-slate-700 dark:text-slate-200">{item.value}</p>
                        {item.sub && <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">{item.sub}</p>}
                      </div>
                    </div>
                  ))}
                </motion.li>
              </ul>
               {/* CALL SECTION (Replaced Partner Notes) */}
    <div className="mt-6 p-5 rounded-2xl border
      bg-slate-50 dark:bg-slate-800/60
      border-slate-200 dark:border-slate-700">

      <p className="text-[10px] uppercase font-black text-slate-400 mb-3">
        Contact Provider
      </p>

      <div className="flex gap-3">
        <button className="flex-1 py-2.5 rounded-xl font-semibold
          bg-green-500 hover:bg-green-600 text-white transition">
          Call Now
        </button>

        <button className="flex-1 py-2.5 rounded-xl font-semibold
          bg-blue-500 hover:bg-blue-600 text-white transition">
          Message
        </button>
      </div>
    </div>
            </motion.div>
          </motion.div>
        </div>

      {/* ================= MODERN PAYMENT SUMMARY ================= */}
<div className={`max-w-6xl mx-auto my-16 px-6`}>
  <div className={`rounded-[2rem] p-10 transition-all duration-300 ${
    darkMode 
    ? "bg-slate-900 border border-slate-800 shadow-2xl" 
    : "bg-white border border-slate-100 shadow-2xl shadow-slate-200/50"
  }`}>
    
    {/* Header Section */}
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
      <div>
        <h2 className="text-3xl font-bold tracking-tight mb-1">Payment Summary</h2>
       
      </div>
      <div className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase flex items-center gap-2 ${
        remainingAmount > 0 
        ? "bg-amber-500/10 text-amber-600 border border-amber-500/20" 
        : "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
      }`}>
        <div className={`w-2 h-2 rounded-full ${remainingAmount > 0 ? "bg-amber-500" : "bg-emerald-500"} animate-pulse`} />
        {remainingAmount > 0 ? "Payment Pending" : "Payment Completed"}
      </div>
    </div>

    {/* Main Stats Grid */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
      {/* Total Amount */}
      <div className="space-y-1">
        <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Total Valuation</p>
        <p className="text-3xl font-bold tracking-tighter">₹{totalAmount.toLocaleString()}</p>
      </div>

      {/* Amount Realized */}
      <div className="space-y-1">
        <p className="text-xs font-bold uppercase tracking-widest text-emerald-500/80">Amount Realized</p>
        <p className="text-3xl font-bold tracking-tighter text-emerald-500">₹{tokenPaid.toLocaleString()}</p>
      </div>

      {/* Net Payables */}
      <div className="space-y-1">
        <p className="text-xs font-bold uppercase tracking-widest text-blue-600">Net Payables</p>
        <p className="text-3xl font-extrabold tracking-tighter">₹{remainingAmount.toLocaleString()}</p>
      </div>
    </div>

    {/* Progress Bar Layer */}
    <div className="mb-12">
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Settlement Progress</span>
        <span className="text-sm font-bold text-blue-600 italic">{Math.round(paymentProgress)}% Completed</span>
      </div>
      <div className={`h-3 w-full rounded-full overflow-hidden ${darkMode ? "bg-slate-800" : "bg-slate-100"}`}>
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${paymentProgress}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="h-full bg-blue-600 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.4)]"
        />
      </div>
    </div>

    {/* Footer/Action Layer */}
    <div className={`flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-2xl ${
      darkMode ? "bg-slate-800/50" : "bg-slate-50"
    }`}>
      <p className="text-sm font-medium text-slate-500 max-w-sm">
        {remainingAmount > 0 
          ? "Please proceed with the payment to finalize your booking and secure the transaction." 
          : "Your booking is fully settled. You can download the official tax invoice below."}
      </p>
      
      <div className="flex gap-4 w-full sm:w-auto">
        {remainingAmount > 0 ? (
          <button className="flex-grow sm:flex-none px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20 active:scale-95">
            Pay Balance Now
          </button>
        ) : (
          <button className="flex-grow sm:flex-none px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold transition-all flex items-center justify-center gap-2 active:scale-95">
            <Download size={18} />
            Download Invoice
          </button>
        )}
      </div>
    </div>

  </div>
</div>

</div>

      <Footer />
    </div>
  );
}
