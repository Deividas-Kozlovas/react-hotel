import axiosInstance from "./axiosInstance";
import { isAxiosError } from "axios";
import {
  validateEmail,
  validatePassword,
  validatePasswordMatch,
} from "../validation/authValidation";

export const login = async (email: string, password: string) => {
  try {
    if (!validateEmail(email)) {
      console.error("Email is incorrect");
      throw new Error("Email is incorrect");
    }

    if (!validatePassword(password)) {
      console.error("Password min length is 8");
      throw new Error("Password min length is 8");
    }

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

export const register = async (
  name: string,
  email: string,
  password: string,
  passwordConfirm: string
) => {
  try {
    if (!validateEmail(email)) {
      console.error("Email is incorrect");
      throw new Error("Email is incorrect");
    }

    if (!validatePassword(password)) {
      console.error("Password min length is 8");
      throw new Error("Password min length is 8");
    }

    if (!validatePasswordMatch(password, passwordConfirm)) {
      console.error("Passwords do not match");
      throw new Error("Passwords do not match");
    }

    // Corrected the route here
    const response = await axiosInstance.post("/user/signup", {
      name,
      email,
      password,
      passwordConfirm,
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
