import LoginForm from "@/components/Auth/Fragments/LoginForm";
import AuthLayout from "@/components/Auth/Layouts/AuthLayout";
import Footer from "@/components/Layouts/Footer";
import Header from "@/components/Layouts/Header";
import { useAuth } from "@/hooks/use-auth";
import LoadingPage from "./loading";

const LoginPage = () => {
  const { loading } = useAuth();

  if (loading) return <LoadingPage />;
  
  return (
    <>
      <Header type="login" />
      <AuthLayout
        type="login"
        title="Login"
        subtitle="Yuk, kelola tugas mu di Catatanku."
      >
        <LoginForm />
      </AuthLayout>
      <Footer />
    </>
  );
};
export default LoginPage;
