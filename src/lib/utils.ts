export const setVisitedResume = (slug: string) => {
  if (typeof window !== "undefined" && window.localStorage) {
    localStorage.setItem("SLUG", slug);
  } else {
    console.error("Local storage is not accessible.");
  }
};

export const getVisitedResume = () => {
  const DEFAULT_VALUE = "me";
  if (typeof window !== "undefined" && window.localStorage) {
    return localStorage.getItem("SLUG") ?? DEFAULT_VALUE;
  } else {
    console.error("Local storage is not accessible.");
    return DEFAULT_VALUE;
  }
};
