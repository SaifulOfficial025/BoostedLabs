import React from "react";
import Noticebar from "../Shared/Noticebar";
import Headers from "../Shared/Header";
import Footer from "../Shared/Footer";
import { FaShieldAlt, FaFlask, FaHeart, FaBolt } from "react-icons/fa";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from "react-router-dom";

function About() {
  return (
    <section className="font-sans">
      <Noticebar />
      <Headers />

      {/* Hero */}
      <div className="relative w-full h-[calc(100vh-7rem)] mt-32">
        <div
          className="absolute inset-0 bg-center bg-cover flex items-center justify-center"
          style={{
            backgroundImage: `url('/public/aboutherobg.png')`,
            minHeight: "90vh",
          }}
        >
          <div className="max-w-7xl mx-auto text-center  z-10 flex flex-col items-center justify-center w-full">
            <h1
              className="text-5xl md:text-6xl font-extrabold text-white mb-8 tracking-tight"
              style={{ lineHeight: 1.1 }}
            >
              Boost your body. Boost your life.
            </h1>
            <p className="text-lg md:text-md text-white max-w-7xl mx-auto mb-6 font-normal opacity-90 leading-relaxed">
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
            <div className="text-xl text-white font-semibold mb-2 mt-2">
              No hype. No shortcuts.
            </div>
            <div className="text-base text-white mb-8">
              Just clean, reliable science — delivered with purpose.
            </div>
            <Link to="/contact-us">
              <button className="bg-white text-black px-10 py-4 rounded-xl font-normal text-md w-fit flex items-center gap-2 transition-all duration-300 relative group shadow-none hover:shadow-[0_0_16px_2px_rgba(0,0,0,0.25)]">
                <span className="transition-all duration-500 group-hover:pr-6">
                  Contact Us
                </span>
                <span className="absolute right-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-2 transition-all duration-500 flex items-center">
                  <FaLongArrowAltRight className="text-black text-2xl" />
                </span>
              </button>
            </Link>
          </div>
          <div className="absolute inset-0 bg-black opacity-30 pointer-events-none z-0" />
        </div>
      </div>

      {/* Our Values */}
      <div className="max-w-6xl mx-auto px-6 py-12 mt-16">
        <h2 className="text-2xl font-bold text-center mb-8">OUR VALUES</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-[#f8fafc] border border-gray-200 rounded-xl p-6 text-center shadow-sm">
            <div className="flex items-center justify-center mb-3 text-blue-600">
              <FaShieldAlt size={28} />
            </div>
            <div className="font-semibold">Quality First</div>
            <div className="text-sm text-gray-500 mt-2">
              99% purity assurance. Third-party tested.
            </div>
          </div>

          <div className="bg-[#f8fafc]  border border-gray-200 rounded-xl p-6 text-center shadow-sm">
            <div className="flex items-center justify-center mb-3 text-indigo-600">
              <FaFlask size={28} />
            </div>
            <div className="font-semibold">Science-Backed</div>
            <div className="text-sm text-gray-500 mt-2">
              Clinical research meets real-world application.
            </div>
          </div>

          <div className="bg-[#f8fafc]  border border-gray-200 rounded-xl p-6 text-center shadow-sm">
            <div className="flex items-center justify-center mb-3 text-red-600">
              <FaHeart size={28} />
            </div>
            <div className="font-semibold">Built for You</div>
            <div className="text-sm text-gray-500 mt-2">
              For the athletes, the healers, the comeback stories.
            </div>
          </div>

          <div className="bg-[#f8fafc]  border border-gray-200 rounded-xl p-6 text-center shadow-sm">
            <div className="flex items-center justify-center mb-3 text-yellow-500">
              <FaBolt size={28} />
            </div>
            <div className="font-semibold">Fast & Reliable</div>
            <div className="text-sm text-gray-500 mt-2">
              Quick delivery. Consistent quality. Australian-based service.
            </div>
          </div>
        </div>
      </div>

      {/* Who we serve */}
      <div className="max-w-6xl mx-auto px-6 pb-16">
        <h3 className="text-xl font-bold text-center mb-6">WHO WE SERVE</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#f8fafc]  border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="font-semibold mb-2">The Athletes</div>
            <div className="text-sm text-gray-500">
              Performance-driven individuals seeking recovery, strength, and
              endurance support.
            </div>
          </div>
          <div className="bg-[#f8fafc]  border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="font-semibold mb-2">The Healers</div>
            <div className="text-sm text-gray-500">
              Those on a recovery journey, rebuilding their body after injury or
              setback.
            </div>
          </div>
          <div className="bg-[#f8fafc]  border border-gray-200 rounded-xl p-6 shadow-sm">
            <div className="font-semibold mb-2">The Transformers</div>
            <div className="text-sm text-gray-500">
              Anyone committed to change — weight loss, aesthetics, wellness, or
              vitality.
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </section>
  );
}

export default About;
