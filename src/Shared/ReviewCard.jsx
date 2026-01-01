import React from "react";
import staricon from "../../public/star.png";

function ReviewCard({ avatar, name, date, rating = 5, review }) {
  return (
    <div className="bg-[#f6fafd] rounded-2xl border border-[#e5e7eb] shadow-sm p-4 max-w-sm font-normal font-sans hover:shadow-lg transform hover:scale-105 transition duration-300">
      <div className="flex items-start gap-3 mb-1">
        <div>
          <div className="font-semibold text-md text-[#222]">{name}</div>
          <div className="text-xs text-[#7b8ca3]">on {date}</div>
        </div>
      </div>
      <div className="flex gap-1 mb-2">
        {Array.from({ length: rating }).map((_, i) => (
          <span key={i} className="text-black text-lg">
            <img
              src={staricon}
              alt="rating icon"
              loading="lazy"
              className="w-4 mt-2"
            />
          </span>
        ))}
      </div>
      <div className="text-sm text-[#3a4a5c] leading-snug">{review}</div>
    </div>
  );
}

export default ReviewCard;
