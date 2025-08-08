import { useSession } from "@/hooks/use-session";
import LoadingPage from "@/pages/loading";
import { useEffect, type FC, type ReactNode } from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute: FC<{ children: ReactNode }> = ({ children }) => {
  const { token, loading } = useSession();

  useEffect(() => {
    if (!token && !loading) {
      <Navigate to="/login" />;
    }

    if (loading && !token) {
      <LoadingPage />;
    }
  }, [token, loading]);

  return children;
};

export default ProtectedRoute;
