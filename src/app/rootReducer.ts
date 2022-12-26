import { combineReducers } from "redux";

import authSlice from "./authSlice";

const rootReducer = combineReducers({
  auth: authSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;