import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  IndianRupee,
  CreditCard,
  Smartphone,
  Wallet,
} from "lucide-react";

const PremiumPaymentModal = ({
  isOpen,
  onClose,
  onSuccess,
  amount,
  darkMode,
}) => {
  const [method, setMethod] = useState(null);

  const paymentMethods = [
    {
      id: "razorpay",
      title: "Razorpay",
      icon: <CreditCard size={22} />,
    },
    {
      id: "upi",
      title: "UPI Payment",
      icon: <Smartphone size={22} />,
    },
    {
      id: "cod",
      title: "Cash on Delivery",
      icon: <Wallet size={22} />,
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* BACKDROP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* MODAL */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
          >
            <div
              className={`w-full max-w-md rounded-3xl shadow-2xl p-8 relative ${
                darkMode
                  ? "bg-slate-900 text-white border border-slate-700"
                  : "bg-white text-slate-800 border border-slate-200"
              }`}
            >
              {/* CLOSE */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-slate-400 hover:text-red-500"
              >
                <X size={22} />
              </button>

              {/* HEADER */}
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold">
                  Select Payment Method
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Choose how you want to pay
                </p>
              </div>

              {/* AMOUNT */}
              <div
                className={`rounded-xl p-4 flex justify-center gap-2 mb-6 ${
                  darkMode ? "bg-slate-800" : "bg-slate-100"
                }`}
              >
                <IndianRupee />
                <span className="text-xl font-bold">{amount}</span>
              </div>

              {/* PAYMENT OPTIONS */}
              <div className="space-y-3 mb-6">
                {paymentMethods.map((item) => (
                  <motion.div
                    key={item.id}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setMethod(item.id)}
                    className={`p-4 rounded-xl border cursor-pointer flex items-center gap-4 transition
                    ${
                      method === item.id
                        ? "border-indigo-500 bg-indigo-500/10"
                        : darkMode
                        ? "border-slate-700 hover:bg-slate-800"
                        : "border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {item.icon}
                    <span className="font-medium">
                      {item.title}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* BUTTONS */}
              <div className="flex gap-4">
                <button
                  onClick={onClose}
                  className="w-full py-3 rounded-xl border border-slate-300 dark:border-slate-600"
                >
                  Cancel
                </button>

                <button
  disabled={!method}
  onClick={() => {
    if (!method) return;

    setTimeout(() => {
      onSuccess();
    }, 400);
  }}
  className={`w-full py-3 rounded-xl text-white font-semibold transition
  ${
    method
      ? "bg-gradient-to-r from-indigo-500 to-emerald-400 hover:scale-105"
      : "bg-slate-400 cursor-not-allowed"
  }`}
>
  Pay Now
</button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PremiumPaymentModal;