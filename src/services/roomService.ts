import axios from "./axiosInstance";
import { isAxiosError } from "axios";

export const getAllRooms = async () => {
  try {
    const response = await axios.get("/rooms");
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error("Axios error:", error.response?.data || error.message);
    } else {
      console.error("Unexpected error:", error);
    }
    throw error;
  }
};
