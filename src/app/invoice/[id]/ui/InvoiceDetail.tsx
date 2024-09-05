"use client";
import { useEffect, useState } from "react";
import { fetchInvoiceById } from "@/actions/invoices/getInvoiceById";
import { PDFDownloadLink } from "@react-pdf/renderer";
import JsBarcode from "jsbarcode";
import InvoicePDF from "@/utils/InvoicePDF";
import {
  FaCalendarAlt,
  FaUser,
  FaInfoCircle,
  FaDollarSign,
  FaBox,
  FaTag,
  FaBarcode,
  FaStore,
  FaHashtag,
  FaMoneyBillWave,
} from "react-icons/fa";
import { MdSdStorage } from "react-icons/md";

export const InvoiceDetail: React.FC<PropsId> = ({ id }) => {
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [barcode, setBarcode] = useState<string | null>(null);

  useEffect(() => {
    const fetchInvoice = async () => {
      const fetchedInvoice = await fetchInvoiceById(id);
      setInvoice(fetchedInvoice);

      const canvas = document.createElement("canvas");
      JsBarcode(canvas, id, { format: "CODE128" });
      setBarcode(canvas.toDataURL("image/png"));
    };

    fetchInvoice();
  }, [id]);

  if (!invoice || !barcode) {
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
        ID de la Factura: {invoice.id}
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-6">
        <p className="flex items-center gap-2">
          <FaCalendarAlt className="text-custom-blue" />
          <span className="font-semibold">Fecha:</span>{" "}
          {invoice.date.slice(0, 10)}
        </p>
        <p className="flex items-center gap-2">
          <FaUser className="text-custom-green" />
          <span className="font-semibold">Cliente:</span> {invoice.client}
        </p>
        <p className="flex items-center gap-2">
          <FaInfoCircle className="text-custom-cream" />
          <span className="font-semibold">Vendedor:</span> {invoice.userEmail}
        </p>
        <p className="flex items-center gap-2">
          <FaDollarSign className="text-custom-blue" />
          <span className="font-semibold">Total:</span> USD{" "}
          {invoice.invoiceItems
            .reduce((total, item) => total + item.price * item.quantity, 0)
            .toFixed(2)}
        </p>
        <p className="flex items-center gap-2">
          <FaHashtag className="text-custom-blue" />
          <span className="font-semibold">Código Corto:</span> {invoice.shortId}
        </p>
      </div>

      {/* Invoice Items */}
      <div className="mt-6">
        {invoice.invoiceItems.map((item, index) => (
          <div
            key={index}
            className="p-4 mt-4 bg-custom-grey rounded-md shadow-md transition duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <FaBox className="text-custom-blue" /> Item {index + 1}
            </h3>
            <p className="flex items-center gap-2 mb-2">
              <FaBox className="text-custom-cream" />
              <span className="font-semibold">Nombre del producto:</span>{" "}
              {item.productName}
            </p>
            <p className="flex items-center gap-2 mb-2">
              <MdSdStorage className="text-custom-blue" />
              <span className="font-semibold">Modelo:</span>{" "}
              {item.productVariant.subModel}
            </p>
            <p className="flex items-center gap-2 mb-2">
              <FaTag className="text-custom-green" />
              <span className="font-semibold">Precio:</span> USD{" "}
              {item.price.toFixed(2)}
            </p>
            <p className="flex items-center gap-2 mb-2">
              <FaTag className="text-custom-blue" />
              <span className="font-semibold">Precio ARS:</span> $
              {item.productVariant.priceArs.toFixed(2)}
            </p>
            <p className="flex items-center gap-2 mb-2">
              <FaStore className="text-custom-cream" />
              <span className="font-semibold">Sucursal:</span>{" "}
              {item.productVariant.branchName}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6">
        {invoice.payments.map((payment, index) => (
          <div
            key={index}
            className="p-4 mt-4 bg-custom-grey rounded-md shadow-md transition duration-300 transform hover:scale-105 hover:shadow-lg"
          >
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <FaMoneyBillWave className="text-custom-blue" /> Pago {index + 1}
            </h3>
            <p className="flex items-center gap-2 mb-2">
              <FaMoneyBillWave className="text-custom-green" />
              <span className="font-semibold">Método de pago:</span>{" "}
              {payment.paymentMethod}
            </p>
            <p className="flex items-center gap-2 mb-2">
              <FaDollarSign className="text-custom-cream" />
              <span className="font-semibold">Monto:</span> $
              {payment.amount.toFixed(2)}
            </p>
            <p className="flex items-center gap-2 mb-2">
              <FaInfoCircle className="text-custom-blue" />
              <span className="font-semibold">Detalles:</span> {payment.details}
            </p>
          </div>
        ))}
      </div>

      <PDFDownloadLink
        document={
          <InvoicePDF
            invoice={invoice}
            barcode={barcode}
            id={invoice.shortId}
          />
        }
        fileName={`invoice_${id}.pdf`}
      >
        {({ loading }) => (
          <button className="mt-8 w-full sm:w-auto bg-custom-blue hover:bg-custom-blue-dark text-custom-white font-bold py-2 px-4 rounded-lg shadow-md transition duration-300 transform hover:scale-105">
            {loading ? "Generando PDF..." : "Descargar Factura"}
          </button>
        )}
      </PDFDownloadLink>
    </div>
  );
};
