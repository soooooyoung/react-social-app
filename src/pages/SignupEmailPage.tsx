import { useParams } from "react-router-dom";
import { useVerifyEmail } from "../api/signup";
import welcome2 from "../img/welcome2.png";
import noresult from "../img/noresult.png";
import "./SignupPage.css";

export const SignupEmailPage = () => {
  const { token } = useParams();
  const { data } = useVerifyEmail(token, {
    enabled: !!token,
    retry: false,
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  return (
    <div className="signup-container">
      <div className="signup-content">
        <img src={data?.success ? welcome2 : noresult} alt="" />
        {data?.success ? (
          <span>Sign Up Complete! You can now log in.</span>
        ) : (
          <span>Sorry! Account request expired.</span>
        )}
      </div>
    </div>
  );
};
