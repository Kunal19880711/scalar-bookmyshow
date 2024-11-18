import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetAllMovies } from "../api/movie";
import { hideLoading, showLoading } from "./loaderSlice";
import { extractErrorMsg } from "../utils";

export const getMoviesThunk = createAsyncThunk(
  "movies/getMovies",
  async (_, { dispatch }) => {
    try {
      dispatch(showLoading());
      const response = await GetAllMovies();
      response?.data.forEach((entity) => {
        entity.key = entity._id;
      });
      dispatch(setMoviesState({ movies: response?.data, errorMessage: null }));
    } catch (err) {
      dispatch(
        setMoviesState({ movies: [], errorMessage: extractErrorMsg(err) })
      );
    } finally {
      dispatch(hideLoading());
    }
  }
);

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    errorMessage: null,
  },
  reducers: {
    setMoviesState: (state, action) => {
      state.movies = action.payload.movies;
      state.errorMessage = action.payload.errorMessage;
    },
  },
});

export const { setMoviesState } = moviesSlice.actions;
export default moviesSlice.reducer;
