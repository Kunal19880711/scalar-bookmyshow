import { axiosInstance } from "./index";

export const RegisterUser = async (value) => {
  try {
    const response = await axiosInstance.post("/users/register", value);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const LoginUser = async (value) => {
  try {
    const response = await axiosInstance.post("/users/login", value);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const GetCurrentUser = async () => {
  try {
    const response = await axiosInstance.get("/users/currentUser");
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
