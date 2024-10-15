export const GetAllTheaters = async () => {
  try {
    const response = await axiosInstance.get("/theaters/getAllTheaters");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const GetAllTheatersByOwner = async () => {
  try {
    const response = await axiosInstance.get("/theaters/getAllTheatersByOwner");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const AddTheater = async (payload) => {
  try {
    const response = await axiosInstance.post("/theaters/addTheater", payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const UpdateTheater = async (payload) => {
  try {
    const response = await axiosInstance.put(
      "/theaters/updateTheater",
      payload
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const DeleteTheater = async (theaterId) => {
  try {
    const response = await axiosInstance.delete(
      `/theaters/deleteTheater/${theaterId}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
