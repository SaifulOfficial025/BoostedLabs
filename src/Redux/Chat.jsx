import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "./baseUrl";

const WS_BASE_URL = "ws://10.10.13.61:8002";

// Fetch chat history
export const fetchChatHistory = createAsyncThunk(
  "chat/fetchHistory",
  async (_, { rejectWithValue }) => {
    try {
      const authData = localStorage.getItem("auth");
      const token = authData ? JSON.parse(authData).access : null;

      if (!token) {
        return rejectWithValue("No access token found");
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
    },
    clearMessages: (state) => {
      state.messages = [];
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

  if (!token) {
    dispatch(setError("No access token found"));
    return;
  }

  // Close existing connection if any
  if (ws && ws.readyState === WebSocket.OPEN) {
    return; // Already connected
  }

  const wsUrl = `${WS_BASE_URL}/ws/chat/?token=${token}`;

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
