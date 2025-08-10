import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userEmail: "",
    user: localStorage.getItem("user") || null,
    accessToken: localStorage.getItem("access-token") || null,
    refreshToken: localStorage.getItem("refresh-token") || null,
  },
  reducers: {
    signUp: (state, action) => {
      state.userEmail = action.payload;
    },
    loginUser: (state, action) => {
      // after the fetching of the token & userdata
      // this data is passed to the action payload
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      // save tokens & userdata into localStorage
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("access-token", action.payload.accessToken);
      localStorage.setItem("refresh-token", action.payload.refreshToken);
    },
    logoutUser: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      // remove userdata from localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("access-token");
      localStorage.removeItem("refresh-token");
    },
  },
});

export const { loginUser, logoutUser, signUp } = authSlice.actions;
export default authSlice.reducer;
