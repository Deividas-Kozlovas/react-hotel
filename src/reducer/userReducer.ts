import {
  SET_USER,
  SET_LOADING,
  SET_ERROR,
  LOGOUT,
  SET_TOKEN,
  UserState,
  UserAction,
} from "../actions/userActions";

const initialState: UserState = {
  user: null,
  loading: false,
  error: "",
  logout: false,
  token: null,
};

const userReducer = (
  state: UserState = initialState,
  action: UserAction
): UserState => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
      };
    case SET_LOADING:
      return { ...state, loading: true };
    case SET_ERROR:
      return { ...state, error: action.payload, loading: false };
    case SET_TOKEN:
      return { ...state, token: action.payload };
    case LOGOUT:
      return { ...state, user: null, token: null, logout: true };
    default:
      return state;
  }
};

export default userReducer;
