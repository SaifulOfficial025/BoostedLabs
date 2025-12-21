import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "./baseUrl";

// Step 1: Send forget password email
export const sendForgetPasswordEmail = createAsyncThunk(
  "forgetPassword/sendEmail",
  async ({ email }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/auth/forget-password/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) {
        return rejectWithValue(data);
      }
      return { ...data, email }; // Return email along with response
    } catch (err) {
      return rejectWithValue({ detail: err.message || "Network error" });
    }
  }
);

// Step 2: Verify OTP code
export const verifyPasswordCode = createAsyncThunk(
  "forgetPassword/verifyCode",
  async ({ email, code }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/auth/verify-pass-code/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });

      const data = await res.json();
      if (!res.ok) {
        return rejectWithValue(data);
      }
      return { ...data, email }; // Return email along with response
    } catch (err) {
      return rejectWithValue({ detail: err.message || "Network error" });
    }
  }
);

// Step 3: Set new password
export const setNewPassword = createAsyncThunk(
  "forgetPassword/setNewPassword",
  async ({ email, new_password, confirm_password }, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/auth/set-new-password/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, new_password, confirm_password }),
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
  email: null,
  loading: false,
  error: null,
  success: false,
  successMessage: null,
  step: "email", // 'email', 'otp', 'password'
};

const forgetPasswordSlice = createSlice({
  name: "forgetPassword",
  initialState,
  reducers: {
    clearForgetPasswordState(state) {
      state.email = null;
      state.error = null;
      state.success = false;
      state.successMessage = null;
      state.step = "email";
    },
    setForgetPasswordStep(state, action) {
      state.step = action.payload;
    },
    clearForgetPasswordError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Send email
      .addCase(sendForgetPasswordEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(sendForgetPasswordEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.successMessage =
          action.payload.message || "OTP sent successfully";
        state.email = action.payload.email;
        state.step = "otp";
        state.error = null;
      })
      .addCase(sendForgetPasswordEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error;
        state.success = false;
      })
      // Verify code
      .addCase(verifyPasswordCode.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(verifyPasswordCode.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.successMessage =
          action.payload.message || "Code verified successfully";
        state.email = action.payload.email;
        state.step = "password";
        state.error = null;
      })
      .addCase(verifyPasswordCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error;
        state.success = false;
      })
      // Set new password
      .addCase(setNewPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(setNewPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.successMessage =
          action.payload.message || "Password reset successfully";
        state.error = null;
      })
      .addCase(setNewPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error;
        state.success = false;
      });
  },
});

export const {
  clearForgetPasswordState,
  setForgetPasswordStep,
  clearForgetPasswordError,
} = forgetPasswordSlice.actions;
export default forgetPasswordSlice.reducer;
