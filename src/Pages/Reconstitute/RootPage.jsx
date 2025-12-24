import React from "react";
import Header from "../../Shared/Header";
import Footer from "../../Shared/Footer";
import Noticebar from "../../Shared/Noticebar";
import Hero from "./Hero";
import Steps from "./Steps";
import ReconstitutionVolumes from "./ReconstitutionVolumes";
import HowtoKnow from "./HowtoKnow";
import CommonQuestions from "./CommonQuestions";
import SafetyNotes from "./SafetyNotes";
import ReadytoStart from "./ReadytoStart";

function RootPage() {
  return (
    <div>
      <Header />
      <Hero />
      <Steps />
      <ReconstitutionVolumes />
      <HowtoKnow />
      <CommonQuestions />
      <SafetyNotes />
      <ReadytoStart />
      <Footer />
    </div>
  );
}

export default RootPage;
