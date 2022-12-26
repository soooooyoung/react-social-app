import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootState } from "./rootReducer";
import { AppDispatch } from "./store";

/**
 * Redux
 */
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
