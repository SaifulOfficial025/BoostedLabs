import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../../Shared/ProductCard";
import { fetchShopHealthProducts } from "../../Redux/ShopProduct";
import { BASE_URL } from "../../Redux/baseUrl";

function Products() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(
    (state) => state.shopProduct
  );
  const base =
    import.meta && import.meta.env && import.meta.env.BASE_URL
      ? import.meta.env.BASE_URL
      : "/";
  const location = useLocation();
  const pathname = location?.pathname || "";
  const dummy = pathname.startsWith("/merchandise")
    ? `${base}dummyshirt.png`
    : `${base}dummyproduct.png`;

  useEffect(() => {
    dispatch(fetchShopHealthProducts());
  }, [dispatch]);

  // Map API data to ProductCard props
  const transformedProducts = products.map((product, index) => ({
    id: product.id,
    image: product.logo ? `${BASE_URL}${product.logo}` : dummy,
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

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-12 mb-16 px-4 sm:px-6">
        <h1 className="text-2xl sm:text-3xl font-bold font-sans mb-8">
          All Products
        </h1>
        <div className="flex justify-center items-center py-12">
          <p className="text-lg text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto py-12 mb-16 px-4 sm:px-6">
        <h1 className="text-2xl sm:text-3xl font-bold font-sans mb-8">
          All Products
        </h1>
        <div className="flex justify-center items-center py-12">
          <p className="text-lg text-red-600">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-12 mb-16 px-4 sm:px-6">
      <h1 className="text-2xl sm:text-3xl font-bold font-sans mb-8">
        Health Products
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {transformedProducts.map((p) => (
          <div key={p.id} className="w-full flex">
            <ProductCard
              productId={p.id}
              badge={p.badge}
              image={p.image}
              title={p.title}
              description={p.description}
              price={p.price}
              onViewDetails={() => {}}
              onAddToCart={() => {}}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
