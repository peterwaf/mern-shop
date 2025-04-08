import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API from "../API";
import { createSlice } from "@reduxjs/toolkit";

export const loadProductInfo = createAsyncThunk(
    "products/loadProductInfo",
    async (productId) => {
      const response = await axios.get(
        `${API}/api/v1/products/load/${productId}`
      );
      return response.data;
    }
  );


  const loadProductInfoSlice = createSlice({
    name: "loadProductInfo",
    initialState: {
      data: [],
      status: "idle",
      error: null,
    },
    extraReducers: (builder) => {
      builder
        .addCase(loadProductInfo.pending, (state) => {
          state.status = "loading";
        })
        .addCase(loadProductInfo.fulfilled, (state, action) => {
          state.status = "succeeded";
          state.data = action.payload;
        })
        .addCase(loadProductInfo.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.error.message;
        });
    },
  });

  export default loadProductInfoSlice.reducer;