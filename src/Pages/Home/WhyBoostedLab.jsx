import React from "react";
import {
  FaFlask,
  FaShieldAlt,
  FaHeartbeat,
  FaBolt,
  FaFire,
  FaChartLine,
} from "react-icons/fa";

function WhyBoostedLab() {
  const features = [
    {
      icon: (
        <img
          src="/pharmacy.png"
          alt="Pharmaceutical-grade peptides"
          className="w-7 h-7 object-contain"
        />
      ),
      title: "Pharmaceutical-grade peptides",
      desc: "Premium quality sourcing",
    },
    {
      icon: (
        <img
          src="/thirdparty.png"
          alt="Third-party tested"
          className="w-7 h-7 object-contain"
        />
      ),
      title: "Third-party tested",
      desc: "Independent verification",
    },
    {
      icon: (
        <img
          src="/purity.png"
          alt="99% purity assurance"
          className="w-7 h-7 object-contain"
        />
      ),
      title: "99% purity assurance",
      desc: "Guaranteed quality standards",
    },
    {
      icon: (
        <img
          src="/australianbased.png"
          alt="Australian-based"
          className="w-7 h-7 object-contain"
        />
      ),
      title: "Australian-based",
      desc: "Local & reliable",
    },
    {
      icon: (
        <img
          src="/fastdelivery.png"
          alt="Fast delivery"
          className="w-7 h-7 object-contain"
        />
      ),
      title: "Fast delivery",
      desc: "Quick & discreet shipping",
    },
    {
      icon: (
        <img
          src="/clinical.png"
          alt="Clinical meets street aesthetics"
          className="w-7 h-7 object-contain"
        />
      ),
      title: "Clinical meets street aesthetics",
      desc: "Science with style",
    },
  ];
  return (
    <section className="w-full px-4 sm:px-6 py-12 flex flex-col items-center font-sans mt-16">
      <h2 className="text-2xl md:text-3xl font-bold text-black mb-2 text-center">
        WHY BOOSTED LABS?
      </h2>
      <div className="w-28 sm:w-[400px] h-1.5 bg-black rounded-full mb-8"></div>
      <div className="bg-[#f6fafd] rounded-2xl border border-[#e5e7eb] p-4 sm:p-8 max-w-4xl w-full mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-y-8 gap-x-12 mb-8">
          <div className="flex flex-col gap-6">
            {features.slice(0, 3).map((f, i) => (
              <div key={i} className="flex items-start gap-4 mt-8">
                {f.icon}
                <div>
                  <div className="font-semibold text-lg text-[#222] -mt-2">
                    {f.title}
                  </div>
                  <div className="text-sm text-[#3a4a5c]">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-6">
            {features.slice(3).map((f, i) => (
              <div key={i} className="flex items-start gap-4 mt-8">
                {f.icon}
                <div>
                  <div className="font-semibold text-lg text-[#222] -mt-2">
                    {f.title}
                  </div>
                  <div className="text-sm text-[#3a4a5c]">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="text-center text-[#7b8ca3] text-base mt-2">
          Your body deserves quality. Your results deserve consistency.
        </div>
      </div>
    </section>
  );
}

export default WhyBoostedLab;
