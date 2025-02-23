export const SET_ROOMS = "SET_ROOMS";
export const GET_ROOM = "GET_ROOM";
export const ADD_ROOM = "ADD_ROOM";
export const UPDATE_ROOM = "UPDATE_ROOM";
export const DELETE_ROOM = "DELETE_ROOM";
export const SET_ERROR = "SET_ERROR";
export const SET_LOADING = "SET_LOADING";

export interface Room {
  id: string;
  number: string;
  capacity: number;
  floor: number;
  room_image: string;
  pricing: number;
  wifi: boolean;
  parking: boolean;
  breakfast: boolean;
}

export interface RoomState {
  rooms: Room[];
  currentRoom: Room | null;
  loading: boolean;
  error: string;
}

export type RoomAction =
  | { type: typeof GET_ROOM; payload: string }
  | { type: typeof ADD_ROOM; payload: Room }
  | { type: typeof UPDATE_ROOM; payload: Room }
  | { type: typeof DELETE_ROOM; payload: string }
  | { type: typeof SET_ROOMS; payload: Room[] }
  | { type: typeof SET_ERROR; payload: string }
  | { type: typeof SET_LOADING; payload: boolean };
