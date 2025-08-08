import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export const useSession = (redirect = false) => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLaoding] = useState<boolean>(true);

  useEffect(() => {
    const storedToken = Cookies.get("token");

    if (!storedToken && redirect) {
      window.location.href = "/login";
    }
    setToken(storedToken || null);
    setLaoding(false);
  }, [redirect]);

  return { token, loading, isAuthenticated: !!token };
};
