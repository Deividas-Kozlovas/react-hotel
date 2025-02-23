/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from "react";
import userReducer from "../reducer/userReducer";
import { login, register } from "../services/authServices";
import {
  SET_USER,
  SET_LOADING,
  SET_ERROR,
  UserState,
  UserAction,
  LOGOUT,
} from "../actions/userActions";

const initialState: UserState = {
  user: null,
  loading: false,
  error: "",
  token: null,
  logout: false,
};

const UserContext = createContext<{
  state: typeof initialState;
  dispatch: React.Dispatch<UserAction>;
  loginUser: (email: string, password: string) => Promise<void>;
  userRegister: (
    name: string,
    email: string,
    password: string,
    passwordConfirm: string
  ) => Promise<void>;
  logout: () => void;
} | null>(null);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      dispatch({
        type: SET_USER,
        payload: {
          token,
          user: JSON.parse(user),
        },
      });
    }
  }, []);

  const loginUser = async (email: string, password: string) => {
    try {
      dispatch({ type: SET_LOADING });
      const response = await login(email, password);

      if (response.status === "Success") {
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.data));
        dispatch({
          type: SET_USER,
          payload: { user: response.data, token: response.token },
        });
      } else {
        dispatch({ type: SET_ERROR, payload: response.message });
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Login failed. Try again.";
      dispatch({ type: SET_ERROR, payload: errorMessage });
    }
  };

  const userRegister = async (
    name: string,
    email: string,
    password: string,
    passwordConfirm: string
  ) => {
    try {
      dispatch({ type: SET_LOADING });
      const response = await register(name, email, password, passwordConfirm);

      if (response.status === "Success") {
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.data));

        dispatch({
          type: SET_USER,
          payload: { user: response.data, token: response.token },
        });
      } else {
        dispatch({ type: SET_ERROR, payload: response.message });
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Register failed. Try again.";
      dispatch({ type: SET_ERROR, payload: errorMessage });
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch({ type: LOGOUT });
  };

  return (
    <UserContext.Provider
      value={{ state, dispatch, loginUser, userRegister, logout }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
