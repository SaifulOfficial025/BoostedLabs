import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "./baseUrl";

// Send contact message
export const sendContactMessage = createAsyncThunk(
  "contactUs/sendMessage",
  async ({ name, whatsapp, email, project_details }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/shop/contact-message/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, whatsapp, email, project_details }),
      });

      const data = await res.json();
      if (!res.ok) {
        return rejectWithValue(data);
      }
      return data;
    } catch (err) {
      return rejectWithValue({ detail: err.message || "Network error" });
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  success: false,
  successMessage: null,
};

const contactUsSlice = createSlice({
  name: "contactUs",
  initialState,
  reducers: {
    clearContactUsMessage(state) {
      state.success = false;
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendContactMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(sendContactMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.successMessage =
          action.payload.message || "Message sent successfully";
        state.error = null;
      })
      .addCase(sendContactMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error;
        state.success = false;
      });
  },
});

export const { clearContactUsMessage } = contactUsSlice.actions;
export default contactUsSlice.reducer;
