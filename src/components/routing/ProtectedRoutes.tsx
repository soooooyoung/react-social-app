import { useEffect } from "react";
import { Spin } from "antd";
import { AxiosResponse } from "axios";
import { LoadingOutlined } from "@ant-design/icons";
import { reset, selectAuth, setAuth } from "../../app/redux/authSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Navigate, Routes, RoutesProps, useLocation } from "react-router-dom";
import { showErrorModal } from "../../utils/responseUtils";
import { useCheckAuth } from "../../api/auth";
import { AuthResponse } from "../../models";

export const ProtectedRoutes = (props: RoutesProps) => {
  const { isAuthenticated } = useAppSelector(selectAuth);
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const { mutateAsync, isLoading } = useCheckAuth();

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

  if (isAuthenticated && (pathname === "/login" || pathname === "/signup")) {
    return <Navigate to="/" />;
  }

  return (
    <Spin
      tip="Loading..."
      size="large"
      spinning={isLoading}
      indicator={<LoadingOutlined />}
    >
      <Routes {...props} />
    </Spin>
  );
};
