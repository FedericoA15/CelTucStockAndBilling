import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import axiosInstance from "./axiosInstance";
import { toast } from "react-toastify";

export const GeneratePDFByReceipt = async (
  data: any,
  branchName: string,
  clientEmail?: string
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

    addText(branchName, 360, 725);
    addText(data.coupon, 350, 696.024);
    addText(data.date, 345, 672);
    addText(data.client, 111, 650);
    addText(data.dni, 88, 635);
    addText(data.phone, 287, 635);
    addText(addtionStr, 126.792, 620.4);
    addText(data.concept, 67, 595);
    addText(data.condition, 124, 555);
    addText(data.imei, 90, 540);
    addText(data.paymentMethods, 146, 514);
    addText(data.warranty, 118, 528);
    addText(totalStr, 368, 521);
    addText(data.obs, 88, 488);

    addText(data.signature, 237.456, 530.352, signatureFont);

    const pdfBytes = await pdfDoc.save();

    const formData = new FormData();
    formData.append(
      "pdf",
      new Blob([pdfBytes], { type: "application/pdf" }),
      "Comprobante-Compra.pdf"
    );

    if (clientEmail) {
      formData.append("email", clientEmail);
      formData.append(
        "emailContent",
        "Gracias por tu compra! Te esperamos pronto CelTuc!"
      );
      formData.append("pdfName", "Comprobate-Compra.pdf");

      try {
        await axiosInstance.post("/send-pdf-email", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("¡Correo enviado exitosamente con el PDF adjunto!");
      } catch (error) {
        toast.error("Error al enviar el correo con el PDF.");
      }
    }

    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Comprobante-Compra.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("PDF generado y descargado con éxito.");
  } catch (error) {
    toast.error("Error al generar el PDF. Por favor, inténtalo nuevamente.");
  }
};

export const GeneratePDFByRepair = async (data: any, clientEmail?: string) => {
  try {
    const existingPdfBytes = await fetch("/reparacion.pdf").then((res) =>
      res.arrayBuffer()
    );
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const addText = (text: string, x: number, y: number) => {
      firstPage.drawText(text, {
        x,
        y,
        size: 10,
        font,
        color: rgb(0, 0, 0),
      });
    };

    addText(data.coupon, 350, 696.024);
    addText(data.date, 345, 672);
    addText(data.client, 111, 650);
    addText(data.equipment, 130, 635);
    addText(data.failure, 190, 622);
    addText(data.obs, 88, 583);
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
      "Comprobante-Reparacion-Garantia.pdf"
    );

    if (clientEmail) {
      formData.append("email", clientEmail);
      formData.append(
        "emailContent",
        "Te entregamos acá tu comprobante de service, estaremos en contacto!"
      );
      formData.append("pdfName", "Comprobante-Reparacion-Garantia.pdf");
      try {
        await axiosInstance.post("/send-pdf-email", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("¡Correo enviado exitosamente con el PDF adjunto!");
      } catch (error) {
        toast.error("Error al enviar el correo con el PDF.");
      }
    }

    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Comprobante-Reparacion-Garantia.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("PDF generado y descargado con éxito.");
  } catch (error) {
    toast.error("Error al generar el PDF. Por favor, inténtalo nuevamente.");
  }
};

export const GeneratePDFByContract = async (
  data: any,
  clientEmail?: string
) => {
  try {
    const existingPdfBytes = await fetch("/compraUsados.pdf").then((res) =>
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

    addText(data.coupon, 348, 748);
    addText(data.date, 348, 723);
    addText(data.client, 153, 666);
    addText(data.dni, 83, 654);
    addText(data.brand, 104, 632);
    addText(data.model, 110, 617);
    addText(data.color, 104, 604);
    addText(data.imei, 104, 591);
    addText(data.imei2, 104, 578);
    addText(data.obs, 68, 549);
    addText(data.reception, 68, 516);
    addText(data.dniBuyer, 307, 516);
    addText(data.total, 380, 482);

    addText(data.signatureBySeller, 107, 314, signatureFont);
    addText(data.signature, 275, 314, signatureFont);

    const pdfBytes = await pdfDoc.save();

    const formData = new FormData();
    formData.append(
      "pdf",
      new Blob([pdfBytes], { type: "application/pdf" }),
      "Contrato.pdf"
    );

    if (clientEmail) {
      formData.append("email", clientEmail);
      formData.append(
        "emailContent",
        "Te entregamos acá tu contrato, muchas gracias de parte de Celtuc"
      );
      formData.append("pdfName", "Contrato.pdf");
      try {
        await axiosInstance.post("/send-pdf-email", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("¡Correo enviado exitosamente con el PDF adjunto!");
      } catch (error) {
        toast.error("Error al enviar el correo con el PDF.");
      }
    }

    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Contrato.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("PDF generado y descargado con éxito.");
  } catch (error) {
    toast.error("Error al generar el PDF. Por favor, inténtalo nuevamente.");
  }
};
