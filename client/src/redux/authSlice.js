import { createSlice } from "@reduxjs/toolkit";
import { loginUser, fetchUserProfile } from "./authThunk";

const initialState = {
  user: null,
  token: null,
  loading: false,
  isError: false,
  errorMessage: "",

};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
    clearError(state) {
      state.errorMessage = "";
    }
  },
    extraReducers: (builder) => {
      builder
        .addCase(loginUser.pending, (state) => {
          state.loading = true;
          state.isError = false;
          state.errorMessage = "";
        })
        .addCase(loginUser.fulfilled, (state, action) => {
          state.loading = false;
          state.user = action.payload.user;
          console.log("Payload Token:", action.payload.token);
          state.token = action.payload.token;
        })
        .addCase(loginUser.rejected, (state, action) => {
          state.loading = false;
          state.isError = true;
          state.errorMessage = action.payload.msg || "Login Failed";
        })

        //Fetch User Profile
        .addCase(fetchUserProfile.pending, (state) => {
          state.loading = true;
          state.isError = false;
          state.errorMessage = "";
        })
        .addCase(fetchUserProfile.fulfilled, (state, action) => {
          state.loading = false;
          state.user = action.payload;
        })
        .addCase(fetchUserProfile.rejected, (state, action) => {
          state.loading = false;
          state.isError = true;
          state.errorMessage = action.payload || "Failed to load user profile";
        });
    }
  })
export const { logout,clearError } = authSlice.actions;

export default authSlice.reducer;
