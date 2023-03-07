import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slice/usersSlice";


export const store = configureStore({
  reducer: {
    users: userReducer,
  },
});