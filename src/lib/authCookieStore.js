// utils/cookieStore.js
import Cookies from "js-cookie";
import { endOfDay } from "date-fns";

const SECURE_ENV =
  typeof window !== "undefined" && window.location.protocol === "https:";

export const CURRENT_USER_COOKIE_KEY = "__friskit_v3.1.0_current_user__";
export const PREVIOUS_USER_COOKIE_KEY = "__friskit_v3.1.0_previous_user__"; // New
// export const SESSION_ID_COOKIE_KEY = "__friskit_v2.2.0_session_id__";
export const AUTH_TOKEN_COOKIE_KEY = "__friskit_v3.1.0_auth_token__";

// -- Generic Cookie Helpers (for JSON values) --

export const cookieStoreSet = (key, value, options = {}) => {
  try {
    const expiry = options.expires ? options.expires : endOfDay(new Date());

    Cookies.set(key, JSON.stringify(value), {
      expires: expiry,
      secure: options.secure ?? SECURE_ENV,
      sameSite: "strict",
    });
  } catch (err) {
    console.warn(`[cookieStoreSet] Failed to set cookie "${key}":`, err);
  }
};

export const cookieStoreGet = (key) => {
  const raw = Cookies.get(key);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch (err) {
    console.warn(`[cookieStoreGet] Failed to parse cookie "${key}":`, err);
    return null;
  }
};

export const cookieStoreRemove = (key) => {
  try {
    Cookies.remove(key, {
      secure: SECURE_ENV,
      sameSite: "strict",
    });
  } catch (err) {
    console.warn(`[cookieStoreRemove] Failed to remove cookie "${key}":`, err);
  }
};

// -- Current User (JSON object) --

export const cookieStoreSetCurrentUser = (user) =>
  cookieStoreSet(CURRENT_USER_COOKIE_KEY, user);

export const cookieStoreGetCurrentUser = () =>
  cookieStoreGet(CURRENT_USER_COOKIE_KEY);

export const cookieStoreRemoveCurrentUser = () =>
  cookieStoreRemove(CURRENT_USER_COOKIE_KEY);

// -- Previous User (JSON object) -- (New)

export const cookieStoreSetPreviousUser = (user) =>
  cookieStoreSet(PREVIOUS_USER_COOKIE_KEY, user, {
    expires: 30, // 30 days expiry
  });

export const cookieStoreGetPreviousUser = () =>
  cookieStoreGet(PREVIOUS_USER_COOKIE_KEY);

export const cookieStoreRemovePreviousUser = () =>
  cookieStoreRemove(PREVIOUS_USER_COOKIE_KEY);

// -- Move current user to previous user (New) --

export const cookieStoreMoveCurrentUserToPrevious = () => {
  const currentUser = cookieStoreGetCurrentUser();
  if (currentUser) {
    cookieStoreSetPreviousUser(currentUser);
    cookieStoreRemoveCurrentUser(); // Remove current user after moving
  } else {
    cookieStoreRemovePreviousUser();
  }
};

// -- Check if previous user is same as current user (New) --

export const cookieStoreIsUserSameAsPreviousUser = (
  currentUser = cookieStoreGetCurrentUser()
) => {
  const previousUser = cookieStoreGetPreviousUser();

  if (!currentUser || !previousUser) return false;

  // Adjust the property name as per your user object structure
  return currentUser.username === previousUser.username;
};

// -- Auth Token (plain string, NOT JSON) --

export const cookieStoreSetAuthToken = (token, options = {}) => {
  try {
    const expiry =
      options.expires instanceof Date ? options.expires : endOfDay(new Date());

    Cookies.set(AUTH_TOKEN_COOKIE_KEY, token, {
      expires: expiry,
      secure: options.secure ?? SECURE_ENV,
      sameSite: "strict",
    });
  } catch (err) {
    console.warn(`[cookieStoreSetAuthToken] Failed to set auth token:`, err);
  }
};

export const cookieStoreGetAuthToken = () =>
  Cookies.get(AUTH_TOKEN_COOKIE_KEY) || null;

export const cookieStoreRemoveAuthToken = () =>
  cookieStoreRemove(AUTH_TOKEN_COOKIE_KEY);
