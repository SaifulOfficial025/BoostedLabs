import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "./baseUrl";

// Async thunk to fetch products from the API
export const fetchHomeProducts = createAsyncThunk(
  "chooseYourBoostedProduct/fetchHomeProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/shop/home/`);
      if (!response.ok) {
        return rejectWithValue("Failed to fetch products");
      }
      const data = await response.json();
      return data.products || [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  products: [],
  loading: false,
  error: null,
};

const chooseYourBoostedProductSlice = createSlice({
  name: "chooseYourBoostedProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomeProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHomeProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchHomeProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default chooseYourBoostedProductSlice.reducer;
