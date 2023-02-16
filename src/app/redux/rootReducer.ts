import { combineReducers } from "redux";
import postSlice from "./postSlice";
import loadingSlice from "./loadingSlice";
import authSlice from "./authSlice";
import appSlice from "./appSlice";
import commentSlice from "./commentSlice";

const rootReducer = combineReducers({
  app: appSlice.reducer,
  auth: authSlice.reducer,
  post: postSlice.reducer,
  loading: loadingSlice.reducer,
  comment: commentSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
