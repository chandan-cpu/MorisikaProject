import { createSlice } from "@reduxjs/toolkit";
import { fetchCart } from "./cartThunk"; // Import your fetch thunk
import { logoutUser } from "./authThunk";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],      // This will hold the aggregated product data
    loading: false, // For showing a spinner while fetching
    error: null,    // For showing error messages
  },
  reducers: {
    // Standard reducer to reset state (useful on logout)
    resetCartState: (state) => {
      state.cartItems = [];
      state.error = null;
      state.loading = false;
    }
  },
  extraReducers: (builder) => {
    builder
      // 1. When the request starts
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // 2. When data is successfully received
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        // action.payload is the array returned from your Aggregation Pipeline
        state.cartItems = action.payload.cartItems;
      })
      // 3. When the request fails
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // "Failed to fetch cart" or server error
      })
      // Clear cart on logout (assuming logoutUser is an async thunk that clears cookies/session on the backend)
      .addCase(logoutUser.fulfilled, (state) => {
        state.cartItems = [];
        state.loading = false;
        state.error = null;
      });
  },
});

export const { resetCartState } = cartSlice.actions;
export default cartSlice.reducer;