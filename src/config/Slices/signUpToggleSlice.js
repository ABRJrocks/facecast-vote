// signUpToggleSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signUp: true,
};

export const signUpToggleSlice = createSlice({
  name: "signUpToggle",
  initialState,
  reducers: {
    toggleSignUp: (state) => {
      state.signUp = !state.signUp;
    },
  },
});

export const { toggleSignUp } = signUpToggleSlice.actions;
export default signUpToggleSlice.reducer;
