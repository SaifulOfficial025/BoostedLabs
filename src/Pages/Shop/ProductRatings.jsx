import React from "react";
import { FaStar } from "react-icons/fa";

function ProductRatings({ product, stats }) {
  // Fallback to sample data if stats are not available
  const average = stats?.average_rating || 4.5;
  const total = stats?.total_reviews || 0;
  const recommendedPercent = stats?.recommended_percentage || 0;
  const starCounts = stats?.star_counts || {
    "5_star": 0,
    "4_star": 0,
    "3_star": 0,
    "2_star": 0,
    "1_star": 0,
  };

  // Build bar data from star counts
  const barData = [
    { stars: 5, count: starCounts["5_star"] || 0 },
    { stars: 4, count: starCounts["4_star"] || 0 },
    { stars: 3, count: starCounts["3_star"] || 0 },
    { stars: 2, count: starCounts["2_star"] || 0 },
    { stars: 1, count: starCounts["1_star"] || 0 },
  ];

  const reviews = product?.reviews || [];
  const max = Math.max(...barData.map((b) => b.count), 1);

  // Format date helper
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Get user name or default
  const getUserName = (userId, index) => {
    return `User ${userId || index + 1}`;
  };

  return (
    <div className="max-w-7xl mx-auto my-6 font-sans px-4 sm:px-6 mt-10">
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-3 ">
          {/* Left: bars and reviews */}
          <div className="lg:col-span-2">
            <div className="p-7 mx-auto">
              <h3 className="text-xl font-semibold text-gray-900">
                Rating & Review
              </h3>
              <div className="mt-6 grid grid-cols-1 gap-3">
                {barData.map((b) => {
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
          <div className="flex flex-col items-center justify-start text-justify">
            <div className="mt-0 w-full text-center flex flex-col items-center">
              <div className="mt-16 w-full text-center flex flex-col items-center">
                <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                  {average.toFixed(1)}
                </div>
                <div className="flex items-center justify-center mb-2 text-[#fbbc05]">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      size={20}
                      className={
                        i < Math.floor(average)
                          ? "text-[#fbbc05]"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>
                <div className="text-base text-gray-700 font-medium mb-2">
                  {total} Reviews
                </div>
                <div className="mt-4">
                  <div className="text-xl sm:text-2xl font-bold text-gray-900">
                    {recommendedPercent.toFixed(0)}%
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
          {reviews.length > 0 ? (
            <div className="space-y-4 ">
              {reviews.map((r, index) => (
                <div
                  key={r.id}
                  className=" border-2 border-gray-200 rounded-xl p-5 hover:transition hover:shadow-lg duration-200"
                >
                  <div className="flex items-start gap-4 ">
                    <div className="flex-shrink-0 w-11 h-11 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-lg">
                      {getUserName(r.user_name, index)[0]}
                    </div>
                    <div className="flex-1 ">
                      <div className="flex items-center justify-between ">
                        <div className="text-[15px] font-semibold text-gray-900">
                          {getUserName(r.user_name, index)}
                          <div className="mt-2 mb-2 flex items-center gap-1 text-[#fbbc05]">
                            {new Array(r.rating).fill(0).map((_, i) => (
                              <FaStar key={i} size={16} />
                            ))}
                          </div>
                        </div>
                        <div className="text-xs text-gray-400">
                          {formatDate(r.created_at)}
                        </div>
                      </div>
                      <div className="mt-1 text-[15px] text-gray-700">
                        {r.comment}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No reviews yet. Be the first to review this product!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductRatings;
