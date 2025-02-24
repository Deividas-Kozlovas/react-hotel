export const SET_RESERVATIONS = "SET_RESERVATIONS";
export const GET_RESERVATION_BY_USER_ID = "GET_RESERVATION_BY_USER_ID";
export const GET_RESERVATION_BY_CODE = "GET_RESERVATION_BY_CODE";
export const SET_LOADING = "SET_LOADING";
export const SET_ERROR = "SET_ERROR";

export interface Reservation {
  is: string;
  name: string;
  address: string;
  city: string;
  country: string;
  checkin: string;
  checkout: string;
  room: string;
  user: string;
}

export interface ReservationState {
  reservation: Reservation[];
  loading: boolean;
  error: string;
}

export type ReservationAction =
  | { type: typeof SET_RESERVATIONS; payload: Reservation[] }
  | { type: typeof GET_RESERVATION_BY_USER_ID; payload: Reservation[] }
  | { type: typeof GET_RESERVATION_BY_CODE; payload: Reservation[] }
  | { type: typeof SET_LOADING; payload: boolean }
  | { type: typeof SET_ERROR; payload: string };
