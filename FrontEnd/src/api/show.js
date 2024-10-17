import { axiosInstance } from "./index";
export const AddShow = async (payload) => {
  try {
    const response = await axiosInstance.post("/shows/addShow", payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const UpdateShow = async (payload) => {
  try {
    const response = await axiosInstance.patch("/shows/updateShow", payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const DeleteShow = async (id) => {
  try {
    const response = await axiosInstance.delete(`/shows/deleteShow/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const GetShowById = async (payload) => {
  try {
    const response = await axiosInstance.post('/shows/getShowById', payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const GetAllShowsByTheater = async (payload) => {
  try {
    const response = await axiosInstance.post("/shows/getAllShowsByTheater", payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const GetAllShowsByMovie = async (payload) => {
  try {
    const response = await axiosInstance.post("/shows/getAllShowsByMovie", payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};
