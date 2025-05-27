import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  userData: {},
  items: [],
};

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    add: (state, action) => {
      // Magic
      // Immer will handle the mutation
      state.items.push(action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { add } = authenticationSlice.actions;

export default authenticationSlice.reducer;
