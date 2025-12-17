import React from "react";

function CommonQuestions() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-6 py-6 sm:px-10 sm:py-8 max-w-3xl mx-auto mt-8">
      <div className="font-bold text-xl sm:text-2xl mb-4 text-[#16213e]">
        Common Questions
      </div>
      <ul className="space-y-3 text-base sm:text-lg text-gray-700">
        <li className="flex items-start gap-2">
          <span className="text-blue-600 mt-1">✓</span>
          <span>
            <span className="font-semibold text-[#183153]">
              "My pen won't click"
            </span>
            <span className="text-gray-600">
              {" "}
              &rarr; Attach tip firmly and re-prime
            </span>
          </span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-blue-600 mt-1">✓</span>
          <span>
            <span className="font-semibold text-[#183153]">
              "Liquid won't come out"
            </span>
            <span className="text-gray-600">
              {" "}
              &rarr; Prime until you see a small bead
            </span>
          </span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-blue-600 mt-1">✓</span>
          <span>
            <span className="font-semibold text-[#183153]">
              "Solution looks cloudy"
            </span>
            <span className="text-gray-600">
              {" "}
              &rarr; Gently swirl again; if still cloudy, contact support
            </span>
          </span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-blue-600 mt-1">✓</span>
          <span>
            <span className="font-semibold text-[#183153]">
              "I added too much/little water"
            </span>
            <span className="text-gray-600">
              {" "}
              &rarr; Dosing will be inaccurate; contact support for replacement
              protocol
            </span>
          </span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-blue-600 mt-1">✓</span>
          <span>
            <span className="font-semibold text-[#183153]">
              "Can I mix early?"
            </span>
            <span className="text-gray-600">
              {" "}
              &rarr; Yes, but refrigerate immediately
            </span>
          </span>
        </li>
      </ul>
    </div>
  );
}

export default CommonQuestions;
