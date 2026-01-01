import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../../Shared/ProductCard";
import { fetchHomeProducts } from "../../Redux/ChooseYourBoostedProduct";
import { BASE_URL } from "../../Redux/baseUrl";

function ChooseYourBoostedProduct() {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(
    (state) => state.chooseYourBoostedProduct
  );

  useEffect(() => {
    dispatch(fetchHomeProducts());
  }, [dispatch]);

  // Map API data to ProductCard props
  const transformedProducts = products.map((product) => {
    let imageUrl = "https://via.placeholder.com/300x300?text=No+Image";

    if (product.images && product.images.length > 0) {
      imageUrl = product.images[0].startsWith("http")
        ? product.images[0]
        : `${BASE_URL}${product.images[0]}`;
    } else if (product.logo) {
      imageUrl = product.logo.startsWith("http")
        ? product.logo
        : `${BASE_URL}${product.logo}`;
    }

    return {
      id: product.id,
      badge: {
        icon: "",
        text:
          product.type?.name?.toUpperCase() ||
          product.category?.toUpperCase() ||
          "PRODUCT",
        color: "bg-[#bee3f8]",
        textColor: "text-[#549ad8]",
      },
      image: imageUrl,
      title: product.name,
      description: product.description || "No description available",
      price: product.discounted_price || product.initial_price || 0,
    };
  });

  if (loading) {
    return (
      <section className="max-w-[1536px] mx-auto py-10 font-sans mt-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-black mb-2">
            CHOOSE YOUR BOOSTED PRODUCTS
          </h2>
          <p className="text-base text-[#222]">
            Recovery. Glow. Performance. Our boosted stacks help you reach your
            best.
          </p>
        </div>
        <div className="flex justify-center items-center py-12">
          <p className="text-lg text-gray-600">Loading products...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="max-w-[1536px] mx-auto py-10 font-sans mt-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-black mb-2">
            CHOOSE YOUR BOOSTED PRODUCTS
          </h2>
          <p className="text-base text-[#222]">
            Recovery. Glow. Performance. Our boosted stacks help you reach your
            best.
          </p>
        </div>
        <div className="flex justify-center items-center py-12">
          <p className="text-lg text-red-600">Error: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-[1536px] mx-auto py-10 font-sans mt-16">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-black mb-2">
          CHOOSE YOUR BOOSTED PRODUCTS
        </h2>
        <p className="text-base text-[#222]">
          Recovery. Glow. Performance. Our boosted stacks help you reach your
          best.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 items-stretch">
        {transformedProducts.map((product) => (
          <div key={product.id} className="w-full flex">
            <ProductCard
              productId={product.id}
              badge={product.badge}
              image={product.image}
              title={product.title}
              description={product.description}
              price={product.price}
              onViewDetails={() => {}}
              onAddToCart={() => {}}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default ChooseYourBoostedProduct;
