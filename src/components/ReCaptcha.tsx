import { useEffect } from "react";
import { useAppDispatch, useMutationObserver } from "../app/hooks";
import { setLoading } from "../app/redux/loadingSlice";
import { env } from "../config/env";
import { showErrorModal } from "../utils/responseUtils";
import { useLoadScript } from "../utils/scriptUtils";

interface Props {
  onChange: (verified: boolean) => void;
}

export const ReCaptcha = ({ onChange }: Props) => {
  const dispatch = useAppDispatch();
  const ref = useMutationObserver((mutations, observer) => {
    if (mutations.length > 0) {
      dispatch(setLoading(false));
      observer.disconnect();
    }
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
    if (scriptElem !== undefined && window.grecaptcha && env.api.recaptcha) {
      const wrapper = document.createElement("div");
      wrapper.id = "recap";
      window.grecaptcha.render(wrapper, {
        sitekey: env.api.recaptcha,
        callback: "handleRecaptchaSuccess",
        "error-callback": "handleRecaptchaError",
        "expired-callback": "handleRecaptchaExpired",
      });
      ref.current?.appendChild(wrapper);
      dispatch(setLoading(false));
    }
  };

  const recaptchaRerender = () => {
    /**
     * Force remove div that was appended by Recaptcha on previous mount. Since reset() is not elligible for refs that have been unmounted, calling recaptcha's render on a new ref is unavoidable. This creates extra overlay divs that remain after component unmount.
     * option: convert this to class component so that previous overlays can be deleted properly at the time of unmount
     */
    document.getElementById("myscript")?.nextElementSibling?.remove();

    const found = document.getElementById("recap");
    if (!found && window.grecaptcha && env.api.recaptcha) {
      const wrapper = document.createElement("div");
      wrapper.id = "recap";
      window.grecaptcha.render(wrapper, {
        sitekey: env.api.recaptcha,
        callback: "handleRecaptchaSuccess",
        "error-callback": "handleRecaptchaError",
        "expired-callback": "handleRecaptchaExpired",
      });
      ref.current?.appendChild(wrapper);
      dispatch(setLoading(false));
    }
  };

  const { scriptElem } = useLoadScript(
    "https://www.google.com/recaptcha/api.js?onload=onLoadCallback&render=explicit",
    "myscript",
    recaptchaRerender
  );

  useEffect(() => {
    if (scriptElem === undefined) {
      dispatch(setLoading(true));
    }
  }, []);

  window.handleRecaptchaSuccess = handleRecaptchaSuccess;
  window.handleRecaptchaError = handleRecaptchaError;
  window.handleRecaptchaExpired = handleRecaptchaExpired;
  window.onLoadCallback = handleRecaptchaLoad;

  return <div ref={ref} className="g-recaptcha" />;
};
