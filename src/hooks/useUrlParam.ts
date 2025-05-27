"use client";

import { useState, useEffect, useCallback } from "react";

/** URL 파라미터를 관리하는 범용 훅 */
export const useUrlParam = <T extends string | number>(
  paramName: string,
  defaultValue: T
) => {
  // URL에서 파라미터 값 가져오기
  const getParamFromUrl = useCallback(() => {
    if (typeof window === "undefined") return defaultValue;

    const searchParams = new URLSearchParams(window.location.search);
    const param = searchParams.get(paramName);

    if (!param) return defaultValue;

    // 숫자 타입인 경우 숫자로 변환
    if (typeof defaultValue === "number") {
      return Number(param) as T;
    }

    return param as T;
  }, [paramName, defaultValue]);

  // 현재 파라미터 값 상태
  const [paramValue, setParamValue] = useState<T>(getParamFromUrl());

  // URL 변경 감지
  useEffect(() => {
    const handleUrlChange = () => {
      setParamValue(getParamFromUrl());
    };

    window.addEventListener("popstate", handleUrlChange);

    return () => {
      window.removeEventListener("popstate", handleUrlChange);
    };
  }, [getParamFromUrl]);

  // 파라미터 값 설정 함수 - URL 파라미터 업데이트
  const setParam = useCallback(
    (value: T) => {
      setParamValue(value);

      const searchParams = new URLSearchParams(window.location.search);

      if (value === defaultValue) {
        // 기본값인 경우 파라미터 제거
        searchParams.delete(paramName);
      } else {
        // 값 설정
        searchParams.set(paramName, String(value));
      }

      // URL 업데이트
      const newUrl = `${window.location.pathname}${
        searchParams.toString() ? `?${searchParams.toString()}` : ""
      }`;
      window.history.pushState({ path: newUrl }, "", newUrl);
    },
    [paramName, defaultValue]
  );

  return [paramValue, setParam] as const;
};
