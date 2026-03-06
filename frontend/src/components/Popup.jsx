import React from "react";

export default function Popup({ message }) {
  return (
    <div className="fixed top-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50 animate-fade-in-down">
      {message}
    </div>
  );
}