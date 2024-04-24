"use client"
import { useEffect, useState } from 'react';
import { fetchInvoiceById } from "@/actions/invoices/getInvoiceById";

interface Props {
  id: string;
}

export const InvoiceDetail: React.FC<Props> = ({ id }) => {
  const [invoice, setInvoice] = useState<Invoice|null>(null);

  useEffect(() => {
    const fetchInvoice = async () => {
      const fetchedInvoice = await fetchInvoiceById(id);
      setInvoice(fetchedInvoice);
    };

    fetchInvoice();
  }, [id]);

  if (!invoice) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="bg-custom-black-2 text-white p-6 my-4 rounded-md w-full">
      <h2 className="font-bold text-2xl mb-4">ID de la factura: {invoice.id}</h2>
      <p>Email del usuario: {invoice.userEmail}</p>
      <p>Cliente: {invoice.client}</p>
      <p>Fecha: {invoice.date.slice(0, 10)}</p>
      {invoice.invoiceItems.map((item, index) => (
        <div key={index} className="p-4 mt-4 bg-gray-700 rounded-md">
          <h3 className="font-bold text-lg mb-2">Item de la factura {index + 1}</h3>
          <p>Nombre del producto: {item.productName}</p>
          <p>Cantidad: {item.quantity}</p>
          <p>Modelo: {item.productVariant.subModel}</p>
          <p>Bateria: {item.productVariant.batteryCapacity}</p>
          <p>Precio: {item.price}</p>
          <p>Capacidad: {item.productVariant.capacity}</p>
          <p>Detalles: {item.productVariant.details}</p>
          <p>Sucursal: {item.productVariant.branchName}</p>
        </div>
      ))}
      {invoice.payments.map((payment, index) => (
        <div key={index} className="p-4 mt-4 bg-gray-700 rounded-md">
          <h3 className="font-bold text-lg mb-2">Pago {index + 1}</h3>
          <p>Método de pago: {payment.paymentMethod}</p>
          <p>Monto: {payment.amount}</p>
          <p>Detalles: {payment.details}</p>
        </div>
      ))}
    </div>
  );
};
