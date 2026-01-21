import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Setiap kali "pathname" (alamat URL) berubah, scroll ke paling atas (0,0)
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}