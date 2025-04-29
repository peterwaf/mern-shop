import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import API from "../API";
import { createSlice } from "@reduxjs/toolkit";

import { toast } from "react-toastify";

export const fetchProductCategories = createAsyncThunk(
  "products/fetchProductCategories",
  async () => {
    const response = await axios.get(`${API}/api/v1/categories/all`);
    return response.data.categories;
  }
);

export const loadProductCategory = createAsyncThunk(
  "products/loadProductCategory",
  async (categoryId) => {
    const response = await axios.get(
      `${API}/api/v1/categories/load/${categoryId}`
    );
    return response.data.category.name;
  }
);

export const updateProductCategory = createAsyncThunk(
  "products/updateProductCategory",
  async ({ category, categoryId }, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append("name", category);
    try {
      const response = await axios.patch(
        `${API}/api/v1/categories/update/${categoryId}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(response.data.message);
      return response.data.updatedCategory.name;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const addProductCategory = createAsyncThunk(
  "products/addProductCategory",
  async (category, { rejectWithValue }) => {
    //rejectValue for later user feedback
    try {
      const formData = new FormData();
      formData.append("name", category);
      const response = await axios.post(
        `${API}/api/v1/categories/add`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(response.data.message);
      return response.data.savedCategory;
    } catch (error) {
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const deleteProductCategory = createAsyncThunk(
  "products/deleteProductCategory",
  async (categoryId, { rejectWithValue }) => {
    const consent = confirm("Are you sure you want to delete this category?");
    if (consent) {
      try {
        const response = await axios.delete(
          `${API}/api/v1/categories/delete/${categoryId}`
        ); 
        return response.data.deletedCategory;
      } catch (error) {
        return rejectWithValue(error.response.data.error);
      }
    }
    return null;
  }
);

const initialState = {
  data: [],
  status: "idle",
  error: null,
  loadedProdCategory: null,
  loadedProdCategoryStatus: "idle",
  loadedProdCategoryError: null,
  addProdCategoryStatus: "idle",
  addProdCategoryError: null,
  deletedProdCategoryStatus: "idle",
  deletedProdCategoryError: null,
  updatedCategoryStatus: "idle",
  updatedCategoryError: null,
  updatedCategory: null,
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
      })
      .addCase(loadProductCategory.pending, (state) => {
        state.loadedProdCategoryStatus = "loading";
      })
      .addCase(loadProductCategory.fulfilled, (state, action) => {
        state.loadedProdCategoryStatus = "succeeded";
        state.loadedProdCategory = action.payload;
      })
      .addCase(loadProductCategory.rejected, (state, action) => {
        state.loadedProdCategoryStatus = "failed";
        state.loadedProdCategoryError = action.error.message;
      })
      .addCase(addProductCategory.fulfilled, (state, action) => {
        state.data.push(action.payload);
        state.addProdCategoryStatus = "succeeded";
      })
      .addCase(addProductCategory.rejected, (state, action) => {
        state.addProdCategoryStatus = "failed";
        state.addProdCategoryError = action.payload || action.error.message;
      })
      .addCase(deleteProductCategory.fulfilled, (state, action) => {
        state.data = state.data.filter(
          (category) => category._id !== action.payload._id
        );
        state.deletedProdCategoryStatus = "succeeded";
      })
      .addCase(deleteProductCategory.rejected, (state, action) => {
        state.deletedProdCategoryStatus = "failed";
        state.deletedProdCategoryError = action.payload || action.error.message;
      })
      .addCase(updateProductCategory.fulfilled, (state, action) => {
        state.updatedCategoryStatus = "succeeded";
        state.updatedCategory = action.payload;
      })
      .addCase(updateProductCategory.rejected, (state, action) => {
        state.updatedCategoryStatus = "failed";
        state.updatedCategoryError = action.payload || action.error.message;
      });
  },
});

export default productCategoriesSlice.reducer;
