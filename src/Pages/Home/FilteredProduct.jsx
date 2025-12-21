import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../../Shared/ProductCard";
import Noticebar from "../../Shared/Noticebar";
import Header from "../../Shared/Header";
import Footer from "../../Shared/Footer";
import { fetchFilteredProducts } from "../../Redux/FilteredProduct";
import {
  getTypeIdFromCategory,
  getDisplayName,
} from "../../Redux/filterTypeMap";
import { BASE_URL } from "../../Redux/baseUrl";

function FilteredProduct() {
  const { category } = useParams();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(
    (state) => state.filteredProduct
  );

  // Get type ID from category slug
  const typeId = getTypeIdFromCategory(category);
  const displayName = getDisplayName(category);

  // Fetch products when component mounts or category changes
  useEffect(() => {
    if (typeId) {
      dispatch(fetchFilteredProducts({ typeId }));
    }
  }, [typeId, dispatch]);

  // Helper function to get average rating
  const getAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  // Helper function to get image URL
  const getImageUrl = (product) => {
    if (product.images && product.images.length > 0) {
      const imagePath = product.images[0];
      return imagePath.startsWith("http")
        ? imagePath
        : `${BASE_URL}${imagePath}`;
    }
    if (product.logo) {
      return product.logo.startsWith("http")
        ? product.logo
        : `${BASE_URL}${product.logo}`;
    }
    return "/public/dummyproduct.png";
  };

  // Transform API response to ProductCard format
  const transformedProducts = products.map((product) => ({
    id: product.id,
    badge: {
      text: displayName || "PRODUCT",
      color: "bg-blue-100",
      textColor: "text-blue-700",
    },
    image: getImageUrl(product),
    title: product.name,
    description: product.description,
    price: parseFloat(product.discounted_price || product.initial_price),
    rating: getAverageRating(product.reviews),
    reviewCount: product.reviews?.length || 0,
  }));

  if (loading) {
    return (
      <section className="font-sans">
        <Noticebar />
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-6 lg:px-12 py-8 sm:py-12 mt-12 sm:mt-24">
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-600">Loading products...</p>
          </div>
        </div>
        <Footer />
      </section>
    );
  }

  return (
    <section className="font-sans">
      <Noticebar />
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-6 lg:px-12 py-8 sm:py-12 mt-12 sm:mt-24">
        <h2 className="text-xl sm:text-2xl font-bold mb-8">
          {displayName} products
        </h2>

        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error.detail || "Failed to load products"}
          </div>
        )}

        {transformedProducts.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-600">
              No products found for this category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
            {transformedProducts.map((p) => (
              <ProductCard
                key={p.id}
                badge={p.badge}
                image={p.image}
                title={p.title}
                description={p.description}
                price={p.price}
                rating={p.rating}
                reviewCount={p.reviewCount}
                onViewDetails={() => {}}
                onAddToCart={() => {}}
              />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </section>
  );
}

export default FilteredProduct;
