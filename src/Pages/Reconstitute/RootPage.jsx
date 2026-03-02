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
import UpdatedReconstitute from "./UpdatedReconstitute";

function RootPage() {
  return (
    <div>
      <Header />
      <UpdatedReconstitute />
      {/* <Hero />
      <Steps />
      <ReconstitutionVolumes />
      <HowtoKnow />
      <CommonQuestions />
      <SafetyNotes /> */}
      <ReadytoStart />
      <Footer />
    </div>
  );
}

export default RootPage;
