import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Noticebar from "../Shared/Noticebar";
import Header from "../Shared/Header";
import Slider from "../Shared/Slider";
import ProductCard from "../Shared/ProductCard";
import Footer from "../Shared/Footer";
import { fetchMerchandiseProducts } from "../Redux/MerchandiseProducts";

function MerchandiseRootPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, loading, error } = useSelector(
    (state) => state.merchandiseProducts
  );
  const base =
    import.meta && import.meta.env && import.meta.env.BASE_URL
      ? import.meta.env.BASE_URL
      : "/";
  const dummy = `${base}dummyshirt.png`;

  useEffect(() => {
    dispatch(fetchMerchandiseProducts());
  }, [dispatch]);

  // Map API data to ProductCard props
  const transformedProducts = products.map((product) => ({
    id: product.id,
    image:
      product.images && product.images.length > 0
        ? product.images[0]
        : product.logo || dummy,
    title: product.name,
    description: product.description || "No description available",
    price: product.discounted_price || product.initial_price || 0,
    badge: {
      icon: null,
      text:
        product.type?.name?.toUpperCase() ||
        product.category?.toUpperCase() ||
        "PRODUCT",
      color: "bg-blue-100",
      textColor: "text-blue-700",
    },
  }));

  const renderProducts = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center py-12">
          <p className="text-lg text-gray-600">Loading products...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex justify-center items-center py-12">
          <p className="text-lg text-red-600">Error: {error}</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {transformedProducts.map((p) => (
          <ProductCard
            key={p.id}
            productId={p.id}
            badge={p.badge}
            image={p.image}
            title={p.title}
            description={p.description}
            price={p.price}
            onViewDetails={() => navigate(`/product-details/${p.id}`)}
            onAddToCart={() => console.log("add", p.id)}
          />
        ))}
      </div>
    );
  };

  return (
    <div>
      <Noticebar />
      <Header />
      <Slider />
      <div className="max-w-7xl mx-auto py-12 mb-16 px-4 sm:px-6">
        <h1 className="text-2xl sm:text-3xl font-bold font-sans mb-8">
          Merchandise
        </h1>
        {renderProducts()}
      </div>
      <Footer />
    </div>
  );
}

export default MerchandiseRootPage;
