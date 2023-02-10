import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./rootReducer";
import { Post } from "../../models";

const initialState: Post = {};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    resetPost: () => initialState,
    setPost: (state, { payload }: PayloadAction<Post>) => {
      state = payload;
      return state;
    },
  },
  extraReducers: (builder) => {},
});

export const selectPost = (state: RootState) => state.post;

export const { resetPost, setPost } = postSlice.actions;

export default postSlice;
