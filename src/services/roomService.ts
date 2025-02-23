import axios from "./axiosInstance";
import { isAxiosError } from "axios";
import { Room } from "../actions/roomActions";

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

// roomService.ts

export const createRoom = async (roomData: Room) => {
  try {
    const response = await axios.post("/rooms", roomData);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error("Axios error:", error.response?.data || error.message);

      if (error.response?.data?.message === "Room number already exists.") {
        throw new Error("Room number already exists.");
      }

      throw new Error(error.response?.data.message || "Failed to create room");
    } else {
      console.error("Unexpected error:", error);
      throw new Error("Unexpected error occurred while creating room");
    }
  }
};
