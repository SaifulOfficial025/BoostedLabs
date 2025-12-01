import React from "react";

function Disclaimer() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 font-sans">
      <div className="bg-[#f9fafb] border border-gray-200 rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800">Disclaimer</h2>
        <div className="text-md text-gray-600 space-y-4 mt-5 text-justify">
          <p>
            All peptide compounds offered by Boosted Labs are premium-grade
            materials intended strictly for research and laboratory use only.
            These compounds are not manufactured or sold for human consumption,
            medical use, therapeutic use, or diagnostic purposes.
          </p>

          <p>
            None of the statements or products on this website have been
            evaluated, approved, or reviewed by the TGA, FDA, or any
            international regulatory authority. Boosted Labs products are not
            designed to diagnose, treat, cure, or prevent any disease or medical
            condition.
          </p>

          <p>
            By purchasing from Boosted Labs, you confirm that you are a
            qualified researcher or purchaser, and that all products will be
            handled responsibly and in accordance with applicable laws and
            regulations.
          </p>

          <p className="font-semibold text-gray-800">
            For research use only. Not for human use
          </p>
        </div>
      </div>
    </section>
  );
}

export default Disclaimer;
