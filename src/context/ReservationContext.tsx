/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  ReactNode,
  useReducer,
  Dispatch,
} from "react";
import {
  ReservationState,
  ReservationAction,
} from "../actions/reservationActions";
import reservationReducer from "../reducer/reservationReducer";

interface ReservationContextType {
  state: ReservationState;
  dispatch: Dispatch<ReservationAction>;
}

const ReservationContext = createContext<ReservationContextType | null>(null);

const initialState: ReservationState = {
  reservation: [],
  loading: false,
  error: "",
};

export const ReservationProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reservationReducer, initialState);

  return (
    <ReservationContext.Provider value={{ state, dispatch }}>
      {children}
    </ReservationContext.Provider>
  );
};

export const useReservationContext = () => {
  const context = useContext(ReservationContext);

  if (!context) {
    throw new Error(
      "useReservationContext must be used within a ReservationProvider"
    );
  }

  return context;
};
