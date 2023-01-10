import { Navigate } from "react-router-dom";
import { selectAuth } from "../../app/authSlice";
import { useAppSelector } from "../../app/hooks";

interface Props {
  component: React.ReactElement;
}

export const PrivateRoute = ({ component }: Props) => {
  const { isAuthenticated } = useAppSelector(selectAuth);
  return isAuthenticated ? component : <Navigate to="/login" />;
};
