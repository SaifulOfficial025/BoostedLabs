import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "./baseUrl";

// Async thunk to search products
export const searchProducts = createAsyncThunk(
  "search/searchProducts",
  async (query, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `${BASE_URL}/shop/search/products/?q=${encodeURIComponent(query)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(
          errorData.message || "Failed to search products"
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message || "Network error");
    }
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState: {
    results: [],
    query: "",
    loading: false,
    error: null,
  },
  reducers: {
    clearSearch: (state) => {
      state.results = [];
      state.query = "";
      state.error = null;
    },
    setQuery: (state, action) => {
      state.query = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.results = action.payload;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearSearch, setQuery } = searchSlice.actions;
export default searchSlice.reducer;
