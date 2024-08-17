import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import axiosInstance from "./axiosInstance";

export const GeneratePDFByReceipt = async (
  data: any,
  recipientEmail: string
) => {
  try {
    const existingPdfBytes = await fetch("/compra.pdf").then((res) =>
      res.arrayBuffer()
    );
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const signatureFont = await pdfDoc.embedFont(StandardFonts.CourierOblique);

    const addText = (
      text: string,
      x: number,
      y: number,
      font = regularFont
    ) => {
      firstPage.drawText(text, {
        x,
        y,
        size: 10,
        font,
        color: rgb(0, 0, 0),
      });
    };

    const addtionStr = data.addition?.toString() ?? "0";
    const totalStr = data.total?.toString() ?? "0";

    addText(data.coupon, 350, 696.024);
    addText(data.date, 345, 672);
    addText(data.client, 111, 650);
    addText(data.dni, 88, 635);
    addText(data.phone, 287, 635);
    addText(addtionStr, 126.792, 620.4);
    addText(data.concept, 266, 610);
    addText(data.condition, 124, 555);
    addText(data.imei, 90, 540);
    addText(data.paymentMethods, 146, 514);
    addText(data.warranty, 118, 528);
    addText(totalStr, 368, 521);
    addText(data.obs, 88, 488);

    addText(data.client, 237.456, 530.352, signatureFont);

    const pdfBytes = await pdfDoc.save();

    const formData = new FormData();
    formData.append(
      "pdf",
      new Blob([pdfBytes], { type: "application/pdf" }),
      "Comprobante-Compra.pdf"
    );
    formData.append("email", recipientEmail);

    // await axiosInstance.post("/send-pdf-email", formData, {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // });

    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Comprobante-Compra.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Error al generar el PDF:", error);
  }
};

export const GeneratePDFByContract = async (
  data: any,
  recipientEmail: string
) => {
  try {
    const existingPdfBytes = await fetch("/compraUsados.pdf").then((res) =>
      res.arrayBuffer()
    );
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    const pages = pdfDoc.getPages();
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

    addText(data.coupon, 350, 696.024);
    addText(data.date, 345, 672);
    addText(data.client, 111, 650);
    addText(data.equipment, 130, 635);
    addText(data.failure, 190, 622);
    addText(data.obs, 88, 585);
    addText(data.reception, 128, 540);
    addText(data.budget, 360, 540);
    addText(data.code, 155, 527);
    addText(data.sign, 321, 527);
    addText(data.phone, 85, 515);
    addText(data.slope, 347, 515);
    addText(data.dignosis, 176, 486);

    const pdfBytes = await pdfDoc.save();

    const formData = new FormData();
    formData.append(
      "pdf",
      new Blob([pdfBytes], { type: "application/pdf" }),
      "Comprobante-Venta.pdf"
    );
    formData.append("email", recipientEmail);

    await axiosInstance.post("/send-pdf-email", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Comprobante-Venta.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Error al generar el PDF:", error);
  }
};
