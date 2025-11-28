import React, { useState, useEffect } from "react";
import { FaLongArrowAltRight } from "react-icons/fa";

function Hero() {
  const [isMobileBg, setIsMobileBg] = useState(false);

  useEffect(() => {
    // match Tailwind 'sm' breakpoint (640px). Use 639 to include <=639 as mobile
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setIsMobileBg(mq.matches);
    update();
    if (mq.addEventListener) mq.addEventListener("change", update);
    else mq.addListener(update);
    return () => {
      if (mq.removeEventListener) mq.removeEventListener("change", update);
      else mq.removeListener(update);
    };
  }, []);

  return (
    <section
      className="w-full flex items-center justify-center sm:justify-start px-4 sm:px-8 md:px-16 py-12 sm:py-20 relative font-sans min-h-screen sm:min-h-[80vh] md:-mt-16 sm:-mt-16"
      style={{
        backgroundImage: `url('${
          isMobileBg ? "/herobgmobilescreen.png" : "/herobg.png"
        }')`,
        backgroundSize: "cover",
        backgroundPosition: isMobileBg ? "center top" : "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex flex-col justify-center max-w-3xl z-10 mx-auto sm:ml-8 md:ml-16 px-4 sm:px-0 text-center sm:text-left -mt-20 sm:-mt-10">
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
          Boost your body. Boost your life.
        </h1>
        <p className="mt-4 text-base sm:text-xl md:text-2xl text-white mb-6">
          Science-backed peptides for healing, performance
          <br className="hidden sm:inline" />
          &amp; cosmetic wellness.
        </p>
        <button className="mt-44 sm:mt-5 bg-black text-white  border-2  border-white px-4 sm:px-10 py-2 sm:py-4 rounded-xl font-normal text-sm sm:text-md w-fit mx-auto sm:mx-0 flex items-center gap-2 transition-all duration-300 relative group  hover:shadow-[0_0_16px_2px_rgba(0,0,0,0.25)]  hover:shadow-white ">
          <span className="transition-all duration-500 group-hover:pr-6">
            Shop Now
          </span>
          <span className="absolute right-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-2 transition-all duration-500 flex items-center">
            <FaLongArrowAltRight className="text-white text-xl sm:text-2xl" />
          </span>
        </button>
      </div>
    </section>
  );
}

export default Hero;
