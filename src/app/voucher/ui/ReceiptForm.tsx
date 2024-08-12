"use client";
import { postVoucher } from "@/actions/voucher/postVoucher";
import { GeneratePDFByReceipt } from "@/utils/GeneratePDF";
import React, { useState, useEffect } from "react";
import { getLastVoucherByType } from "@/actions/voucher/getLastVoucherByType";
import Cookies from "js-cookie";
import Link from "next/link";
import IMEIResultModal from "./IMEIResultModal";
import { getProductByIMEI } from "@/actions/products/getProductByIMEI";
import IMEISearchForm from "./IMEISearchForm";

const ReceiptForm: React.FC = () => {
  const id = Cookies.get("id");
  const role = Cookies.get("roles");

  const today = new Date().toISOString().split("T")[0];
  const [clientEmail, setClientEmail] = useState("");
  const [formData, setFormData] = useState({
    coupon: "",
    date: today,
    client: "",
    dni: "",
    phone: "",
    amount: "",
    concept: "",
    condition: "",
    imei: "",
    warranty: "",
    paymentMethods: "",
    observations: "",
    addition: "",
    total: "",
  });

  const [product, setProduct] = useState<any>(null);

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
    const formDataWithType = {
      ...formData,
      type: "Compra",
      user: {
        id: id,
      },
    };
    postVoucher(formDataWithType);
    GeneratePDFByReceipt(formData, clientEmail);
  };

  const handleSearch = async (imei: string) => {
    try {
      const foundProduct = await getProductByIMEI(imei);
      setProduct(foundProduct);
    } catch (error) {
      console.error("Error al buscar el producto por IMEI:", error);
    }
  };

  const handleCloseModal = () => {
    setProduct(null);
  };

  const handleAddToVoucher = () => {
    if (product) {
      setFormData({
        ...formData,
        concept: `${formData.concept} - ${product.name}`,
        imei: product.variants[0].productCodes[0],
      });
      setProduct(null);
    }
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
        <IMEISearchForm onSearch={handleSearch} />

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
          <div>
            <label htmlFor="phone" className="block font-medium">
              Nº TEL
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
          <label htmlFor="addition" className="block font-medium">
            LA SUMA DE
          </label>
          <input
            type="text"
            id="addition"
            name="addition"
            value={formData.addition}
            onChange={handleChange}
            className="mt-1 block w-full text-black border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="concept" className="block font-medium">
            EN CONCEPTO DE LA COMPRA DE EQUIPO/S
          </label>
          <textarea
            id="concept"
            name="concept"
            value={formData.concept}
            onChange={handleChange}
            className="mt-1 block w-full text-black border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="condition" className="block font-medium">
              CONDICION
            </label>
            <input
              type="text"
              id="condition"
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              className="mt-1 block w-full text-black border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label htmlFor="total" className="block font-medium">
              TOTAL $
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
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
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
            <label htmlFor="warranty" className="block font-medium">
              GARANTIA
            </label>
            <input
              type="text"
              id="warranty"
              name="warranty"
              value={formData.warranty}
              onChange={handleChange}
              className="mt-1 block w-full text-black border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label htmlFor="paymentMethods" className="block font-medium">
              FORMA DE PAGO
            </label>
            <input
              type="text"
              id="paymentMethods"
              name="paymentMethods"
              value={formData.paymentMethods}
              onChange={handleChange}
              className="mt-1 block w-full text-black border-gray-300 rounded-md shadow-sm"
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="observations" className="block font-medium">
            OBSERVACIONES
          </label>
          <textarea
            id="observations"
            name="observations"
            value={formData.observations}
            onChange={handleChange}
            className="mt-1 block w-full text-black border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="mb-4">
          <Link href="/voucher/list">
            <button
              type="button"
              className="w-full bg-blue-700 hover:bg-opacity-80 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Ver cupones
            </button>
          </Link>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-green-700 hover:bg-opacity-80 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Generar PDF y Guardar
          </button>
        </div>
      </form>

      {product && (
        <IMEIResultModal
          product={product}
          onClose={handleCloseModal}
          onAddToVoucher={handleAddToVoucher}
        />
      )}
    </div>
  );
};

export default ReceiptForm;
