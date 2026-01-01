import { useState } from "react";
import { Outlet } from "react-router-dom";
import ChatwithAI from "../Shared/ChatwithAI";
import ScrollToTop from "../Components/ScrollToTop";

const Main = () => {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div>
      <ScrollToTop />
      <Outlet />

      {/* Floating chat launcher (site-wide) */}
      <button
        aria-label="Open AI chat"
        onClick={() => setChatOpen(true)}
        className="fixed right-4 bottom-4 sm:right-6 sm:bottom-6 w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-2xl bg-[#fff] hover:bg-[#bee3f8] text-white flex items-center justify-center p-2 transition-all transform hover:scale-105 border-4 border-[#549ada] overflow-hidden"
        style={{ zIndex: 99999, position: "fixed" }}
      >
        <img
          src="/aichaticon.png"
          alt="Chat"
          className="w-10 h-10 object-contain"
          onError={(e) => {
            e.currentTarget.style.display = "none";
            const fallback =
              e.currentTarget.parentElement.querySelector(".chat-fallback");
            if (fallback) fallback.style.display = "block";
          }}
        />
        {/* <span className="chat-fallback hidden text-2xl">🤖</span> */}
      </button>

      <ChatwithAI open={chatOpen} onClose={() => setChatOpen(false)} />
    </div>
  );
};

export default Main;
