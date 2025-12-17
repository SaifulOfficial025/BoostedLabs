import React from "react";
import { FaFlask, FaShieldAlt } from "react-icons/fa";
import { MdOutlineAcUnit } from "react-icons/md";

function Hero() {
  return (
    <section className="bg-[#fcfcfd] pb-8 pt-8 mt-20 md:mt-2 md:pt-20 lg:mt-2 ">
      <div className="max-w-3xl mx-auto text-center px-4">
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#16213e] mb-3 sm:mb-4 leading-tight">
          How to Reconstitute Your Peak
          <br className="hidden sm:block" /> Peptide Pen
        </h1>
        <p className="text-gray-600 text-base sm:text-lg mb-4 sm:mb-6">
          Everything you need to safely mix, prime, and prepare your pen for
          accurate dosing.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-8 text-sm sm:text-base">
          <span className="inline-flex items-center gap-2 text-gray-700 bg-white rounded-full px-3 py-1 border border-gray-200">
            <FaShieldAlt className="text-blue-600" />
            Clinically Compounded in Australia
          </span>
          <span className="inline-flex items-center gap-2 text-gray-700 bg-white rounded-full px-3 py-1 border border-gray-200">
            <FaFlask className="text-indigo-600" />
            Batch Tested
          </span>
          <span className="inline-flex items-center gap-2 text-gray-700 bg-white rounded-full px-3 py-1 border border-gray-200">
            <MdOutlineAcUnit className="text-sky-500" />
            Refrigerate After Mixing
          </span>
        </div>
      </div>
      <div className="flex justify-center mt-2">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-6 py-6 sm:px-10 sm:py-8 max-w-3xl w-full">
          <div className="font-bold text-xl sm:text-2xl mb-4 text-[#16213e]">
            What You'll Need
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-gray-700 text-base sm:text-lg">
            <ul className="space-y-2 list-none">
              <li className="flex items-center gap-2">
                <span className="text-blue-600">✓</span> Your peptide vial/pen
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-600">✓</span> Alcohol swab
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-600">✓</span> Paper towel
              </li>
            </ul>
            <ul className="space-y-2 list-none">
              <li className="flex items-center gap-2">
                <span className="text-blue-600">✓</span> Sterile bacteriostatic
                water (included)
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-600">✓</span> Pen tip
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-600">✓</span> Clean flat surface
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
