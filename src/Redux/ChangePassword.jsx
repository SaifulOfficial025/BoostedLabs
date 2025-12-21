import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "./baseUrl";

// Change password
export const changePassword = createAsyncThunk(
  "changePassword/changePassword",
  async (
    { old_password, new_password, confirm_password },
    { rejectWithValue }
  ) => {
    try {
      // Get access token from localStorage
      const authData = localStorage.getItem("auth");
      const token = authData ? JSON.parse(authData).access : null;

      if (!token) {
        return rejectWithValue({ detail: "No access token found" });
      }

      const res = await fetch(`${BASE_URL}/auth/change-password/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          old_password,
          new_password,
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

const initialState = {
  loading: false,
  error: null,
  success: false,
  successMessage: null,
};

const changePasswordSlice = createSlice({
  name: "changePassword",
  initialState,
  reducers: {
    clearChangePasswordMessage(state) {
      state.success = false;
      state.error = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(changePassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.successMessage =
          action.payload.message || "Password changed successfully";
        state.error = null;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error;
        state.success = false;
      });
  },
});

export const { clearChangePasswordMessage } = changePasswordSlice.actions;
export default changePasswordSlice.reducer;
