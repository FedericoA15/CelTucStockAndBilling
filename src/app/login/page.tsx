import LoginForm from "./ui/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Iniciar sesión",
};

export default function LoginPage() {
  return (
    <main className="flex min-h-screen flex-col justify-center bg-gray-800">
      <LoginForm></LoginForm>
    </main>
  );
}
