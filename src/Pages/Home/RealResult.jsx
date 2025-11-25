import React from "react";
import ReviewCard from "../../Shared/ReviewCard";

function RealResult() {
  return (
    <section className="w-full px-4 py-12 flex flex-col items-center font-sans mt-16">
      <h2 className="text-2xl md:text-3xl font-bold text-black mb-2 text-center">
        REAL RESULTS
      </h2>
      <div className="w-[280px] h-1.5 bg-black rounded-full mb-8"></div>

      <div className="flex flex-col md:flex-row gap-6 w-full justify-center items-stretch">
        <ReviewCard
          name="Emma Robinson"
          date="Nov 18, 2025"
          rating={5}
          avatar=""
          review="This is hands down the best thing I’ve bought this year. It’s exactly what I needed, and it looks amazing! Highly recommend!"
        />
        <ReviewCard
          name="Ethan James"
          date="Nov 18, 2025"
          rating={5}
          avatar=""
          review="The product arrived even better than described. It works perfectly, and I'm thrilled with the entire experience. Highly recommend!"
        />
        <ReviewCard
          name="Ava Martinez"
          date="Nov 18, 2025"
          rating={2}
          avatar=""
          review="The app is buggy and crashes constantly. It's filled with ads and lacks basic features promised in the description."
        />
      </div>
    </section>
  );
}

export default RealResult;
