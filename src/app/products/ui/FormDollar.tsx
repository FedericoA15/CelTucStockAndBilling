"use client";
import { putDollar } from "@/actions/dollar/putDollar";
import axiosInstance from "@/utils/axiosInstance";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

const FormDollar: React.FC = () => {
  const [dollarValue, setDollarValue] = useState<number | null>(null);
  const [newDollarValue, setNewDollarValue] = useState<string>("");
  const role = Cookies.get("roles");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const fetchDollarValue = async () => {
      try {
        const response = await axiosInstance.get("/dollar");
        setDollarValue(response.data.content[0].name);
      } catch (error) {
        console.error("Error fetching dollar value:", error);
      }
    };

    fetchDollarValue();
  }, []);

  const handleUpdateDollarValue = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await putDollar(newDollarValue);
      setDollarValue(parseFloat(newDollarValue));
      setNewDollarValue("");
    } catch (error) {
      console.error("Error updating dollar value:", error);
    }
  };

  return (
    <div className="p-4 mx-5 my-5 text-white w-full max-w-sm bg-custom-grey-2 shadow-md rounded-lg">
      <h2 className="text-lg font-bold mb-4">Valor del Dólar</h2>
      <div className="mb-4">
        <p className="text-white">
          Valor actual: {dollarValue !== null ? dollarValue : "Cargando..."}
        </p>
      </div>
      {isClient && role === "ADMIN" && (
        <form
          onSubmit={handleUpdateDollarValue}
          className="flex flex-col space-y-4"
        >
          <input
            type="number"
            value={newDollarValue}
            onChange={(e) => setNewDollarValue(e.target.value)}
            className="p-2 border text-black border-gray-300 rounded-md"
            placeholder="Nuevo valor del dólar"
            required
          />
          <button
            type="submit"
            className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
          >
            Actualizar
          </button>
        </form>
      )}
    </div>
  );
};

export default FormDollar;
