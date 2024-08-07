"use client";
import { postVoucher } from "@/actions/voucher/postVoucher";
import { GeneratePDFByRepair } from "@/utils/GeneratePDF";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

const RepairForm: React.FC = () => {
  const id = Cookies.get("id");
  const [clientEmail, setClientEmail] = useState("");
  const [formData, setFormData] = useState({
    coupon: "",
    date: "",
    client: "",
    equipment: "",
    failure: "",
    obs: "",
    reception: "",
    budget: "",
    code: "",
    sign: "",
    phone: "",
    slope: "",
    dignosis: "",
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
    setClientEmail(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formDataWithType = {
      ...formData,
      type: "Garantia/Reparacion",
      user: {
        id: id,
      },
    };
    postVoucher(formDataWithType);
    GeneratePDFByRepair(formData, clientEmail);
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
              <label htmlFor="coupon" className="block font-medium">
                CUPON Nº
              </label>
              <input
                type="text"
                id="coupon"
                name="coupon"
                value={formData.coupon}
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
          <label htmlFor="client" className="block font-medium">
            RECIBI DE
          </label>
          <input
            type="text"
            id="client"
            name="client"
            value={formData.client}
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
          <label htmlFor="failure" className="block font-medium">
            CON LA SIGUIENTE FALLA/S
          </label>
          <textarea
            id="faults"
            name="failure"
            value={formData.failure}
            onChange={handleChange}
            className="mt-1 block w-full text-black border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="obs" className="block font-medium">
            OBS
          </label>
          <textarea
            id="obs"
            name="obs"
            value={formData.obs}
            onChange={handleChange}
            className="mt-1 block w-full text-black border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="reception" className="block font-medium">
              RECEPCIONO
            </label>
            <input
              type="text"
              id="reception"
              name="reception"
              value={formData.reception}
              onChange={handleChange}
              className="mt-1 block w-full text-black border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label htmlFor="budget" className="block font-medium">
              PRESUPUESTO
            </label>
            <input
              type="text"
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="mt-1 block w-full text-black border-gray-300 rounded-md shadow-sm"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label htmlFor="code" className="block font-medium">
              COD. DESBLOQUEO
            </label>
            <input
              type="text"
              id="code"
              name="code"
              value={formData.code}
              onChange={handleChange}
              className="mt-1 block w-full text-black border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label htmlFor="sign" className="block font-medium">
              SEÑA
            </label>
            <input
              type="text"
              id="sign"
              name="sign"
              value={formData.sign}
              onChange={handleChange}
              className="mt-1 block w-full text-black border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label htmlFor="slope" className="block font-medium">
              PENDIENTE
            </label>
            <input
              type="text"
              id="slope"
              name="slope"
              value={formData.slope}
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
          <label htmlFor="clientEmail" className="block font-medium">
            Email
          </label>
          <input
            type="text"
            id="clientEmail"
            name="clientEmail"
            value={clientEmail}
            onChange={handleChange}
            className="mt-1 block w-full text-black border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="dignosis" className="block font-medium">
            DIAGNOSTICO TECNICO
          </label>
          <textarea
            id="dignosis"
            name="dignosis"
            value={formData.dignosis}
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
