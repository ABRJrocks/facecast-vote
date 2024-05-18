// walletSlice.js
import { createSlice } from "@reduxjs/toolkit";

const walletSlice = createSlice({
  name: "wallet",
  initialState: {
    value: 10,
  },
  reducers: {
    decrementVoteAmount: (state) => {
      state.value -= 5;
    },
  },
});

export const { decrementVoteAmount } = walletSlice.actions;

export default walletSlice.reducer;
