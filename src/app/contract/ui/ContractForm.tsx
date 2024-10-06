"use client";
import React, { useState, useEffect } from "react";
import { getLastVoucherByType } from "@/actions/voucher/getLastVoucherByType";
import { postVoucher } from "@/actions/voucher/postVoucher";
import {
  Building,
  Calendar,
  User,
  Smartphone,
  FileText,
  DollarSign,
  CreditCard,
  Save,
} from "lucide-react";
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
    <div className="min-h-screen bg-gradient-to-b py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <form
          onSubmit={handleSubmit}
          className="bg-custom-black-2 shadow-2xl rounded-lg overflow-hidden border border-gray-700"
        >
          <div className="px-6 py-8">
            <h2 className="text-3xl font-bold text-center text-white mb-8">
              RECIBO DE COMPRA DE EQUIPO/S
            </h2>
            <div className="space-y-6">
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
                    setFormData({ ...formData, branch: { id: e.target.value } })
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

              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                <div className="flex flex-col">
                  <span className="font-bold text-white">CELTUC</span>
                </div>
                <div className="w-full sm:w-auto space-y-4">
                  <div>
                    <label
                      htmlFor="coupon"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      <CreditCard className="inline-block w-5 h-5 mr-1" /> CUPON
                      Nº
                    </label>
                    <input
                      type="text"
                      id="coupon"
                      name="coupon"
                      value={formData.coupon}
                      onChange={handleChange}
                      className="w-full py-2 px-3 border border-gray-600 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white transition duration-300 ease-in-out"
                      readOnly
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="date"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      <Calendar className="inline-block w-5 h-5 mr-1" /> FECHA
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      className="w-full py-2 px-3 border border-gray-600 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white transition duration-300 ease-in-out"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="client"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  <User className="inline-block w-5 h-5 mr-1" /> Señor/a
                </label>
                <input
                  type="text"
                  id="client"
                  name="client"
                  value={formData.client}
                  onChange={handleChange}
                  className="w-full py-2 px-3 border border-gray-600 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white transition duration-300 ease-in-out"
                />
              </div>

              <div>
                <label
                  htmlFor="clientEmail"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  <FileText className="inline-block w-5 h-5 mr-1" /> Email
                </label>
                <input
                  type="email"
                  id="clientEmail"
                  name="clientEmail"
                  value={clientEmail}
                  onChange={handleChange}
                  className="w-full py-2 px-3 border border-gray-600 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white transition duration-300 ease-in-out"
                />
              </div>

              <div>
                <label
                  htmlFor="dni"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  <FileText className="inline-block w-5 h-5 mr-1" /> DNI
                </label>
                <input
                  type="text"
                  id="dni"
                  name="dni"
                  value={formData.dni}
                  onChange={handleChange}
                  className="w-full py-2 px-3 border border-gray-600 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white transition duration-300 ease-in-out"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label
                    htmlFor="brand"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    <Smartphone className="inline-block w-5 h-5 mr-1" /> Marca
                  </label>
                  <input
                    type="text"
                    id="brand"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    className="w-full py-2 px-3 border border-gray-600 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white transition duration-300 ease-in-out"
                  />
                </div>
                <div>
                  <label
                    htmlFor="model"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    <Smartphone className="inline-block w-5 h-5 mr-1" /> Modelo
                  </label>
                  <input
                    type="text"
                    id="model"
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                    className="w-full py-2 px-3 border border-gray-600 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white transition duration-300 ease-in-out"
                  />
                </div>
                <div>
                  <label
                    htmlFor="color"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    <Smartphone className="inline-block w-5 h-5 mr-1" /> Color
                  </label>
                  <input
                    type="text"
                    id="color"
                    name="color"
                    value={formData.color}
                    onChange={handleChange}
                    className="w-full py-2 px-3 border border-gray-600 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white transition duration-300 ease-in-out"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="imei"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    <Smartphone className="inline-block w-5 h-5 mr-1" /> IMEI
                  </label>
                  <input
                    type="text"
                    id="imei"
                    name="imei"
                    value={formData.imei}
                    onChange={handleChange}
                    className="w-full py-2 px-3 border border-gray-600 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white transition duration-300 ease-in-out"
                  />
                </div>
                <div>
                  <label
                    htmlFor="imei2"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    <Smartphone className="inline-block w-5 h-5 mr-1" /> IMEI 2
                  </label>
                  <input
                    type="text"
                    id="imei2"
                    name="imei2"
                    value={formData.imei2}
                    onChange={handleChange}
                    className="w-full py-2 px-3 border border-gray-600 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white transition duration-300 ease-in-out"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="reception"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  <User className="inline-block w-5 h-5 mr-1" /> RECEPCIÓN
                </label>
                <input
                  type="text"
                  id="reception"
                  name="reception"
                  value={formData.reception}
                  onChange={handleChange}
                  className="w-full py-2 px-3 border border-gray-600 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white transition duration-300 ease-in-out"
                />
              </div>

              <div>
                <label
                  htmlFor="dniBuyer"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  <FileText className="inline-block w-5 h-5 mr-1" /> DNI
                  Comprador
                </label>
                <input
                  type="text"
                  id="dniBuyer"
                  name="dniBuyer"
                  value={formData.dniBuyer}
                  onChange={handleChange}
                  className="w-full py-2 px-3 border border-gray-600 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white transition duration-300 ease-in-out"
                />
              </div>

              <div>
                <label
                  htmlFor="observations"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  <FileText className="inline-block w-5 h-5 mr-1" />{" "}
                  OBSERVACIONES
                </label>
                <textarea
                  id="obs"
                  name="obs"
                  value={formData.obs}
                  onChange={handleChange}
                  rows={3}
                  className="w-full py-2 px-3 border border-gray-600 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white transition duration-300 ease-in-out"
                />
              </div>

              <div>
                <label
                  htmlFor="total"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  <DollarSign className="inline-block w-5 h-5 mr-1" /> TOTAL
                </label>
                <input
                  type="text"
                  id="total"
                  name="total"
                  value={formData.total}
                  onChange={handleChange}
                  className="w-full py-2 px-3 border border-gray-600 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white transition duration-300 ease-in-out"
                />
              </div>

              <div>
                <label
                  htmlFor="signatureBySeller"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  <FileText className="inline-block w-5 h-5 mr-1" /> Firma de
                  vendedor
                </label>
                <input
                  type="text"
                  id="signatureBySeller"
                  name="signatureBySeller"
                  value={formData.signatureBySeller}
                  onChange={handleChange}
                  className="w-full py-2 px-3 border border-gray-600 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white transition duration-300 ease-in-out"
                />
              </div>

              <div>
                <label
                  htmlFor="signature"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  <FileText className="inline-block w-5 h-5 mr-1" /> Firma de
                  cliente
                </label>
                <input
                  type="text"
                  id="signature"
                  name="signature"
                  value={formData.signature}
                  onChange={handleChange}
                  className="w-full py-2 px-3 border border-gray-600 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white transition duration-300 ease-in-out"
                />
              </div>
            </div>
          </div>

          <div className="px-6 py-4 bg-gray-700 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <button
              type="submit"
              className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out flex items-center justify-center"
            >
              <Save className="w-5 h-5 mr-2" />
              Generar PDF y Guardar
            </button>
            {role === "ADMIN" && (
              <Link href="/contract/list">
                <span className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out flex items-center justify-center cursor-pointer">
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

export default ContractForm;
