import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../axios';

export const loginUser=createAsyncThunk(
    "auth/loginUser",
    async(formData,thunkAPI)=>{
        try{
            const response=await axios.post('/auth/login', formData);
            console.log("Response Data:", response.data);
            return response.data; // { user }
        }catch(error){
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)

export const fetchUserProfile=createAsyncThunk(
    "auth/loadUserProfile",
    async(__, {rejectWithValue})=>{
        try {
            const res=await axios.get('/auth/profile',
                {
                    withCredentials:true,
                }
            )
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
            await axios.post('/auth/logout', {}, { withCredentials: true });
            return true; // Logout successful
        } catch (error) {
            return rejectWithValue("Failed to logout");
        }
    }
)