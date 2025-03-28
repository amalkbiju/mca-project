// src/redux/cartSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: {},
  totalItems: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, name, price, images, productType } = action.payload;

      // Convert price string to number (e.g. "$15/kg" -> 15)
      const numericPrice = parseFloat(price.replace(/[^\d.]/g, ""));

      if (state.items[id]) {
        state.items[id].quantity += 1;
      } else {
        state.items[id] = {
          id,
          productType,
          price,
          numericPrice,
          images,
          quantity: 1,
        };
      }

      state.totalItems += 1;
      state.totalAmount += numericPrice;
    },
    removeFromCart: (state, action) => {
      const id = action.payload;

      if (state.items[id]) {
        const numericPrice = state.items[id].numericPrice;

        if (state.items[id].quantity > 1) {
          state.items[id].quantity -= 1;
        } else {
          delete state.items[id];
        }

        state.totalItems -= 1;
        state.totalAmount -= numericPrice;
      }
    },
    clearCart: (state) => {
      state.items = {};
      state.totalItems = 0;
      state.totalAmount = 0;
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
