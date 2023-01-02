import { useEffect } from "react";
import { useAppDispatch } from "../app/hooks";
import { setLoading } from "../app/loadingSlice";
import { env } from "../config/env";
import { showErrorModal } from "../utils/responseUtils";
import { useLoadScript } from "../utils/scriptUtils";

interface Props {
  onChange: (verified: boolean) => void;
  onLoad?: () => void;
}

export const ReCaptcha = ({ onChange, onLoad }: Props) => {
  const { scriptElem } = useLoadScript(
    "https://www.google.com/recaptcha/api.js?onload=onLoadCallback&render=explicit"
  );
  const dispatch = useAppDispatch();
  const handleRecaptchaSuccess = () => {
    onChange(true);
  };

  const handleRecaptchaError = () => {
    onChange(false);
    showErrorModal("ReCaptcha Failed!");
  };

  const handleRecaptchaExpired = () => {
    onChange(false);
    showErrorModal("ReCaptcha Expired!");
  };

  const handleRecaptchaLoad = () => {
    if (window.grecaptcha && window.grecaptcha.render && env.api.recaptcha) {
      window.grecaptcha.render("recap", {
        sitekey: env.api.recaptcha,
        callback: "handleRecaptchaSuccess",
        "error-callback": "handleRecaptchaError",
        "expired-callback": "handleRecaptchaExpired",
      });

      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (scriptElem === undefined) {
      dispatch(setLoading(true));
    }
  }, [dispatch, scriptElem]);

  window.handleRecaptchaSuccess = handleRecaptchaSuccess;
  window.handleRecaptchaError = handleRecaptchaError;
  window.handleRecaptchaExpired = handleRecaptchaExpired;
  window.onLoadCallback = handleRecaptchaLoad;

  return <div id="recap" className="g-recaptcha" />;
};
