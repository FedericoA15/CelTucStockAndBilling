"use client";
import { putDollar } from "@/actions/dollar/putDollar";
import axiosInstance from "@/utils/axiosInstance";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { FaDollarSign } from "react-icons/fa";

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
    <div className="p-6 mx-4 my-6 text-white w-full max-w-sm bg-custom-grey-2 shadow-lg rounded-lg">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <FaDollarSign className="mr-2 text-custom-cream" />
        Valor del Dólar
      </h2>
      <div className="mb-6">
        <p className="text-lg">
          Valor actual:{" "}
          {dollarValue !== null ? `$${dollarValue}` : "Cargando..."}
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
            className="p-3 border border-custom-grey rounded-md text-custom-black focus:border-custom-blue focus:ring-1 focus:ring-custom-blue transition duration-200"
            placeholder="Nuevo valor del dólar"
            required
          />
          <button
            type="submit"
            className="py-3 bg-custom-blue text-white rounded-md hover:bg-blue-600 transition duration-200 flex items-center justify-center"
          >
            Actualizar
          </button>
        </form>
      )}
    </div>
  );
};

export default FormDollar;
