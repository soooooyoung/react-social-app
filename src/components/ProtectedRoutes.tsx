import { Navigate, Routes, RoutesProps, useLocation } from "react-router-dom";
import { selectAuth } from "../app/authSlice";
import { UnprotectedPaths } from "../app/constants";
import { useAppSelector } from "../app/hooks";

export const ProtectedRoutes = (props: RoutesProps) => {
  const { isAuthenticated } = useAppSelector(selectAuth);
  const { pathname } = useLocation();

  if (!isAuthenticated && !UnprotectedPaths.find((path) => path === pathname)) {
    return <Navigate to="/login" replace />;
  }

  return <Routes {...props} />;
};
