import {configureStore } from "@reduxjs/toolkit"; //createSlice
import apiReducer from "./reducers/api-reducer";
import cartReducer from "../redux/reducers/cart.reducer";


const store = configureStore({
  reducer: {
    photos:apiReducer,
    cart:cartReducer,
  },
});

export default store;


