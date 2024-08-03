"use client";
import { GeneratePDFByRepair } from "@/utils/GeneratePDF";
import React, { useState, useEffect } from "react";

const RepairForm: React.FC = () => {
  const [formData, setFormData] = useState({
    couponNumber: "",
    date: "",
    name: "",
    equipment: "",
    faults: "",
    observations: "",
    receiver: "",
    estimate: "",
    unlockCode: "",
    deposit: "",
    phone: "",
    pendingAmount: "",
    technicalDiagnosis: "",
  });

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setFormData((prevData) => ({ ...prevData, date: today }));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    GeneratePDFByRepair(formData);
  };

  return (
    <div className="flex text-white items-start justify-center min-h-screen bg-custom-black">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl p-6 bg-custom-black-2 shadow-lg rounded-lg space-y-4"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          RECEPCION DE EQUIPO/GARANTIA REPARACION
        </h2>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 space-y-4 md:space-y-0">
          <div className="flex flex-col">
            <span className="font-bold">CELTUC</span>
          </div>
          <div className="w-full md:w-auto">
            <div className="flex flex-col mb-2">
              <label htmlFor="couponNumber" className="block font-medium">
                CUPON Nº
              </label>
              <input
                type="text"
                id="couponNumber"
                name="couponNumber"
                value={formData.couponNumber}
                onChange={handleChange}
                className="mt-1 block w-full text-black border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div className="flex flex-col mb-2">
              <label htmlFor="date" className="block font-medium">
                FECHA
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="mt-1 block w-full text-black border-gray-300 rounded-md shadow-sm"
              />
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="block font-medium">
            RECIBI DE
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full text-black border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="equipment" className="block font-medium">
            EL EQUIPO/S
          </label>
          <input
            type="text"
            id="equipment"
            name="equipment"
            value={formData.equipment}
            onChange={handleChange}
            className="mt-1 block w-full text-black border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="faults" className="block font-medium">
            CON LA SIGUIENTE FALLA/S
          </label>
          <textarea
            id="faults"
            name="faults"
            value={formData.faults}
            onChange={handleChange}
            className="mt-1 block w-full text-black border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="observations" className="block font-medium">
            OBS
          </label>
          <textarea
            id="observations"
            name="observations"
            value={formData.observations}
            onChange={handleChange}
            className="mt-1 block w-full text-black border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="receiver" className="block font-medium">
              RECEPCIONO
            </label>
            <input
              type="text"
              id="receiver"
              name="receiver"
              value={formData.receiver}
              onChange={handleChange}
              className="mt-1 block w-full text-black border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label htmlFor="estimate" className="block font-medium">
              PRESUPUESTO
            </label>
            <input
              type="text"
              id="estimate"
              name="estimate"
              value={formData.estimate}
              onChange={handleChange}
              className="mt-1 block w-full text-black border-gray-300 rounded-md shadow-sm"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label htmlFor="unlockCode" className="block font-medium">
              COD. DESBLOQUEO
            </label>
            <input
              type="text"
              id="unlockCode"
              name="unlockCode"
              value={formData.unlockCode}
              onChange={handleChange}
              className="mt-1 block w-full text-black border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label htmlFor="deposit" className="block font-medium">
              SEÑA
            </label>
            <input
              type="text"
              id="deposit"
              name="deposit"
              value={formData.deposit}
              onChange={handleChange}
              className="mt-1 block w-full text-black border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label htmlFor="pendingAmount" className="block font-medium">
              PENDIENTE
            </label>
            <input
              type="text"
              id="pendingAmount"
              name="pendingAmount"
              value={formData.pendingAmount}
              onChange={handleChange}
              className="mt-1 block w-full text-black border-gray-300 rounded-md shadow-sm"
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="phone" className="block font-medium">
            TEL
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="mt-1 block w-full text-black border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="technicalDiagnosis" className="block font-medium">
            DIAGNOSTICO TECNICO
          </label>
          <textarea
            id="technicalDiagnosis"
            name="technicalDiagnosis"
            value={formData.technicalDiagnosis}
            onChange={handleChange}
            className="mt-1 block w-full text-black border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Guardar Comprobante
        </button>
      </form>
    </div>
  );
};

export default RepairForm;
