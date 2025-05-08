import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./modalSlice";
import formReducer from "./formSlice";

const store = configureStore({
  reducer: {
    modal: modalSlice,
    form: formReducer,
  },
});
export default store;
