import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import { AxiosResponse } from "axios";
import { useEffect } from "react";
import { Routes, RoutesProps } from "react-router-dom";
import { useCheckAuth } from "../api/auth";
import { reset, selectAuth, setAuth } from "../app/authSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { AuthResponse } from "../models";
import { showErrorModal } from "../utils/responseUtils";

export const ProtectedRoutes = (props: RoutesProps) => {
  const { isAuthenticated } = useAppSelector(selectAuth);
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
