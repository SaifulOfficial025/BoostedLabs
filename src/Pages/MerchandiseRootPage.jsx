import React from "react";
import Noticebar from "../Shared/Noticebar";
import Header from "../Shared/Header";
import Slider from "../Shared/Slider";
import Products from "../Pages/Shop/Products";
import Footer from "../Shared/Footer";

function MerchandiseRootPage() {
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

export default MerchandiseRootPage;
