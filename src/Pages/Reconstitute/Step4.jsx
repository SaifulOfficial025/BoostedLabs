import React from "react";

function Step4() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-6 py-6 sm:px-10 sm:py-8 max-w-3xl mx-auto mt-8">
      <div className="font-bold text-xl sm:text-2xl mb-4 text-[#16213e]">
        Step 4 — Prime the Pen{" "}
        <span className="font-normal">(Very Important)</span>
      </div>
      <ul className="space-y-3 text-base sm:text-lg text-gray-700">
        <li className="flex items-start gap-2">
          <span className="text-blue-600 mt-1">✓</span>
          <span>Attach pen tip</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-blue-600 mt-1">✓</span>
          <span>Remove both protective caps</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-blue-600 mt-1">✓</span>
          <span>Point the pen upward</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-blue-600 mt-1">✓</span>
          <span>Eject air until very little remains</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-blue-600 mt-1">✓</span>
          <span>
            Stop when a small droplet forms at the needle tip — your pen is
            primed
          </span>
        </li>
      </ul>
      <div className="bg-[#f4f7fb] border border-blue-100 rounded-lg px-4 py-3 mt-6 text-[#183153] text-base sm:text-lg">
        <span className="font-semibold">
          "Priming removes air and ensures every click delivers an accurate
          dose."
        </span>
      </div>
    </div>
  );
}

export default Step4;
