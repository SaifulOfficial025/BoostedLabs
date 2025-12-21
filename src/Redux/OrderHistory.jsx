import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "./baseUrl";
import { toast } from "react-toastify";

// Async thunk to fetch orders
export const fetchOrders = createAsyncThunk(
  "orderHistory/fetchOrders",
  async (_, { rejectWithValue }) => {
    try {
      const authData = localStorage.getItem("auth");
      const token = authData ? JSON.parse(authData).access : null;

      if (!token) {
        return rejectWithValue("No access token found");
      }

      const response = await fetch(`${BASE_URL}/shop/orders/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        return rejectWithValue("Failed to fetch orders");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to confirm delivery
export const confirmDelivery = createAsyncThunk(
  "orderHistory/confirmDelivery",
  async (orderId, { rejectWithValue }) => {
    try {
      const authData = localStorage.getItem("auth");
      const token = authData ? JSON.parse(authData).access : null;

      if (!token) {
        toast.error("Please login to perform this action");
        return rejectWithValue("No access token found");
      }

      const response = await fetch(
        `${BASE_URL}/shop/orders/${orderId}/confirm-delivery/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to confirm delivery");
        return rejectWithValue(
          errorData.message || "Failed to confirm delivery"
        );
      }

      const data = await response.json();
      toast.success(data.message || "Order marked as delivered successfully");
      return { orderId, data };
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to cancel order
export const cancelOrder = createAsyncThunk(
  "orderHistory/cancelOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      const authData = localStorage.getItem("auth");
      const token = authData ? JSON.parse(authData).access : null;

      if (!token) {
        toast.error("Please login to perform this action");
        return rejectWithValue("No access token found");
      }

      const response = await fetch(
        `${BASE_URL}/shop/orders/${orderId}/cancel/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to cancel order");
        return rejectWithValue(errorData.message || "Failed to cancel order");
      }

      const data = await response.json();
      toast.success(data.message || "Order cancelled successfully");
      return { orderId, data };
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to submit review
export const submitReview = createAsyncThunk(
  "orderHistory/submitReview",
  async ({ productId, rating, comment }, { rejectWithValue }) => {
    try {
      const authData = localStorage.getItem("auth");
      const token = authData ? JSON.parse(authData).access : null;

      if (!token) {
        toast.error("Please login to submit review");
        return rejectWithValue("No access token found");
      }

      const response = await fetch(
        `${BASE_URL}/shop/post/review/${productId}/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            rating: rating.toString(),
            comment,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to submit review");
        return rejectWithValue(errorData.message || "Failed to submit review");
      }

      const data = await response.json();
      toast.success("Review submitted successfully");
      return data;
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  orders: [],
  loading: false,
  error: null,
};

const orderHistorySlice = createSlice({
  name: "orderHistory",
  initialState,
  reducers: {
    clearOrders: (state) => {
      state.orders = [];
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch orders
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Confirm delivery
      .addCase(confirmDelivery.fulfilled, (state, action) => {
        const order = state.orders.find((o) => o.id === action.payload.orderId);
        if (order) {
          order.status = "Delivered";
        }
      })
      // Cancel order
      .addCase(cancelOrder.fulfilled, (state, action) => {
        const order = state.orders.find((o) => o.id === action.payload.orderId);
        if (order) {
          order.status = "Cancelled";
        }
      });
  },
});

export const { clearOrders } = orderHistorySlice.actions;
export default orderHistorySlice.reducer;
