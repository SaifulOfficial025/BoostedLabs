import React from "react";

function SafetyNotes() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-6 py-6 sm:px-10 sm:py-8 max-w-3xl mx-auto mt-8">
      <div className="font-bold text-xl sm:text-2xl mb-4 text-[#16213e]">
        Safety Notes
      </div>
      <ul className="space-y-3 text-base sm:text-lg text-gray-700">
        <li className="flex items-start gap-2">
          <span className="text-blue-600 mt-1">✓</span>
          <span>Use ONLY bacteriostatic water</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-blue-600 mt-1">✓</span>
          <span>Do not shake the vial</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-blue-600 mt-1">✓</span>
          <span>Do not reuse needles</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-blue-600 mt-1">✓</span>
          <span>Always store refrigerated</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-blue-600 mt-1">✓</span>
          <span>Do not leave peptide unrefrigerated for more than 1 hour</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-blue-600 mt-1">✓</span>
          <span>Use within 30 days</span>
        </li>
      </ul>
    </div>
  );
}

export default SafetyNotes;
