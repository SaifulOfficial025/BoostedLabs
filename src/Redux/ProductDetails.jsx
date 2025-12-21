import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "./baseUrl";

// Async thunk to fetch both product details and review stats
export const fetchProductDetails = createAsyncThunk(
  "productDetails/fetchProductDetails",
  async (productId, { rejectWithValue }) => {
    try {
      // Fetch both APIs in parallel
      const [productRes, statsRes] = await Promise.all([
        fetch(`${BASE_URL}/shop/products/${productId}/`),
        fetch(`${BASE_URL}/shop/products/${productId}/reviews/stats/`),
      ]);

      if (!productRes.ok) {
        return rejectWithValue("Failed to fetch product details");
      }
      if (!statsRes.ok) {
        return rejectWithValue("Failed to fetch review stats");
      }

      const productData = await productRes.json();
      const statsData = await statsRes.json();

      return {
        product: productData,
        stats: statsData,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  product: null,
  stats: null,
  loading: false,
  error: null,
};

const productDetailsSlice = createSlice({
  name: "productDetails",
  initialState,
  reducers: {
    clearProductDetails: (state) => {
      state.product = null;
      state.stats = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload.product;
        state.stats = action.payload.stats;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProductDetails } = productDetailsSlice.actions;
export default productDetailsSlice.reducer;
