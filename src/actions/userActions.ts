export const SET_USER = "SET_USER";
export const SET_LOADING = "SET_LOADING";
export const SET_ERROR = "SET_ERROR";
export const LOGOUT = "LOGOUT";
export const SET_TOKEN = "SET_TOKEN";

export interface UserState {
  user: null | { id: string; name: string; email: string };
  loading: boolean;
  error: string;
  logout: boolean;
  token: string | null;
}

export type UserAction =
  | {
      type: typeof SET_USER;
      payload: {
        user: { id: string; name: string; email: string };
        token: string;
      };
    }
  | { type: typeof SET_LOADING }
  | { type: typeof SET_ERROR; payload: string }
  | { type: typeof LOGOUT }
  | { type: typeof SET_TOKEN; payload: string };
