import { createAsyncThunk } from "@reduxjs/toolkit";
import api from '../axios';

export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (formData, thunkAPI) => {
        try {
            const response = await api.post('/auth/register', formData);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response?.data || { msg: "Signup Failed" });
        }
    }
)

export const loginUser=createAsyncThunk(
    "auth/loginUser",
    async(formData,thunkAPI)=>{
        try{
            const response=await api.post('/auth/login', formData);
            console.log("Response Data:", response.data);
            return response.data; // { user }
        }catch(error){
            return thunkAPI.rejectWithValue(error.response?.data || { msg: "Login Failed" });
        }
    }
)

export const fetchUserProfile=createAsyncThunk(
    "auth/loadUserProfile",
    async(__, {rejectWithValue})=>{
        try {
            const res=await api.get('/auth/profile')
             return res.data;
        } catch (error) {
            if(error.response && error.response.status===401)
            {
                return rejectWithValue("Session expired, please login again");
            }
              return rejectWithValue("Failed to load profile");
        }
    }
)

export const logoutUser=createAsyncThunk(
    "auth/logoutUser",
    async(__, {rejectWithValue})=>{
        try {
            await api.post('/auth/logout');
            return true; // Logout successful
        } catch (error) {
            return rejectWithValue("Failed to logout");
        }
    }
)