import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find((item) => item._id === product._id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          _id: product._id,
          name: product.name,
          price: product.discountPrice > 0 ? product.discountPrice : product.price,
          originalPrice: product.price,
          discount: product.discountPrice > 0 ? Math.round(((product.price - product.discountPrice) / product.price) * 100) : 0,
          quantity: 1,
          image: product.images?.[0] || product.image,
          color: "Standard", // Default values
          seller: "Official Store",
          delivery: "3 days",
          freeDelivery: true
        });
      }
    },
    updateQuantity: (state, action) => {
      const { _id, delta } = action.payload;
      const item = state.items.find((i) => i._id === _id);
      if (item) {
        item.quantity = Math.max(1, item.quantity + delta);
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
    },
  },
});

export const { addToCart, updateQuantity, removeItem } = cartSlice.actions;
export default cartSlice.reducer;