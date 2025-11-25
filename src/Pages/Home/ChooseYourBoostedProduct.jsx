import React from "react";
import ProductCard from "../../Shared/ProductCard";

function ChooseYourBoostedProduct() {
  const products = [
    {
      badge: {
        icon: "",
        text: "WEIGHT LOSS",
        color: "bg-[#bee3f8]",
        textColor: "text-[#549ad8]",
      },
      image: "/public/dummyproduct.png",
      title: "Retatrutide",
      description:
        "Next-generation weight loss support. Metabolic reset • Fat loss • Appetite control • 99% Purity • For Research Use Only",
      price: 550,
    },
    {
      badge: {
        icon: "",
        text: "COSMETIC",
        color: "bg-[#bee3f8]",
        textColor: "text-[#549ad8]",
      },
      image: "/public/dummyproduct.png",
      title: "Retatrutide",
      description:
        "Next-generation weight loss support. Metabolic reset • Fat loss • Appetite control • 99% Purity • For Research Use Only",
      price: 550,
    },
    {
      badge: {
        icon: "",
        text: "PERFORMANCE",
        color: "bg-[#bee3f8]",
        textColor: "text-[#549ad8]",
      },
      image: "/public/dummyproduct.png",
      title: "Retatrutide",
      description:
        "Next-generation weight loss support. Metabolic reset • Fat loss • Appetite control • 99% Purity • For Research Use Only",
      price: 550,
    },
    {
      badge: {
        icon: "",
        text: "ENERGY",
        color: "bg-[#bee3f8]",
        textColor: "text-[#549ad8]",
      },
      image: "/public/dummyproduct.png",
      title: "Retatrutide",
      description:
        "Next-generation weight loss support. Metabolic reset • Fat loss • Appetite control • 99% Purity • For Research Use Only",
      price: 550,
    },
  ];
  return (
    <section className="w-full px-40 py-10 font-sans mt-16">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-black mb-2">
          CHOOSE YOUR BOOSTED PRODUCTS
        </h2>
        <p className="text-base text-[#222]">
          Recovery. Glow. Performance. Our boosted stacks help you reach your
          best.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 justify-center">
        {products.map((product, idx) => (
          <ProductCard
            key={idx}
            badge={product.badge}
            image={product.image}
            title={product.title}
            description={product.description}
            price={product.price}
            onViewDetails={() => {}}
            onAddToCart={() => {}}
          />
        ))}
      </div>
    </section>
  );
}

export default ChooseYourBoostedProduct;
