import {axiosInstance} from "./index";

export const GetAllMovies = async () => {
    try {
        const response = await axiosInstance.get("/movies/getAllMovies");
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};