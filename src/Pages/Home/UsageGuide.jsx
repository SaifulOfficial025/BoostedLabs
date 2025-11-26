import React from "react";
import { Link } from "react-router-dom";

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
    <section className="w-full px-4 sm:px-6 md:px-44 py-12 flex flex-col items-center font-sans mt-16 mb-16">
      <h2 className="text-2xl md:text-3xl font-bold text-black mb-2 text-center">
        USAGE GUIDES
      </h2>
      <div className="w-[220px] h-1.5 bg-black rounded-full mb-8"></div>
      <Link to="/what-are-peptides">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 w-full justify-center ">
          {guides.map((guide, idx) => (
            <div
              key={idx}
              className="bg-[#f6fafd] rounded-xl border border-[#e5e7eb] p-5 max-w-xs w-full transition-all duration-300 hover:bg-black hover:border-black group"
            >
              <div className="font-bold text-lg text-[#222] mb-2 group-hover:text-white transition-all duration-300">
                {guide.title}
              </div>
              <div className="text-sm text-[#3a4a5c] mb-4 group-hover:text-[#cbd5e1] transition-all duration-300">
                {guide.desc}
              </div>
              <a
                href={guide.link}
                className="font-bold text-sm text-[#222] underline group-hover:text-white transition-all duration-300"
              >
                Read More
              </a>
            </div>
          ))}
        </div>
      </Link>
    </section>
  );
}

export default UsageGuide;
