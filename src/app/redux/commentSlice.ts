import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./rootReducer";
import { Comment } from "../../models";

const initialState: Comment = {};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    resetComment: () => initialState,
    setComment: (state, { payload }: PayloadAction<Comment>) => {
      state = payload;
      return state;
    },
  },
  extraReducers: (builder) => {},
});

export const selectComment = (state: RootState) => state.comment;

export const { resetComment, setComment } = commentSlice.actions;

export default commentSlice;
