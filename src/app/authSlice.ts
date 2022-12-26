import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/rootReducer";
import { Auth } from "../models";

const initialState: Auth = { isAuthenticated: false };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: () => initialState,
    setAuthToken: (state, { payload }: PayloadAction<string>) => {
      state.authToken = payload;
    },
    setIsAuthenticated: (state, { payload }: PayloadAction<boolean>) => {
      state.isAuthenticated = payload;
    },
  },
  extraReducers: (builder) => {},
});

export const selectAuth = (state: RootState) => state.auth;

export const { setAuthToken, setIsAuthenticated } = authSlice.actions;

export default authSlice;
