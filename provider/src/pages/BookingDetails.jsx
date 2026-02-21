import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  User,
  Clock,
  Calendar,
  Navigation,
  IndianRupee,
  Activity,
  Inbox,
  Info,
  ChevronRight,
  CheckCircle2
} from "lucide-react";

export default function ProviderBookingDetails({ darkMode }) {
  const serviceAmount = 3000;
  const platformFee = 600;
  const providerEarning = serviceAmount - platformFee;
  const paidByCustomer = 1500; // Mock data
  const remainingPayment = serviceAmount - paidByCustomer;
  const paymentProgress = (paidByCustomer / serviceAmount) * 100;

  const [isCompleted, setIsCompleted] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(0);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.5, 
        ease: "easeOut",
        staggerChildren: 0.1 
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <div
      className={`min-h-screen flex flex-col selection:bg-indigo-100 selection:text-indigo-900 ${
        darkMode ? "bg-gray-950 text-white" : "bg-slate-50 text-slate-900"
      }`}
    >
      {/* Background Subtle Gradient */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-30 dark:opacity-10">
        <div className="absolute top-[-5%] right-[-5%] w-[35%] h-[35%] bg-indigo-500/10 blur-[100px] rounded-full" />
        <div className="absolute bottom-[-5%] left-[-5%] w-[35%] h-[35%] bg-blue-500/10 blur-[100px] rounded-full" />
      </div>

      <div className="flex-grow pb-24 relative z-10">
        <motion.div
           initial="hidden"
           animate="visible"
           variants={containerVariants}
           className="max-w-6xl mx-auto px-4 pt-12"
        >
          {/* ================= MAP SECTION ================= */}
          <div className="w-full">
            <div className="rounded-[2rem] overflow-hidden shadow-2xl border border-white dark:border-slate-800 bg-white dark:bg-slate-900 transition-shadow duration-500 hover:shadow-indigo-500/10">
              <img
                src="/map.png"
                alt="Navigation Map"
                className="w-full h-80 object-cover"
              />
              <div className="flex flex-col md:flex-row justify-between items-center p-6 gap-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-indigo-50 dark:bg-indigo-900/40 rounded-lg">
                    <Activity size={18} className="text-indigo-600" />
                  </div>
                  <p className="font-bold text-slate-700 dark:text-slate-200">Customer Location Active</p>
                </div>
                <button className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 hover:bg-indigo-600 dark:hover:bg-indigo-600 hover:text-white dark:hover:text-white px-5 py-2.5 rounded-xl font-bold transition-all active:scale-95">
                  <Navigation size={18} />
                  Navigate in Maps
                </button>
              </div>
            </div>
          </div>

       {/* ================= DETAILS GRID ================= */}
<div className="mt-8 grid md:grid-cols-2 gap-8">

  {/* Customer Details - Provider View */}
  <motion.div
    variants={itemVariants}
    whileHover={{ y: -5 }}
    className={`rounded-[2rem] p-8 border shadow-xl transition-all relative overflow-hidden group
    ${
      darkMode
        ? "bg-slate-900 border-slate-800"
        : "bg-white border-slate-200 shadow-slate-200/40"
    }`}
  >
    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700 pointer-events-none" />

    {/* Header */}
    <div className="flex items-center gap-4 mb-8">
      <div className="p-2.5 bg-blue-50 dark:bg-blue-900/30 rounded-xl border border-blue-100 dark:border-blue-800">
        <User size={22} className="text-blue-600" />
      </div>

      <h2 className="text-xl font-black text-slate-800 dark:text-white">
        Customer Details
      </h2>
    </div>

    {/* Content */}
    <div className="space-y-6">

      {/* Name */}
      <div>
        <p className="text-[10px] uppercase font-black text-slate-400 mb-1">
          Customer Name
        </p>
        <p className="text-lg font-bold text-slate-800 dark:text-slate-100">
          Rahul Sharma
        </p>
      </div>

      {/* Address */}
      {/* Address */}
<div>
  <div className="flex items-center gap-2 mb-1">
    <MapPin size={14} className="text-slate-400" />
    <p className="text-[10px] uppercase font-black text-slate-400">
      Service Address
    </p>
  </div>

  <p className="font-semibold text-slate-700 dark:text-slate-200">
    Flat 402, KaamMitra Residency, New Delhi
  </p>
</div>

      {/* Contact Actions */}
       <div className="p-4 rounded-2xl
        bg-slate-50 dark:bg-slate-800/60
        border border-slate-200 dark:border-slate-700">
        
        <p className="text-[10px] uppercase font-black text-slate-400 mb-1">
          Contact Customer
        </p>

        <div className="flex gap-3">
          <a
            href="tel:+919876543210"
            className="flex-1 py-2.5 rounded-xl font-semibold
            bg-green-500 hover:bg-green-600
            text-white flex items-center justify-center gap-2
            transition active:scale-95"
          >
            <Phone size={16} />
            Call
          </a>

          <button
            className="flex-1 py-2.5 rounded-xl font-semibold
            bg-blue-500 hover:bg-blue-600
            text-white transition active:scale-95"
          >
            Message
          </button>
        </div>
      </div>

    </div>
  </motion.div>


          {/* Service Details */}
<motion.div
  variants={itemVariants}
  whileHover={{ y: -5 }}
  className={`rounded-[2rem] p-8 border shadow-xl transition-all relative overflow-hidden group
  ${
    darkMode
      ? "bg-slate-900 border-slate-800"
      : "bg-white border-slate-200 shadow-slate-200/40"
  }`}
>
  <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700 pointer-events-none" />

  {/* Header */}
  <div className="flex items-center gap-4 mb-8">
    <div className="p-2.5 bg-amber-50 dark:bg-amber-900/30 rounded-xl border border-amber-100 dark:border-amber-800">
      <Inbox size={22} className="text-amber-600" />
    </div>
    <h2 className="text-xl font-black text-slate-800 dark:text-white">
      Service Info
    </h2>
  </div>

  {/* Content */}
  <div className="space-y-6">

    {/* Grid Info */}
    <div className="grid grid-cols-2 gap-4">

  {/* Customer Name */}
  <div>
    <div className="flex items-center gap-2 mb-1">
      <User size={12} className="text-slate-400" />
      <p className="text-[10px] uppercase font-black text-slate-400">
        Provider Name
      </p>
    </div>
    <p className="font-bold text-slate-700 dark:text-slate-200">
      Aniket
    </p>
  </div>

  {/* Category */}
  <div>
    <div className="flex items-center gap-2 mb-1">
      <Info size={12} className="text-slate-400" />
      <p className="text-[10px] uppercase font-black text-slate-400">
        Category
      </p>
    </div>
    <p className="font-bold text-slate-700 dark:text-slate-200">
      Deep Cleaning
    </p>
  </div>

  {/* Scheduled */}
  <div>
    <div className="flex items-center gap-2 mb-1">
      <Calendar size={12} className="text-slate-400" />
      <p className="text-[10px] uppercase font-black text-slate-400">
        Scheduled
      </p>
    </div>
    <p className="font-bold text-slate-700 dark:text-slate-200">
      Today, 10:30 AM
    </p>
  </div>

</div>

    {/* Duration */}
    <div>
      <div className="flex items-center gap-2 mb-1">
        <Clock size={12} className="text-slate-400" />
        <p className="text-[10px] uppercase font-black text-slate-400">
          Est. Duration
        </p>
      </div>

      <p className="font-bold text-slate-700 dark:text-slate-200">
        ~ 4.5 Standard Hours
      </p>
    </div>

    {/* CALL SECTION (Replaced Partner Notes) */}
    <div className="p-5 rounded-2xl border
      bg-slate-50 dark:bg-slate-800/60
      border-slate-200 dark:border-slate-700">

      <p className="text-[10px] uppercase font-black text-slate-400 mb-3">
        Contact Customer
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

  </div>
</motion.div>
          </div>

          {/* ================= PAYMENT & COMPLETION SUMMARY ================= */}
         <motion.div
  variants={itemVariants}
  className={`mt-10 rounded-[2rem] p-8 border transition-all relative overflow-hidden backdrop-blur-md
  ${
    darkMode
      ? "bg-slate-900/80 border-slate-800 shadow-2xl"
      : "bg-white/80 border-slate-100 shadow-xl shadow-slate-200/40"
  }`}
>
  <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none" />

  {/* Header */}
  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 relative z-10">
    <div>
      <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-1">
        Payment & Job Status
      </h2>
      <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
        Real-time settlement & completion
      </p>
    </div>

    <div
      className={`px-4 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase flex items-center gap-2 ${
        isCompleted || remainingPayment === 0
          ? "bg-emerald-500/10 text-emerald-600 border border-emerald-500/20"
          : "bg-amber-500/10 text-amber-600 border border-amber-500/20"
      }`}
    >
      <div
        className={`w-1.5 h-1.5 rounded-full ${
          isCompleted || remainingPayment === 0
            ? "bg-emerald-500"
            : "bg-amber-500"
        } animate-pulse`}
      />
      {isCompleted || remainingPayment === 0
        ? "Task & Payment Settled"
        : "Awaiting Completion"}
    </div>
  </div>

  {/* Payment Values */}
  <div className="grid grid-cols-3 gap-6 relative z-10 mb-8">
    <div>
      <p className="text-[10px] uppercase font-bold text-slate-400">
        Total Value
      </p>
      <p className="text-xl font-bold text-slate-800 dark:text-white">
        ₹{serviceAmount.toLocaleString()}
      </p>
    </div>

    <div>
      <p className="text-[10px] uppercase font-bold text-emerald-500">
        Received
      </p>
      <p className="text-xl font-bold text-emerald-500">
        ₹{(isCompleted
          ? serviceAmount
          : paidByCustomer
        ).toLocaleString()}
      </p>
    </div>

    <div>
      <p className="text-[10px] uppercase font-bold text-blue-600">
        Balance
      </p>
      <p className="text-xl font-bold text-slate-800 dark:text-white">
        ₹{(isCompleted ? 0 : remainingPayment).toLocaleString()}
      </p>
    </div>
  </div>

  {/* ================= STATUS AREA ================= */}
  <div className="flex items-end justify-between gap-10 pt-10 border-t border-slate-100 dark:border-slate-800">

    {/* Progress Bar */}
    <div className="flex-1">
      <p className="text-[11px] text-slate-400 font-bold uppercase mb-3">
        Settlement Status
      </p>

      <div
        className={`relative h-3 w-1/2 rounded-full overflow-hidden ${
          darkMode ? "bg-slate-800/50" : "bg-slate-100"
        }`}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{
            width: isCompleted
              ? "100%"
              : `${paymentProgress}%`,
          }}
          transition={{ duration: 1 }}
          className="h-full bg-indigo-600 rounded-full"
        />
      </div>

      <p className="text-[10px] mt-2 text-slate-400 font-bold">
        {isCompleted
          ? "100% Fully Settled"
          : `${Math.round(paymentProgress)}% Received`}
      </p>
    </div>

    {/* ================= PREMIUM SLIDER ================= */}
    <div
      className={`relative flex items-center w-56 h-14 rounded-full p-1 overflow-hidden
      ${
        darkMode
          ? "bg-slate-900 border border-slate-700 shadow-inner"
          : "bg-slate-100 border border-slate-200 shadow-inner"
      }`}
    >

      {/* Liquid Fill */}
      <motion.div
        animate={{
          width: isCompleted
            ? "100%"
            : sliderPosition > 0
            ? sliderPosition + 52
            : 0,
        }}
        className="absolute left-0 top-0 bottom-0 rounded-full
        bg-gradient-to-r from-indigo-500 via-indigo-400 to-emerald-400"
      />

      {/* Text */}
      <span
        className={`absolute w-full text-center text-[12px]
        font-semibold uppercase tracking-widest pointer-events-none
        ${
          isCompleted
            ? "text-white"
            : "text-slate-500"
        }`}
      >
        {isCompleted
          ? "Work Completed ✓"
          : "Finish ⭐"}
      </span>

      {/* Completed Button */}
      {isCompleted ? (
        <div className="z-10 w-full h-full rounded-full flex items-center justify-center bg-emerald-500 text-white font-bold">
          Work Done ✓
        </div>
      ) : (
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 168 }}
          dragElastic={0}
          onDrag={(e, info) =>
            setSliderPosition(info.point.x)
          }
          onDragEnd={(e, info) => {
            if (info.offset.x > 120)
              setIsCompleted(true);
            else setSliderPosition(0);
          }}
          className="z-10 w-12 h-12 rounded-full flex items-center justify-center
          bg-white shadow-xl cursor-grab active:cursor-grabbing"
        >
          <ChevronRight
            size={20}
            className="text-indigo-600"
          />
        </motion.div>
      )}
    </div>
  </div>
</motion.div>
        </motion.div>
      </div>

    </div>
  );
}