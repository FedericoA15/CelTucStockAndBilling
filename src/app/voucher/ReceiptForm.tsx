"use client";
import React, { useState } from "react";
import ExcelJS from "exceljs";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

const ReceiptForm: React.FC = () => {
  const [formData, setFormData] = useState({
    couponNumber: "",
    date: "",
    name: "",
    dni: "",
    phone: "",
    amount: "",
    concept: "",
    condition: "",
    imei: "",
    warranty: "",
    paymentMethod: "",
    observations: "",
    total: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    generatePDF(formData);
  };

  const generatePDF = async (data: any) => {
    try {
      const existingPdfBytes = await fetch("/compra.pdf").then((res) =>
        res.arrayBuffer()
      );
      const pdfDoc = await PDFDocument.load(existingPdfBytes);

      const pages = pdfDoc.getPages();
      console.log(pages);
      const firstPage = pages[0];

      const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

      const addText = (text: any, x: any, y: any) => {
        firstPage.drawText(text, {
          x,
          y,
          size: 12,
          font,
          color: rgb(0, 0, 0),
        });
      };

      addText(data.couponNumber, 450, 735);
      addText(data.date, 450, 715);
      addText(data.name, 100, 680);
      addText(data.dni, 60, 655);
      addText(data.phone, 350, 655);
      addText(data.amount, 100, 630);
      addText(data.concept, 100, 605);
      addText(data.condition, 100, 500);
      addText(data.imei, 100, 480);
      addText(data.warranty, 100, 460);
      addText(data.paymentMethod, 100, 440);
      addText(data.total, 450, 500);
      addText(data.observations, 100, 400);

      const pdfBytes = await pdfDoc.save();

      const blob = new Blob([pdfBytes], { type: "application/pdf" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "ComprobanteRellenado.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error al generar el PDF:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto p-6 bg-black shadow-md rounded-lg"
    >
      <h2 className="text-2xl font-bold mb-4 text-center">
        RECIBO DE COMPRA DE EQUIPO/S
      </h2>

      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-col">
          <span className="font-bold">CELTUC</span>
          <span>@CelTuc</span>
          <span>/CelTuc</span>
        </div>
        <div>
          <div className="flex items-center">
            <label htmlFor="couponNumber" className="block font-medium">
              CUPON Nº
            </label>
            <input
              type="text"
              id="couponNumber"
              name="couponNumber"
              value={formData.couponNumber}
              onChange={handleChange}
              className="ml-2 mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="flex items-center mt-2">
            <label htmlFor="date" className="block font-medium">
              FECHA
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="ml-2 mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            />
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="name" className="block font-medium">
          RECIBI DE
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
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
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
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
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="amount" className="block font-medium">
          LA SUMA DE
        </label>
        <input
          type="text"
          id="amount"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
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
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
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
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
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
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-4">
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
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
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
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div>
          <label htmlFor="paymentMethod" className="block font-medium">
            FORMA DE PAGO
          </label>
          <input
            type="text"
            id="paymentMethod"
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
          />
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="observations" className="block font-medium">
          OBS
        </label>
        <textarea
          id="observations"
          name="observations"
          value={formData.observations}
          onChange={handleChange}
          className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div className="mb-4">
        <p className="text-sm">
          La garantía sólo podrá ser reclamada por la persona que aparece en la
          orden, presentando una identificación oficial...
        </p>
      </div>

      <button
        type="submit"
        className="mt-4 w-full bg-blue-500 text-white p-2 rounded-md"
      >
        Guardar Comprobante
      </button>
    </form>
  );
};

export default ReceiptForm;
