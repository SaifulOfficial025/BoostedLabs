import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "./baseUrl";
import { toast } from "react-toastify";

// Async thunk for guest checkout
export const guestCheckout = createAsyncThunk(
  "guestCheckout/checkout",
  async (
    { cartItems, address, email, isSubscription, freeTshirtSize },
    { rejectWithValue }
  ) => {
    try {
      // Build payload
      const payload = {
        cart_items: cartItems,
        address,
        email,
        is_subscription: isSubscription,
      };

      if (freeTshirtSize) {
        payload.free_tshirt_size = freeTshirtSize;
      }

      const response = await fetch(`${BASE_URL}/shop/checkout/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error(errorData.message || "Checkout failed");
        return rejectWithValue(errorData.message || "Checkout failed");
      }

      const data = await response.json();
      toast.success("Order created successfully!");
      return data;
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  loading: false,
  error: null,
  checkoutData: null,
};

const guestCheckoutSlice = createSlice({
  name: "guestCheckout",
  initialState,
  reducers: {
    clearGuestCheckoutData: (state) => {
      state.checkoutData = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(guestCheckout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(guestCheckout.fulfilled, (state, action) => {
        state.loading = false;
        state.checkoutData = action.payload;
      })
      .addCase(guestCheckout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearGuestCheckoutData } = guestCheckoutSlice.actions;
export default guestCheckoutSlice.reducer;
