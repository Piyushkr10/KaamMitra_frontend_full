import React from "react";
import FeedbackForm from "./FeedbackForm";

export default function FeedbackModal({
  isOpen,
  onClose,
  onSubmitSuccess,
  bookingId
}) {
  //  Do not render if closed
  if (!isOpen) return null;
  

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      
      //  Close when clicking outside modal
      onClick={onClose}
    >
      {/* Modal Container */}
      <div
        className="w-full max-w-lg relative"
        
        //  Prevent closing when clicking inside
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
        >
          ✕
        </button>

        {/* Feedback Form */}
        <FeedbackForm
          bookingId={bookingId}
          onClose={onClose}
          onSubmitSuccess={onSubmitSuccess}
        />
      </div>
    </div>
  );
}