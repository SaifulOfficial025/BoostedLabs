import Container from "../../Layout/Container/Container";
import Footer from "../../Shared/Footer";
import Header from "../../Shared/Header";
import Noticebar from "../../Shared/Noticebar";

import ChooseYourBoostedProduct from "./ChooseYourBoostedProduct";
import FAQ from "./FAQ";
import Hero from "./Hero";
import RealResult from "./RealResult";
import UsageGuide from "./UsageGuide";
import WhyBoostedLab from "./WhyBoostedLab";

const Home = () => {
  return (
    <div>
      <Header />
      <Hero />
      <ChooseYourBoostedProduct />
      <WhyBoostedLab />
      <RealResult />
      <FAQ />
      {/* <UsageGuide /> */}
      <Footer />
    </div>
  );
};

export default Home;
