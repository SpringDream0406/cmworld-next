/** URL 파라미터를 업데이트하는 함수 */
export const updateUrlParam = (paramName: string, value: string | number) => {
  if (typeof window === "undefined") return;

  const searchParams = new URLSearchParams(window.location.search);

  // 값 설정
  searchParams.set(paramName, String(value));

  // URL 업데이트
  const newUrl = `${window.location.pathname}${
    searchParams.toString() ? `?${searchParams.toString()}` : ""
  }`;
  window.history.pushState({ path: newUrl }, "", newUrl);
};

/** URL에서 파라미터 값을 가져오는 함수 */
export const getUrlParam = <T extends string | number>(
  paramName: string,
  defaultValue: T
): T => {
  if (typeof window === "undefined") return defaultValue;

  const searchParams = new URLSearchParams(window.location.search);
  const param = searchParams.get(paramName);

  if (!param) return defaultValue;

  // 숫자 타입인 경우 숫자로 변환
  if (typeof defaultValue === "number") {
    return Number(param) as T;
  }

  return param as T;
};
