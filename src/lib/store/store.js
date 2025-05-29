import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "../store/features/authentication/authenticationSlice";
import floorReducer from "./features/building/floorSlice/floorSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      authentication: authenticationReducer,
      floor: floorReducer,
    },
  });
};
