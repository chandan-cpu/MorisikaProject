import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../axios';
import { toast } from 'react-toastify';



export const addToCart = createAsyncThunk(
    'cart/add',
    async(productId, { rejectWithValue }) => {
        try {
            const res=await api.post(`/cart/addcart/${productId}`);
            toast.success(res.data.msg);
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
            toast.success(response.data.msg);
            return response.data.cartItems; // Updated list after deletion
        } catch (error) {
            return rejectWithValue(error.response?.data?.msg || "Failed to remove item");
        }
    }
);

export const updateQuantity = createAsyncThunk(
  'cart/updateQuantity',
  async ({ productId, delta }, { rejectWithValue }) => {
    try {
      // delta is +1 (plus) or -1 (minus)
      const response = await api.put('/cart/update-quantity', { productId, delta });
      return response.data; // The full updated array
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);