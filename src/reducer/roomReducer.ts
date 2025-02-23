import {
  GET_ROOM,
  SET_ROOMS,
  ADD_ROOM,
  UPDATE_ROOM,
  DELETE_ROOM,
  RoomState,
  RoomAction,
  SET_ERROR,
  SET_LOADING,
} from "../actions/roomActions";

const initialState: RoomState = {
  rooms: [],
  loading: false,
  error: "",
  currentRoom: null,
};

const roomReducer = (state = initialState, action: RoomAction): RoomState => {
  switch (action.type) {
    case SET_ROOMS:
      return {
        ...state,
        rooms: action.payload,
        loading: false,
      };
    case GET_ROOM: {
      const room = state.rooms.find((room) => room.id === action.payload);
      return {
        ...state,
        currentRoom: room || null,
      };
    }
    case ADD_ROOM:
      return {
        ...state,
        rooms: [...state.rooms, action.payload],
        loading: false,
      };
    case UPDATE_ROOM:
      return {
        ...state,
        rooms: state.rooms.map((room) =>
          room.id === action.payload.id ? action.payload : room
        ),
        loading: false,
      };
    case DELETE_ROOM:
      return {
        ...state,
        rooms: state.rooms.filter((room) => room.id !== action.payload),
        loading: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default roomReducer;
