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
            const token = localStorage.getItem("token");
            if (!token) return rejectWithValue("No token");

            const res=await axios.get('/auth/profile',
                {
                    withCredentials:true,
                }
            )
             return res.data.user
        } catch (error) {
            if(error.response || error.response.status===400)
            {
                return rejectWithValue("Invalid email or password");
            }
              return rejectWithValue("Sign-in");
        }
    }
)