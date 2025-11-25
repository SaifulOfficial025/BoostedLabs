import React from "react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../../Shared/ProductCard";

function Products() {
  const navigate = useNavigate();
  const base =
    import.meta && import.meta.env && import.meta.env.BASE_URL
      ? import.meta.env.BASE_URL
      : "/";
  const dummy = `${base}dummyproduct.png`;

  const products = new Array(12).fill(0).map((_, i) => ({
    id: i + 1,
    image: dummy,
    title: "Retatrutide",
    description:
      "Next-generation weight loss support. Metabolic peptide for appetite regulation and fat loss.",
    price: 550,
    badge: {
      icon: null,
      text:
        i % 3 === 0 ? "WEIGHT LOSS" : i % 3 === 1 ? "COSMETIC" : "PERFORMANCE",
      color: "bg-blue-100",
      textColor: "text-blue-700",
    },
  }));

  return (
    <div className="max-w-7xl mx-auto py-12 mb-16">
      <h1 className="text-3xl font-bold font-sans mb-8">All Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((p) => (
          <ProductCard
            key={p.id}
            badge={p.badge}
            image={p.image}
            title={p.title}
            description={p.description}
            price={p.price}
            onViewDetails={() => navigate(`/shop/product-details/${p.id}`)}
            onAddToCart={() => console.log("add", p.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default Products;
