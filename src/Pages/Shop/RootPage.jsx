import React from "react";
import Noticebar from "../../Shared/Noticebar";
import Header from "../../Shared/Header";
import Slider from "./Slider";
import Products from "./Products";
import Footer from "../../Shared/Footer";

function RootPage() {
  return (
    <div>
      <Noticebar />
      <Header />
      <Slider />
      <Products />
      <Footer />
    </div>
  );
}

export default RootPage;
