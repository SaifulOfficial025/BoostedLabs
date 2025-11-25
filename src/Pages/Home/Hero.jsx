import React from "react";

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
      <div className="flex flex-col justify-center max-w-xl z-10 ml-16">
        <h1 className="text-4xl font-bold text-black mb-4">
          Boost your body. Boost your life.
        </h1>
        <p className="text-base text-[#3a4a5c] mb-8">
          Science-backed peptides for healing, performance
          <br />& cosmetic wellness.
        </p>
        <button className="bg-black text-white px-6 py-2 rounded font-normal text-base w-fit">
          Shop Now
        </button>
      </div>
    </section>
  );
}

export default Hero;
