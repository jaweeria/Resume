// formSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  url: "https://storage.rxresu.me/cma4xwa7e340sq9p309z7givr/pictures/k1zo0mzxn68mzr0ieu8nk5z0.jpg",
  fullname: "",
  heading: "",
  email: "",
  phone: "",
  website: "",
  location: "",
  label: "",
  summary: "",
  title: "Summary",
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateField: (state, action) => {
      const { field, value } = action.payload;
      state[field] = value;
    },
    resetForm: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const { updateField, resetForm } = formSlice.actions;
export default formSlice.reducer;
