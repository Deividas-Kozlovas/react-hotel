/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, ReactNode } from "react";
import { SET_ROOMS, RoomState, RoomAction } from "../actions/roomActions"; // Corrected import for room actions
import roomReducer from "../reducer/roomReducer"; // Corrected to roomReducer
import { getAllRooms } from "../services/roomService";

const initialState: RoomState = {
  rooms: [],
  loading: false,
  error: "",
  currentRoom: null,
};

const RoomContext = createContext<{
  state: typeof initialState;
  dispatch: React.Dispatch<RoomAction>;
} | null>(null);

export const RoomProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = React.useReducer(roomReducer, initialState);

  useEffect(() => {
    const getRooms = async () => {
      try {
        const rooms = await getAllRooms();
        console.log("Fetched rooms:", rooms);
        if (rooms && rooms.data) {
          dispatch({
            type: SET_ROOMS,
            payload: rooms.data,
          });
        }
      } catch (error) {
        console.error("Error fetching rooms", error);
      }
    };

    getRooms();
  }, []);

  return (
    <RoomContext.Provider value={{ state, dispatch }}>
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
