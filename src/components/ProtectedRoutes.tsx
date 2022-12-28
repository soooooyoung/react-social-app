import { Spin } from "antd";
import { AxiosResponse } from "axios";
import { useEffect } from "react";
import { Navigate, Routes, RoutesProps, useLocation } from "react-router-dom";
import { useCheckAuth } from "../api/auth";
import { reset, selectAuth, setAuth } from "../app/authSlice";
import { UnprotectedPaths } from "../app/constants";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { AuthResponse } from "../models";
import { showErrorModal } from "../utils/responseUtils";

export const ProtectedRoutes = (props: RoutesProps) => {
  const { isAuthenticated } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const { mutateAsync, isLoading } = useCheckAuth();
  const isProtected = !UnprotectedPaths.find((path) => path === pathname);

  useEffect(() => {
    if (isAuthenticated) {
      mutateAsync(null, {
        onSuccess: (data) => {
          const response = data as AxiosResponse<AuthResponse>;
          if (response.data.success) {
            dispatch(setAuth(response.data));
          } else {
            showErrorModal("Invalid AuthToken");
            dispatch(reset());
          }
          return data;
        },
        onError: (e) => {
          showErrorModal(e.message);
          dispatch(reset());
        },
      });
    }
  }, [dispatch, mutateAsync, isAuthenticated]);

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
