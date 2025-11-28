import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { FaStar } from "react-icons/fa";

function Star({ filled, onClick, onMouseEnter, onMouseLeave }) {
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="text-yellow-400 focus:outline-none"
      aria-hidden
    >
      <FaStar
        className={`w-6 h-6 ${filled ? "text-yellow-400" : "text-gray-300"}`}
      />
    </button>
  );
}

function ShareYourFeedbackModal({ open, onClose, onSubmit }) {
  const modalRef = useRef(null);
  const [isMounted, setIsMounted] = useState(open);
  const [isVisible, setIsVisible] = useState(false);
  const [rating, setRating] = useState(4);
  const [hover, setHover] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let tid;
    if (open) {
      setIsMounted(true);
      requestAnimationFrame(() => setIsVisible(true));
    } else {
      setIsVisible(false);
      tid = setTimeout(() => setIsMounted(false), 300);
    }
    return () => clearTimeout(tid);
  }, [open]);

  useEffect(() => {
    if (!isMounted) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev || "";
    };
  }, [isMounted]);

  useEffect(() => {
    function handleClickOutside(e) {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose && onClose();
      }
    }
    if (isMounted) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMounted, onClose]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      if (onSubmit) await onSubmit({ rating, feedback });
    } catch (err) {
      // swallow — UI-only implementation
      console.error(err);
    }
    setSubmitting(false);
    onClose && onClose();
  }

  if (!isMounted) return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-300 ease-out ${
        isVisible
          ? "bg-black bg-opacity-50"
          : "bg-opacity-0 pointer-events-none"
      }`}
      style={{ opacity: isVisible ? 1 : 0 }}
    >
      <div
        ref={modalRef}
        className={`w-full max-w-md mx-4 bg-white rounded-2xl shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
        }`}
        style={{ willChange: "transform, opacity" }}
      >
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-center">
              Share your feedback
            </h3>
            <p className="text-sm text-center text-gray-500 mt-2">
              Your feedback helps us make things better.
            </p>
          </div>

          <div className="flex items-center justify-center gap-2 mb-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star
                key={i}
                filled={i <= (hover || rating)}
                onClick={() => setRating(i)}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(0)}
              />
            ))}
            <div className="text-sm text-gray-500">{rating}/5 stars</div>
          </div>

          <label className="block text-sm text-gray-700 mb-1">
            Additional feedback
          </label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows={5}
            className="w-full border border-gray-200 rounded-lg p-3 mb-4 resize-none text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200"
            placeholder="My feedback!!"
          />

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => onClose && onClose()}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-800 bg-white hover:bg-gray-50 flex-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 rounded-lg bg-black text-white font-semibold flex-1 shadow-sm hover:shadow-md disabled:opacity-60"
            >
              {submitting ? "Submitting..." : "Submit feedback"}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}

export default ShareYourFeedbackModal;
