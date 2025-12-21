import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "./baseUrl";

// Fetch filtered products by type
export const fetchFilteredProducts = createAsyncThunk(
  "filteredProduct/fetchProducts",
  async ({ typeId }, { rejectWithValue }) => {
    try {
      const res = await fetch(
        `${BASE_URL}/shop/filter/product/?type=${typeId}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

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
  products: [],
  loading: false,
  error: null,
};

const filteredProductSlice = createSlice({
  name: "filteredProduct",
  initialState,
  reducers: {
    clearFilteredProducts(state) {
      state.products = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFilteredProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFilteredProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.error = null;
      })
      .addCase(fetchFilteredProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error;
      });
  },
});

export const { clearFilteredProducts } = filteredProductSlice.actions;
export default filteredProductSlice.reducer;
