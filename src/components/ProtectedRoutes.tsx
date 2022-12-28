import { Spin } from "antd";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { Navigate, Routes, RoutesProps, useLocation } from "react-router-dom";
import { useCheckAuth } from "../api/auth";
import { reset, selectAuth, setAuth } from "../app/authSlice";
import { UnprotectedPaths } from "../app/constants";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { showErrorModal } from "../utils/responseUtils";

export const ProtectedRoutes = (props: RoutesProps) => {
  const authToken = Cookies.get("token");
  const { isAuthenticated } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const { mutateAsync, isLoading } = useCheckAuth();
  const isProtected = !UnprotectedPaths.find((path) => path === pathname);

  useEffect(() => {
    if (!authToken || authToken === "undefined") {
      dispatch(reset());
    } else {
      mutateAsync(
        { authToken },
        {
          onSuccess: (data) => {
            dispatch(setAuth(data.data));
          },
          onError: (e) => {
            showErrorModal(e.message);
            dispatch(reset());
          },
        }
      );
    }
  }, [authToken, dispatch, mutateAsync]);

  /**
   * Redirects with login state dependency
   */
  if (!isAuthenticated && isProtected) {
    return <Navigate to="/login" replace />;
  }
  if (isAuthenticated && !isProtected) {
    return <Navigate to="/" replace />;
  }

  return (
    <Spin spinning={isLoading}>
      <Routes {...props} />
    </Spin>
  );
};
