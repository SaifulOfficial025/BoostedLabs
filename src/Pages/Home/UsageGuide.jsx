import React from "react";

function UsageGuide() {
  const guides = [
    {
      title: "What Are Peptides?",
      desc: "Understand how they work and why they're changing wellness. Find the right option for your goals. Transparency you.",
      link: "#",
    },
    {
      title: "What Are Peptides?",
      desc: "Understand how they work and why they're changing wellness. Find the right option for your goals. Transparency you.",
      link: "#",
    },
    {
      title: "What Are Peptides?",
      desc: "Understand how they work and why they're changing wellness. Find the right option for your goals. Transparency you.",
      link: "#",
    },
    {
      title: "What Are Peptides?",
      desc: "Understand how they work and why they're changing wellness. Find the right option for your goals. Transparency you.",
      link: "#",
    },
  ];
  return (
    <section className="w-full px-4 py-12 flex flex-col items-center font-sans mt-16 px-44 mb-16">
      <h2 className="text-2xl md:text-3xl font-bold text-black mb-2 text-center">
        USAGE GUIDES
      </h2>
      <div className="w-[220px] h-1.5 bg-black rounded-full mb-8"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 w-full justify-center ">
        {guides.map((guide, idx) => (
          <div
            key={idx}
            className="bg-[#f6fafd] rounded-xl border border-[#e5e7eb] p-5 max-w-xs w-full"
          >
            <div className="font-bold text-lg text-[#222] mb-2">
              {guide.title}
            </div>
            <div className="text-sm text-[#3a4a5c] mb-4">{guide.desc}</div>
            <a
              href={guide.link}
              className="font-bold text-sm text-[#222] underline hover:text-black"
            >
              Read More
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}

export default UsageGuide;
