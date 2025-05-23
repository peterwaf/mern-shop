import { createSlice } from "@reduxjs/toolkit";
const initialState = false;
const isUserLoggedInSlice = createSlice({
    name: "isUserLoggedIn",
    initialState,
    reducers: {
        updateLoggedInStatus: (state) => {
            const token = localStorage.getItem("token");
            state = token ? true : false;
            return state;
        },
    },
});

export default isUserLoggedInSlice.reducer;
export const { updateLoggedInStatus } = isUserLoggedInSlice.actions;