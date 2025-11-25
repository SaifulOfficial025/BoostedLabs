import React, { useEffect, useState, useRef } from "react";

// Simple image slider/carousel. Pass an `images` prop (array of src strings).
// If no images provided, component will show placeholder slides and you can
// replace them later.
function Slider({ images = [] }) {
  const base =
    import.meta && import.meta.env && import.meta.env.BASE_URL
      ? import.meta.env.BASE_URL
      : "/";
  const defaultSlides = [
    `${base}sliderdummyimage.png`,
    `${base}sliderdummyimage.png`,
    `${base}sliderdummyimage.png`,
  ];

  const slides = images && images.length > 0 ? images : defaultSlides;
  const [index, setIndex] = useState(0);
  const timer = useRef(null);

  useEffect(() => {
    // autoplay every 4s
    timer.current = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer.current);
  }, [slides.length]);

  const goTo = (i) => {
    setIndex(i % slides.length);
    clearInterval(timer.current);
  };

  const prev = () => {
    setIndex((i) => (i - 1 + slides.length) % slides.length);
    clearInterval(timer.current);
  };
  const next = () => {
    setIndex((i) => (i + 1) % slides.length);
    clearInterval(timer.current);
  };

  return (
    <div className="max-w-7xl mx-auto mt-36 mb-10">
      <div className="relative overflow-hidden rounded-xl border border-gray-200 shadow-sm">
        {/* Slider track: slides laid out horizontally and translated based on index */}
        <div
          className="flex w-full transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((src, i) => (
            <div key={i} className="w-full flex-none">
              <img
                src={src}
                alt={`slide-${i + 1}`}
                className="w-full h-full object-cover block"
                style={{ minHeight: 200 }}
              />
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-3 flex items-center gap-3">
          {slides.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={`w-3 h-3 rounded-full transition-all ${
                i === index ? "bg-black" : "bg-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Prev/Next invisible clickable areas for desktop */}
        <button
          onClick={prev}
          aria-label="Previous"
          className="hidden md:flex items-center justify-center absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/60 hover:bg-white z-10"
        >
          ‹
        </button>
        <button
          onClick={next}
          aria-label="Next"
          className="hidden md:flex items-center justify-center absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/60 hover:bg-white z-10"
        >
          ›
        </button>
      </div>
    </div>
  );
}

export default Slider;
