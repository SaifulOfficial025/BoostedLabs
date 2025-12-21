import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "./baseUrl";

// Async thunk to fetch products from the API
export const fetchShopHealthProducts = createAsyncThunk(
  "shopProduct/fetchShopHealthProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/shop/health-products/`);
      if (!response.ok) {
        return rejectWithValue("Failed to fetch products");
      }
      const data = await response.json();
      return Array.isArray(data) ? data : data.products || [];
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

const shopProductSlice = createSlice({
  name: "shopProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchShopHealthProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShopHealthProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchShopHealthProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default shopProductSlice.reducer;
