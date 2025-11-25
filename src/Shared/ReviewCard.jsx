import React from "react";

function ReviewCard({ avatar, name, date, rating = 5, review }) {
  return (
    <div
      className="bg-[#f6fafd] rounded-2xl border border-[#e5e7eb] shadow-sm p-4 max-w-sm font-normal"
      style={{ fontFamily: "Open Sans Condensed" }}
    >
      <div className="flex items-center gap-3 mb-1">
        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-blue-600 text-white text-lg font-bold">
          {avatar ? (
            <img
              src={avatar}
              alt={name}
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            name?.charAt(0)
          )}
        </div>
        <div>
          <div className="font-semibold text-md text-[#222]">{name}</div>
          <div className="text-xs text-[#7b8ca3]">on {date}</div>
        </div>
      </div>
      <div className="flex gap-1 mb-2">
        {Array.from({ length: rating }).map((_, i) => (
          <span key={i} className="text-black text-lg">
            <img
              src="/public/star.png"
              alt="rating icon"
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
