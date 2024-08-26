"use client";
import { loginAuth } from "@/actions/auth/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

export default function LoginForm() {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("jwt");

    if (token) {
      router.push("/products");
    }
  }, []);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    loginAuth(username, password).then(() => {
      router.push("/products");
    });
  };

  return (
    <div className="h-full w-full flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 bg-custom-black text-white p-10 flex flex-col justify-center items-center">
        <div className="flex items-center mb-6">
          <h2 className="text-4xl">celtuc</h2>
          <img src="/logo.png" alt="Celtuc Logo" className="h-12 w-12 mr-4" />
        </div>
        <p className="mb-6 text-center md:text-left">
          Bienvenidos al software de CelTuc para el control de stock y
          facturación
        </p>
      </div>
      <div className="w-full md:w-1/2 bg-red-50 p-10 flex flex-col justify-center items-center">
        <h2 className="text-2xl mb-6">Inicio de sesión</h2>
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="block w-full mb-4 p-2 border border-gray-300"
          />
          <div className="relative w-full mb-4">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full p-2 border border-gray-300"
            />
            <div
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <AiFillEyeInvisible className="text-gray-500" size={24} />
              ) : (
                <AiFillEye className="text-gray-500" size={24} />
              )}
            </div>
          </div>
          <button
            type="submit"
            className="block w-full mb-4 p-2 bg-blue-500 hover:bg-blue-700 text-white"
          >
            Iniciar sesión
          </button>
        </form>
      </div>
    </div>
  );
}
