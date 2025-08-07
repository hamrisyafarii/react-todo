import RegisterForm from "@/components/Auth/Fragments/RegisterForm";
import AuthLayout from "@/components/Auth/Layouts/AuthLayout";
import Header from "@/components/Layouts/Header";

const RegisterPage = () => {
  return (
    <>
      <Header type="register" />
      <AuthLayout
        title="Daftar"
        subtitle="Daftarkan akun mu sekarang"
        type="register"
      >
        <RegisterForm />
      </AuthLayout>
    </>
  );
};

export default RegisterPage;
