import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from '../axios';

export const loginUser=createAsyncThunk(
    "auth/loginUser",
    async(userData,thunkAPI)=>{
        try{
            const response=await axios.post('/auth/login',userData);
            return response.data; // { user }
        }catch(error){
            return thunkAPI.rejectWithValue(error.response.data);
        }
    }
)