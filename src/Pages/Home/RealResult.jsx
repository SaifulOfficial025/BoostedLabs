import React, { useEffect, useRef, useState } from "react";
import ReviewCard from "../../Shared/ReviewCard";
import { BASE_URL } from "../../Redux/baseUrl";

function RealResult() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch reviews from backend
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}/shop/home/`);
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }
        const data = await response.json();
        // Transform API reviews to match ReviewCard props
        const transformedReviews = data.reviews.map((review) => ({
          id: review.id,
          name: `User ${review.user_name}`,
          date: new Date(review.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
          rating: review.rating,
          avatar: "",
          review: review.comment,
        }));
        setReviews(transformedReviews);
        setError(null);
      } catch (err) {
        setError(err.message);
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const fallbackReviews = [
    {
      name: "Emma Robinson",
      date: "Nov 18, 2025",
      rating: 5,
      avatar: "",
      review:
        "This is hands down the best thing I’ve bought this year. It’s exactly what I needed, and it looks amazing! Highly recommend!",
    },
    {
      name: "Ethan James",
      date: "Nov 18, 2025",
      rating: 5,
      avatar: "",
      review:
        "The product arrived even better than described. It works perfectly, and I'm thrilled with the entire experience. Highly recommend!",
    },
    {
      name: "Ava Martinez",
      date: "Nov 18, 2025",
      rating: 2,
      avatar: "",
      review:
        "The app is buggy and crashes constantly. It's filled with ads and lacks basic features promised in the description.",
    },
    {
      name: "Emma Robinson",
      date: "Nov 18, 2025",
      rating: 5,
      avatar: "",
      review:
        "This is hands down the best thing I’ve bought this year. It’s exactly what I needed, and it looks amazing! Highly recommend!",
    },
    {
      name: "Ethan James",
      date: "Nov 18, 2025",
      rating: 5,
      avatar: "",
      review:
        "The product arrived even better than described. It works perfectly, and I'm thrilled with the entire experience. Highly recommend!",
    },
    {
      name: "Ava Martinez",
      date: "Nov 18, 2025",
      rating: 2,
      avatar: "",
      review:
        "The app is buggy and crashes constantly. It's filled with ads and lacks basic features promised in the description.",
    },
  ];

  const displayedReviews = loading || error ? fallbackReviews : reviews;
  const total = displayedReviews.length;
  const [visibleCount, setVisibleCount] = useState(3);
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    // Set responsive visible count: 1 on small, 3 on md+
    const updateVisible = () => {
      if (
        window.matchMedia &&
        window.matchMedia("(min-width: 768px)").matches
      ) {
        setVisibleCount(3);
      } else {
        setVisibleCount(1);
      }
    };

    updateVisible();
    window.addEventListener("resize", updateVisible);
    return () => window.removeEventListener("resize", updateVisible);
  }, []);

  useEffect(() => {
    const maxIndex = Math.max(0, total - visibleCount);
    if (index > maxIndex) {
      setIndex(0);
    }
  }, [visibleCount, total, index]);

  useEffect(() => {
    // Auto-advance every 3s
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setIndex((prev) => {
          const maxIndex = Math.max(0, total - visibleCount);
          return prev >= maxIndex ? 0 : prev + 1;
        });
      }, 2500);
    }
    return () => clearInterval(intervalRef.current);
  }, [isPaused, visibleCount, total]);

  const goPrev = () => {
    const maxIndex = Math.max(0, total - visibleCount);
    setIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const goNext = () => {
    const maxIndex = Math.max(0, total - visibleCount);
    setIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const percentShift = index * (100 / visibleCount);

  return (
    <section className="w-full px-4 sm:px-6 py-12 flex flex-col items-center font-sans mt-16">
      <h2 className="text-2xl md:text-3xl font-bold text-black mb-2 text-center">
        REAL RESULTS
      </h2>
      <div className="w-52 sm:w-[280px] h-1.5 bg-black rounded-full mb-8"></div>

      <div className="relative w-full max-w-6xl">
        <div
          className="overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${percentShift}%)` }}
          >
            {displayedReviews.map((r, i) => (
              <div
                key={i}
                className="px-3 py-2"
                style={{ flex: `0 0 calc(100% / ${visibleCount})` }}
              >
                <ReviewCard
                  name={r.name}
                  date={r.date}
                  rating={r.rating}
                  avatar={r.avatar}
                  review={r.review}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Left / Right buttons */}
        <button
          aria-label="Previous reviews"
          onClick={goPrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-black p-2 rounded-full shadow-md mr-12"
        >
          ‹
        </button>
        <button
          aria-label="Next reviews"
          onClick={goNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-black p-2 rounded-full shadow-md ml-12"
        >
          ›
        </button>
      </div>
    </section>
  );
}

export default RealResult;
