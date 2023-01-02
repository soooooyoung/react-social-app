import { Spin } from "antd";
import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { env } from "../config/env";
import { showErrorModal } from "../utils/responseUtils";
import { useLoadScript } from "../utils/scriptUtils";

interface Props {
  onChange: (verified: boolean) => void;
}

export const ReCaptcha = ({ onChange }: Props) => {
  const { scriptElem, isReady } = useLoadScript(
    "https://www.google.com/recaptcha/api.js"
  );

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
  window.handleRecaptchaSuccess = handleRecaptchaSuccess;
  window.handleRecaptchaError = handleRecaptchaError;
  window.handleRecaptchaExpired = handleRecaptchaExpired;
  return (
    <div
      className="g-recaptcha"
      data-sitekey={env.api.recaptcha}
      data-callback="handleRecaptchaSuccess"
      data-error-callback="handleRecaptchaError"
      data-expired-callback="handleRecaptchaExpired"
    ></div>
  );
};
