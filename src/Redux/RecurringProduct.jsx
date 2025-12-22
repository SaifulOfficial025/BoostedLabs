import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "./baseUrl";
import { toast } from "react-toastify";

// Fetch recurring products
export const fetchRecurringProducts = createAsyncThunk(
  "recurringProduct/fetchRecurringProducts",
  async (_, { rejectWithValue }) => {
    try {
      const authData = localStorage.getItem("auth");
      const token = authData ? JSON.parse(authData).access : null;

      if (!token) {
        return rejectWithValue("No access token found");
      }

      const response = await fetch(`${BASE_URL}/shop/recurring/product/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        return rejectWithValue("Failed to fetch recurring products");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

// Update recurring product quantity
export const updateRecurringProductQuantity = createAsyncThunk(
  "recurringProduct/updateQuantity",
  async ({ id, action }, { rejectWithValue }) => {
    try {
      const authData = localStorage.getItem("auth");
      const token = authData ? JSON.parse(authData).access : null;

      if (!token) {
        return rejectWithValue("No access token found");
      }

      const response = await fetch(`${BASE_URL}/shop/recurring/${id}/update/`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to update quantity");
        return rejectWithValue(
          errorData.message || "Failed to update quantity"
        );
      }

      const data = await response.json();
      toast.success(data.message || "Quantity updated successfully");
      return { id, quantity: data.quantity };
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

// Delete recurring product
export const deleteRecurringProduct = createAsyncThunk(
  "recurringProduct/delete",
  async (id, { rejectWithValue }) => {
    try {
      const authData = localStorage.getItem("auth");
      const token = authData ? JSON.parse(authData).access : null;

      if (!token) {
        return rejectWithValue("No access token found");
      }

      const response = await fetch(`${BASE_URL}/recurring/${id}/cancel/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to delete product");
        return rejectWithValue(errorData.message || "Failed to delete product");
      }

      const data = await response.json();
      toast.success(data.message || "Product cancelled successfully");
      return id;
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

// Delete multiple recurring products
export const deleteMultipleRecurringProducts = createAsyncThunk(
  "recurringProduct/deleteMultiple",
  async (ids, { rejectWithValue, dispatch }) => {
    try {
      for (const id of ids) {
        await dispatch(deleteRecurringProduct(id)).unwrap();
      }
      return ids;
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

const recurringProductSlice = createSlice({
  name: "recurringProduct",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch recurring products
      .addCase(fetchRecurringProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRecurringProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchRecurringProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update quantity
      .addCase(updateRecurringProductQuantity.fulfilled, (state, action) => {
        const product = state.products.find((p) => p.id === action.payload.id);
        if (product) {
          product.quantity = action.payload.quantity;
        }
      })
      // Delete product
      .addCase(deleteRecurringProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((p) => p.id !== action.payload);
      })
      // Delete multiple products
      .addCase(deleteMultipleRecurringProducts.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (p) => !action.payload.includes(p.id)
        );
      });
  },
});

export const { clearError } = recurringProductSlice.actions;
export default recurringProductSlice.reducer;
