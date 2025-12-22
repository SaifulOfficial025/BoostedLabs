import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "./baseUrl";
import { toast } from "react-toastify";

export const socialLogin = createAsyncThunk(
  "socialLogin/login",
  async ({ email }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/auth/social-login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || data.detail || "Social login failed");
        return rejectWithValue(data);
      }

      toast.success("Signed in with Google successfully");
      return data;
    } catch (err) {
      toast.error(err.message || "Network error");
      return rejectWithValue({ detail: err.message || "Network error" });
    }
  }
);

const initialState = {
  user: null,
  token: null,
  refresh: null,
  loading: false,
  error: null,
};

const socialLoginSlice = createSlice({
  name: "socialLogin",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(socialLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(socialLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.email;
        state.token = action.payload.access;
        state.refresh = action.payload.refresh;
        state.error = null;
        try {
          localStorage.setItem("auth", JSON.stringify(action.payload));
        } catch (e) {}
      })
      .addCase(socialLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error;
      });
  },
});

export const { clearError } = socialLoginSlice.actions;
export default socialLoginSlice.reducer;
