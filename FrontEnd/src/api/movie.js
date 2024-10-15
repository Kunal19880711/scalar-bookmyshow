import { axiosInstance } from "./index";

export const GetAllMovies = async () => {
  try {
    const response = await axiosInstance.get("/movies/getAllMovies");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const UpdateMovie = async (payload) => {
  try {
    const response = await axiosInstance.patch("/movies/updateMovie", payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const AddMovie = async (payload) => {
  try {
    const response = await axiosInstance.post("/movies/addMovie", payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};


export const DeleteMovie = async (movieId) => {
  try {
    const response = await axiosInstance.delete(`/movies/deleteMovie/${movieId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
