import React from "react";
import certificate from "../../public/Certificate.png";

function ProductCertification() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10 font-sans">
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="">
          <div className="w-full sm:w-1/2">
            <span className="block text-center sm:text-left text-lg sm:text-xl font-semibold text-gray-800">
              Product Certification
            </span>
          </div>

          <div className="w-full sm:w-1/2 flex justify-start sm:justify-start mt-3">
            <a
              href={certificate}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open certificate in new tab"
              className="w-full max-w-xl sm:max-w-[240px] md:max-w-[320px] block"
            >
              <img
                src={certificate}
                alt="Product Certification"
                className="w-full object-contain rounded-md border border-gray-100 shadow-sm cursor-pointer"
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductCertification;
