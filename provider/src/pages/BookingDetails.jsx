import React from "react";
import Footer from "../components/Footer";
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
  Inbox
} from "lucide-react";

export default function ProviderBookingDetails({ darkMode }) {
  const serviceAmount = 3000;
  const platformFee = 600;
  const providerEarning = serviceAmount - platformFee;

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
            {/* Customer Details */}
            <motion.div 
              variants={itemVariants}
              className={`rounded-[2rem] p-8 border shadow-xl ${
                darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200/60 shadow-slate-200/50"
              }`}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="p-2.5 bg-blue-50 dark:bg-blue-900/30 rounded-xl border border-blue-100 dark:border-blue-800">
                  <User size={22} className="text-blue-600" />
                </div>
                <h2 className="text-xl font-black">Customer Details</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-[10px] uppercase font-black text-slate-400 tracking-wider mb-1">Full Name</p>
                  <p className="text-lg font-bold">Rahul Sharma</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-black text-slate-400 tracking-wider mb-1">Service Address</p>
                  <p className="font-bold text-slate-700 dark:text-slate-200">Flat 402, KaamMitra Residency, New Delhi</p>
                </div>
                <div className="pt-4 border-t border-slate-50 dark:border-slate-800/50 flex justify-between items-center">
                  <p className="font-bold text-slate-500">+91 98765 43210</p>
                  <a href="tel:+919876543210" className="px-5 py-2.5 bg-indigo-600 text-white rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-indigo-600/20 active:scale-95 transition-all">
                    <Phone size={16} /> Call now
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Service Details */}
            <motion.div 
              variants={itemVariants}
              className={`rounded-[2rem] p-8 border shadow-xl ${
                darkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200/60 shadow-slate-200/50"
              }`}
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="p-2.5 bg-amber-50 dark:bg-amber-900/30 rounded-xl border border-amber-100 dark:border-amber-800">
                  <Inbox size={22} className="text-amber-600" />
                </div>
                <h2 className="text-xl font-black">Service Info</h2>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] uppercase font-black text-slate-400 tracking-wider mb-1">Category</p>
                    <p className="font-bold">Deep Cleaning</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-black text-slate-400 tracking-wider mb-1">Scheduled</p>
                    <p className="font-bold">Today, 10:30 AM</p>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Clock size={14} className="text-slate-400" />
                    <p className="text-[10px] uppercase font-black text-slate-400 tracking-wider">Est. Duration</p>
                  </div>
                  <p className="font-bold text-slate-700 dark:text-slate-200">~ 4.5 Standard Hours</p>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <p className="text-[10px] uppercase font-black text-slate-400 mb-1">Partner Notes</p>
                  <p className="text-sm text-slate-500 italic">"Bring eco-friendly chemicals & focus on balcony."</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ================= SIMPLIFIED PAYMENT SUMMARY ================= */}
          <motion.div 
            variants={itemVariants}
            className="mt-12 bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 border border-slate-200/60 dark:border-slate-800 shadow-2xl shadow-slate-200/40"
          >
            <div className="flex items-center gap-3 mb-10">
              <div className="p-2.5 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl">
                <IndianRupee className="text-emerald-600" size={24} />
              </div>
              <h2 className="text-2xl font-black tracking-tight">Earnings Summary</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="space-y-1">
                <p className="text-[11px] uppercase font-black text-slate-400 tracking-widest">Gross Amount</p>
                <p className="text-3xl font-bold">₹{serviceAmount.toLocaleString()}</p>
              </div>
              <div className="space-y-1">
                <p className="text-[11px] uppercase font-black text-rose-500/70 tracking-widest">Platform Fee</p>
                <p className="text-3xl font-bold text-rose-500">- ₹{platformFee.toLocaleString()}</p>
              </div>
              <div className="space-y-1 p-8 bg-slate-50 dark:bg-slate-800/40 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-inner">
                <p className="text-[11px] uppercase font-black text-emerald-600 tracking-widest mb-1">Your Earning</p>
                <p className="text-5xl font-black text-emerald-600 tracking-tighter">₹{providerEarning.toLocaleString()}</p>
              </div>
            </div>

            <div className="mt-10 pt-8 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
                <span>Auto-settlement active</span>
                <span className="text-emerald-600 italic">Verified KaamMitra Partner</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}