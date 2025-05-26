"use client";
import { postVoucher } from "@/actions/voucher/postVoucher";
import { GeneratePDFByRepair } from "@/utils/GeneratePDF";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Link from "next/link";
import { getLastVoucherByType } from "@/actions/voucher/getLastVoucherByType";
import {
  Building,
  Calendar,
  User,
  Smartphone,
  FileText,
  Shield,
  CreditCard,
  Save,
} from "lucide-react";

const RepairForm: React.FC = () => {
  const id = Cookies.get("id");
  const role = Cookies.get("roles");
  const [clientEmail, setClientEmail] = useState("");
  const branchNames: { [key: string]: string } = {
    "e692d1b3-71a7-431a-ba8a-36754f2c64a5": "Yerba Buena",
    "e692d1b3-71a7-431a-ba8a-36754f2c64a9": "Solar",
    "e692d1b3-71a7-431a-ba8a-36754f2c64a3": "Centro",
  };

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
    equipment: "",
    failure: "",
    obs: "",
    reception: "",
    budget: "",
    warranty: "",
    code: "",
    sign: "",
    phone: "",
    slope: "",
    dignosis: "",
    branch: { id: "" },
  });

  useEffect(() => {
    async function fetchLastCoupon() {
      try {
        const lastVoucher = await getLastVoucherByType("Garantia/Reparacion");
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
      type: "Garantia/Reparacion",
      user: {
        id: id,
      },
    };

    const branchName =
      branchNames[formData.branch.id] || "Sucursal desconocida";
    postVoucher(formDataWithType);
    GeneratePDFByRepair(formData, branchName, clientEmail);
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
              RECEPCION DE EQUIPO/GARANTIA REPARACION
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                    type="text"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full py-2 px-3 border border-gray-600 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white transition duration-300 ease-in-out"
                    readOnly
                  />
                </div>
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
                />
              </div>

              <div>
                <label
                  htmlFor="equipment"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  <Smartphone className="inline-block w-5 h-5 mr-1" /> EL
                  EQUIPO/S
                </label>
                <input
                  type="text"
                  id="equipment"
                  name="equipment"
                  value={formData.equipment}
                  onChange={handleChange}
                  className="w-full py-2 px-3 border border-gray-600 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white transition duration-300 ease-in-out"
                />
              </div>

              <div>
                <label
                  htmlFor="failure"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  <Shield className="inline-block w-5 h-5 mr-1" /> CON LA
                  SIGUIENTE FALLA/S
                </label>
                <textarea
                  id="faults"
                  name="failure"
                  value={formData.failure}
                  onChange={handleChange}
                  rows={3}
                  className="w-full py-2 px-3 border border-gray-600 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white transition duration-300 ease-in-out"
                />
              </div>

              <div>
                <label
                  htmlFor="obs"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  <FileText className="inline-block w-5 h-5 mr-1" /> OBS
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="reception"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    <User className="inline-block w-5 h-5 mr-1" /> RECEPCIONO
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
                    htmlFor="budget"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    <CreditCard className="inline-block w-5 h-5 mr-1" /> LISTA
                  </label>
                  <input
                    type="number"
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full py-2 px-3 border border-gray-600 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white transition duration-300 ease-in-out"
                  />
                </div>
                <div>
                  <label
                    htmlFor="budget"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    <CreditCard className="inline-block w-5 h-5 mr-1" />{" "}
                    EFECTIVO
                  </label>
                  <input
                    type="number"
                    id="warranty"
                    name="warranty"
                    value={formData.warranty}
                    onChange={handleChange}
                    className="w-full py-2 px-3 border border-gray-600 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white transition duration-300 ease-in-out"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label
                    htmlFor="code"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    <Shield className="inline-block w-5 h-5 mr-1" /> COD.
                    DESBLOQUEO
                  </label>
                  <input
                    type="text"
                    id="code"
                    name="code"
                    value={formData.code}
                    onChange={handleChange}
                    className="w-full py-2 px-3 border border-gray-600 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white transition duration-300 ease-in-out"
                  />
                </div>
                {/* <div>
                  <label
                    htmlFor="sign"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    <CreditCard className="inline-block w-5 h-5 mr-1" /> SEÑA
                  </label>
                  <input
                    type="text"
                    id="sign"
                    name="sign"
                    value={formData.sign}
                    onChange={handleChange}
                    className="w-full py-2 px-3 border border-gray-600 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white transition duration-300 ease-in-out"
                  />
                </div> */}
                {/* " <div>
                  <label
                    htmlFor="slope"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    <CreditCard className="inline-block w-5 h-5 mr-1" />{" "}
                    PENDIENTE
                  </label>
                  <input
                    type="text"
                    id="slope"
                    name="slope"
                    value={formData.slope}
                    onChange={handleChange}
                    className="w-full py-2 px-3 border border-gray-600 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white transition duration-300 ease-in-out"
                  />
                </div>" */}
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  <Smartphone className="inline-block w-5 h-5 mr-1" /> TEL
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
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
            {(role === "ADMIN" || role === "SUPERADMIN") && (
              <Link href="/repair/list">
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

export default RepairForm;
