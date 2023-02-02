import { combineReducers } from "redux";
import postSlice from "./postSlice";
import loadingSlice from "./loadingSlice";
import authSlice from "./authSlice";

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  post: postSlice.reducer,
  loading: loadingSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
