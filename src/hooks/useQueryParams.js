"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useMemo } from "react";

// useQueryParams is a utility for reading and manipulating URL query parameters
export function useQueryParams(defaults = {}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  // Merge defaults with current params
  const values = useMemo(() => {
    const result = {};

    if (!defaults || Object.keys(defaults).length === 0) {
      // No defaults: return all query params from URL
      for (const [key, value] of searchParams.entries()) {
        result[key] = value;
      }
    } else {
      // Defaults present: return only keys in defaults, fallback to default values
      for (const [key, value] of Object.entries(defaults)) {
        result[key] = searchParams.get(key) ?? String(value);
      }
    }

    return result;
  }, [searchParams, defaults]);

  // Internal helper to update URL using push (adds to browser history)
  const updateUrl = (newParams) => {
    // Remove empty params
    for (const [key, value] of Array.from(newParams.entries())) {
      if (value === "" || value === null || value === undefined) {
        newParams.delete(key);
      }
    }

    const queryString = newParams.toString();
    const url = queryString ? `${pathname}?${queryString}` : pathname;

    // Use Next.js router push instead of replaceState
    router.push(url, { scroll: false });
  };

  const setParam = (key, value) => {
    const newParams = new URLSearchParams(searchParams.toString());
    if (value === "" || value === null || value === undefined) {
      newParams.delete(key);
    } else {
      newParams.set(key, String(value));
    }
    updateUrl(newParams);
  };

  const appendParam = (key, value) => {
    if (value === "" || value === null || value === undefined) return;
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.append(key, String(value));
    updateUrl(newParams);
  };

  const setParams = (updates) => {
    const newParams = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value === "" || value === null || value === undefined) {
        newParams.delete(key);
      } else {
        newParams.set(key, String(value));
      }
    });
    updateUrl(newParams);
  };

  const resetParams = () => {
    const newParams = new URLSearchParams();
    Object.entries(defaults).forEach(([key, value]) => {
      if (value !== "" && value !== null && value !== undefined) {
        newParams.set(key, String(value));
      }
    });
    updateUrl(newParams);
  };

  return { values, setParam, setParams, resetParams, appendParam };
}
