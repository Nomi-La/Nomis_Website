import {createSlice} from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',

    initialState: {
        userEmail: '',
        user: JSON.parse(localStorage.getItem('user')) || null,
        accessToken: localStorage.getItem("access-token") || null,
        refreshToken: localStorage.getItem("refresh-token") || null,
    },

    reducers: {
        signup: (state, action) => {
            state.userEmail = action.payload;
        },

        login: (state, action) => {
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;

            localStorage.setItem('user', JSON.stringify(action.payload.user));
            localStorage.setItem('access-token', action.payload.accessToken);
            localStorage.setItem('refresh-token', action.payload.refreshToken);
        },

        refresh: (state, action) => {
            state.accessToken = action.payload.accessToken

            localStorage.setItem('access-token', action.payload.accessToken)
        },

        logout: (state) => {
            state.user = null;
            state.accessToken = null;
            state.refreshToken = null;

            localStorage.removeItem('user');
            localStorage.removeItem('access-token');
            localStorage.removeItem('refresh-token')
        },
    }
})

export const {login, logout, refresh} = authSlice.actions;
export default authSlice.reducer;