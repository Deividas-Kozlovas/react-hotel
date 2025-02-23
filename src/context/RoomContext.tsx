/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, ReactNode } from "react";
import {
  SET_ROOMS,
  RoomState,
  RoomAction,
  ADD_ROOM,
  Room,
} from "../actions/roomActions";
import roomReducer from "../reducer/roomReducer";
import { getAllRooms } from "../services/roomService";

interface RoomContextType {
  state: RoomState;
  dispatch: React.Dispatch<RoomAction>;
  handleCreateRoom: (room: Room) => void;
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
        const rooms = await getAllRooms();
        const roomsWithId = rooms.data.map((room: { _id: string }) => ({
          ...room,
          id: room._id,
        }));

        dispatch({
          type: SET_ROOMS,
          payload: roomsWithId,
        });
      } catch (error) {
        console.error("Error fetching rooms", error);
      }
    };

    getRooms();
  }, []);

  const handleCreateRoom = (room: Room) => {
    dispatch({
      type: ADD_ROOM,
      payload: room,
    });
  };

  return (
    <RoomContext.Provider value={{ state, dispatch, handleCreateRoom }}>
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
