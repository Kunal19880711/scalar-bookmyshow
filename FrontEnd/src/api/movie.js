import { axiosInstance } from "./index";

export const GetAllMovies = async () => {
  try {
    const response = await axiosInstance.get("/movies/getAllMovies");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateMovie = async (payload) => {
  try {
    const response = await axiosInstance.patch("/movies/updateMovie", payload);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const addMovie = async (payload) => {
  try {
    const response = await axiosInstance.post("/movies/addMovie", payload);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};


export const deleteMovie = async (movieId) => {
  try {
    const response = await axiosInstance.delete(`/movies/deleteMovie/${movieId}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
