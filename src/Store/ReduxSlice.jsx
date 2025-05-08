import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  open: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    open: (state) => {
      state.open = true;
    },
    close: (state) => {
      state.open = false;
    },
  },
});
export const { open, close } = modalSlice.actions;
export default modalSlice.reducer;
