import React, { useState } from "react";
import { submitFeedback } from "../api"; // adjust path if needed

export default function FeedbackForm({
  bookingId,
  onClose,
  onSubmitSuccess,
}) {
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [category, setCategory] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const emojiReactions = [
    { emoji: "😢", value: 1 },
    { emoji: "😕", value: 2 },
    { emoji: "😐", value: 3 },
    { emoji: "😊", value: 4 },
    { emoji: "🤩", value: 5 },
  ];

  const categories = [
    "Service Quality",
    "Timeliness",
    "Professionalism",
    "Value for Money",
    "Communication",
    "Other",
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    if (!rating) {
      alert("Please select a rating");
      return;
    }

    setIsSubmitting(true);

    try {
      await submitFeedback(bookingId, {
        rating,
        message,
        category,
      });

      setSubmitted(true);

      setTimeout(() => {
        onSubmitSuccess?.();
        onClose?.();
      }, 1500);

    } catch (error) {
      alert(error.message || "Failed to submit feedback");
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold mb-2">
          Thank You for Your Feedback!
        </h2>
        <p className="text-gray-500">
          We appreciate your time and support ❤️
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-bold text-center">
          Give Rating to Our Provider
        </h2>

        {/* Emoji Rating */}
        <div className="flex justify-center gap-3">
          {emojiReactions.map((item) => (
            <button
              type="button"
              key={item.value}
              onClick={() => setRating(item.value)}
              className={`text-4xl transition ${
                rating === item.value ? "scale-110" : "opacity-60"
              }`}
            >
              {item.emoji}
            </button>
          ))}
        </div>

        {/* Category */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-3 rounded-xl border"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat}>{cat}</option>
          ))}
        </select>

        {/* Message */}
        <textarea
          rows="4"
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your feedback..."
          className="w-full p-3 rounded-xl border"
        />

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-blue-600 text-white py-3 rounded-xl"
          >
            {isSubmitting ? "Submitting..." : "Submit Feedback"}
          </button>

          <button
            type="button"
            onClick={onClose}
            className="flex-1 bg-gray-300 py-3 rounded-xl"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}