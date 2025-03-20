"use client";

import React, { useState, useEffect } from "react";
import { getLastVoucherByType } from "@/actions/voucher/getLastVoucherByType";
import { postVoucher } from "@/actions/voucher/postVoucher";
import { GeneratePDFByReceipt, GeneratePDFBySign } from "@/utils/GeneratePDF";
import Cookies from "js-cookie";
import Link from "next/link";
import {
  Save,
  FileText,
  Calendar,
  User,
  Smartphone,
  FileSignature,
  Building,
  Hash,
} from "lucide-react";

const ReceiptForm: React.FC = () => {
  const id = Cookies.get("id");
  const role = Cookies.get("roles");
  const [clientEmail, setClientEmail] = useState("");

  const getCurrentDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const [formData, setFormData] = useState({
    coupon: "",
    date: getCurrentDate(),
    client: "",
    phone: "",
    sign: "",
    concept: "",
    obs: "", // valor del dolar
    total: "", // valor del equipo
    slope: "",
    branch: { id: "" },
    signature: "",
  });

  useEffect(() => {
    async function fetchLastCoupon() {
      try {
        const lastVoucher = await getLastVoucherByType("Sena");
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
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "clientEmail") {
      setClientEmail(value);
    }
  };

  const branchNames: { [key: string]: string } = {
    "e692d1b3-71a7-431a-ba8a-36754f2c64a5": "Yerba Buena",
    "e692d1b3-71a7-431a-ba8a-36754f2c64a9": "Solar",
    "e692d1b3-71a7-431a-ba8a-36754f2c64a3": "Centro",
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.branch.id) {
      alert(
        "Por favor, selecciona una sucursal antes de enviar el formulario."
      );
      return;
    }

    const formDataWithType = {
      ...formData,
      type: "Sena",
      user: { id },
    };

    const branchName =
      branchNames[formData.branch.id] || "Sucursal desconocida";

    postVoucher(formDataWithType);
    GeneratePDFBySign(formDataWithType, branchName, clientEmail);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b  py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="bg-custom-black-2 shadow-2xl rounded-lg overflow-hidden border border-gray-700"
        >
          <div className="px-6 py-8">
            <h2 className="text-3xl font-bold text-center text-white mb-8">
              Seña
            </h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="branch"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    <Building className="inline-block w-5 h-5 mr-1" /> Sucursal
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
                    className="w-full py-2 px-3 border border-gray-600 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white transition duration-300 ease-in-out"
                  >
                    <option value="" disabled>
                      Selecciona una sucursal
                    </option>
                    <option value="e692d1b3-71a7-431a-ba8a-36754f2c64a5">
                      Yerba Buena
                    </option>
                    <option value="e692d1b3-71a7-431a-ba8a-36754f2c64a9">
                      Solar
                    </option>
                    <option value="e692d1b3-71a7-431a-ba8a-36754f2c64a3">
                      Centro
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="coupon"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    <Hash className="inline-block w-5 h-5 mr-1" /> CUPON Nº
                  </label>
                  <input
                    type="text"
                    id="coupon"
                    name="coupon"
                    value={formData.coupon}
                    onChange={handleChange}
                    className="w-full py-2 px-3 border border-gray-600 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white"
                    readOnly
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    <Calendar className="inline-block w-5 h-5 mr-1" /> FECHA
                  </label>
                  <input
                    type="text"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full py-2 px-3 border border-gray-600 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white transition duration-300 ease-in-out"
                    readOnly
                  />
                </div>

                <div>
                  <label
                    htmlFor="client"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    <User className="inline-block w-5 h-5 mr-1" /> RECIBI DE
                  </label>
                  <input
                    type="text"
                    id="client"
                    name="client"
                    value={formData.client}
                    onChange={handleChange}
                    className="w-full py-2 px-3 border border-gray-600 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white transition duration-300 ease-in-out"
                    placeholder="Nombre del cliente"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    <User className="inline-block w-5 h-5 mr-1" /> TEL:
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full py-2 px-3 border border-gray-600 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white transition duration-300 ease-in-out"
                    placeholder="Telefono"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="sign"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  <Smartphone className="inline-block w-5 h-5 mr-1" /> LA SUMA
                  DE:
                </label>
                <textarea
                  id="sign"
                  name="sign"
                  value={formData.sign}
                  onChange={handleChange}
                  rows={3}
                  className="w-full py-2 px-3 border border-gray-600 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white transition duration-300 ease-in-out"
                  placeholder="Suma de dinero de la seña en dolares"
                />
              </div>
              <div>
                <label
                  htmlFor="concept"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  <Smartphone className="inline-block w-5 h-5 mr-1" /> EN
                  CONCEPTO DE
                </label>
                <textarea
                  id="concept"
                  name="concept"
                  value={formData.concept}
                  onChange={handleChange}
                  rows={3}
                  className="w-full py-2 px-3 border border-gray-600 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white transition duration-300 ease-in-out"
                  placeholder="Descripción del equipo"
                />
              </div>

              <div>
                <label
                  htmlFor="total"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  <Smartphone className="inline-block w-5 h-5 mr-1" /> VALOR
                  TOTAL:
                </label>
                <textarea
                  id="total"
                  name="total"
                  value={formData.total}
                  onChange={handleChange}
                  rows={3}
                  className="w-full py-2 px-3 border border-gray-600 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white transition duration-300 ease-in-out"
                  placeholder="Total del equipo en dolares"
                />
              </div>

              <div>
                <label
                  htmlFor="slope"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  <FileSignature className="inline-block w-5 h-5 mr-1" /> TOTAL
                  $
                </label>
                <textarea
                  id="slope"
                  name="slope"
                  value={formData.slope}
                  onChange={handleChange}
                  rows={2}
                  className="w-full py-2 px-3 border border-gray-600 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white transition duration-300 ease-in-out"
                  placeholder="Total que falta abonar en dolares"
                />
              </div>
              <div>
                <label
                  htmlFor="signature"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  <FileSignature className="inline-block w-5 h-5 mr-1" /> Firma
                </label>
                <textarea
                  id="signature"
                  name="signature"
                  value={formData.signature}
                  onChange={handleChange}
                  rows={2}
                  className="w-full py-2 px-3 border border-gray-600 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white transition duration-300 ease-in-out"
                  placeholder="Firma digital o número de identificación"
                />
              </div>
            </div>
          </div>

          <div className="px-6 py-4 bg-gray-700 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <button
              type="submit"
              className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out flex items-center justify-center"
              title="Genera el PDF y guarda el recibo"
              aria-label="Generar PDF y Guardar"
            >
              <Save className="w-5 h-5 mr-2" />
              Generar PDF y Guardar
            </button>
            {(role === "ADMIN" || role === "SUPERADMIN") && (
              <Link href="/sign/list">
                <span
                  className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out flex items-center justify-center cursor-pointer"
                  title="Ver lista de comprobantes"
                  aria-label="Ver comprobantes"
                >
                  <FileText className="w-5 h-5 mr-2" />
                  Ver comprobantes
                </span>
              </Link>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReceiptForm;
