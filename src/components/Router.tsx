import { Routes, Route, Navigate } from "react-router-dom";
import { HomePage, SigninPage, SignupPage } from "../pages";
import { ProtectedRoutes } from "./ProtectedRoutes";

export const Router = () => {
  return (
    <ProtectedRoutes>
      <Route
        path="/"
        element={<HomePage />}
        errorElement={<>Oops! Something went wrong.</>}
      />
      <Route
        path="/login"
        element={<SigninPage />}
        errorElement={<>Oops! Something went wrong.</>}
      />
      <Route
        path="/redirect"
        element={<Navigate to="/login" />}
        errorElement={<>Oops! Something went wrong.</>}
      />
    </ProtectedRoutes>
  );
};
