import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";

function Hero() {
  return (
    <section
      className="w-full flex items-center justify-start px-16 py-20 relative font-sans"
      style={{
        backgroundImage: "url('/herobg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "80vh",
      }}
    >
      <div className="flex flex-col justify-center max-w-3xl z-10 ml-16">
        <h1 className="text-5xl font-bold text-black mb-4">
          Boost your body. Boost your life.
        </h1>
        <p className="mt-5 text-2xl text-[#3a4a5c] mb-8">
          Science-backed peptides for healing, performance
          <br />& cosmetic wellness.
        </p>
        <button className="mt-5 bg-black text-white px-10 py-4 rounded-xl font-normal text-md w-fit flex items-center gap-2 transition-all duration-300 relative group shadow-none hover:shadow-[0_0_16px_2px_rgba(0,0,0,0.25)]">
          <span className="transition-all duration-500 group-hover:pr-6">
            Shop Now
          </span>
          <span className="absolute right-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-2 transition-all duration-500 flex items-center">
            <FaLongArrowAltRight className="text-white text-2xl" />
          </span>
        </button>
      </div>
    </section>
  );
}

export default Hero;
