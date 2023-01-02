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
        path="/signup"
        element={<SignupPage />}
        errorElement={<>Oops! Something went wrong.</>}
      />
    </ProtectedRoutes>
  );
};
