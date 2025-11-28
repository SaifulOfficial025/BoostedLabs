import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FaPaperPlane, FaPlus } from "react-icons/fa";

function ChatBubble({ text, from = "bot" }) {
  const isUser = from === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[80%] break-words px-4 py-3 rounded-xl shadow-sm ${
          isUser
            ? "bg-[#081122] text-white rounded-tr-none"
            : "bg-gray-100 text-gray-800 rounded-bl-none"
        }`}
      >
        {text}
      </div>
    </div>
  );
}

function ChatwithAI({ open = false, onClose }) {
  const [messages, setMessages] = useState([
    {
      id: 1,
      from: "bot",
      text: "ype and scrambled it to make a type specimen book. It has sured not only five centuries, but also",
    },
    { id: 2, from: "user", text: "ype and scrambl" },
    {
      id: 3,
      from: "bot",
      text: "ype and scrambled it to make a type specimen book. It has sured not only five centuries, but also",
    },
  ]);
  const [value, setValue] = useState("");
  const listRef = useRef(null);

  // animation mount/visible states so closing animates out
  const [isMounted, setIsMounted] = useState(open);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

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

  function handleSend(e) {
    e.preventDefault();
    if (!value.trim()) return;
    const userMsg = { id: Date.now(), from: "user", text: value.trim() };
    setMessages((m) => [...m, userMsg]);
    setValue("");

    setTimeout(() => {
      setMessages((m) => [
        ...m,
        {
          id: Date.now() + 1,
          from: "bot",
          text: "This is a preview reply. The AI can make mistakes. Check important info.",
        },
      ]);
    }, 700);
  }

  if (!isMounted) return null;

  return createPortal(
    <div
      className={`fixed right-4 bottom-4 sm:right-6 sm:bottom-6 z-[9999] font-sans pointer-events-auto`}
    >
      <div
        className={`transform transition-all duration-300 ease-in-out origin-bottom-right ${
          isVisible
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 translate-y-3 scale-95"
        }`}
      >
        <div className="w-[92vw] max-w-[360px] sm:w-[420px] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 border-b flex items-center gap-3">
            <div className="w-8 h-8 bg-black/5 rounded flex items-center justify-center text-black font-semibold">
              🤖
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold">Chat with AI</div>
            </div>
            <button
              onClick={() => onClose && onClose()}
              className="text-gray-500 hover:text-gray-800 p-1 rounded"
              aria-label="Close chat"
            >
              ×
            </button>
          </div>

          <div
            className="p-4 h-[60vh] sm:h-[360px] overflow-y-auto space-y-3 bg-white"
            ref={listRef}
          >
            {messages.map((m) => (
              <ChatBubble key={m.id} from={m.from} text={m.text} />
            ))}
          </div>

          <div className="px-4 py-3 border-t bg-white mb-10">
            <form onSubmit={handleSend} className="flex items-center gap-3">
              <button
                type="button"
                className="p-2 rounded-md bg-white border border-gray-200"
              >
                <FaPlus />
              </button>
              <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Chat with AI"
                className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none"
              />
              <button
                type="submit"
                className="ml-1 bg-black text-white p-2 rounded-lg flex items-center justify-center"
              >
                <FaPaperPlane />
              </button>
            </form>
            <div className="mt-3 text-xs text-gray-400">
              AI can make mistakes. Check important info.
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default ChatwithAI;
