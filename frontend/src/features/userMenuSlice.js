import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

const userMenuSlice = createSlice({
    name: "userMenu",
    initialState,
    reducers: {
        toggleUserMenu: (state) => !state,
    },
});

export const { toggleUserMenu } = userMenuSlice.actions;
export default userMenuSlice.reducer;