import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "./baseUrl";

// Async thunk to fetch product details
export const fetchProductDetails = createAsyncThunk(
  "productDetails/fetchProductDetails",
  async (productId, { rejectWithValue }) => {
    try {
      const productRes = await fetch(`${BASE_URL}/shop/products/${productId}/`);

      if (!productRes.ok) {
        return rejectWithValue("Failed to fetch product details");
      }

      const productData = await productRes.json();

      // Calculate stats from reviews in the product data
      const reviews = productData.reviews || [];
      const totalReviews = reviews.length;
      const averageRating =
        totalReviews > 0
          ? reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
          : 0;

      const starCounts = {
        "5_star": reviews.filter((r) => r.rating === 5).length,
        "4_star": reviews.filter((r) => r.rating === 4).length,
        "3_star": reviews.filter((r) => r.rating === 3).length,
        "2_star": reviews.filter((r) => r.rating === 2).length,
        "1_star": reviews.filter((r) => r.rating === 1).length,
      };

      const recommendedCount = reviews.filter((r) => r.rating >= 4).length;
      const recommendedPercentage =
        totalReviews > 0 ? (recommendedCount / totalReviews) * 100 : 0;

      const stats = {
        total_reviews: totalReviews,
        average_rating: averageRating,
        star_counts: starCounts,
        recommended_percentage: recommendedPercentage,
      };

      return {
        product: productData,
        stats: stats,
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
