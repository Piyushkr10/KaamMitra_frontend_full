import React from "react";
import { X, Phone, Mail, MessageSquare } from "lucide-react";

const CustomerSupport = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-md p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-gray-300"
        >
          <X size={20} />
        </button>

        {/* Title */}
        <h2 className="text-xl font-bold text-blue-600 mb-4">
          Customer Support
        </h2>

        {/* Support Details */}
        <div className="space-y-4 text-gray-700 dark:text-gray-200">
          <div className="flex items-center gap-3">
            <Phone className="text-blue-500" size={18} />
            <span>+1 (800) 123-4567</span>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="text-blue-500" size={18} />
            <span>support@yourcompany.com</span>
          </div>
          <div className="flex items-center gap-3">
            <MessageSquare className="text-blue-500" size={18} />
            <span>Live Chat available 9 AM – 6 PM</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            Close
          </button>
          <a
            href="mailto:support@yourcompany.com"
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Email Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default CustomerSupport;
