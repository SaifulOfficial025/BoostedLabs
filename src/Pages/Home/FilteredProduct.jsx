import React from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../Shared/ProductCard";
import Noticebar from "../../Shared/Noticebar";
import Header from "../../Shared/Header";
import Footer from "../../Shared/Footer";

const products = [
  {
    id: 1,
    badge: {
      text: "WEIGHT LOSS",
      color: "bg-blue-100",
      textColor: "text-blue-700",
    },
    image: "/public/dummyproduct.png",
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
    image: "/public/dummyproduct.png",
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
    image: "/public/dummyproduct.png",
    title: "Retatrutide",
    description:
      "Next-generation weight loss support. Metabolic reset • Fat loss • Appetite control • 99% Purity • For Research Use Only",
    price: 550,
  },
  {
    id: 4,
    badge: { text: "ENERGY", color: "bg-blue-100", textColor: "text-blue-700" },
    image: "/public/dummyproduct.png",
    title: "Retatrutide",
    description:
      "Next-generation weight loss support. Metabolic reset • Fat loss • Appetite control • 99% Purity • For Research Use Only",
    price: 550,
  },
  {
    id: 5,
    badge: {
      text: "METABOLIC",
      color: "bg-blue-100",
      textColor: "text-blue-700",
    },
    image: "/public/dummyproduct.png",
    title: "Retatrutide",
    description:
      "Next-generation weight loss support. Metabolic reset • Fat loss • Appetite control • 99% Purity • For Research Use Only",
    price: 550,
  },
  {
    id: 6,
    badge: {
      text: "HEALING",
      color: "bg-blue-100",
      textColor: "text-blue-700",
    },
    image: "/public/dummyproduct.png",
    title: "BPC-157 + TB-500",
    description:
      "Next-generation weight loss support. Metabolic reset • Fat loss • Appetite control • 99% Purity • For Research Use Only",
    price: 550,
  },
  {
    id: 7,
    badge: {
      text: "COSMETIC",
      color: "bg-blue-100",
      textColor: "text-blue-700",
    },
    image: "/public/dummyproduct.png",
    title: "Retatrutide",
    description:
      "Next-generation weight loss support. Metabolic reset • Fat loss • Appetite control • 99% Purity • For Research Use Only",
    price: 550,
  },
  {
    id: 8,
    badge: {
      text: "COSMETIC",
      color: "bg-blue-100",
      textColor: "text-blue-700",
    },
    image: "/public/dummyproduct.png",
    title: "Retatrutide",
    description:
      "Next-generation weight loss support. Metabolic reset • Fat loss • Appetite control • 99% Purity • For Research Use Only",
    price: 550,
  },
];

function FilteredProduct() {
  const { category } = useParams();
  // Format category for display
  const displayCategory = category
    ? category.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
    : "Products";
  return (
    <section className="font-sans">
      <Noticebar />
      <Header />
      <div className="max-w-7xl mx-auto px-6 py-12 mt-24">
        <h2 className="text-2xl font-bold mb-8">{displayCategory} products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
          {products.map((p) => (
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
      <Footer />
    </section>
  );
}

export default FilteredProduct;
