/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, ReactNode } from "react";
import {
  SET_ROOMS,
  RoomState,
  RoomAction,
  ADD_ROOM,
  SET_AVAILABLE_ROOMS,
  Room,
} from "../actions/roomActions";
import roomReducer from "../reducer/roomReducer";
import { getAllRooms, checkRoomAvailability } from "../services/roomService";
import { SET_LOADING } from "../actions/userActions";

interface RoomContextType {
  state: RoomState;
  dispatch: React.Dispatch<RoomAction>;
  handleCreateRoom: (room: Room) => void;
  checkAvailability: (checkin: string, checkout: string) => void;
}

const initialState: RoomState = {
  rooms: [],
  loading: false,
  error: "",
  currentRoom: null,
};

const RoomContext = createContext<RoomContextType | null>(null);

export const RoomProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = React.useReducer(roomReducer, initialState);

  useEffect(() => {
    const getRooms = async () => {
      try {
        dispatch({ type: SET_LOADING, payload: true });

        const rooms = await getAllRooms();
        const roomsWithId = rooms.data.map((room: { _id: string }) => ({
          ...room,
          id: room._id,
        }));

        dispatch({ type: SET_LOADING, payload: false });
        dispatch({
          type: SET_ROOMS,
          payload: roomsWithId,
        });
      } catch (error) {
        console.error("Error fetching rooms", error);
        dispatch({ type: SET_LOADING, payload: false });
      }
    };

    getRooms();
  }, [dispatch]);

  const checkAvailability = async (checkin: string, checkout: string) => {
    try {
      const response = await checkRoomAvailability(checkin, checkout);
      const availableRooms = response.data;

      dispatch({
        type: SET_AVAILABLE_ROOMS,
        payload: availableRooms,
      });
      console.log("Available Rooms:", availableRooms);
    } catch (error) {
      console.error("Error checking room availability", error);
    }
  };

  const handleCreateRoom = (room: Room) => {
    dispatch({
      type: ADD_ROOM,
      payload: room,
    });
  };

  return (
    <RoomContext.Provider
      value={{ state, dispatch, handleCreateRoom, checkAvailability }}
    >
      {children}
    </RoomContext.Provider>
  );
};

export const useRoomContext = () => {
  const context = useContext(RoomContext);
  if (!context) {
    throw new Error("useRoomContext must be used within a RoomProvider");
  }
  return context;
};
