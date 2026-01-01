import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import Header from "../Shared/Header";
import Footer from "../Shared/Footer";
import ProductCard from "../Shared/ProductCard";
import { searchProducts, setQuery } from "../Redux/Search";
import { BASE_URL } from "../Redux/baseUrl";
import { FaLongArrowAltLeft } from "react-icons/fa";

function SearchResult() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const queryParam = searchParams.get("q") || "";

  const { results, loading, error, query } = useSelector(
    (state) => state.search
  );

  useEffect(() => {
    if (queryParam) {
      dispatch(setQuery(queryParam));
      dispatch(searchProducts(queryParam));
    }
  }, [queryParam, dispatch]);

  // Helper to get badge based on category/type
  const getBadge = (product) => {
    const category = product.category || "";
    const typeName = product.type?.name || "";

    if (
      category.toLowerCase().includes("weight") ||
      typeName.toLowerCase().includes("weight")
    ) {
      return {
        icon: null,
        text: "WEIGHT LOSS",
        color: "bg-orange-100",
        textColor: "text-orange-700",
      };
    }
    if (
      category.toLowerCase().includes("cosmetic") ||
      typeName.toLowerCase().includes("cosmetic")
    ) {
      return {
        icon: null,
        text: "COSMETIC",
        color: "bg-pink-100",
        textColor: "text-pink-700",
      };
    }
    if (
      category.toLowerCase().includes("health") ||
      typeName.toLowerCase().includes("health")
    ) {
      return {
        icon: null,
        text: "HEALTH",
        color: "bg-green-100",
        textColor: "text-green-700",
      };
    }
    if (
      category.toLowerCase().includes("merchandise") ||
      typeName.toLowerCase().includes("merchandise")
    ) {
      return {
        icon: null,
        text: "MERCHANDISE",
        color: "bg-purple-100",
        textColor: "text-purple-700",
      };
    }
    return {
      icon: null,
      text: typeName || category || "PRODUCT",
      color: "bg-blue-100",
      textColor: "text-blue-700",
    };
  };

  // Helper to get product image
  const getProductImage = (product) => {
    if (product.logo) {
      return product.logo.startsWith("http")
        ? product.logo
        : `${BASE_URL}${product.logo}`;
    }
    if (product.images && product.images.length > 0) {
      const img = product.images[0];
      return img.startsWith("http") ? img : `${BASE_URL}${img}`;
    }
    return null;
  };

  return (
    <div>
      <Header />
      <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 py-8 mt-20 font-sans mb-16">
        {/* Back button and title */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
          <Link
            to="/"
            className="text-md bg-black text-white px-3 py-1 rounded inline-flex items-center gap-2 w-fit"
          >
            <FaLongArrowAltLeft /> Back
          </Link>
          <h1 className="text-xl sm:text-2xl font-bold">
            Search Results{" "}
            {queryParam && (
              <span className="text-gray-500">for "{queryParam}"</span>
            )}
          </h1>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-black mb-4"></div>
              <p className="text-lg text-gray-600">Searching products...</p>
            </div>
          </div>
        )}

        {/* Error state */}
        {!loading && error && (
          <div className="text-center py-20">
            <p className="text-lg text-red-600">Error: {error}</p>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && results.length === 0 && queryParam && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-xl text-gray-600 mb-2">No products found</p>
            <p className="text-gray-500">
              We couldn't find any products matching "{queryParam}". Try a
              different search term.
            </p>
          </div>
        )}

        {/* No search query */}
        {!loading && !error && !queryParam && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-xl text-gray-600 mb-2">Enter a search term</p>
            <p className="text-gray-500">
              Use the search bar in the header to find products.
            </p>
          </div>
        )}

        {/* Results grid */}
        {!loading && !error && results.length > 0 && (
          <>
            <p className="text-gray-600 mb-6">
              Found {results.length} product{results.length !== 1 ? "s" : ""}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {results.map((product) => (
                <ProductCard
                  key={product.id}
                  productId={product.id}
                  badge={getBadge(product)}
                  image={getProductImage(product)}
                  title={product.name}
                  description={
                    product.description || "No description available"
                  }
                  price={parseFloat(
                    product.discounted_price || product.initial_price
                  )}
                  onViewDetails={() =>
                    navigate(`/product-details/${product.id}`)
                  }
                />
              ))}
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default SearchResult;
