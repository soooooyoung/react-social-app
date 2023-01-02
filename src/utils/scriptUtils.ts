import { useEffect, useRef, useState } from "react";

export const useLoadScript = (
  script: string
  // callback: () => void = function () {}
) => {
  const [scriptElem, setScriptElem] = useState<HTMLScriptElement>();
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    if (!scriptElem) {
      const elem = document.createElement("script");
      // window.onloadCallback = callback;
      elem.src = script;
      elem.async = true;
      elem.defer = true;
      elem.addEventListener("load", () => {
        setIsReady(true);
      });
      elem.addEventListener("error", () => {
        setIsReady(false);
      });
      document.body.appendChild(elem);
      setScriptElem(elem);
    }
  }, [script, scriptElem]);

  return { scriptElem, isReady };
};
