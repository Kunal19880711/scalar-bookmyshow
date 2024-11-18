import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { GetAllTheaters } from "../api/theater";
import { hideLoading, showLoading } from "./loaderSlice";
import { extractErrorMsg } from "../utils";

export const getTheatersThunk = createAsyncThunk(
  "theaters/getTheaters",
  async (_, { dispatch }) => {
    try {
      dispatch(showLoading());
      const response = await GetAllTheaters();
      response?.data.forEach((entity) => {
        entity.key = entity._id;
      });
      dispatch(
        setTheatersState({ theaters: response?.data, errorMessage: null })
      );
      return response?.data;
    } catch (err) {
      dispatch(
        setTheatersState({ theaters: [], errorMessage: extractErrorMsg(err) })
      );
      throw err;
    } finally {
      dispatch(hideLoading());
    }
  }
);

const theatersSlice = createSlice({
  name: "theaters",
  initialState: {
    theaters: [],
    errorMessage: null,
  },
  reducers: {
    setTheatersState: (state, action) => {
      state.theaters = action.payload.theaters;
      state.errorMessage = action.payload.errorMessage;
    },
  },
});

export const { setTheatersState } = theatersSlice.actions;
export default theatersSlice.reducer;
