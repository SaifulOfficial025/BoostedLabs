import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL } from "./baseUrl";
import { toast } from "react-toastify";

// Async thunk to add product to cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (productId, { rejectWithValue }) => {
    try {
      const authData = localStorage.getItem("auth");
      const token = authData ? JSON.parse(authData).access : null;

      if (!token) {
        toast.error("Please login to add items to cart");
        return rejectWithValue("No access token found");
      }

      const response = await fetch(
        `${BASE_URL}/shop/products/${productId}/add-to-cart/`,
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
        toast.error(errorData.message || "Failed to add to cart");
        return rejectWithValue(errorData.message || "Failed to add to cart");
      }

      const data = await response.json();
      toast.success(data.message || "Product added to cart");
      return data;
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to fetch cart data
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const authData = localStorage.getItem("auth");
      const token = authData ? JSON.parse(authData).access : null;

      if (!token) {
        return rejectWithValue("No access token found");
      }

      const response = await fetch(`${BASE_URL}/shop/cart/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        return rejectWithValue("Failed to fetch cart");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to remove item from cart
export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async (cartId, { rejectWithValue }) => {
    try {
      const authData = localStorage.getItem("auth");
      const token = authData ? JSON.parse(authData).access : null;

      if (!token) {
        return rejectWithValue("No access token found");
      }

      const response = await fetch(`${BASE_URL}/shop/cart/remove/${cartId}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        return rejectWithValue("Failed to remove item");
      }

      const data = await response.json();
      toast.success(data.message || "Item removed from cart");
      return cartId;
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to increase quantity
export const increaseQuantity = createAsyncThunk(
  "cart/increaseQuantity",
  async (cartId, { rejectWithValue }) => {
    try {
      const authData = localStorage.getItem("auth");
      const token = authData ? JSON.parse(authData).access : null;

      if (!token) {
        return rejectWithValue("No access token found");
      }

      const response = await fetch(
        `${BASE_URL}/shop/cart/items/increase/${cartId}/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        return rejectWithValue("Failed to increase quantity");
      }

      const data = await response.json();
      toast.success(data.message || "Quantity increased");
      return { cartId, quantity: data.quantity };
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to decrease quantity
export const decreaseQuantity = createAsyncThunk(
  "cart/decreaseQuantity",
  async (cartId, { rejectWithValue }) => {
    try {
      const authData = localStorage.getItem("auth");
      const token = authData ? JSON.parse(authData).access : null;

      if (!token) {
        return rejectWithValue("No access token found");
      }

      const response = await fetch(
        `${BASE_URL}/shop/cart/items/decrease/${cartId}/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        return rejectWithValue("Failed to decrease quantity");
      }

      const data = await response.json();
      toast.success(data.message || "Quantity decreased");
      return { cartId, quantity: data.quantity };
    } catch (error) {
      toast.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk to checkout
export const checkout = createAsyncThunk(
  "cart/checkout",
  async ({ address, isSubscription }, { rejectWithValue }) => {
    try {
      const authData = localStorage.getItem("auth");
      const token = authData ? JSON.parse(authData).access : null;

      if (!token) {
        return rejectWithValue("No access token found");
      }

      const response = await fetch(`${BASE_URL}/shop/checkout/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address,
          is_subscription: isSubscription,
        }),
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
  items: [],
  subtotal: 0,
  shippingFee: 0,
  total: 0,
  loading: false,
  error: null,
  checkoutData: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.items = [];
      state.subtotal = 0;
      state.shippingFee = 0;
      state.total = 0;
      state.error = null;
    },
    clearCheckoutData: (state) => {
      state.checkoutData = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items || [];
        state.subtotal = action.payload.subtotal || 0;
        state.shippingFee = action.payload.shipping_fee || 0;
        state.total = action.payload.total || 0;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Remove cart item
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload);
        // Recalculate totals
        state.subtotal = state.items.reduce(
          (sum, item) =>
            sum +
            parseFloat(
              item.product.discounted_price || item.product.initial_price
            ) *
              item.quantity,
          0
        );
        state.shippingFee = state.subtotal > 0 ? state.shippingFee : 0;
        state.total = state.subtotal + state.shippingFee;
      })
      // Increase quantity
      .addCase(increaseQuantity.fulfilled, (state, action) => {
        const item = state.items.find(
          (item) => item.id === action.payload.cartId
        );
        if (item) {
          item.quantity = action.payload.quantity;
          // Recalculate totals
          state.subtotal = state.items.reduce(
            (sum, item) =>
              sum +
              parseFloat(
                item.product.discounted_price || item.product.initial_price
              ) *
                item.quantity,
            0
          );
          state.total = state.subtotal + state.shippingFee;
        }
      })
      // Decrease quantity
      .addCase(decreaseQuantity.fulfilled, (state, action) => {
        const item = state.items.find(
          (item) => item.id === action.payload.cartId
        );
        if (item) {
          item.quantity = action.payload.quantity;
          // Recalculate totals
          state.subtotal = state.items.reduce(
            (sum, item) =>
              sum +
              parseFloat(
                item.product.discounted_price || item.product.initial_price
              ) *
                item.quantity,
            0
          );
          state.total = state.subtotal + state.shippingFee;
        }
      })
      // Checkout
      .addCase(checkout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkout.fulfilled, (state, action) => {
        state.loading = false;
        state.checkoutData = action.payload;
      })
      .addCase(checkout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCart, clearCheckoutData } = cartSlice.actions;
export default cartSlice.reducer;
