import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaPaperPlane, FaPlus } from "react-icons/fa";
import chatailogo from "../../public/chatwithailogo.png";
import {
  connectWebSocket,
  disconnectWebSocket,
  sendMessage as sendWSMessage,
  clearMessages,
  fetchChatHistory,
} from "../Redux/Chat";

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
  const [value, setValue] = useState("");
  const listRef = useRef(null);
  const dispatch = useDispatch();

  const { messages, connected, error, loading, historyLoading } = useSelector(
    (state) => state.chat
  );

  // animation mount/visible states so closing animates out
  const [isMounted, setIsMounted] = useState(open);
  const [isVisible, setIsVisible] = useState(false);

  // Connect to WebSocket when chat opens
  useEffect(() => {
    if (open && !connected) {
      dispatch(connectWebSocket());
    }
  }, [open, connected, dispatch]);

  // Fetch chat history when chat opens
  useEffect(() => {
    if (open) {
      dispatch(fetchChatHistory());
    }
  }, [open, dispatch]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      dispatch(disconnectWebSocket());
    };
  }, [dispatch]);

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

    if (!connected) {
      console.error("WebSocket is not connected");
      return;
    }

    // Send message through WebSocket
    dispatch(sendWSMessage(value.trim()));
    setValue("");
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
            <div className="w-8 h-">
              <img src={chatailogo} alt="Chat AI Logo" className=" " />
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold">Chat with AI</div>
              {connected && (
                <div className="text-xs text-green-600">Connected</div>
              )}
              {!connected && (
                <div className="text-xs text-gray-500">Connecting...</div>
              )}
            </div>
            <button
              onClick={() => onClose && onClose()}
              className="text-red-600 hover:text-gray-800 p-1 rounded  text-xl font-bold"
              aria-label="Close chat"
            >
              ×
            </button>
          </div>

          <div
            className="p-4 h-[60vh] sm:h-[360px] overflow-y-auto space-y-3 bg-white"
            ref={listRef}
          >
            {historyLoading && (
              <div className="text-center text-gray-500 py-8">
                <p className="text-sm">Loading chat history...</p>
              </div>
            )}
            {!historyLoading && messages.length === 0 && (
              <div className="text-center text-gray-500 py-8">
                <p className="text-sm">Start a conversation with AI</p>
                <p className="text-xs mt-2">Ask about our peptide products!</p>
              </div>
            )}
            {messages.map((m) => (
              <ChatBubble key={m.id} from={m.from} text={m.text} />
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] px-4 py-3 rounded-xl shadow-sm bg-gray-100 text-gray-800 rounded-bl-none">
                  <div className="flex items-center gap-1">
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            {error && (
              <div className="text-center text-red-500 text-xs py-2">
                {error}
              </div>
            )}
          </div>

          <div className="px-4 py-3 border-t bg-white mb-10">
            <form onSubmit={handleSend} className="flex items-center gap-3">
              <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Chat with AI"
                className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none"
              />
              <button
                type="submit"
                disabled={!connected}
                className={`ml-1 p-2 rounded-lg flex items-center justify-center ${
                  connected
                    ? "bg-black text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
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
