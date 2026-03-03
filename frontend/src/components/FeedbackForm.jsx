import React, { useState, useEffect } from "react";

export default function FeedbackForm({
  onClose,
  onSubmitSuccess,
}) {
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [category, setCategory] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const emojiReactions = [
    { emoji: "😢", label: "Poor", value: 1 },
    { emoji: "😕", label: "Fair", value: 2 },
    { emoji: "😐", label: "Good", value: 3 },
    { emoji: "😊", label: "Great", value: 4 },
    { emoji: "🤩", label: "Excellent", value: 5 },
  ];

  const categories = [
    "Service Quality",
    "Timeliness",
    "Professionalism",
    "Value for Money",
    "Communication",
    "Other",
  ];

  // ✅ Reset form when reopened
  useEffect(() => {
    if (!submitted) {
      setRating(0);
      setMessage("");
      setCategory("");
      setSelectedEmoji(null);
      setIsSubmitting(false);
    }
  }, [submitted]);

  const handleEmojiClick = (value) => {
    setSelectedEmoji(value);
    setRating(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Prevent multiple submit
    if (isSubmitting) return;

    if (!rating) {
      alert("Please select a rating");
      return;
    }

    setIsSubmitting(true);

    // ✅ Backend ready payload
    const feedbackData = {
      rating,
      message,
      category,
      createdAt: new Date().toISOString(),
    };

    console.log("Feedback Submitted:", feedbackData);

    setSubmitted(true);

    // ✅ Notify parent + close modal
    setTimeout(() => {
      onSubmitSuccess?.();
      onClose?.();
    }, 2000);
  };

  /* ================= SUCCESS SCREEN ================= */

  if (submitted) {
    return (
      <div className="w-full max-w-lg mx-auto bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-800 dark:to-gray-900 shadow-2xl rounded-3xl p-10 text-center border-2 border-green-200 dark:border-green-700 animate-[fadeIn_0.5s_ease-in]">
        <div className="relative">
          <div className="text-7xl mb-6 animate-[bounce_1s_ease-in-out_3]">
            🎉
          </div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-green-400 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        </div>

        <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-3">
          Thank You for Your Feedback!
        </h2>

        <p className="text-gray-600 dark:text-gray-300 text-lg">
          We truly appreciate your time and insights ❤️
        </p>

        <div className="mt-6 flex justify-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-ping delay-75"></div>
          <div className="w-2 h-2 bg-green-500 rounded-full animate-ping delay-150"></div>
        </div>
      </div>
    );
  }

  /* ================= FORM ================= */

  return (
    <div className="w-full max-w-lg mx-auto bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-2xl rounded-3xl p-8 border border-gray-200 dark:border-gray-700 backdrop-blur-sm">
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Header */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Share Your Experience
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            Your feedback helps us improve our services
          </p>
        </div>

        {/* Emoji Rating */}
        <div className="space-y-3">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 text-center">
            How was your experience?
          </label>

          <div className="flex justify-center gap-3">
            {emojiReactions.map((item) => (
              <button
                type="button"
                key={item.value}
                onClick={() => handleEmojiClick(item.value)}
                className={`group relative flex flex-col items-center transition-all duration-300 ${
                  selectedEmoji === item.value
                    ? "scale-110"
                    : "scale-100 hover:scale-105"
                }`}
              >
                <div
                  className={`text-4xl transition-all duration-300 ${
                    selectedEmoji === item.value
                      ? "drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                      : "grayscale-[50%] group-hover:grayscale-0"
                  }`}
                >
                  {item.emoji}
                </div>

                <span
                  className={`text-xs mt-1 font-medium transition-all duration-300 ${
                    selectedEmoji === item.value
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-gray-400 dark:text-gray-500"
                  }`}
                >
                  {item.label}
                </span>

                {selectedEmoji === item.value && (
                  <div className="absolute -bottom-2 w-8 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Category */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
            Feedback Category
          </label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900 outline-none transition-all duration-300 cursor-pointer"
          >
            <option value="">Select a category...</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Message */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300">
            Tell us more about your experience
          </label>

          <div className="relative">
            <textarea
              rows="5"
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Share your thoughts, suggestions, or concerns..."
              maxLength={500}
              className="w-full p-4 pb-8 rounded-xl border-2 border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900 outline-none transition-all duration-300 resize-none"
            />

            <div className="absolute bottom-2 right-4 text-xs text-gray-400 dark:text-gray-500 font-medium">
              {message.length}/500
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold shadow-lg shadow-blue-500/50 hover:shadow-xl hover:shadow-blue-500/60 hover:scale-[1.02] active:scale-95 transition-all duration-300 disabled:opacity-60"
          >
            {isSubmitting ? "Submitting..." : "Submit Feedback"}
          </button>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3.5 rounded-xl bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white font-bold hover:bg-gray-300 dark:hover:bg-gray-600 hover:scale-[1.02] active:scale-95 transition-all duration-300"
            >
              Cancel
            </button>
          )}
        </div>

      </form>
    </div>
  );
}