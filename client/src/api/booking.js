import { axiosInstance } from "./index";

export const MakePaymentAndBookShow = async (bookingData) => {
  try {
    const response = await axiosInstance.post(
      "/bookings/makePaymentAndBookShow",
      bookingData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const GetAllBookings = async (userId) => {
  try {
    const response = await axiosInstance.get(`/bookings/getAllBookings`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
