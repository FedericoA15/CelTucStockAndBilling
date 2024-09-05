"use client";
import { useEffect, useState } from "react";
import { getVoucherById } from "@/actions/voucher/getVoucherById";
import { GeneratePDFByReceipt } from "@/utils/GeneratePDF";
import {
  FaCalendarAlt,
  FaUser,
  FaIdCard,
  FaPhone,
  FaMoneyBillWave,
  FaMobileAlt,
  FaClipboardCheck,
  FaReceipt,
  FaBarcode,
  FaShieldAlt,
  FaCreditCard,
  FaTag,
  FaBatteryFull,
  FaWarehouse,
  FaBox,
  FaInfoCircle,
} from "react-icons/fa";
import { MdSdStorage } from "react-icons/md";

export const VoucherDetails: React.FC<PropsId> = ({ id }) => {
  const [voucher, setVoucher] = useState<Voucher | null>(null);

  useEffect(() => {
    const fetchvoucher = async () => {
      const fetchedVoucher = await getVoucherById(id);
      setVoucher(fetchedVoucher);
    };
    fetchvoucher();
  }, [id]);

  if (!voucher) {
    return (
      <div className="flex justify-center items-center h-screen bg-custom-black-2">
        <div className="text-custom-white text-xl animate-pulse">
          Cargando...
        </div>
      </div>
    );
  }

  const handleDownloadPDF = async () => {
    if (!voucher) return;

    try {
      await GeneratePDFByReceipt(voucher, "");
    } catch (error) {
      console.error("Error al descargar el PDF:", error);
    }
  };

  return (
    <div className="bg-custom-black text-custom-white p-8 my-6 rounded-lg shadow-lg max-w-3xl mx-auto transition duration-300 transform hover:shadow-2xl">
      <h2 className="font-bold text-3xl mb-6 border-b border-custom-grey pb-4">
        ID del Comprobante: {voucher.id}
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-6">
        <p className="flex items-center gap-2">
          <FaReceipt className="text-custom-cream" />
          <span className="font-semibold">Cupon:</span> {voucher.coupon}
        </p>
        <p className="flex items-center gap-2">
          <FaCalendarAlt className="text-custom-blue" />
          <span className="font-semibold">Fecha:</span>{" "}
          {voucher.date.slice(0, 10)}
        </p>
        <p className="flex items-center gap-2">
          <FaUser className="text-custom-green" />
          <span className="font-semibold">Cliente:</span> {voucher.client}
        </p>
        <p className="flex items-center gap-2">
          <FaIdCard className="text-custom-cream" />
          <span className="font-semibold">DNI:</span> {voucher.DNI}
        </p>
        <p className="flex items-center gap-2">
          <FaPhone className="text-custom-blue" />
          <span className="font-semibold">Teléfono:</span> {voucher.phone}
        </p>
        <p className="flex items-center gap-2">
          <FaMoneyBillWave className="text-custom-green" />
          <span className="font-semibold">Suma de:</span> {voucher.total}
        </p>
        <p className="flex items-center gap-2">
          <FaMobileAlt className="text-custom-blue" />
          <span className="font-semibold">Equipo:</span> {voucher.concept}
        </p>
        <p className="flex items-center gap-2">
          <FaClipboardCheck className="text-custom-green" />
          <span className="font-semibold">Condición:</span> {voucher.condition}
        </p>
        <p className="flex items-center gap-2">
          <FaTag className="text-custom-cream" />
          <span className="font-semibold">Total:</span> {voucher.total}
        </p>
        <p className="flex items-center gap-2">
          <FaBarcode className="text-custom-blue" />
          <span className="font-semibold">IMEI:</span> {voucher.imei}
        </p>
        <p className="flex items-center gap-2">
          <FaShieldAlt className="text-custom-green" />
          <span className="font-semibold">Garantía:</span> {voucher.warranty}
        </p>
        <p className="flex items-center gap-2">
          <FaCreditCard className="text-custom-blue" />
          <span className="font-semibold">Forma de pago:</span>{" "}
          {voucher.paymentMethods}
        </p>
      </div>

      {/* Product Variants */}
      <div className="mt-6">
        {voucher.productVariants.map((item, index) => (
          <div
            key={index}
            className="p-4 mt-4 bg-custom-grey rounded-md shadow-md transition duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <FaMobileAlt className="text-custom-blue" /> Modelo
            </h3>
            <p className="flex items-center gap-2 mb-2">
              <FaMobileAlt className="text-custom-cream" />
              <span className="font-semibold">Submodelo:</span> {item.subModel}
            </p>
            <p className="flex items-center gap-2 mb-2">
              <FaBatteryFull className="text-custom-green" />
              <span className="font-semibold">Batería:</span>{" "}
              {item.batteryCapacity}
            </p>
            <p className="flex items-center gap-2 mb-2">
              <FaTag className="text-custom-blue" />
              <span className="font-semibold">Precio:</span> USD {item.price}
            </p>
            <p className="flex items-center gap-2 mb-2">
              <MdSdStorage className="text-custom-black" />
              <span className="font-semibold">Capacidad:</span> {item.capacity}
            </p>
            <p className="flex items-center gap-2 mb-2">
              <FaInfoCircle className="text-custom-blue" />
              <span className="font-semibold">Detalles:</span> {item.details}
            </p>
            <p className="flex items-center gap-2 mb-2">
              <FaWarehouse className="text-custom-green" />
              <span className="font-semibold">Sucursal:</span> {item.branchName}
            </p>
          </div>
        ))}
      </div>

      {/* Download PDF Button */}
      <button
        onClick={handleDownloadPDF}
        className="mt-8 w-full sm:w-auto bg-custom-blue hover:bg-custom-blue-dark text-custom-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 transform hover:scale-105"
      >
        Descargar PDF
      </button>
    </div>
  );
};
