"use client";

import { cookieStoreGetAuthToken } from "@/lib/authCookieStore";
import { getApiRoute } from "@/services/apiRoutes";
import { BACKEND_URLS } from "@/utils/constants";
import { buildQueryString } from "@/utils/url";
import { ApiError } from "@/lib/error";

// 🔹 Get backend base URL
function getBackendBaseUrlFromHost() {
  if (typeof window === "undefined") return;

  if (process.env.NEXT_PUBLIC_HOSTING_ENVIRONMENT !== "cloud")
    return process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

  const hostname = window.location.hostname;

  // 🔹 Detect Vercel Preview Domain
  if (hostname.endsWith(".vercel.app")) {
    return BACKEND_URLS.demo; // Always use demo backend for preview
  }

  if (hostname === process.env.NEXT_PUBLIC_CLOUD_HOSTNAME)
    return process.env.NEXT_PUBLIC_BACKEND_BASE_URL;

  const subdomain =
    hostname.split(".")[0] === "www"
      ? hostname.split(".")[1]
      : hostname.split(".")[0];

  const allowedTenants = process.env.NEXT_PUBLIC_TENANTS?.split(",") || [];
  if (!allowedTenants.includes(subdomain)) {
    console.warn(`TENANT NOT ALLOWED: "${subdomain}"`);
    throw new Error(`TENANT NOT ALLOWED`);
  }

  const backendBaseUrl = BACKEND_URLS[subdomain];
  if (!backendBaseUrl) {
    console.warn(`MISSING API URL FOR TENANT: ${subdomain}`);
    throw new Error(`MISSING API URL FOR TENANT`);
  }

  return backendBaseUrl;
}

// 🔹 Base fetch wrapper: returns raw Response
export async function fetchResponseFromDB(routeKey, options = {}) {
  if (typeof window === "undefined") return;

  const route = getApiRoute(routeKey);
  if (!route) throw new Error(`Invalid route: ${routeKey}`);

  const { path, method, auth, contentType } = route;
  const token = cookieStoreGetAuthToken();

  if (auth && !token) throw new Error("No Auth Token Found!");

  const normalizedAdditionalPath = options.additionalPath
    ? options.additionalPath.startsWith("/")
      ? options.additionalPath
      : `/${options.additionalPath}`
    : "";

  const fullPathWithoutQuery = `${path}${normalizedAdditionalPath}`;
  const queryString =
    method === "GET" && options.query ? buildQueryString(options.query) : "";

  const fullPath = queryString
    ? `${fullPathWithoutQuery}?${queryString}`
    : fullPathWithoutQuery;

  const baseUrl = getBackendBaseUrlFromHost();
  const fullUrl = /^https?:\/\//.test(fullPath) ? fullPath : baseUrl + fullPath;

  const isFormData = options.body instanceof FormData;
  const headers = {
    ...(isFormData ? {} : contentType ? { "Content-Type": contentType } : {}),
    ...(auth && token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options?.headers || {}),
  };

  // Remove additionalPath from options before spreading it into fetch
  const { additionalPath, ...fetchOptions } = options;

  return fetch(fullUrl, {
    method,
    ...fetchOptions,
    headers,
  });
}

//  Higher-level wrapper: returns parsed JSON + handles errors
export async function fetchFromDB(routeKey, options = {}) {
  try {
    const response = await fetchResponseFromDB(routeKey, options);
    const result = await response.json();

    if (!response.ok) {
      const errorMsg =
        result?.error ||
        result?.detail ||
        result?.message ||
        "Unknown API Error";

      throw new ApiError(errorMsg, response.status, {
        metadata: {
          routeKey,
          responseBody: result,
        },
      });
    }

    return result;
  } catch (error) {
    // If it’s already an AppError (custom), don't wrap it again
    if (error instanceof ApiError) {
      throw error;
    }

    // Wrap unknown errors in a generic ApiError
    throw new ApiError(error.message || "Unexpected fetch error", 500, {
      metadata: {
        routeKey,
        originalError: error,
      },
    });
  }
}
