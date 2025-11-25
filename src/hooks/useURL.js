import { useSearchParams, useRouter, usePathname } from "next/navigation";

function useURL() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const fullPath = `${pathname}${
    searchParams.toString() ? `?${searchParams.toString()}` : ""
  }`;

  const getParam = (key) => decodeURIComponent(searchParams.get(key) || "");

  const getNextPath = () => getParam("nextPath");

  const setNextPath = (basePath = "/login") => {
    const params = new URLSearchParams();
    params.set("nextPath", encodeURIComponent(fullPath));
    router.replace(`${basePath}?${params.toString()}`);
  };

  return {
    pathname,
    fullPath,
    getParam,
    getNextPath,
    setNextPath,
  };
}

export { useURL }; // NOTE: Must Wrap the compoenent using useURL in Suspence
