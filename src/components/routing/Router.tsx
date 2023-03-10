import { Navigate, Route } from "react-router-dom";
import { HomePage, SigninPage, SignupPage } from "../../pages";
import { ChatListPage } from "../../pages/ChatListPage";
import { ChatRoomPage } from "../../pages/ChatRoomPage";
import { PrivacyPage } from "../../pages/PrivacyPage";
import { SignupEmailPage } from "../../pages/SignupEmailPage";
import { TermsPage } from "../../pages/TermsPage";
import { PrivateRoute } from "./PrivateRoute";
import { ProtectedRoutes } from "./ProtectedRoutes";

export const Router = () => {
  return (
    <ProtectedRoutes>
      <Route
        index
        element={<PrivateRoute component={<HomePage />} />}
        errorElement={<>Oops! Something went wrong.</>}
      />
      <Route path="/:id" element={<PrivateRoute component={<HomePage />} />} />
      <Route
        path="/home"
        element={<PrivateRoute component={<HomePage />} />}
        errorElement={<>Oops! Something went wrong.</>}
      />
      <Route
        path="/chatroom/:roomId"
        element={<PrivateRoute component={<ChatRoomPage />} />}
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
      <Route
        path="/signup/verify_email/:token"
        element={<SignupEmailPage />}
        errorElement={<>Oops! Something went wrong.</>}
      />
      <Route
        path="/terms"
        element={<TermsPage />}
        errorElement={<>Oops! Something went wrong.</>}
      />
      <Route
        path="/privacy"
        element={<PrivacyPage />}
        errorElement={<>Oops! Something went wrong.</>}
      />
      <Route path="/404" element={<>pageNotFound</>} />
      <Route path="*" element={<Navigate to="/404" />} />
    </ProtectedRoutes>
  );
};
