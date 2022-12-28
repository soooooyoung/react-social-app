import { combineReducers } from "redux";
import postSlice from "../pages/postSlice";

import authSlice from "./authSlice";

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  post: postSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
