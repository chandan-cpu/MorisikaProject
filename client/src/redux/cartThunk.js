import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../axios';



const addToCart = createAsyncThunk(
    'cart/add',
    async(productId, { rejectWithValue }) => {
        try {
            const res=await api.post(`/cart/addcart/${productId}`);
            return res.data.cartItems;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)
// 2. Fetch Cart (GET)
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/cart/get');
      console.log("Fetched Cart Data:", response.data); // Debug log
      return response.data; // The aggregated list
    } catch (error) {
      return rejectWithValue(error.response?.data?.msg || "Failed to fetch cart");
    }
  }
);

// 3. Remove Item (Used on Cart Page)
export const removeFromCart = createAsyncThunk(
    'cart/remove',
    async (productId, { rejectWithValue }) => {
        try {
            const response = await api.delete(`/cart/remove/${productId}`);
            return response.data.cart; // Updated list after deletion
        } catch (error) {
            return rejectWithValue(error.response?.data?.msg || "Failed to remove item");
        }
    }
);