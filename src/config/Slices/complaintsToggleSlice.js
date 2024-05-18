// signUpToggleSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allowedComplaints: true,
};

export const complaintsToggleSlice = createSlice({
  name: "complaintsToggle",
  initialState,
  reducers: {
    toggleComplaints: (state) => {
      state.allowedComplaints = !state.allowedComplaints;
    },
  },
});

export const { toggleComplaints } = complaintsToggleSlice.actions;
export default complaintsToggleSlice.reducer;
