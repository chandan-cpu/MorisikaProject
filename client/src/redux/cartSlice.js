import { createSlice } from "@reduxjs/toolkit";
import { addToCart, fetchCart, removeFromCart, updateQuantity } from "./cartThunk"; // Import your fetch thunk
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
    .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload.cartItems || action.payload; // Update with the new cart items
        state.error = null;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
      })

      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload.items || action.payload;
        state.error = null;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
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
      })
      /* --- UPDATE QUANTITY (The Missing Piece!) --- */
      .addCase(updateQuantity.pending, (state) => {
    
      })
      .addCase(updateQuantity.fulfilled, (state, action) => {
        state.loading = false;
        // This replaces the old list with the brand new math from the DB
        state.cartItems = action.payload.cartItems || action.payload;
        state.error = null;
      })
      .addCase(updateQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export const { resetCartState } = cartSlice.actions;
export default cartSlice.reducer;