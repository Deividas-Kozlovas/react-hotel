import {
  SET_RESERVATIONS,
  GET_RESERVATION_BY_USER_ID,
  GET_RESERVATION_BY_CODE,
  SET_LOADING,
  SET_ERROR,
  ReservationState,
  ReservationAction,
} from "../actions/reservationActions";

const initialState: ReservationState = {
  reservation: [],
  loading: false,
  error: "",
};

const reservationReducer = (
  state = initialState,
  action: ReservationAction
): ReservationState => {
  switch (action.type) {
    case SET_RESERVATIONS:
    case GET_RESERVATION_BY_USER_ID:
    case GET_RESERVATION_BY_CODE:
      return {
        ...state,
        reservation: action.payload,
        loading: false,
      };

    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
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

export default reservationReducer;
