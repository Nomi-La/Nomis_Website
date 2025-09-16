import {useEffect} from "react";

export function useClickAnywhere(handler) {
    useEffect(() => {
        function listener(e) {
            handler(e);
        }

        document.addEventListener("click", listener);
        return () => document.removeEventListener("click", listener);
    }, [handler]);
}

export default function useClickAway(refOrRefs, onAway, options = {}) {
    const {events = ["pointerdown", "touchstart"], disabled = false} = options;

    useEffect(() => {
        if (disabled || typeof document === "undefined") return;

        const refs = Array.isArray(refOrRefs) ? refOrRefs : [refOrRefs];

        const handler = (e) => {
            const clickedInside = refs.some((r) => {
                const el = r?.current;
                return el && (el === e.target || el.contains(e.target));
            });
            if (!clickedInside) onAway(e);
        };

        events.forEach((evt) => document.addEventListener(evt, handler, true));
        return () => {
            events.forEach((evt) => document.removeEventListener(evt, handler, true));
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [refOrRefs, onAway, disabled, events.join(",")]);
}
