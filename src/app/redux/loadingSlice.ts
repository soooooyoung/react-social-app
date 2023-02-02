import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./rootReducer";

const initialState = { isLoading: true };

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    reset: () => initialState,
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.isLoading = payload;
    },
  },
  extraReducers: (builder) => {},
});

export const selectLoading = (state: RootState) => state.loading.isLoading;

export const { setLoading } = loadingSlice.actions;

export default loadingSlice;
