import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "./baseUrl";

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/auth/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
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

export const register = createAsyncThunk(
  "auth/register",
  async (
    { first_name, last_name, email, password, confirm_password },
    { rejectWithValue }
  ) => {
    try {
      const res = await fetch(`${BASE_URL}/auth/register/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name,
          last_name,
          email,
          password,
          confirm_password,
        }),
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

export const verifyEmail = createAsyncThunk(
  "auth/verifyEmail",
  async ({ email, code }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/auth/verify-email/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
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
  user: null,
  token: null,
  refresh: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      // clear saved auth and verification helpers
      try {
        localStorage.removeItem("auth");
        localStorage.removeItem("auth_verify");
        localStorage.removeItem("otpEmail");
      } catch (e) {}
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        // expect payload: { message, access, refresh, data }
        state.user = action.payload.data ?? action.payload.user ?? null;
        state.token = action.payload.access ?? action.payload.token ?? null;
        state.refresh = action.payload.refresh ?? null;
        state.error = null;
        try {
          // store the full response so UI can access name/image easily
          localStorage.setItem("auth", JSON.stringify(action.payload));
        } catch (e) {}
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        // if backend sends user/token, store them; otherwise keep response in localStorage
        state.user = action.payload.user ?? state.user;
        state.token = action.payload.token ?? state.token;
        state.error = null;
        try {
          localStorage.setItem("auth", JSON.stringify(action.payload));
        } catch (e) {}
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        // keep response available if needed
        try {
          localStorage.setItem("auth_verify", JSON.stringify(action.payload));
        } catch (e) {}
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
