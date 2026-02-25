import { createAsyncThunk } from "@reduxjs/toolkit";

import api from "../axios";

//Get all Product
export const fetchAllProducts=createAsyncThunk(
    "products/fetchAll",
    async (_ ,thunkAPI)=>{
        try {
            const response = await api.get("/product/all");
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to fetch products");
        }
    }
)

//CREATE product (with image files)

export const createProduct=createAsyncThunk(
    "products/create",
    async (FormData,thunkAPI)=>{
        try{
            const response=await api.post("/product/upload",FormData,{headers:{"Content-Type":"multipart/form-data"}});
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data?.message || "Failed to create product");
        }
    }
)
export const updateProduct = createAsyncThunk(
  "product/update",
  async ({ id, formData }, thunkAPI) => {
    try {
      const res = await api.put(`/product/update/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return res.data.product;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Update failed");
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "product/delete",
  async (productId, thunkAPI) => {
    try {
      await api.delete(`/product/delete/${productId}`);
      return productId; // return the id to remove it from state
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Delete failed");
    }
  }
);