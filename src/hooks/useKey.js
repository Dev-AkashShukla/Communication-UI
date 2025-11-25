import { useEffect } from "react";

export function useKey(key, action) {
  useEffect(() => {
    const callback = (e) => {
      const keyDown = String(e.key || e.code).toLowerCase();
      if (keyDown === String(key).toLowerCase()) {
        action?.();
      }
    };

    document.addEventListener("keydown", callback);
    return () => document.removeEventListener("keydown", callback);
  }, [action, key]);
}
