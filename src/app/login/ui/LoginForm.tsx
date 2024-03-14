"use client";
import { useState } from "react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
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
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full mb-4 p-2 border border-gray-300"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full mb-4 p-2 border border-gray-300"
          />
          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="mr-2"
            />
            <label>Recuérdame</label>
          </div>
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
