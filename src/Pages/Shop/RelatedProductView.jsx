import React from "react";
import ProductCard from "../../Shared/ProductCard";

function RelatedProductView({ relatedProducts = [] }) {
  const base =
    import.meta && import.meta.env && import.meta.env.BASE_URL
      ? import.meta.env.BASE_URL
      : "/";
  const dummy = `${base}dummyproduct.png`;

  // If no related products, don't render the section
  if (!relatedProducts || relatedProducts.length === 0) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto mt-10 mb-16 py-10 px-4 sm:px-6">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
        Related Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
        {relatedProducts.map((p) => {
          const badge = {
            text: (p.type?.name || p.category || "").toUpperCase(),
            color: "bg-blue-100",
            textColor: "text-blue-700",
          };

          return (
            <ProductCard
              key={p.id}
              productId={p.id}
              badge={badge}
              image={p.logo || p.images?.[0] || dummy}
              title={p.name}
              description={p.description}
              price={parseFloat(p.discounted_price || p.initial_price || 0)}
              onViewDetails={() => {}}
              onAddToCart={() => {}}
            />
          );
        })}
      </div>
    </div>
  );
}

export default RelatedProductView;
