import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../API";
import { createSlice } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get(`${API}/api/v1/products/all`);
    return response.data.data;
  }
);


export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (productId) => {
    const consent = confirm("Are you sure you want to delete this product?");
    if (consent) {
      const response = await axios.delete(
        `${API}/api/v1/products/delete/${productId}`
      );
      return response.data;
    }
    return null; // Explicit return
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    data: [],
    status: "idle",
    error: null,
    deleteStatus: "idle", // NEW: Tracks delete status
    deleteError: null, // NEW: Tracks delete errors
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.deleteStatus = "loading";
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.deleteStatus = "failed";
        state.deleteError = action.payload?.error || "Something went wrong";
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        if (!action.payload) return; // Skip if payload is null (user canceled)
        state.deleteStatus = "succeeded";
        const deletedProductId = action.payload.deletedProduct._id;
        if (Array.isArray(state.data)) {
          state.data = state.data.filter(product => product._id !== deletedProductId);
        }
      })
  },
});

export default productsSlice.reducer;
