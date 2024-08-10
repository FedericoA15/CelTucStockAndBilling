"use client";
import { useEffect, useState } from "react";
import { getVoucherById } from "@/actions/voucher/getVoucherById";

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
      <p>DNI: {voucher.DNI}</p>
      <p>TEL: {voucher.phone}</p>
      <p>Suma de: {voucher.total}</p>
      <p>Equipo: {voucher.equipment}</p>
      <p>Condicion: {voucher.condition}</p>
      <p>Total: {voucher.total}</p>
      <p>IMEI: {voucher.imei}</p>
      <p>Garantia: {voucher.warranty}</p>
      <p>Forma de pago: {voucher.paymentMethods}</p>
      {voucher.productVariants.map((item, index) => (
        <div key={index} className="p-4 mt-4 bg-gray-700 rounded-md">
          <p>Modelo: {item.subModel}</p>
          <p>Bateria: {item.batteryCapacity}</p>
          <p>Precio: USD{item.price}</p>
          <p>Capacidad: {item.capacity}</p>
          <p>Detalles: {item.details}</p>
          <p>Sucursal: {item.branchName}</p>
        </div>
      ))}
    </div>
  );
};
