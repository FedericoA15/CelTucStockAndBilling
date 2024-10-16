"use client";
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
      const response = await fetch("/api/timesheet", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(timeSheetData),
      });

      if (response.ok) {
        alert("Turno registrado con éxito");
        localStorage.removeItem("startTime");
        localStorage.removeItem("endTime");
        setStartTime(null);
        setEndTime(null);
        setName("");
      } else {
        alert("Error al registrar el turno");
      }
    } catch (error) {
      console.error("Error al hacer el POST:", error);
      alert("Error al registrar el turno");
    }
  };

  return (
    <div className="absolute top-28 right-4 bg-custom-black-2 text-white p-4 rounded-md shadow-lg">
      {!startTime ? (
        <button onClick={handleStart} className="bg-blue-500 px-4 py-2 rounded">
          Iniciar turno
        </button>
      ) : !endTime ? (
        <button onClick={handleEnd} className="bg-yellow-500 px-4 py-2 rounded">
          Finalizar turno
        </button>
      ) : (
        <div className="space-y-2">
          <div>
            <label className="block mb-1">Nombre</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white"
            />
          </div>
          <button
            onClick={handleSubmit}
            className="bg-green-500 px-4 py-2 rounded"
          >
            Enviar
          </button>
        </div>
      )}
    </div>
  );
};

export default TimeSheet;
