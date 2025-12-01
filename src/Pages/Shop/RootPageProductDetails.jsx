import React from "react";
import ProductAddingToCart from "./ProductAddingToCart";
import ProductDetailsText from "./ProductDetailsText";
import ProductRatings from "./ProductRatings";
import ProductRecentView from "./ProductRecentView";
import Noticebar from "../../Shared/Noticebar";
import Header from "../../Shared/Header";
import Footer from "../../Shared/Footer";
import ProductCertification from "../../Shared/ProductCertification";
import Disclaimer from "../../Shared/Disclaimer";

function RootPageProductDetails() {
  return (
    <div className="font-sans">
      <Noticebar />
      <Header />
      <ProductAddingToCart />
      <ProductDetailsText />
      <ProductCertification />
      <Disclaimer />
      <ProductRatings />
      <ProductRecentView />
      <Footer />
    </div>
  );
}

export default RootPageProductDetails;
