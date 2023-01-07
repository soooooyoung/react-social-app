import { useEffect, useState } from "react";

export const useLoadScript = (script: string, id: string, cb?: () => void) => {
  const [scriptElem, setScriptElem] = useState<HTMLScriptElement>();

  useEffect(() => {
    if (scriptElem === undefined) {
      const found = document.getElementById(id) as HTMLScriptElement;
      if (found !== null) {
        setScriptElem(found);
        if (cb) cb();
      } else if (scriptElem === undefined) {
        const elem = document.createElement("script");
        elem.src = script;
        elem.async = true;
        elem.defer = true;
        elem.id = id;
        elem.addEventListener("load", () => {}, { once: true });
        elem.addEventListener("error", () => {}, { once: true });
        setScriptElem(elem);
        document.body.appendChild(elem);
      }
    }
  }, [script, scriptElem, id, cb]);

  return { scriptElem };
};
