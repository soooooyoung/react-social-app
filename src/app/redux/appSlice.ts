import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "../../models";
import { RootState } from "./rootReducer";

const initialState: AppState = {};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {},
});

export const selectLang = (state: RootState) => state.auth;

export const { reset } = appSlice.actions;

export default appSlice;
