import { useEffect, useState } from "react";

export const useLoadScript = (script: string) => {
  const [scriptElem, setScriptElem] = useState<HTMLScriptElement>();

  useEffect(() => {
    if (scriptElem === undefined) {
      const elem = document.createElement("script");

      elem.src = script;
      elem.async = true;
      elem.defer = true;
      elem.addEventListener("load", () => {}, { once: true });
      elem.addEventListener("error", () => {}, { once: true });

      document.body.appendChild(elem);
      setScriptElem(elem);
    }
  }, [script, scriptElem]);

  return { scriptElem };
};
