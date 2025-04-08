import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

const imagesMenuSlice = createSlice({
    name: "imagesMenu",
    initialState,
    reducers:{
        toggleImagesMenu: (state) => !state}
})

export const {toggleImagesMenu} = imagesMenuSlice.actions;
export default imagesMenuSlice.reducer;