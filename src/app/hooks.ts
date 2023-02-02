import { useCallback, useRef } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/rootReducer";
import { AppDispatch } from "./redux/store";

/**
 * Redux
 */
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
/***
 * Mutation Observer
 */
export const useMutationObserver = (
  onMutation: (mutations: MutationRecord[], observer: MutationObserver) => void
) => {
  const ref = useRef<HTMLDivElement>(null);

  const callback = useCallback(
    (mutations: MutationRecord[], observer: MutationObserver) => {
      onMutation(mutations, observer);
    },
    [onMutation]
  );

  if (ref.current !== null) {
    const observer = new MutationObserver(callback);
    observer.observe(ref.current, {
      childList: true,
      subtree: true,
    });
  }

  return ref;
};
