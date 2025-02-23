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

export const createRoom = async (roomData: {
  number: string;
  capacity: number;
  floor: number;
  pricing: number;
  wifi: boolean;
  parking: boolean;
  breakfast: boolean;
  imageFile: File | null;
}) => {
  if (
    !roomData.number ||
    !roomData.imageFile ||
    !roomData.pricing ||
    !roomData.capacity
  ) {
    throw new Error("Please fill in all required fields.");
  }

  if (roomData.capacity < 1 || roomData.capacity > 10) {
    throw new Error("Capacity must be between 1 and 10.");
  }

  if (roomData.floor < 1 || roomData.floor > 4) {
    throw new Error("Floor must be between 1 and 4.");
  }

  const formData = new FormData();
  formData.append("number", roomData.number);
  formData.append("capacity", roomData.capacity.toString());
  formData.append("floor", roomData.floor.toString());
  formData.append("pricing", roomData.pricing.toString());
  formData.append("wifi", roomData.wifi.toString());
  formData.append("parking", roomData.parking.toString());
  formData.append("breakfast", roomData.breakfast.toString());

  if (roomData.imageFile) {
    formData.append("room_image", roomData.imageFile);
  }

  try {
    const response = await axios.post("/rooms", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("Room creation response:", response);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error("Axios error:", error.response?.data || error.message);
      throw new Error(error.response?.data.message || "Failed to create room");
    } else {
      console.error("Unexpected error:", error);
      throw new Error("Unexpected error occurred while creating room");
    }
  }
};
