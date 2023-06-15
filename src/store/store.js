import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";

import usersSlice from "./usersSlice";

export default configureStore({
  reducer: {
  
    auth: authSlice,
    users: usersSlice,
    
  },
});
