import { configureStore } from "@reduxjs/toolkit";
import loadersReducer from "./loaderSlice";
import userReducer from "./userSlice";
import moviesSlice from "./moviesSlice";
import theatersSlice from "./theatersSlice";

const store = configureStore({
  reducer: {
    loader: loadersReducer,
    user: userReducer,
    movies: moviesSlice,
    theaters: theatersSlice,
  },
});

export default store;
