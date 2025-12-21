import React from "react";

function ProductDetailsText({ product }) {
  const description = product?.description || "No description available";

  return (
    <div className="max-w-7xl mx-auto my-6 font-sans px-4 sm:px-6 font-sans">
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-800">Product Details</h2>

        <div className="mt-4 text-sm text-gray-700 space-y-4 text-justify">
          <p>{description}</p>

          {product?.size && (
            <div>
              <h3 className="font-semibold text-gray-800 mb-2">
                Size Information
              </h3>
              <ul className="list-disc ml-6 space-y-1 text-gray-700">
                <li>Size: {product.size}</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsText;
