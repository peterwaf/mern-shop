import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
const initialState = {
  data: [],
  status: "idle",
  error: null,
};

const cartItemsSlice = createSlice({
  name: "cartItems",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemExists = localStorage.getItem("cartItems")?JSON.parse(localStorage.getItem("cartItems")).find(
        (item) => item._id === action.payload._id
      ):false;
      if (itemExists) {
        state.data = JSON.parse(localStorage.getItem("cartItems"));
        toast.error("Item already in cart");
        return;
      }
      state.data.push(action.payload);
      localStorage.setItem("cartItems", JSON.stringify(state.data));
      toast.success("Item added to cart");
    },
    removefromCart: (state, action) => {
      state.data = state.data.filter((item) => item._id !== action.payload);
      localStorage.setItem("cartItems", JSON.stringify(state.data));
    },
    updateCartItem: (state, action) => {
      state.data = state.data.map((item) => {
        if (item._id === action.payload._id) {
          return action.payload;
        }
        return item;
      });
      localStorage.setItem("cartItems", JSON.stringify(state.data));
    },
  },
});

export default cartItemsSlice.reducer;
export const { addToCart, removefromCart, updateCartItem } =
  cartItemsSlice.actions;
