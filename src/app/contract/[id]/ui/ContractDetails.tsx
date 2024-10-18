"use client";
import { useEffect, useState } from "react";
import { getVoucherById } from "@/actions/voucher/getVoucherById";
import {
  FaCalendarAlt,
  FaUser,
  FaMobileAlt,
  FaMoneyBillWave,
  FaDollarSign,
  FaTag,
  FaPhone,
  FaClipboardList,
} from "react-icons/fa";
import { GeneratePDFByContract } from "@/utils/GeneratePDF";

export const ContractDetails: React.FC<PropsId> = ({ id }) => {
  const [voucher, setVoucher] = useState<Voucher | null>(null);

  useEffect(() => {
    const fetchVoucher = async () => {
      const fetchedVoucher = await getVoucherById(id);
      setVoucher(fetchedVoucher);
    };
    fetchVoucher();
  }, [id]);

  const handleDownloadPDF = async () => {
    if (!voucher) return;

    try {
      await GeneratePDFByContract(voucher, "");
    } catch (error) {
      console.error("Error al descargar el PDF:", error);
    }
  };

  if (!voucher) {
    return (
      <div className="flex justify-center items-center h-screen bg-custom-black-2">
        <div className="text-custom-white text-xl animate-pulse">
          Cargando...
        </div>
      </div>
    );
  }

  return (
    <div className="bg-custom-black text-custom-white p-8 my-6 rounded-lg shadow-lg max-w-3xl mx-auto transition duration-300 transform hover:shadow-2xl">
      <h2 className="font-bold text-3xl mb-6 border-b border-custom-grey pb-4">
        ID del Contrato: {voucher.id}
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-6">
        <p className="flex items-center gap-2">
          <FaClipboardList className="text-custom-cream" />
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
          <FaUser className="text-custom-cream" />
          <span className="font-semibold">DNI:</span> {voucher.DNI}
        </p>
        <p className="flex items-center gap-2">
          <FaUser className="text-custom-cream" />
          <span className="font-semibold">DNI Comprador:</span>{" "}
          {voucher.dniBuyer}
        </p>
        <p className="flex items-center gap-2">
          <FaMoneyBillWave className="text-custom-blue" />
          <span className="font-semibold">Suma de:</span> ${voucher.total}
        </p>
        <p className="flex items-center gap-2">
          <FaMobileAlt className="text-custom-cream" />
          <span className="font-semibold">Equipo:</span> {voucher.model}
        </p>
        <p className="flex items-center gap-2">
          <FaTag className="text-custom-cream" />
          <span className="font-semibold">Obs:</span> {voucher.obs}
        </p>
        <p className="flex items-center gap-2">
          <FaTag className="text-custom-blue" />
          <span className="font-semibold">IMEI:</span> {voucher.imei}
        </p>
        <p className="flex items-center gap-2">
          <FaTag className="text-custom-blue" />
          <span className="font-semibold">IMEI 2:</span> {voucher.imei2}
        </p>
        <p className="flex items-center gap-2">
          <span className="font-semibold"> 🏷️Marca:</span> {voucher.brand}
        </p>
        <p className="flex items-center gap-2">
          <FaTag className="text-custom-blue" />
          <span className="font-semibold">Total:</span> {voucher.total}
        </p>
      </div>

      <button
        onClick={handleDownloadPDF}
        className="mt-8 w-full sm:w-auto bg-custom-blue hover:bg-custom-blue-dark text-custom-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 transform hover:scale-105"
      >
        Descargar PDF
      </button>
    </div>
  );
};
