import React from "react";
import ProductCard from "../../Shared/ProductCard";

function ProductRecentView() {
  const base =
    import.meta && import.meta.env && import.meta.env.BASE_URL
      ? import.meta.env.BASE_URL
      : "/";
  const dummy = `${base}dummyproduct.png`;
  const recentProducts = [
    {
      id: 1,
      badge: {
        text: "WEIGHT LOSS",
        color: "bg-blue-100",
        textColor: "text-blue-700",
      },
      image: dummy,
      title: "Retatrutide",
      description:
        "Next-generation weight loss support. Metabolic reset • Fat loss • Appetite control • 99% Purity • For Research Use Only",
      price: 550,
    },
    {
      id: 2,
      badge: {
        text: "COSMETIC",
        color: "bg-blue-100",
        textColor: "text-blue-700",
      },
      image: dummy,
      title: "Retatrutide",
      description:
        "Next-generation weight loss support. Metabolic reset • Fat loss • Appetite control • 99% Purity • For Research Use Only",
      price: 550,
    },
    {
      id: 3,
      badge: {
        text: "PERFORMANCE",
        color: "bg-blue-100",
        textColor: "text-blue-700",
      },
      image: dummy,
      title: "Retatrutide",
      description:
        "Next-generation weight loss support. Metabolic reset • Fat loss • Appetite control • 99% Purity • For Research Use Only",
      price: 550,
    },
    {
      id: 4,
      badge: {
        text: "ENERGY",
        color: "bg-blue-100",
        textColor: "text-blue-700",
      },
      image: dummy,
      title: "Retatrutide",
      description:
        "Next-generation weight loss support. Metabolic reset • Fat loss • Appetite control • 99% Purity • For Research Use Only",
      price: 550,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto mt-10 mb-16 py-10">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent View</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
        {recentProducts.map((p) => (
          <ProductCard
            key={p.id}
            badge={p.badge}
            image={p.image}
            title={p.title}
            description={p.description}
            price={p.price}
            onViewDetails={() => {}}
            onAddToCart={() => {}}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductRecentView;
