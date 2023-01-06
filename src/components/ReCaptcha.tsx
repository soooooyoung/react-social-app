import { useEffect } from "react";
import { useAppDispatch, useMutationObserver } from "../app/hooks";
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
  const ref = useMutationObserver((mutations, observer) => {
    dispatch(setLoading(false));
    // alert("dis");
    observer.disconnect();
  });
  const handleRecaptchaSuccess = () => {
    onChange(true);
  };

  const handleRecaptchaError = () => {
    onChange(false);
    showErrorModal("ReCaptcha Failed!");
  };

  const handleRecaptchaExpired = () => {
    onChange(false);
  };

  const handleRecaptchaLoad = () => {
    if (window.grecaptcha && window.grecaptcha.render && env.api.recaptcha) {
      window.grecaptcha.render("recap", {
        sitekey: env.api.recaptcha,
        callback: "handleRecaptchaSuccess",
        "error-callback": "handleRecaptchaError",
        "expired-callback": "handleRecaptchaExpired",
      });
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

  return <div ref={ref} id="recap" className="g-recaptcha" />;
};
