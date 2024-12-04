"use client";

import React, { useState, useEffect } from "react";
import { getLastVoucherByType } from "@/actions/voucher/getLastVoucherByType";
import { postVoucher } from "@/actions/voucher/postVoucher";
import { GeneratePDFByReceipt } from "@/utils/GeneratePDF";
import Cookies from "js-cookie";
import IMEIResultModal from "./IMEIResultModal";
import { getProductByIMEI } from "@/actions/products/getProductByIMEI";
import IMEISearchForm from "./IMEISearchForm";
import Link from "next/link";
import {
  Save,
  FileText,
  Calendar,
  User,
  Phone,
  Mail,
  DollarSign,
  Smartphone,
  Shield,
  CreditCard,
  FileSignature,
  Building,
  Hash,
} from "lucide-react";

const ReceiptForm: React.FC = () => {
  const id = Cookies.get("id");
  const role = Cookies.get("roles");
  const [clientEmail, setClientEmail] = useState("");
  const [product, setProduct] = useState<any>();
  const paymentOptions = [
    "Efectivo",
    "Tarjeta",
    "Transferencia",
    "Proveedores",
  ];
  const additionalOptions = ["Felipe", "Gi", "Carlos", "Ezequiel"];

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
    DNI: "",
    phone: "",
    concept: "",
    condition: "",
    imei: "",
    warranty: "",
    paymentMethods: "",
    obs: "",
    addition: "",
    total: "",
    branch: { id: "" },
    signature: "",
    responsible: "", // Para almacenar el responsable seleccionado
    cardValue: "",
    transferValue: "",
  });

  useEffect(() => {
    async function fetchLastCoupon() {
      try {
        const lastVoucher = await getLastVoucherByType("Compra");
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

  const handleSearch = async (imei: string) => {
    try {
      const foundProduct = await getProductByIMEI(imei);
      setProduct(foundProduct);
    } catch (error) {
      console.error("Error al buscar el producto por IMEI:", error);
    }
  };

  const handleAddToVoucher = (variant: any) => {
    setFormData({
      ...formData,
      concept: `${product.name} - ${variant.subModel} - ${variant.color}`,
      imei: variant.productCodes[0],
      condition: variant.state,
      total: variant.price,
      addition: variant.price,
    });
    setProduct(null);
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
    const foundProduct = await getProductByIMEI(formData.imei);

    const formDataWithType = {
      ...formData,
      type: "Compra",
      user: { id },
      productVariants: [foundProduct.variants[0]],
    };

    const branchName =
      branchNames[formData.branch.id] || "Sucursal desconocida";

    // postVoucher(formDataWithType);
    console.log(formDataWithType.paymentMethods);
    // GeneratePDFByReceipt(formDataWithType, branchName, clientEmail);
  };

  const handlePaymentMethodChange = (paymentMethod: string) => {
    setFormData((prevData) => {
      const methodsArray = prevData.paymentMethods
        ? prevData.paymentMethods.split(", ").filter((m) => m !== "")
        : [];

      const isSelected = methodsArray.includes(paymentMethod);

      // Actualiza la lista de métodos de pago
      const updatedMethods = isSelected
        ? methodsArray.filter((method) => method !== paymentMethod)
        : [...methodsArray, paymentMethod];

      return {
        ...prevData,
        paymentMethods: updatedMethods.join(", "), // Actualiza el string separado por comas
      };
    });
  };

  const handleCloseModal = () => {
    setProduct(null);
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
              RECIBO DE COMPRA DE EQUIPO/S
            </h2>
            <IMEISearchForm onSearch={handleSearch} />
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
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                  <label
                    htmlFor="DNI"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    <FileSignature className="inline-block w-5 h-5 mr-1" /> DNI
                  </label>
                  <input
                    type="text"
                    id="DNI"
                    name="DNI"
                    value={formData.DNI}
                    onChange={handleChange}
                    className="w-full py-2 px-3 border border-gray-600 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white transition duration-300 ease-in-out"
                    placeholder="Número de DNI"
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    <Phone className="inline-block w-5 h-5 mr-1" /> Nº TEL
                  </label>
                  <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full py-2 px-3 border border-gray-600 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white transition duration-300 ease-in-out"
                    placeholder="Número de teléfono"
                  />
                </div>
                <div>
                  <label
                    htmlFor="clientEmail"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    <Mail className="inline-block w-5 h-5 mr-1" /> Email
                  </label>
                  <input
                    type="email"
                    id="clientEmail"
                    name="clientEmail"
                    value={clientEmail}
                    onChange={handleChange}
                    className="w-full py-2 px-3 border border-gray-600 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white transition duration-300 ease-in-out"
                    placeholder="correo@ejemplo.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="addition"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  <DollarSign className="inline-block w-5 h-5 mr-1" /> LA SUMA
                  DE
                </label>
                <input
                  type="text"
                  id="addition"
                  name="addition"
                  value={formData.addition}
                  onChange={handleChange}
                  className="w-full py-2 px-3 border border-gray-600 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white transition duration-300 ease-in-out"
                  placeholder="Monto en pesos"
                />
              </div>

              <div>
                <label
                  htmlFor="concept"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  <Smartphone className="inline-block w-5 h-5 mr-1" /> EN
                  CONCEPTO DE LA COMPRA DE EQUIPO/S
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="condition"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    <Shield className="inline-block w-5 h-5 mr-1" /> CONDICION
                  </label>
                  <input
                    type="text"
                    id="condition"
                    name="condition"
                    value={formData.condition}
                    onChange={handleChange}
                    className="w-full py-2 px-3 border border-gray-600 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white transition duration-300 ease-in-out"
                    placeholder="Estado del equipo"
                  />
                </div>
                <div>
                  <label
                    htmlFor="total"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    <DollarSign className="inline-block w-5 h-5 mr-1" /> TOTAL $
                  </label>
                  <input
                    type="text"
                    id="total"
                    name="total"
                    value={formData.total}
                    onChange={handleChange}
                    className="w-full py-2 px-3 border border-gray-600 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white transition duration-300 ease-in-out"
                    placeholder="Monto total"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
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
                    placeholder="Número IMEI"
                  />
                </div>
                <div>
                  <label
                    htmlFor="warranty"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    <Shield className="inline-block w-5 h-5 mr-1" /> GARANTIA
                  </label>
                  <input
                    type="text"
                    id="warranty"
                    name="warranty"
                    value={formData.warranty}
                    onChange={handleChange}
                    className="w-full py-2 px-3 border border-gray-600 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white transition duration-300 ease-in-out"
                    placeholder="Período de garantía"
                  />
                </div>

                <div>
                  <label
                    htmlFor="paymentMethods"
                    className="block text-sm font-medium text-gray-300 mb-1"
                  >
                    <CreditCard className="inline-block w-5 h-5 mr-1" /> FORMAS
                    DE PAGO
                  </label>
                  {paymentOptions.map((option) => (
                    <div key={option} className="flex items-center">
                      <input
                        type="checkbox"
                        id={option}
                        name="paymentMethods"
                        value={option}
                        checked={formData.paymentMethods.includes(option)}
                        onChange={() => handlePaymentMethodChange(option)}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <label
                        htmlFor={option}
                        className="ml-2 text-sm text-white"
                      >
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              {(formData.paymentMethods.includes("Tarjeta") ||
                formData.paymentMethods.includes("Transferencia")) && (
                <div className="space-y-4">
                  {/* Responsable del Pago */}
                  <div>
                    <label
                      htmlFor="responsible"
                      className="block text-sm font-medium text-gray-300 mb-1"
                    >
                      Responsable del Pago
                    </label>
                    <select
                      id="responsible"
                      name="responsible"
                      value={formData.responsible}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          responsible: e.target.value,
                        })
                      }
                      className="w-full py-2 px-3 border border-gray-600 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white transition duration-300 ease-in-out"
                    >
                      <option value="">Selecciona un responsable</option>
                      {additionalOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Campo de Valor para Tarjeta */}
                  {formData.paymentMethods.includes("Tarjeta") && (
                    <div>
                      <label
                        htmlFor="cardValue"
                        className="block text-sm font-medium text-gray-300 mb-1"
                      >
                        Valor para Tarjeta
                      </label>
                      <input
                        type="number"
                        id="cardValue"
                        name="cardValue"
                        value={formData.cardValue || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            cardValue: e.target.value,
                          })
                        }
                        className="w-full py-2 px-3 border border-gray-600 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white transition duration-300 ease-in-out"
                      />
                    </div>
                  )}

                  {/* Campo de Valor para Transferencia */}
                  {formData.paymentMethods.includes("Transferencia") && (
                    <div>
                      <label
                        htmlFor="transferValue"
                        className="block text-sm font-medium text-gray-300 mb-1"
                      >
                        Valor para Transferencia
                      </label>
                      <input
                        type="number"
                        id="transferValue"
                        name="transferValue"
                        value={formData.transferValue || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            transferValue: e.target.value,
                          })
                        }
                        className="w-full py-2 px-3 border border-gray-600 bg-gray-700 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-white transition duration-300 ease-in-out"
                      />
                    </div>
                  )}
                </div>
              )}

              <div>
                <label
                  htmlFor="obs"
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
                  placeholder="Observaciones adicionales"
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
              <Link href="/voucher/list">
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
      <IMEIResultModal
        product={product}
        onClose={handleCloseModal}
        onAddToVoucher={handleAddToVoucher}
      />
    </div>
  );
};

export default ReceiptForm;
