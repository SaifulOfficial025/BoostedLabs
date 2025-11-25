import React from "react";
import ProductAddingToCart from "./ProductAddingToCart";
import ProductDetailsText from "./ProductDetailsText";
import ProductRatings from "./ProductRatings";
import ProductRecentView from "./ProductRecentView";
import Noticebar from "../../Shared/Noticebar";
import Header from "../../Shared/Header";
import Footer from "../../Shared/Footer";

function RootPageProductDetails() {
  return (
    <div className="font-sans">
      <Noticebar />
      <Header />
      <ProductAddingToCart />
      <ProductDetailsText />
      <ProductRatings />
      <ProductRecentView />
      <Footer />
    </div>
  );
}

export default RootPageProductDetails;
