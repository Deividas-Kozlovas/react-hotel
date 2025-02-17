import axiosInstance from "./axiosInstance";
import { isAxiosError } from "axios";

export const login = async (email: string, password: string) => {
  try {
    const response = await axiosInstance.post("/user/login", {
      email,
      password,
    });
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
