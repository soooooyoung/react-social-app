import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/rootReducer";
import { Auth, AuthResponse } from "../models";

const initialState: Auth = { isAuthenticated: false };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: () => initialState,
    setAuth: (state, { payload }: PayloadAction<AuthResponse>) => {
      if (
        !payload.success ||
        !payload.result.authToken ||
        !payload.result.user
      ) {
        state = initialState;
        return;
      }
      state.isAuthenticated = payload.success;
      state.authToken = payload.result.authToken;
      state.user = payload.result.user;
    },
  },
  extraReducers: (builder) => {},
});

export const selectAuth = (state: RootState) => state.auth;

export const { setAuth, reset } = authSlice.actions;

export default authSlice;
