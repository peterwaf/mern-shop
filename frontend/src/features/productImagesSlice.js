import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API from "../API";
import { createSlice } from "@reduxjs/toolkit";

//add image to product at http://localhost:5000/api/v1/images/add/67dcf1e0bfa00b18666e9fc2

export const addProductImage = createAsyncThunk(
  "products/addProductImage",
  async ({ id, imageData }) => {
    const formData = new FormData();
    formData.append("name", imageData.name);
    formData.append("altText", imageData.altText);
    formData.append("isFeatured", imageData.isFeatured);
    formData.append("productId", id);
    formData.append("image", imageData.image); // Make sure this is the File object

    const response = await axios.post(
      `${API}/api/v1/images/add/${id}`,
      formData, // Send the FormData object to the backend
      {
        headers: {
          "Content-Type": "multipart/form-data", // Important for file uploads
        },
      }
    );
    return response.data;
  }
);

//fetch images at http://localhost:5000/api/v1/images/product/67dcf1e0bfa00b18666e9fc2
export const fetchProductImages = createAsyncThunk(
  "products/fetchProductImages",
  async (productId) => {
    const response = await axios.get(
      `${API}/api/v1/images/product/${productId}`
    );
    return response.data.productImages;
  }
);

// from backend - delete image route router.delete("/api/v1/images/delete/:id", deleteImage);

export const deleteProductImage = createAsyncThunk(
  "products/deleteProductImage",
  async (imageId) => {
    const consent = confirm("Are you sure you want to delete this image?");
    if (consent) {
      const response = await axios.delete(
        `${API}/api/v1/images/delete/${imageId}`
      );
      return response.data;
    }
    return null;
  }
);

const productImagesSlice = createSlice({
  name: "productImages",
  initialState: {
    data: [],
    status: "idle",
    error: null,
    deleteStatus: "idle", // NEW: Tracks delete status
    deleteError: null, // NEW: Tracks delete errors
    addImgStatus: "idle",
    addImgError: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProductImages.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchProductImages.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.data = action.payload;
    });
    builder.addCase(fetchProductImages.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
    builder.addCase(deleteProductImage.pending, (state) => {
      state.deleteStatus = "loading";
    });
    builder.addCase(deleteProductImage.rejected, (state, action) => {
      state.deleteStatus = "failed";
      state.deleteError = action.error.message;
    });
    builder.addCase(deleteProductImage.fulfilled, (state, action) => {
      state.data = state.data.filter(
        (image) => image._id !== action.payload._id
      );
    });
    builder.addCase(addProductImage.fulfilled, (state, action) => {
      state.data.push(action.payload.data);
    });
    builder.addCase(addProductImage.rejected, (state, action) => {
      state.addImgStatus = "failed";
      state.addImgError = action.error.message;
    });
    builder.addCase(addProductImage.pending, (state) => {
      state.addImgError = null;
      state.addImgStatus = "loading";
    });
  },
  reducers: {
    resetProductImages: (state) => {
      state.data = [];
      state.status = "idle";
      state.error = null;
    },
  },
});

export default productImagesSlice.reducer;
export const { resetProductImages } = productImagesSlice.actions;
