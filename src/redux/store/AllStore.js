import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "../slice/AuthSlice";
import BlogSlice from "../slice/BlogSlice";

const Store = configureStore({
  reducer: {
    AuthSlice,
    BlogSlice,
  },
});

export default Store;
