import React from "react";
import { FaStar } from "react-icons/fa";

const sampleBars = [
  { stars: 5, count: 10 },
  { stars: 4, count: 4 },
  { stars: 3, count: 3 },
  { stars: 2, count: 0 },
  { stars: 1, count: 0 },
];

const sampleReviews = new Array(8).fill(0).map((_, i) => ({
  id: i + 1,
  author: "Alex K.",
  text: "Working at SampleA has been an incredible journey so far. The technology we’re building is truly cutting-edge, and being a part of a team that’s revolutionizing how people achieve their goals is immensely fulfilling.",
  date: "Nov 20, 2025",
  rating: 5,
}));

function ProductRatings({
  average = 4.5,
  total = 17,
  recommendedPercent = 88,
}) {
  const max = sampleBars.reduce((s, b) => s + b.count, 0) || 1;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 border border-gray-200 rounded-2xl bg-[#f9fafb]">
      <div className="grid grid-cols-1 lg:grid-cols-3 ">
        {/* Left: bars and reviews */}
        <div className="lg:col-span-2">
          <div className="p-7">
            <h3 className="text-xl font-semibold text-gray-900">
              Rating & Review
            </h3>
            <div className="mt-6 grid grid-cols-1 gap-3">
              {sampleBars.map((b) => {
                const pct = Math.round((b.count / max) * 100);
                return (
                  <div key={b.stars} className="flex items-center gap-4">
                    <div className="w-16 text-[15px] text-gray-700 font-medium">
                      {b.stars} stars
                    </div>
                    <div className="flex-1 bg-gray-200 h-4 rounded-full overflow-hidden">
                      <div
                        className="h-4 rounded-full bg-[#fbbc05]"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <div className="w-10 text-[15px] text-gray-700 text-right font-medium">
                      {b.count}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        {/* Right: summary */}
        <div className="flex flex-col items-center justify-start">
          <div className="mt-0 w-full text-center flex flex-col items-center">
            <div className="mt-16 w-full text-center flex flex-col items-center">
              <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                {average}
              </div>
              <div className="flex items-center justify-center mb-2 text-[#fbbc05]">
                <FaStar size={20} />
                <FaStar size={20} />
                <FaStar size={20} />
                <FaStar size={20} />
                <FaStar size={20} />
              </div>
              <div className="text-base text-gray-700 font-medium mb-2">
                {total} Reviews
              </div>
              <div className="mt-4">
                <div className="text-xl sm:text-2xl font-bold text-gray-900">
                  {recommendedPercent}%
                </div>
                <div className="text-xs text-gray-500 font-medium">
                  Recommended
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h4 className="text-lg font-semibold text-gray-900 mb-6">
          Reviews this product
        </h4>
        <div className="space-y-4">
          {sampleReviews.map((r) => (
            <div
              key={r.id}
              className=" border-2 border-gray-200 rounded-xl p-5 "
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-11 h-11 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-lg">
                  {r.author.split(" ")[0][0]}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div className="text-[15px] font-semibold text-gray-900">
                      {r.author}
                      <div className="mt-2 mb-2 flex items-center gap-1 text-[#fbbc05]">
                        {new Array(r.rating).fill(0).map((_, i) => (
                          <FaStar key={i} size={16} />
                        ))}
                      </div>
                    </div>
                    <div className="text-xs text-gray-400">{r.date}</div>
                  </div>
                  <div className="mt-1 text-[15px] text-gray-700">{r.text}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductRatings;
