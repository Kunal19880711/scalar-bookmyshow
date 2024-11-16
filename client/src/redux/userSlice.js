import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        token: null,
        initializing: true,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setInitializing: (state, action) => {
            state.initializing = action.payload;
        },
        logout: (state) => {
            localStorage.removeItem("tokenForBMS");
            state.user = null;
            state.token = null;
        },
    },
});

export const { setUser, setToken, setInitializing, logout } = userSlice.actions;
export default userSlice.reducer;