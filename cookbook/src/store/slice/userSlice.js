import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    userData: (state, action) => {
      state.user = action.payload.user;

      localStorage.setItem("user", JSON.stringify(action.payload.user));
    },
    /* updateUserProfile: (state, action) => {
            state.user = {
                ...state.user,
                ...action.payload,
            }
            localStorage.setItem('user', JSON.stringify(state.user))
        }, */
  },
});

export const { userData /* updateUserProfile */ } = userSlice.actions;
export default userSlice.reducer;
