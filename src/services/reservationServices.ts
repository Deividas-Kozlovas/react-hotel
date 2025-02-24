import { isAxiosError } from "axios";
import axios from "./axiosInstance";
import { Reservation } from "../actions/reservationActions";

export const createReservation = async (formData: Reservation) => {
  if (!formData.name?.trim()) throw new Error("Name is required.");
  if (!formData.address?.trim()) throw new Error("Address is required.");
  if (!formData.city?.trim()) throw new Error("City is required.");
  if (!formData.zip?.trim()) throw new Error("Zip code is required.");
  if (!formData.country?.trim()) throw new Error("Country is required.");
  if (!formData.checkin) throw new Error("Check-in date is required.");
  if (!formData.checkout) throw new Error("Check-out date is required.");

  const checkinDate = new Date(formData.checkin);
  const checkoutDate = new Date(formData.checkout);

  if (checkoutDate <= checkinDate) {
    throw new Error("Check-out date must be after check-in date.");
  }

  try {
    const response = await axios.post("/reservations", formData);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error("Axios error:", error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message || "Error creating reservation."
      );
    } else {
      console.error("Unexpected error:", error);
      throw new Error("Something went wrong. Please try again.");
    }
  }
};
