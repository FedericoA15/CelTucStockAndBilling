"use client";
import { useEffect, useState } from "react";
import { getVoucherById } from "@/actions/voucher/getVoucherById";
import EditVoucherModal from "./editVariantModal";
import {
  FaCalendarAlt,
  FaUser,
  FaMobileAlt,
  FaClipboardList,
  FaMoneyBillWave,
  FaDollarSign,
  FaTag,
  FaPhone,
  FaCode,
  FaInfoCircle,
} from "react-icons/fa";
import { GeneratePDFByRepair } from "@/utils/GeneratePDF";

export const RepairDetails: React.FC<PropsId> = ({ id }) => {
  const [voucher, setVoucher] = useState<Voucher | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchVoucher = async () => {
      const fetchedVoucher = await getVoucherById(id);
      setVoucher(fetchedVoucher);
    };
    fetchVoucher();
  }, [id]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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

  const handleDownloadPDF = async () => {
    if (!voucher) return;

    try {
      await GeneratePDFByRepair(voucher, "");
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
          <FaCode className="text-custom-cream" />
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
          <FaMobileAlt className="text-custom-cream" />
          <span className="font-semibold">Equipo:</span> {voucher.equipment}
        </p>
        <p className="flex items-center gap-2">
          <FaClipboardList className="text-custom-blue" />
          <span className="font-semibold">Falla/s:</span> {voucher.failure}
        </p>
        <p className="flex items-center gap-2">
          <FaInfoCircle className="text-custom-cream" />
          <span className="font-semibold">OBS:</span> {voucher.obs}
        </p>
        <p className="flex items-center gap-2">
          <FaMoneyBillWave className="text-custom-green" />
          <span className="font-semibold">Presupuesto:</span> {voucher.budget}
        </p>
        <p className="flex items-center gap-2">
          <FaDollarSign className="text-custom-cream" />
          <span className="font-semibold">Seña:</span> {voucher.sign}
        </p>
        <p className="flex items-center gap-2">
          <FaTag className="text-custom-blue" />
          <span className="font-semibold">Pendiente:</span> {voucher.slope}
        </p>
        <p className="flex items-center gap-2">
          <FaCode className="text-custom-blue" />
          <span className="font-semibold">Cod. desbloqueo:</span> {voucher.code}
        </p>
        <p className="flex items-center gap-2">
          <FaPhone className="text-custom-green" />
          <span className="font-semibold">Tel:</span> {voucher.phone}
        </p>
        <p className="flex items-center gap-2">
          <FaInfoCircle className="text-custom-cream" />
          <span className="font-semibold">Diagnóstico Técnico:</span>{" "}
          {voucher.diagnosis}
        </p>
      </div>

      <button
        onClick={handleOpenModal}
        className="mt-6 w-full sm:w-auto bg-custom-blue hover:bg-custom-blue-dark text-custom-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 transform hover:scale-105"
      >
        Editar Voucher
      </button>

      {voucher && (
        <EditVoucherModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          voucher={voucher}
        />
      )}
      <button
        onClick={handleDownloadPDF}
        className="mt-8 w-full sm:w-auto bg-custom-blue hover:bg-custom-blue-dark text-custom-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 transform hover:scale-105"
      >
        Descargar PDF
      </button>
    </div>
  );
};
