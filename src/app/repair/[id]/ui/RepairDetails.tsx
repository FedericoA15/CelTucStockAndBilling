"use client";
import { useEffect, useState } from "react";
import { getVoucherById } from "@/actions/voucher/getVoucherById";
import EditVoucherModal from "./editVariantModal";

export const RepairDetails: React.FC<PropsId> = ({ id }) => {
  const [voucher, setVoucher] = useState<Voucher | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchvoucher = async () => {
      const fetchedRepair = await getVoucherById(id);
      setVoucher(fetchedRepair);
    };
    fetchvoucher();
  }, [id]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (!voucher) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="bg-custom-black-2 text-white p-6 my-4 rounded-md w-full">
      <h2 className="font-bold text-2xl mb-4">
        ID del Comprobante: {voucher.id}
      </h2>
      <p>Cupon: {voucher.coupon}</p>
      <p>Fecha: {voucher.date.slice(0, 10)}</p>
      <p>Cliente: {voucher.client}</p>
      <p>Equipo: {voucher.equipment}</p>
      <p>Con la siguiente falla/s: {voucher.failure}</p>
      <p>OBS: {voucher.obs}</p>
      <p>Recepciono: {voucher.reception}</p>
      <p>Presupuesto: {voucher.budget}</p>
      <p>Seña: {voucher.sign}</p>
      <p>Pendiente: {voucher.slope}</p>
      <p>Cod. desbloqueo: {voucher.code}</p>
      <p>Tel: {voucher.phone}</p>
      <p>Diagnostico Tecnico: {voucher.diagnosis}</p>

      <button
        onClick={handleOpenModal}
        className="mt-4 bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
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
    </div>
  );
};
