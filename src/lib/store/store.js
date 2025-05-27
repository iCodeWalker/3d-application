import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "../store/features/authentication/authenticationSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      authentication: authenticationReducer,
    },
  });
};
