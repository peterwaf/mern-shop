import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// Helper to calculate totals
const calculateTotals = (cartItems) => {
  const cartItemsQty = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartItemsTotal = cartItems.reduce(
    (acc, item) => acc + parseInt(item.price) * item.quantity,
    0
  );
  return { cartItemsQty, cartItemsTotal };
};

const getInitialCartData = () => {
  const localData = localStorage.getItem("cartItems");
  if (!localData) return { data: [], cartItemsQty: 0, cartItemsTotal: 0 };

  const parsed = JSON.parse(localData);
  const { cartItemsQty, cartItemsTotal } = calculateTotals(parsed);

  return {
    data: parsed,
    cartItemsQty,
    cartItemsTotal,
  };
};

const initialState = {
  ...getInitialCartData(),
  status: "idle",
  error: null,
};

const cartItemsSlice = createSlice({
  name: "cartItems",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemExists = state.data.find(
        (item) => item._id === action.payload._id
      );
      if (itemExists) {
        toast.error("Item already in cart");
        return;
      }

      const newItem = { ...action.payload, quantity: 1 };
      state.data.push(newItem);
      localStorage.setItem("cartItems", JSON.stringify(state.data));

      const { cartItemsQty, cartItemsTotal } = calculateTotals(state.data);
      state.cartItemsQty = cartItemsQty;
      state.cartItemsTotal = cartItemsTotal;

      toast.success("Item added to cart");
    },

    removefromCart: (state, action) => {
      state.data = state.data.filter((item) => item._id !== action.payload);
      localStorage.setItem("cartItems", JSON.stringify(state.data));

      const { cartItemsQty, cartItemsTotal } = calculateTotals(state.data);
      state.cartItemsQty = cartItemsQty;
      state.cartItemsTotal = cartItemsTotal;
    },

    updateCartItem: (state, action) => {
      state.data = state.data.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );
      localStorage.setItem("cartItems", JSON.stringify(state.data));

      const { cartItemsQty, cartItemsTotal } = calculateTotals(state.data);
      state.cartItemsQty = cartItemsQty;
      state.cartItemsTotal = cartItemsTotal;
    },

    updateCartItemsQty: (state, action) => {
      state.data = state.data.map((item) =>
        item._id === action.payload._id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      localStorage.setItem("cartItems", JSON.stringify(state.data));

      const { cartItemsQty, cartItemsTotal } = calculateTotals(state.data);
      state.cartItemsQty = cartItemsQty;
      state.cartItemsTotal = cartItemsTotal;
    },
  },
});

export default cartItemsSlice.reducer;
export const { addToCart, removefromCart, updateCartItem, updateCartItemsQty } =
  cartItemsSlice.actions;
