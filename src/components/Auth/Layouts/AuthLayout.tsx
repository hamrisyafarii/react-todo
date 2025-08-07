import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface authLayoutProps {
  type?: string;
  children: ReactNode;
  title: string;
  subtitle: string;
}

const AuthLayout = (props: authLayoutProps) => {
  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center mx-4">
        <div className="bg-secondary w-full max-w-sm rounded-md p-4">
          <h1 className="text-foreground font-bold text-2xl text-center">
            {props.title}
          </h1>
          <p className="text-muted-foreground text-sm text-center mb-4">
            {props.subtitle}
          </p>
          {props.children}
          <div className="flex justify-center py-2">
            {props.type === "login" && (
              <p className="text-sm text-muted-foreground">
                tidak punya akun?{" "}
                <Link to="/register" className="text-blue-500 hover:underline">
                  Daftar
                </Link>
              </p>
            )}

            {props.type === "register" && (
              <p className="text-sm text-muted-foreground">
                sudah punya akun?{" "}
                <Link to="/login" className="text-blue-500 hover:underline">
                  Masuk
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default AuthLayout;
