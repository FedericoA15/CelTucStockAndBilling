"use client";
import { loginAuth } from "@/actions/auth/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

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

  const handleSubmit = (e: any) => {
    e.preventDefault();
    loginAuth(username, password).then(() => {
      router.push("/products");
    });
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 bg-blue-500 text-white p-10">
        <h2 className="text-4xl mb-6">K-WD</h2>
        <p className="mb-6">
          Con el poder de K-WD, puedes disfrutar de la privacidad y la
          funcionalidad de los datos que solo tú posees. ¡Invita a tus amigos a
          chatear en K-WD!
        </p>
        <a href="/register" className="underline">
          ¡Empieza ahora!
        </a>
      </div>
      <div className="w-full md:w-1/2 bg-white p-10">
        <h2 className="text-2xl mb-6">Iniciar sesión</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="block w-full mb-4 p-2 border border-gray-300"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full mb-4 p-2 border border-gray-300"
          />
          <button
            type="submit"
            className="block w-full mb-4 p-2 bg-blue-500 text-white"
          >
            Iniciar sesión
          </button>
        </form>
        <div className="flex flex-col md:flex-row justify-between"></div>
      </div>
    </div>
  );
}
