import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "./authThunk";

const initialState={
  user:null,
  token:null,
  loading:false,
  isError:false,
  errorMessage:"",

};

const authSlice=createSlice({
  name:"auth",
  initialState,
  reducers:{
    logout:(state)=>{
      state.user=null;
      state.token=null;
    }
  },
  extraReducers:(builder)=>{
    builder
    .addCase(loginUser.pending,(state)=>{
      state.loading=true;
      state.isError=false;
      state.errorMessage="";
    })
    .addCase(loginUser.fulfilled,(state,action)=>{
      state.loading=false;
      state.user=action.payload.user;
      state.token=action.payload.token;
    })
    .addCase(loginUser.rejected,(state,action)=>{
      state.loading=false;
      state.isError=true;
      state.errorMessage=action.payload.msg || "Login Failed";
    })
  }
})

export const {logout}=authSlice.actions;

export default authSlice.reducer;
