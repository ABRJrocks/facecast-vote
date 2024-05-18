// store.js
import { configureStore } from "@reduxjs/toolkit"; // Importing the default export
import walletReducer from "./Slices/walletSlice"; // Importing the default export

const store = configureStore({
  reducer: {
    voteAmountWallet: walletReducer,
  },
});

export default store;
