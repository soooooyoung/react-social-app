import { Navigate, Routes, RoutesProps, useLocation } from "react-router-dom";
import { selectAuth } from "../app/authSlice";
import { UnprotectedPaths } from "../app/constants";
import { useAppSelector } from "../app/hooks";

export const ProtectedRoutes = (props: RoutesProps) => {
  const { isAuthenticated } = useAppSelector(selectAuth);
  const { pathname } = useLocation();
  const isProtected = !UnprotectedPaths.find((path) => path === pathname);

  console.log(isAuthenticated);
  if (!isAuthenticated && isProtected) {
    return <Navigate to="/login" replace />;
  }

  if (isAuthenticated && !isProtected) {
    return <Navigate to="/" replace />;
  }

  return <Routes {...props} />;
};
