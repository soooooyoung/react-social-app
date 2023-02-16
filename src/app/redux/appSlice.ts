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
});

export const selectApp = (state: RootState) => state.app;

export const { reset } = appSlice.actions;

export default appSlice;
