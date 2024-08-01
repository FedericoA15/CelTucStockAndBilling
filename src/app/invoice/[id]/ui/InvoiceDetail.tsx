"use client";
import { useEffect, useState } from "react";
import { fetchInvoiceById } from "@/actions/invoices/getInvoiceById";
import { PDFDownloadLink } from "@react-pdf/renderer";
import JsBarcode from "jsbarcode";
import InvoicePDF from "@/utils/InvoicePDF";

export const InvoiceDetail: React.FC<PropsId> = ({ id }) => {
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [barcode, setBarcode] = useState<string | null>(null);

  useEffect(() => {
    const fetchInvoice = async () => {
      const fetchedInvoice = await fetchInvoiceById(id);
      setInvoice(fetchedInvoice);
    };

    fetchInvoice();
  }, [id]);

  useEffect(() => {
    if (invoice?.shortId) {
      const canvas = document.createElement("canvas");
      canvas.width = 200; // Asegura que el ancho del canvas sea suficiente
      canvas.height = 100; // Asegura que la altura del canvas sea suficiente
      JsBarcode(canvas, invoice.shortId, {
        format: "CODE128",
        width: 2,
        height: 50,
      });
      const barcodeUrl = canvas.toDataURL("image/png");
      setBarcode(barcodeUrl);
    }
  }, [invoice]);

  if (!invoice || !barcode) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="bg-custom-black-2 text-white p-6 my-4 rounded-md w-full">
      <h2 className="font-bold text-2xl mb-4">
        ID de la factura: {invoice.id}
      </h2>
      <p>Email del usuario: {invoice.userEmail}</p>
      <p>Cliente: {invoice.client}</p>
      <p>Fecha: {invoice.date.slice(0, 10)}</p>
      {invoice.invoiceItems.map((item, index) => (
        <div key={index} className="p-4 mt-4 bg-gray-700 rounded-md">
          <h3 className="font-bold text-lg mb-2">
            Item de la factura {index + 1}
          </h3>
          <p>Nombre del producto: {item.productName}</p>
          <p>Cantidad: {item.quantity}</p>
          <p>Modelo: {item.productVariant.subModel}</p>
          <p>Bateria: {item.productVariant.batteryCapacity}</p>
          <p>Precio: USD{item.price}</p>
          <p>Precio de contado: USD{item.productVariant.countedPrice}</p>
          <p>Precio: ${item.productVariant.priceArs}</p>
          <p>Precio de contado: ${item.productVariant.priceArsCounted}</p>
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
      <PDFDownloadLink
        document={
          <InvoicePDF
            invoice={invoice}
            barcode={barcode}
            id={invoice.shortId}
          />
        }
        fileName={`comprobante_${id}.pdf`}
      >
        {({ loading }) => (loading ? "Generando PDF..." : "Descargar Factura")}
      </PDFDownloadLink>
    </div>
  );
};
