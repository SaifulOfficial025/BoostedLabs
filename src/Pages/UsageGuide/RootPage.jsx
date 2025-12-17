import React from "react";
import Header from "../../Shared/Header";
import Footer from "../../Shared/Footer";
import Noticebar from "../../Shared/Noticebar";
import TabswithInfo from "./TabswithInfo";

function RootPage() {
  return (
    <div>
      <Noticebar />
      <Header />
      <TabswithInfo />
      <Footer />
    </div>
  );
}

export default RootPage;
