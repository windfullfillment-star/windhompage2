import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // [수정] 메뉴 클릭 시 상단으로 로딩되도록 스크롤 위치 초기화
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
