import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import cartSlice from "./cartSlice";
import filtersSlice from "./filtersSlice";
import piSlice from "./piSlice";

import productsSlice from "./productsSlice";
import proformaInvoicesSlice from "./proformaInvoicesSlice";
import showingSlice from "./showingSlice";
import usersSlice from "./usersSlice";
import stockSlice from "./stockSlice";

export default configureStore({
  reducer: {
    products: productsSlice,
    cart: cartSlice,
    pi: piSlice,
    // products: productReducer,
    show: showingSlice,
    filters: filtersSlice,
    auth: authSlice,
    users: usersSlice,
    proformaInvoices: proformaInvoicesSlice,
    stock: stockSlice,
  },
});
