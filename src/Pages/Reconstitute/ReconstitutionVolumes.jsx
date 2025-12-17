import React from "react";

function ReconstitutionVolumes() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-4 py-6 sm:px-8 sm:py-8 max-w-3xl mx-auto mt-8">
      <div className="font-bold text-xl sm:text-2xl mb-4 text-[#16213e]">
        Reconstitution Volumes & Total Clicks per Pen
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left border-separate border-spacing-y-1">
          <thead>
            <tr className="bg-[#f8fafc] text-[#16213e] text-base">
              <th className="py-2 px-4 font-semibold rounded-tl-xl">Product</th>
              <th className="py-2 px-4 font-semibold">Sterile Water</th>
              <th className="py-2 px-4 font-semibold rounded-tr-xl">
                Total Clicks
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-base">
            <tr className="bg-white">
              <td className="py-2 px-4">Boosted Wolverine™</td>
              <td className="py-2 px-4">3.0 mL</td>
              <td className="py-2 px-4">300 clicks</td>
            </tr>
            <tr className="bg-white">
              <td className="py-2 px-4">Boosted Glow™</td>
              <td className="py-2 px-4">3.0 mL</td>
              <td className="py-2 px-4">300 clicks</td>
            </tr>
            <tr className="bg-white">
              <td className="py-2 px-4">Boosted Health™</td>
              <td className="py-2 px-4">3.0 mL</td>
              <td className="py-2 px-4">300 clicks</td>
            </tr>
            <tr className="bg-white">
              <td className="py-2 px-4">Boosted Libido™</td>
              <td className="py-2 px-4">3.0 mL</td>
              <td className="py-2 px-4">300 clicks</td>
            </tr>
            <tr className="bg-white">
              <td className="py-2 px-4">Boosted Sun™</td>
              <td className="py-2 px-4">3.0 mL</td>
              <td className="py-2 px-4">300 clicks</td>
            </tr>
            <tr className="bg-white">
              <td className="py-2 px-4">Boosted Rewind™</td>
              <td className="py-2 px-4">3.0 mL</td>
              <td className="py-2 px-4">300 clicks</td>
            </tr>
            <tr className="bg-white">
              <td className="py-2 px-4">Boosted Youth™</td>
              <td className="py-2 px-4">2.0 mL</td>
              <td className="py-2 px-4">200 clicks</td>
            </tr>
            <tr className="bg-white">
              <td className="py-2 px-4">Boosted Burn™</td>
              <td className="py-2 px-4">2.0 mL</td>
              <td className="py-2 px-4">200 clicks</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ReconstitutionVolumes;
