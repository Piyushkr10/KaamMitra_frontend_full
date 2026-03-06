import React from "react";

const ProviderSearchModal = ({ open }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-[#1a1a1a]/80 backdrop-blur-lg flex flex-col items-center justify-center z-50">

      {/* Loader Circle */}
      <div className="relative">
        <div className="w-20 h-20 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
      </div>

      {/* Text */}
      <div className="text-center mt-6 text-white">
        <h2 className="text-lg font-semibold">
          Searching Providers
        </h2>
        <p className="text-sm text-white/70 mt-1">
          Please wait while we find available providers
        </p>
      </div>

    </div>
  );
};

export default ProviderSearchModal;