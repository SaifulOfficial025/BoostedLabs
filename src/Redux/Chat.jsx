import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "./baseUrl";

const WS_BASE_URL = "wss://server.boostedlabs.au";
// const WS_BASE_URL = "ws://10.10.13.61:8002";

// Helper functions for guest chat persistence
const GUEST_CHAT_KEY = "guest_chat_messages";

const saveGuestMessages = (messages) => {
  try {
    localStorage.setItem(GUEST_CHAT_KEY, JSON.stringify(messages));
  } catch (error) {
    console.error("Error saving guest messages:", error);
  }
};

const loadGuestMessages = () => {
  try {
    const saved = localStorage.getItem(GUEST_CHAT_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error("Error loading guest messages:", error);
    return [];
  }
};

const clearGuestMessages = () => {
  try {
    localStorage.removeItem(GUEST_CHAT_KEY);
  } catch (error) {
    console.error("Error clearing guest messages:", error);
  }
};

// Fetch chat history
export const fetchChatHistory = createAsyncThunk(
  "chat/fetchHistory",
  async (_, { rejectWithValue }) => {
    try {
      const authData = localStorage.getItem("auth");
      const token = authData ? JSON.parse(authData).access : null;

      if (!token) {
        // Guest users - load from localStorage
        return loadGuestMessages();
      }

      const response = await fetch(`${BASE_URL}/chat/history/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        return rejectWithValue("Failed to fetch chat history");
      }

      const data = await response.json();
      return data.messages || [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  messages: [],
  connected: false,
  error: null,
  websocket: null,
  loading: false,
  historyLoading: false,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setConnected: (state, action) => {
      state.connected = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    addMessages: (state, action) => {
      // Add multiple messages from WebSocket response
      state.messages.push(...action.payload);

      // Save to localStorage for guest users
      const authData = localStorage.getItem("auth");
      const token = authData ? JSON.parse(authData).access : null;
      if (!token) {
        saveGuestMessages(state.messages);
      }
    },
    clearMessages: (state) => {
      state.messages = [];

      // Clear guest messages from localStorage
      const authData = localStorage.getItem("auth");
      const token = authData ? JSON.parse(authData).access : null;
      if (!token) {
        clearGuestMessages();
      }
    },
    setWebSocket: (state, action) => {
      state.websocket = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatHistory.pending, (state) => {
        state.historyLoading = true;
      })
      .addCase(fetchChatHistory.fulfilled, (state, action) => {
        state.historyLoading = false;

        // Check if user is logged in
        const authData = localStorage.getItem("auth");
        const token = authData ? JSON.parse(authData).access : null;

        if (token) {
          // Transform API response to component format
          // API returns messages in reverse chronological order (newest first)
          // We need to reverse and format them
          const formattedMessages = action.payload.reverse().map((msg) => ({
            id: msg.id,
            from: msg.sender_type === "user" ? "user" : "bot",
            text: msg.message,
            sender: msg.sender_name,
          }));
          state.messages = formattedMessages;
        } else {
          // Guest user - messages are already in the correct format from localStorage
          state.messages = action.payload;
        }
      })
      .addCase(fetchChatHistory.rejected, (state) => {
        state.historyLoading = false;
      });
  },
});

export const {
  setConnected,
  setError,
  addMessage,
  addMessages,
  clearMessages,
  setWebSocket,
  setLoading,
} = chatSlice.actions;

// WebSocket connection manager
let ws = null;

export const connectWebSocket = () => (dispatch, getState) => {
  // Get token from localStorage
  const authData = localStorage.getItem("auth");
  const token = authData ? JSON.parse(authData).access : null;

  // Close existing connection if any
  if (ws && ws.readyState === WebSocket.OPEN) {
    return; // Already connected
  }

  let wsUrl;
  if (token) {
    // Authenticated user
    wsUrl = `${WS_BASE_URL}/ws/chat/?token=${token}`;
  } else {
    // Guest user - generate random guest_id
    const guestId = crypto.randomUUID();
    wsUrl = `wss://server.boostedlabs.au/ws/chat/?guest_id=${guestId}`;
  }

  try {
    ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log("WebSocket connected");
      dispatch(setConnected(true));
      dispatch(setError(null));
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        if (data.type === "chat_message" && data.messages) {
          // Transform messages to component format
          const formattedMessages = data.messages.map((msg, index) => ({
            id: Date.now() + index,
            from: msg.type === "user" ? "user" : "bot",
            text: msg.message,
            sender: msg.sender,
          }));

          dispatch(addMessages(formattedMessages));
          dispatch(setLoading(false));
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
        dispatch(setLoading(false));
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
      dispatch(setError("WebSocket connection error"));
      dispatch(setConnected(false));
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
      dispatch(setConnected(false));
    };
  } catch (error) {
    console.error("Error creating WebSocket:", error);
    dispatch(setError(error.message));
  }
};

export const sendMessage = (message) => (dispatch, getState) => {
  if (!ws || ws.readyState !== WebSocket.OPEN) {
    dispatch(setError("WebSocket is not connected"));
    return;
  }

  try {
    // Set loading state
    dispatch(setLoading(true));

    // Send message through WebSocket
    // Don't add to state here - wait for WebSocket response which includes both user and AI messages
    ws.send(
      JSON.stringify({
        message: message,
      })
    );
  } catch (error) {
    console.error("Error sending message:", error);
    dispatch(setError("Failed to send message"));
    dispatch(setLoading(false));
  }
};

export const disconnectWebSocket = () => (dispatch) => {
  if (ws) {
    ws.close();
    ws = null;
    dispatch(setConnected(false));
  }
};

export default chatSlice.reducer;
