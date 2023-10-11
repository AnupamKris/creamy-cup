import { configureStore } from "@reduxjs/toolkit";
import authStateReducer from "./authStateSlice";
import cartReducer from "./cartSlice";

export default configureStore({
  reducer: {
    authState: authStateReducer,
    cart: cartReducer,
  },
});
