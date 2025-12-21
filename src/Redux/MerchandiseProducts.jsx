import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "./baseUrl";

// Async thunk to fetch merchandise products from the API
export const fetchMerchandiseProducts = createAsyncThunk(
  "merchandiseProducts/fetchMerchandiseProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/shop/merchandise-products/`);
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

const merchandiseProductsSlice = createSlice({
  name: "merchandiseProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMerchandiseProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMerchandiseProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchMerchandiseProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default merchandiseProductsSlice.reducer;
