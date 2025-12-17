import React from "react";

function Step2() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-4 py-6 sm:px-8 sm:py-8 max-w-3xl mx-auto mt-8">
      <div className="font-bold text-xl sm:text-2xl mb-4 text-[#16213e]">
        Step 2 — Add Sterile Water
      </div>
      <div className="bg-[#f8fafc] rounded-xl overflow-x-auto mb-6">
        <table className="min-w-full text-left border-separate border-spacing-y-1">
          <thead>
            <tr className="text-[#16213e] text-base">
              <th className="py-2 px-4 font-semibold">Product</th>
              <th className="py-2 px-4 font-semibold">Volume</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-base">
            <tr>
              <td className="py-2 px-4">Boosted Wolverine™</td>
              <td className="py-2 px-4">3.0 mL</td>
            </tr>
            <tr>
              <td className="py-2 px-4">Boosted Glow™</td>
              <td className="py-2 px-4">3.0 mL</td>
            </tr>
            <tr>
              <td className="py-2 px-4">Boosted Health™</td>
              <td className="py-2 px-4">3.0 mL</td>
            </tr>
            <tr>
              <td className="py-2 px-4">Boosted Libido™</td>
              <td className="py-2 px-4">3.0 mL</td>
            </tr>
            <tr>
              <td className="py-2 px-4">Boosted Sun™</td>
              <td className="py-2 px-4">3.0 mL</td>
            </tr>
            <tr>
              <td className="py-2 px-4">Boosted Rewind™</td>
              <td className="py-2 px-4">3.0 mL</td>
            </tr>
            <tr>
              <td className="py-2 px-4">Boosted Youth™</td>
              <td className="py-2 px-4">2.0 mL</td>
            </tr>
            <tr>
              <td className="py-2 px-4">Boosted Burn™</td>
              <td className="py-2 px-4">2.0 mL</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="font-semibold text-base sm:text-lg mb-2 text-[#16213e]">
        Instructions:
      </div>
      <ul className="space-y-2 text-base sm:text-lg text-gray-700">
        <li className="flex items-start gap-2">
          <span className="text-blue-600 mt-1">✓</span>
          <span>Clean the rubber stopper with alcohol</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-blue-600 mt-1">✓</span>
          <span>Draw up the correct amount of sterile water</span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-blue-600 mt-1">✓</span>
          <span>
            Insert needle gently and inject water SLOWLY down the inside wall
          </span>
        </li>
        <li className="flex items-start gap-2">
          <span className="text-blue-600 mt-1">✓</span>
          <span>Do NOT inject forcefully (avoid peptide degradation)</span>
        </li>
      </ul>
    </div>
  );
}

export default Step2;
