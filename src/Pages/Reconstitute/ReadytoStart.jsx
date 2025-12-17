import React from "react";

function ReadytoStart() {
  return (
    <div className="flex flex-col items-center justify-center py-8 sm:py-12 px-4">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-3 text-[#0A2239] max-w-2xl sm:max-w-3xl">
        Ready to Start?
      </h2>
      <p className="text-center text-gray-500 mb-8 max-w-md sm:max-w-2xl">
        Now that your pen is ready, check out our detailed usage guides for your
        specific product.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-xs sm:max-w-none">
        <button className="w-full sm:w-auto bg-[#FF7A3D] hover:bg-[#ff9a6a] text-white font-semibold py-3 px-7 rounded-lg shadow transition-colors duration-200 text-base sm:text-lg">
          View Usage Guides &rarr;
        </button>
        <button className="w-full sm:w-auto border-2 border-[#0A2239] text-[#0A2239] font-semibold py-3 px-7 rounded-lg shadow-sm hover:bg-[#f5faff] transition-colors duration-200 text-base sm:text-lg">
          Contact Support &rarr;
        </button>
      </div>
    </div>
  );
}

export default ReadytoStart;
