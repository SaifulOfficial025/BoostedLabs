import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import ProductAddingToCart from "./ProductAddingToCart";
import ProductDetailsText from "./ProductDetailsText";
import ProductRatings from "./ProductRatings";
import RelatedProductView from "./RelatedProductView";
import Noticebar from "../../Shared/Noticebar";
import Header from "../../Shared/Header";
import Footer from "../../Shared/Footer";
import ProductCertification from "../../Shared/ProductCertification";
import Disclaimer from "../../Shared/Disclaimer";
import { fetchProductDetails } from "../../Redux/ProductDetails";

function RootPageProductDetails() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { product, stats, loading, error } = useSelector(
    (state) => state.productDetails
  );

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductDetails(productId));
    }
  }, [productId, dispatch]);

  if (loading) {
    return (
      <div className="font-sans">
        <Header />
        <div className="max-w-7xl mx-auto py-12 text-center">
          <p className="text-lg text-gray-600">Loading product details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="font-sans">
        <Header />
        <div className="max-w-7xl mx-auto py-12 text-center">
          <p className="text-lg text-red-600">Error: {error}</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="font-sans">
      <Header />
      <ProductAddingToCart product={product} stats={stats} />
      <ProductDetailsText product={product} />
      <ProductCertification certificate={product?.certificate} />
      <Disclaimer />
      <ProductRatings product={product} stats={stats} />
      <RelatedProductView relatedProducts={product?.related_products || []} />
      <Footer />
    </div>
  );
}

export default RootPageProductDetails;
