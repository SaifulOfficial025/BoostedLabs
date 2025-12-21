import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "./baseUrl";

// Fetch profile data
export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (_, { rejectWithValue }) => {
    try {
      // Get access token from localStorage
      const authData = localStorage.getItem("auth");
      const token = authData ? JSON.parse(authData).access : null;

      if (!token) {
        return rejectWithValue({ detail: "No access token found" });
      }

      const res = await fetch(`${BASE_URL}/auth/profile/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
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

// Update profile data
export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async ({ first_name, last_name, email, imageFile }, { rejectWithValue }) => {
    try {
      // Get access token from localStorage
      const authData = localStorage.getItem("auth");
      const token = authData ? JSON.parse(authData).access : null;

      if (!token) {
        return rejectWithValue({ detail: "No access token found" });
      }

      // Use FormData for file upload
      const formData = new FormData();
      formData.append("first_name", first_name);
      formData.append("last_name", last_name);
      formData.append("email", email);

      // Only append image if a file is provided
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const res = await fetch(`${BASE_URL}/auth/profile/`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          // Don't set Content-Type - let browser set it with boundary for FormData
        },
        body: formData,
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
  profileData: null,
  loading: false,
  error: null,
  updateLoading: false,
  updateError: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    clearProfileError(state) {
      state.error = null;
      state.updateError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch profile
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profileData = action.payload;
        state.error = null;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error;
      })
      // Update profile
      .addCase(updateProfile.pending, (state) => {
        state.updateLoading = true;
        state.updateError = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.updateLoading = false;
        state.profileData = action.payload;
        state.updateError = null;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.updateLoading = false;
        state.updateError = action.payload || action.error;
      });
  },
});

export const { clearProfileError } = profileSlice.actions;
export default profileSlice.reducer;
