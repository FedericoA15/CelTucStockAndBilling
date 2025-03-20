"use client";
import { useEffect, useState } from "react";
import { getVoucherById } from "@/actions/voucher/getVoucherById";
import { GeneratePDFByReceipt, GeneratePDFBySign } from "@/utils/GeneratePDF";
import {
  FaCalendarAlt,
  FaUser,
  FaPhone,
  FaMoneyBillWave,
  FaMobileAlt,
  FaReceipt,
  FaTag,
  FaDollarSign,
} from "react-icons/fa";
import Cookies from "js-cookie";
import ConfirmDeleteModal from "@/components/modalDeleted/ConfirmDeleteModal";
import { deleteVoucher } from "@/actions/voucher/deleteVoucher";

export const VoucherDetails: React.FC<PropsId> = ({ id }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [variantIdToDelete, setVariantIdToDelete] = useState<string | null>(
    null
  );
  const [voucher, setVoucher] = useState<Voucher | null>(null);
  const role = Cookies.get("roles");

  useEffect(() => {
    const fetchVoucher = async () => {
      const fetchedVoucher = await getVoucherById(id);
      setVoucher(fetchedVoucher);
    };
    fetchVoucher();
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

  const openDeleteModal = (variantId: string) => {
    setVariantIdToDelete(variantId);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setVariantIdToDelete(null);
  };

  const handleDeleteVariant = () => {
    deleteVoucher(id);
    closeDeleteModal();
    window.history.back();
  };

  const handleDownloadPDF = async () => {
    if (!voucher) return;

    try {
      await GeneratePDFBySign(voucher, "");
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
          <FaPhone className="text-custom-blue" />
          <span className="font-semibold">Teléfono:</span> {voucher.phone}
        </p>
        <p className="flex items-center gap-2">
          <FaMoneyBillWave className="text-custom-green" />
          <span className="font-semibold">Suma dada:</span> {voucher.total} USD
        </p>
        <p className="flex items-center gap-2">
          <FaMobileAlt className="text-custom-blue" />
          <span className="font-semibold">Equipo:</span> {voucher.concept}
        </p>
        <p className="flex items-center gap-2">
          <FaTag className="text-custom-cream" />
          <span className="font-semibold">Saldo Restante:</span> {voucher.slope}{" "}
          USD
        </p>
        <p className="flex items-center gap-2">
          <FaDollarSign className="text-custom-cream" />
          <span className="font-semibold">Total del equipo:</span>{" "}
          {voucher.total} USD
        </p>
      </div>

      <div>
        {" "}
        <button
          onClick={handleDownloadPDF}
          className="mt-8 w-full sm:w-auto bg-custom-blue hover:bg-custom-blue-dark text-custom-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 transform hover:scale-105"
        >
          Descargar PDF
        </button>
        {role === "SUPERADMIN" && (
          <button
            onClick={() => openDeleteModal(id)}
            className="mt-4 mx-5 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded shadow-md transition duration-300 transform hover:scale-105"
          >
            Borrar
          </button>
        )}
      </div>

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteVariant}
      />
    </div>
  );
};
