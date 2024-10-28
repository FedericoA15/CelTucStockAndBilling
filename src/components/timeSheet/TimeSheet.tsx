"use client";
import { postTimeSheet } from "@/actions/timeSheet/postTimeSheet";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

const TimeSheet = () => {
  const [startTime, setStartTime] = useState<string | null>(null);
  const [endTime, setEndTime] = useState<string | null>(null);
  const [name, setName] = useState("");

  useEffect(() => {
    const storedStartTime = localStorage.getItem("startTime");
    const storedEndTime = localStorage.getItem("endTime");
    if (storedStartTime) {
      setStartTime(storedStartTime);
    }
    if (storedEndTime) {
      setEndTime(storedEndTime);
    }
  }, []);

  const handleStart = () => {
    const date = new Date();
    const currentStartTime = new Date(date.setHours(date.getHours() - 3))
      .toISOString()
      .slice(0, 19);
    setStartTime(currentStartTime);
    localStorage.setItem("startTime", currentStartTime);
  };

  const handleEnd = () => {
    const date = new Date();
    const currentEndTime = new Date(date.setHours(date.getHours() - 3))
      .toISOString()
      .slice(0, 19);
    setEndTime(currentEndTime);
    localStorage.setItem("endTime", currentEndTime);
  };

  const handleSubmit = async () => {
    if (!name.trim()) {
      alert("Por favor, completa el nombre.");
      return;
    }

    const id = Cookies.get("id");

    const timeSheetData = {
      user: { id },
      startTime,
      endTime,
      name,
    };

    try {
      await postTimeSheet(timeSheetData);
      localStorage.removeItem("startTime");
      localStorage.removeItem("endTime");
      setName("");
      console.log("Datos enviados y eliminados de localStorage");
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };

  return (
    <div className=" top-28 right-0 left-0 mx-auto bg-custom-black-2 text-white p-4 rounded-md shadow-lg w-full max-w-md">
      {!startTime ? (
        <button
          onClick={handleStart}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Iniciar turno
        </button>
      ) : !endTime ? (
        <button
          onClick={handleEnd}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Finalizar turno
        </button>
      ) : (
        <div className="space-y-4">
          <div>
            <label className="block mb-1 text-sm lg:text-base">Nombre</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={handleSubmit}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded transition duration-300"
          >
            Enviar
          </button>
        </div>
      )}
    </div>
  );
};

export default TimeSheet;
