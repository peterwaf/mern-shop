import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API from "../API";
import { createSlice } from "@reduxjs/toolkit";

export const fetchProductCategories = createAsyncThunk(
  "products/fetchProductCategories",
  async () => {
    const response = await axios.get(`${API}/api/v1/categories/all`);
    return response.data.categories;
  }
);

const initialState = {
  data: [],
  status: "idle",
  error: null,
};

const productCategoriesSlice = createSlice({
  name: "productCategories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchProductCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default productCategoriesSlice.reducer;
