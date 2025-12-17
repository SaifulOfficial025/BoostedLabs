import React from "react";

function Step1() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-6 py-6 sm:px-10 sm:py-8 max-w-3xl mx-auto mt-8">
      <div className="font-bold text-xl sm:text-2xl mb-4 text-[#16213e]">
        Step 1 — Prepare Your Workspace
      </div>
      <ul className="space-y-3 text-base sm:text-lg text-gray-700">
        <li className="flex items-start gap-2">
          <span className="text-blue-600 mt-1">✓</span>
          <span>Wash your hands</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-blue-600 mt-1">✓</span>
          <span>Clean your workspace</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-blue-600 mt-1">✓</span>
          <span>Lay out all items</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-blue-600 mt-1">✓</span>
          <span>Ensure sterile water and pen vial are at room temp</span>
        </li>
      </ul>
    </div>
  );
}

export default Step1;
