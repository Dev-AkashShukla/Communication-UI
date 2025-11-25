"use client";
import { useCallback, useEffect, useState } from "react";

/**
 * A reusable hook to get/set localStorage with React state.
 *
 * @param {string} key - localStorage key
 * @param {string} defaultValue - fallback value if nothing is stored
 */
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

// Constants for preference keys
export const PREFERENCE_KEYS = {
  LANGUAGE: "settings.preference.language",
  THEME: "settings.preference.theme",
  GRID: "settings.preference.grid",
  NOTIFICATION_SOUND: "settings.preference.notification.sound",
};

function useLanguagePreference(defaultLocale = "en-IN") {
  return useLocalStore(PREFERENCE_KEYS.LANGUAGE, defaultLocale, false);
}

function useThemePreference(defaultTheme = "light") {
  return useLocalStore(PREFERENCE_KEYS.THEME, defaultTheme, false);
}

function useGridColPreference(gridId, defaultValue = []) {
  return useLocalStore(
    `${PREFERENCE_KEYS.GRID}.${gridId}.columns`,
    defaultValue
  );
}

function useNotificationSoundPreference(defaultValue = {}) {
  return useLocalStore(
    `${PREFERENCE_KEYS.NOTIFICATION_SOUND}`,
    defaultValue,
    true
  );
}

export {
  useGridColPreference,
  useLanguagePreference,
  useNotificationSoundPreference,
  useThemePreference,
};
