import { Link, useParams } from "react-router-dom";
import { useVerifyEmail } from "../api/signup";
import welcome2 from "../img/welcome2.png";
import noresult from "../img/noresult.png";
import "../style/SignupPage.scss";

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
        {data?.success ? (
          <>
            <img src={welcome2} alt="" />
            <span>
              Sign Up Complete! You can now <Link to="/login">log in.</Link>
            </span>
          </>
        ) : (
          <>
            <img src={noresult} alt="" />
            <span>Sorry! Account request expired.</span>
          </>
        )}
      </div>
    </div>
  );
};
