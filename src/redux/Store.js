import { configureStore } from "@reduxjs/toolkit";
import { GeneralReducer } from "./GeneralAction";
import cartReducer from "./cartSlice";

const Store = configureStore({
  reducer: {
    generalState: GeneralReducer,
    cart: cartReducer,
  },
});

export default Store;
