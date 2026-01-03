import React from "react";
import Noticebar from "../Shared/Noticebar";
import Headers from "../Shared/Header";
import Footer from "../Shared/Footer";
import { FaShieldAlt, FaFlask, FaHeart, FaBolt } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCallback } from "react";
import herobg from "../../public/aboutherobg.png";
import Disclaimer from "../Shared/Disclaimer";
import ContactUs from "./ContactUs";
import FAQ from "./FAQ";

function About() {
  return (
    <section className="font-sans">
      <Headers />

      {/* Hero */}
      <div className="relative w-full h-[100vh] sm:h-[calc(100vh-7rem)] -mt-6 sm:-mt-16">
        <div
          className="absolute inset-0 bg-top sm:bg-center bg-cover flex items-center justify-center"
          style={{
            backgroundImage: `url(${herobg})`,
          }}
        >
          <div className="max-w-7xl mx-auto text-center mt-6 sm:mt-8 z-10 flex flex-col items-center justify-center w-full px-6 sm:px-8 md:px-4 py-8 sm:py-0">
            <h1
              className="text-2xl sm:text-5xl md:text-6xl font-extrabold text-white mb-4 sm:mb-8 tracking-tight leading-tight"
              style={{ lineHeight: 1.15 }}
            >
              Boost your body. Boost your life.
            </h1>
            <p className="text-xs sm:text-base md:text-lg text-white max-w-3xl sm:max-w-7xl mx-auto mb-3 sm:mb-6 font-normal opacity-95 leading-relaxed">
              At Boosted Labs, we believe in science-backed solutions that help
              you heal, build, and perform at your absolute best. Our mission is
              simple: provide premium-grade peptides that support real people
              with real goals — from recovery and weight loss to energy,
              aesthetics, and performance. We combine clinical precision with a
              modern, street-forward edge, creating a brand that feels both
              trustworthy and empowering. Every product is sourced from
              reputable manufacturers, third-party tested, and verified for 99%
              purity, because your body deserves nothing less.
              <br />
              <br />
              Based in Australia, Boosted Labs was built for the grinders, the
              comeback stories, the ones rebuilding their body and mind day by
              day. We're here for the athletes, the everyday people, the ones
              chasing results, and the ones committed to change.
            </p>
            <div className="text-base sm:text-xl text-white font-semibold mb-1 sm:mb-2 mt-1 sm:mt-2">
              No hype. No shortcuts.
            </div>
            <div className="text-xs sm:text-base text-white mb-4 sm:mb-8">
              Just clean, reliable science — delivered with purpose.
            </div>
            <button
              type="button"
              onClick={useCallback(() => {
                const el = document.getElementById("contact-section");
                if (el) {
                  el.scrollIntoView({ behavior: "smooth", block: "start" });
                } else {
                  // fallback to route if the section isn't present
                  window.location.pathname = "/contact-us";
                }
              }, [])}
              className="bg-white text-black px-5 sm:px-10 py-2.5 sm:py-4 rounded-xl font-normal text-sm sm:text-md w-fit mx-auto flex items-center gap-2 transition-all duration-300 relative group shadow-none hover:shadow-[0_0_16px_2px_rgba(0,0,0,0.25)]"
            >
              <span className="transition-all duration-500 group-hover:pr-6">
                Contact Us
              </span>
              <span className="absolute right-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-2 transition-all duration-500 flex items-center">
                <FaLongArrowAltRight className="text-black text-xl sm:text-2xl" />
              </span>
            </button>
          </div>
          <div className="absolute inset-0 bg-black opacity-30 pointer-events-none z-0" />
        </div>
      </div>

      {/* Our Values */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 mt-8 sm:mt-16">
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8">
          OUR VALUES
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-[#f8fafc] border border-gray-200 rounded-xl p-5 sm:p-6 text-center shadow-sm">
            <div className="flex items-center justify-center mb-3 text-blue-600">
              <FaShieldAlt size={24} className="sm:w-7 sm:h-7" />
            </div>
            <div className="font-semibold text-sm sm:text-base">
              Quality First
            </div>
            <div className="text-xs sm:text-sm text-gray-500 mt-2">
              99% purity assurance. Third-party tested.
            </div>
          </div>

          <div className="bg-[#f8fafc]  border border-gray-200 rounded-xl p-5 sm:p-6 text-center shadow-sm">
            <div className="flex items-center justify-center mb-3 text-indigo-600">
              <FaFlask size={24} className="sm:w-7 sm:h-7" />
            </div>
            <div className="font-semibold text-sm sm:text-base">
              Science-Backed
            </div>
            <div className="text-xs sm:text-sm text-gray-500 mt-2">
              Clinical research meets real-world application.
            </div>
          </div>

          <div className="bg-[#f8fafc]  border border-gray-200 rounded-xl p-5 sm:p-6 text-center shadow-sm">
            <div className="flex items-center justify-center mb-3 text-red-600">
              <FaHeart size={24} className="sm:w-7 sm:h-7" />
            </div>
            <div className="font-semibold text-sm sm:text-base">
              Built for You
            </div>
            <div className="text-xs sm:text-sm text-gray-500 mt-2">
              For the athletes, the healers, the comeback stories.
            </div>
          </div>

          <div className="bg-[#f8fafc]  border border-gray-200 rounded-xl p-5 sm:p-6 text-center shadow-sm">
            <div className="flex items-center justify-center mb-3 text-yellow-500">
              <FaBolt size={24} className="sm:w-7 sm:h-7" />
            </div>
            <div className="font-semibold text-sm sm:text-base">
              Fast & Reliable
            </div>
            <div className="text-xs sm:text-sm text-gray-500 mt-2">
              Quick delivery. Consistent quality. Australian-based service.
            </div>
          </div>
        </div>
      </div>

      {/* Who we serve */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-12 sm:pb-16 mt-10">
        <h3 className="text-lg sm:text-xl font-bold text-center mb-5 sm:mb-6">
          WHO WE SERVE
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-[#f8fafc]  border border-gray-200 rounded-xl p-5 sm:p-6 shadow-sm">
            <div className="font-semibold mb-2 text-sm sm:text-base">
              The Athletes
            </div>
            <div className="text-xs sm:text-sm text-gray-500">
              Performance-driven individuals seeking recovery, strength, and
              endurance support.
            </div>
          </div>
          <div className="bg-[#f8fafc]  border border-gray-200 rounded-xl p-5 sm:p-6 shadow-sm">
            <div className="font-semibold mb-2 text-sm sm:text-base">
              The Healers
            </div>
            <div className="text-xs sm:text-sm text-gray-500">
              Those on a recovery journey, rebuilding their body after injury or
              setback.
            </div>
          </div>
          <div className="bg-[#f8fafc]  border border-gray-200 rounded-xl p-5 sm:p-6 shadow-sm">
            <div className="font-semibold mb-2 text-sm sm:text-base">
              The Transformers
            </div>
            <div className="text-xs sm:text-sm text-gray-500">
              Anyone committed to change — weight loss, aesthetics, wellness, or
              vitality.
            </div>
          </div>
        </div>
      </div>

      <Disclaimer />

      
      <ContactUs />


      {/* <Footer /> */}
    </section>
  );
}

export default About;
