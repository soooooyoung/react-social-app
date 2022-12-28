import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/rootReducer";
import { Post } from "../models";

const initialState: {
  selectedPost?: number;
  selectedPostContent?: string;
  newPostContent?: string;
} = {};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    resetSelectedPost: (state) => {
      state.selectedPost = undefined;
      state.selectedPostContent = undefined;
      return state;
    },
    setSelectedPost: (state, { payload }: PayloadAction<Post>) => {
      state.selectedPost = payload.postId;
      state.selectedPostContent = payload.content;
      return state;
    },
    setSelectedContent: (state, { payload }: PayloadAction<string>) => {
      state.selectedPostContent = payload;
      return state;
    },
    setNewContent: (state, { payload }: PayloadAction<string>) => {
      state.newPostContent = payload;
      return state;
    },
  },
  extraReducers: (builder) => {},
});

export const selectPost = (state: RootState) => state.post;

export const {
  setNewContent,
  setSelectedPost,
  setSelectedContent,
  resetSelectedPost,
} = postSlice.actions;

export default postSlice;
