"use client";
import { postTimeSheet } from "@/actions/timeSheet/postTimeSheet";
import React, { useState, useEffect } from "react";

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
    const currentStartTime = new Date().toISOString();
    setStartTime(currentStartTime);
    localStorage.setItem("startTime", currentStartTime);
  };

  const handleEnd = () => {
    const currentEndTime = new Date().toISOString();
    setEndTime(currentEndTime);
    localStorage.setItem("endTime", currentEndTime);
  };

  const handleSubmit = async () => {
    const timeSheetData = {
      startTime,
      endTime,
      name,
    };
    
    try {
      // await postTimeSheet(timeSheetData);
      localStorage.removeItem("startTime");
      localStorage.removeItem("endTime");
      localStorage.removeItem("name");
      console.log("Datos enviados y eliminados de localStorage");
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };

  return (
    <div className="absolute top-28 right-4 bg-custom-black-2 text-white p-4 rounded-md shadow-lg w-full max-w-md mx-auto lg:right-4">
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
