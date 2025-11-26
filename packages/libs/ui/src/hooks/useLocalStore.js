"use client";
import { useCallback, useEffect, useState } from "react";

export function useLocalStore(key, defaultValue, json = true) {
  const getStoredValue = () => {
    if (typeof window === "undefined") return defaultValue;
    try {
      const item = window.localStorage.getItem(key);
      if (item === null) return defaultValue;
      return json ? JSON.parse(item) : item;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return defaultValue;
    }
  };

  const [storedValue, setStoredValue] = useState(getStoredValue);

  useEffect(() => {
    setStoredValue(getStoredValue());
  }, [key]);

  const setValue = useCallback(
    (valueOrUpdater) => {
      try {
        const newValue =
          typeof valueOrUpdater === "function"
            ? valueOrUpdater(storedValue)
            : valueOrUpdater;
        setStoredValue(newValue);
        if (typeof window !== "undefined") {
          const toStore = json ? JSON.stringify(newValue) : String(newValue);
          window.localStorage.setItem(key, toStore);
        }
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue, json]
  );

  return [storedValue, setValue];
}
