import Cookies from "js-cookie";
import { encodeTickers, decodeTickers } from "@/utils/tickerUtils";
const AUTH_TOKEN_COOKIE_KEY = "authToken";
const USER_COOKIE_KEY = "currentUser";
export const SIDEBAR_COOKIE_KEY = "sidebar:state";
export const TICKERS_COOKIE_KEY = "livePriceTickers";
const MAX_TICKERS = 10;

// ===== Auth Token =====
export const setAuthToken = (token, options = {}) => {
  Cookies.set(AUTH_TOKEN_COOKIE_KEY, token, {
    expires: 7,
    path: "/",
    ...options,
  });
};

export const getAuthToken = () => Cookies.get(AUTH_TOKEN_COOKIE_KEY);

export const removeAuthToken = () => {
  Cookies.remove(AUTH_TOKEN_COOKIE_KEY, { path: "/" });
};

// ===== Current User =====
export const setCookieCurrentUser = (user, options = {}) => {
  Cookies.set(USER_COOKIE_KEY, JSON.stringify(user), {
    expires: 7,
    path: "/",
    ...options,
  });
};

export const getCookieCurrentUser = () => {
  const user = Cookies.get(USER_COOKIE_KEY);
  try {
    return user ? JSON.parse(user) : null;
  } catch (e) {
    console.error("Failed to parse currentUser cookie", e);
    return null;
  }
};

export const removeCookieCurrentUser = () => {
  Cookies.remove(USER_COOKIE_KEY, { path: "/" });
};

// ===== Sidebar State =====
export const getSidebarState = () => Cookies.get(SIDEBAR_COOKIE_KEY);

// ===== Tickers (now using Cookies) =====
// if raw=true then it will send the raw cookuie value
export const getCookieStoreTickers = ({ raw = false } = {}) => {
  const cookieValue = Cookies.get(TICKERS_COOKIE_KEY);

  if (raw) return cookieValue || "";

  try {
    return decodeTickers(cookieValue);
  } catch (e) {
    console.error("Failed to decode tickers cookie", e);
    // Return default value: an empty array since decoding failed
    return [];
  }
};

export const setCookieStoreTickers = (tickers, options = {}) => {
  const uniqueTickers = Array.from(
    new Set(tickers.map((t) => decodeURIComponent(String(t).trim())))
  );

  const encoded = encodeTickers(uniqueTickers);

  Cookies.set(TICKERS_COOKIE_KEY, encoded, {
    expires: 7,
    path: "/",
    ...options,
  });
};

// Add new tickers (one or array) with deduplication and limit enforcement
export const addCookieStoreTickers = (newTickers) => {
  if (!Array.isArray(newTickers)) newTickers = [newTickers];

  const existing = getCookieStoreTickers();

  const combined = Array.from(
    new Set([
      ...existing,
      ...newTickers.map((t) => decodeURIComponent(String(t).trim())),
    ])
  );

  if (combined.length > MAX_TICKERS) {
    throw new Error(`You can save up to ${MAX_TICKERS} tickers only.`);
  }

  setCookieStoreTickers(combined);

  return combined;
};

// Remove specific tickers (one or array)
export const removeCookieStoreTickersItems = (tickersToRemove) => {
  if (!Array.isArray(tickersToRemove)) tickersToRemove = [tickersToRemove];

  const toRemoveSet = new Set(
    tickersToRemove.map((t) => decodeURIComponent(String(t).trim()))
  );

  const existing = getCookieStoreTickers();

  const updated = existing.filter((t) => !toRemoveSet.has(t));

  setCookieStoreTickers(updated);

  return updated;
};

// Clear all tickers
export const removeCookieStoreTickers = () => {
  Cookies.remove(TICKERS_COOKIE_KEY, { path: "/" });
};
