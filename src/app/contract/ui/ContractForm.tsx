"use client";
import React, { useState, useEffect } from "react";
import { getLastVoucherByType } from "@/actions/voucher/getLastVoucherByType";
import { postVoucher } from "@/actions/voucher/postVoucher";
import { GeneratePDFByContract } from "@/utils/GeneratePDF";
import Cookies from "js-cookie";
import Link from "next/link";

const ContractForm: React.FC = () => {
  const id = Cookies.get("id");
  const role = Cookies.get("roles");
  const [clientEmail, setClientEmail] = useState("");
  const [formData, setFormData] = useState({
    coupon: "",
    date: new Date().toISOString().split("T")[0],
    client: "",
    dni: "",
    brand: "",
    model: "",
    color: "",
    imei: "",
    imei2: "",
    obs: "",
    reception: "",
    dniBuyer: "",
    total: "",
    branch: { id: "" },
    signature: "",
    signatureBySeller: "",
  });

  useEffect(() => {
    async function fetchLastCoupon() {
      try {
        const lastVoucher = await getLastVoucherByType("Contrato");
        const lastCoupon = lastVoucher.content[0]?.coupon || 0;

        setFormData((prevData) => ({
          ...prevData,
          coupon: (parseInt(lastCoupon, 10) + 1).toString(),
        }));
      } catch (error) {
        console.error("Error al obtener el último cupón:", error);
      }
    }

    fetchLastCoupon();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "clientEmail") {
      setClientEmail(value);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.branch.id) {
      alert(
        "Por favor, selecciona una sucursal antes de enviar el formulario."
      );
      return;
    }

    const formDataWithType = {
      ...formData,
      type: "Contrato",
      user: { id },
    };
    postVoucher(formDataWithType);
    GeneratePDFByContract(formDataWithType, clientEmail);
  };

  return (
    <div className="flex text-white items-start justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl p-6 bg-custom-black-2 shadow-lg rounded-lg space-y-4"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          RECIBO DE COMPRA DE EQUIPO/S
        </h2>
        <div className="mb-4">
          <label htmlFor="branch" className="block font-medium">
            Sucursal
          </label>
          <select
            id="branch"
            name="branch"
            value={formData.branch.id}
            onChange={(e) =>
              setFormData({
                ...formData,
                branch: { id: e.target.value },
              })
            }
            className="mt-1 block w-full text-black border-gray-300 rounded-md shadow-sm"
          >
            <option value="" disabled>
              Selecciona una sucursal
            </option>
            <option value="e692d1b3-71a7-431a-ba8a-36754f2c64a5">
              Yerba Buena
            </option>
            <option value="e692d1b3-71a7-431a-ba8a-36754f2c64a9">Solar</option>
            <option value="e692d1b3-71a7-431a-ba8a-36754f2c64a3">Centro</option>
          </select>
        </div>

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
                readOnly
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
            Señor/a
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
          <div>
            <label htmlFor="dni" className="block font-medium">
              DNI
            </label>
            <input
              type="text"
              id="dni"
              name="dni"
              value={formData.dni}
              onChange={handleChange}
              className="mt-1 block w-full text-black border-gray-300 rounded-md shadow-sm"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="brand" className="block font-medium">
              Marca
            </label>
            <input
              type="text"
              id="brand"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              className="mt-1 block w-full text-black border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label htmlFor="model" className="block font-medium">
              Modelo
            </label>
            <input
              type="text"
              id="model"
              name="model"
              value={formData.model}
              onChange={handleChange}
              className="mt-1 block w-full text-black border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label htmlFor="color" className="block font-medium">
              Color
            </label>
            <input
              type="text"
              id="color"
              name="color"
              value={formData.color}
              onChange={handleChange}
              className="mt-1 block w-full text-black border-gray-300 rounded-md shadow-sm"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="imei" className="block font-medium">
              IMEI
            </label>
            <input
              type="text"
              id="imei"
              name="imei"
              value={formData.imei}
              onChange={handleChange}
              className="mt-1 block w-full text-black border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label htmlFor="imei2" className="block font-medium">
              IMEI 2
            </label>
            <input
              type="text"
              id="imei2"
              name="imei2"
              value={formData.imei2}
              onChange={handleChange}
              className="mt-1 block w-full text-black border-gray-300 rounded-md shadow-sm"
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="reception" className="block font-medium">
            RECEPCIÓN
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
          <label htmlFor="dniBuyer" className="block font-medium">
            DNI Comprador
          </label>
          <input
            type="text"
            id="dniBuyer"
            name="dniBuyer"
            value={formData.dniBuyer}
            onChange={handleChange}
            className="mt-1 block w-full text-black border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="observations" className="block font-medium">
            OBSERVACIONES
          </label>
          <textarea
            id="obs"
            name="obs"
            value={formData.obs}
            onChange={handleChange}
            className="mt-1 block w-full text-black border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="total" className="block font-medium">
            TOTAL
          </label>
          <input
            type="text"
            id="total"
            name="total"
            value={formData.total}
            onChange={handleChange}
            className="mt-1 block w-full text-black border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="signatureBySeller" className="block font-medium">
            Firma de vendedor
          </label>
          <input
            id="signatureBySeller"
            name="signatureBySeller"
            value={formData.signatureBySeller}
            onChange={handleChange}
            className="mt-1 block w-full text-black border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="signature" className="block font-medium">
            Firma de cliente
          </label>
          <input
            id="signature"
            name="signature"
            value={formData.signature}
            onChange={handleChange}
            className="mt-1 block w-full text-black border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-green-700 hover:bg-opacity-80 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Generar PDF y Guardar
          </button>
        </div>
        {role == "ADMIN" && (
          <div className="text-center">
            <Link href="/contract/list">
              <button
                type="button"
                className=" bg-blue-700 hover:bg-opacity-80 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Ver cupones
              </button>
            </Link>
          </div>
        )}
      </form>
    </div>
  );
};

export default ContractForm;
