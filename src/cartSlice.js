import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [{ id: "1", quantity: 1 }],
    deliveryType: "standard",
  },
  reducers: {
    addToCart: (state, action) => {
      // check if item already exists in cart
      const index = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index !== -1) {
        // if it does, update the quantity
        // if quantity is 0, remove it from the cart
        if (action.payload.quantity === 0) {
          state.cartItems = state.cartItems.filter(
            (item) => item.id !== action.payload.id
          );
          return;
        }
        state.cartItems[index].quantity = action.payload.quantity;
        return;
      }
      // if it doesn't, add it to the cart
      state.cartItems = [...state.cartItems, action.payload];
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload.id
      );
    },
    setDeliveryType: (state, action) => {
      state.deliveryType = action.payload;
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
