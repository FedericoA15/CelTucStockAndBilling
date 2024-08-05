import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export const GeneratePDFByReceipt = async (data: any) => {
  try {
    const existingPdfBytes = await fetch("/compra.pdf").then((res) =>
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

    addText(data.couponNumber, 350, 696.024);
    addText(data.date, 345, 672);
    addText(data.name, 111, 650);
    addText(data.dni, 88, 635);
    addText(data.phone, 287, 635);
    addText(data.amount, 129, 621);
    addText(data.concept, 266, 610);
    addText(data.condition, 124, 555);
    addText(data.imei, 90, 540);
    addText(data.warranty, 118, 528);
    addText(data.paymentMethod, 146, 514);
    addText(data.total, 365, 521);
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

export const GeneratePDFByRepair = async (data: any) => {
  try {
    const existingPdfBytes = await fetch("/reparacion.pdf").then((res) =>
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

    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "ComprobanteReparacion.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Error al generar el PDF:", error);
  }
};
