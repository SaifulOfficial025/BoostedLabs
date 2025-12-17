import React from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";

function Steps() {
  return (
    <div>
      <div className="text-center my-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">
          Step-by-Step Universal Reconstitution Guide
        </h1>
        <p className="text-lg md:text-xl text-gray-600">
          All Boosted pens follow this same process with different volumes.
        </p>
      </div>
      <Step1 />
      <Step2 />
      <Step3 />
      <Step4 />
      <Step5 />
    </div>
  );
}

export default Steps;
