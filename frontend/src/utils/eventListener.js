import {RefObject, useEffect} from "react";

export function useClickAnywhere(handler) {
  useEffect(() => {
    function listener(e) {
      handler(e);
    }
    document.addEventListener("click", listener);
    return () => document.removeEventListener("click", listener);
  }, [handler]);
}


