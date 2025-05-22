import { PDFDocument, StandardFonts, degrees, rgb } from "pdf-lib";
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

    const additionStr = data.addition?.toString() ?? "0";
    const totalStr = data.total?.toString() ?? "0";
    const couponStr = data.coupon?.toString() ?? "";
    const dateStr = data.date?.toString() ?? "";
    const clientStr = data.client?.toString() ?? "";
    const dniStr = data.dni?.toString() ?? "";
    const phoneStr = data.phone?.toString() ?? "";
    const conceptStr = data.concept?.toString() ?? "";
    const conditionStr = data.condition?.toString() ?? "";
    const imeiStr = data.imei?.toString() ?? "";
    const paymentMethodsStr = data.paymentMethods?.toString() ?? "";
    const warrantyStr = data.warranty?.toString() ?? "";
    const obsStr = data.obs?.toString() ?? "";
    const signatureStr = data.signature?.toString() ?? "";

    addText(branchName, 360, 725);
    addText(couponStr, 350, 696.024);
    addText(dateStr, 345, 672);
    addText(clientStr, 111, 650);
    addText(dniStr, 88, 635);
    addText(phoneStr, 287, 635);
    addText(additionStr, 126.792, 620.4);
    addText(conceptStr, 67, 595);
    addText(conditionStr, 124, 555);
    addText(imeiStr, 90, 540);
    addText(paymentMethodsStr, 146, 514);
    addText(warrantyStr, 118, 528);
    addText(totalStr, 368, 521);
    addText(obsStr, 88, 488);

    addText(signatureStr, 237.456, 530.352, signatureFont);

    const pdfBytes = await pdfDoc.save();

    const formData = new FormData();
    formData.append(
      "pdf",
      new Blob([pdfBytes], { type: "application/pdf" }),
      "Comprobante-Compra.pdf"
    );

    if (clientEmail) {
      const formData = new FormData();
      formData.append(
        "pdf",
        new Blob([pdfBytes], { type: "application/pdf" }),
        "Comprobante-Compra.pdf"
      );
      formData.append("email", clientEmail);
      formData.append(
        "emailContent",
        "Gracias por tu compra! Te esperamos pronto CelTuc!"
      );
      formData.append("emailTitle", "Comprobante de Compra");
      formData.append("pdfName", "Comprobante-Compra.pdf");

      try {
        const response = await fetch("/api/sendmail", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `HTTP error! status: ${response.status}, message: ${errorText}`
          );
        }

        toast.success("¡Correo enviado exitosamente con el PDF adjunto!");
      } catch (error) {
        console.error("Error al enviar el correo:", error);
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

    const couponStr = data.coupon?.toString() ?? "";
    const dateStr = data.date?.toString() ?? "";
    const clientStr = data.client?.toString() ?? "";
    const equipmentStr = data.equipment?.toString() ?? "";
    const failureStr = data.failure?.toString() ?? "";
    const obsStr = data.obs?.toString() ?? "";
    const receptionStr = data.reception?.toString() ?? "";
    const budgetStr = data.budget?.toString() ?? "";
    const codeStr = data.code?.toString() ?? "";
    const signStr = data.sign?.toString() ?? "";
    const phoneStr = data.phone?.toString() ?? "";
    const slopeStr = data.slope?.toString() ?? "";
    const diagnosisStr = data.dignosis?.toString() ?? "";

    addText(couponStr, 350, 696.024);
    addText(dateStr, 345, 672);
    addText(clientStr, 111, 650);
    addText(equipmentStr, 130, 635);
    addText(failureStr, 190, 622);
    addText(obsStr, 88, 583);
    addText(receptionStr, 128, 540);
    addText(budgetStr, 360, 540);
    addText(codeStr, 155, 527);
    addText(signStr, 321, 527);
    addText(phoneStr, 85, 515);
    addText(slopeStr, 347, 515);
    addText(diagnosisStr, 176, 486);

    const pdfBytes = await pdfDoc.save();

    const formData = new FormData();
    formData.append(
      "pdf",
      new Blob([pdfBytes], { type: "application/pdf" }),
      "Comprobante-Reparacion-Garantia.pdf"
    );
    if (clientEmail) {
      const formData = new FormData();
      formData.append(
        "pdf",
        new Blob([pdfBytes], { type: "application/pdf" }),
        "Comprobante-Reparacion-Garantia.pdf"
      );
      formData.append("email", clientEmail);
      formData.append(
        "emailContent",
        "Te entregamos acá tu comprobante de service, estaremos en contacto!"
      );
      formData.append("emailTitle", "Comprobante de Reparacion");
      formData.append("pdfName", "Comprobante-Reparacion-Garantia.pdf");

      try {
        const response = await fetch("/api/sendmail", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `HTTP error! status: ${response.status}, message: ${errorText}`
          );
        }

        toast.success("¡Correo enviado exitosamente con el PDF adjunto!");
      } catch (error) {
        console.error("Error al enviar el correo:", error);
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

    const couponStr = data.coupon?.toString() ?? "";
    const dateStr = data.date?.toString() ?? "";
    const clientStr = data.client?.toString() ?? "";
    const dniStr = data.DNI?.toString() ?? "";
    const brandStr = data.brand?.toString() ?? "";
    const modelStr = data.model?.toString() ?? "";
    const colorStr = data.color?.toString() ?? "";
    const imeiStr = data.imei?.toString() ?? "";
    const imei2Str = data.imei2?.toString() ?? "";
    const obsStr = data.obs?.toString() ?? "";
    const receptionStr = data.reception?.toString() ?? "";
    const dniBuyerStr = data.dniBuyer?.toString() ?? "";
    const totalStr = data.total?.toString() ?? "";
    const signatureBySellerStr = data.signatureBySeller?.toString() ?? "";
    const signatureStr = data.signature?.toString() ?? "";

    addText(couponStr, 348, 748);
    addText(dateStr, 348, 723);
    addText(clientStr, 153, 666);
    addText(dniStr, 83, 654);
    addText(brandStr, 104, 632);
    addText(modelStr, 110, 617);
    addText(colorStr, 104, 604);
    addText(imeiStr, 104, 591);
    addText(imei2Str, 104, 578);
    addText(obsStr, 68, 549);
    addText(receptionStr, 68, 516);
    addText(dniBuyerStr, 307, 516);
    addText(totalStr, 380, 482);

    addText(signatureBySellerStr, 107, 314, signatureFont);
    addText(signatureStr, 275, 314, signatureFont);

    const pdfBytes = await pdfDoc.save();

    const formData = new FormData();
    formData.append(
      "pdf",
      new Blob([pdfBytes], { type: "application/pdf" }),
      "Contrato.pdf"
    );
    if (clientEmail) {
      const formData = new FormData();
      formData.append(
        "pdf",
        new Blob([pdfBytes], { type: "application/pdf" }),
        "Contrato.pdf"
      );
      formData.append("email", clientEmail);
      formData.append(
        "emailContent",
        "Te entregamos acá tu contrato, muchas gracias de parte de Celtuc"
      );
      formData.append("emailTitle", "Comprobante de contrato");
      formData.append("pdfName", "Contrato.pdf");

      try {
        const response = await fetch("/api/sendmail", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `HTTP error! status: ${response.status}, message: ${errorText}`
          );
        }

        toast.success("¡Correo enviado exitosamente con el PDF adjunto!");
      } catch (error) {
        console.error("Error al enviar el correo:", error);
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

export const GeneratePDFBySign = async (
  data: any,
  branchName: string,
  clientEmail?: string
) => {
  try {
    const existingPdfBytes = await fetch("/sena.pdf").then((res) =>
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
      font = regularFont,
      size = 10,
      rotate = -90 // Degrees to rotate, 0 = normal, 90 = vertical
    ) => {
      firstPage.drawText(text, {
        x,
        y,
        size,
        font,
        color: rgb(0, 0, 0),
        rotate: degrees(rotate), // Convert degrees to radians
      });
    };

    // Datos convertidos a string
    const dateStr = data.date?.toString() ?? "";
    const couponStr = data.coupon?.toString() ?? "";
    const clientStr = data.client?.toString() ?? "";
    const phoneStr = data.phone?.toString() ?? "";
    const signStr = data.sign?.toString() ?? "";
    const conceptStr = data.concept?.toString() ?? "";
    const totalStr = data.total?.toString() ?? "";
    const signatureStr = data.signature?.toString() ?? "";
    const slopeStr = data.slope?.toString() ?? "";

    // Ubicación de los datos en el PDF vertical
    addText(slopeStr, 153, 456); // TOTAL $ (campo en la parte inferior izquierda)
    addText(clientStr, 266, 810); // RECIBÍ DE:
    addText(signStr, 243, 782); // LA SUMA DE:
    addText(conceptStr, 221, 792); // EN CONCEPTO DE:
    addText(totalStr, 192, 772); // VALOR TOTAL:
    addText(phoneStr, 266, 473); // TEL:
    addText(dateStr, 300, 470); // FECHA (en la esquina superior derecha)
    addText(couponStr, 340, 530); // Nº (número de recibo en la esquina superior derecha)

    // Firma (ubicada en la parte inferior)
    addText(signatureStr, 147, 675, signatureFont, 12);

    // Guardar PDF modificado
    const pdfBytes = await pdfDoc.save();

    // Descargar PDF
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Comprobante-Seña.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("PDF generado y descargado con éxito.");

    // Enviar por correo si hay email del cliente
    if (clientEmail) {
      const formData = new FormData();
      formData.append(
        "pdf",
        new Blob([pdfBytes], { type: "application/pdf" }),
        "Comprobante-Seña.pdf"
      );
      formData.append("email", clientEmail);
      formData.append(
        "emailContent",
        "Gracias por tu compra! Te esperamos pronto CelTuc!"
      );
      formData.append("emailTitle", "Comprobante de Seña");
      formData.append("pdfName", "Comprobante-Seña.pdf");

      try {
        const response = await fetch("/api/sendmail", {
          method: "POST",
          body: formData,
        });
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(
            `HTTP error! status: ${response.status}, message: ${errorText}`
          );
        }
        toast.success("¡Correo enviado exitosamente con el PDF adjunto!");
      } catch (error) {
        console.error("Error al enviar el correo:", error);
        toast.error("Error al enviar el correo con el PDF.");
      }
    }
  } catch (error) {
    console.error("Error al generar PDF:", error);
    toast.error("Error al generar el PDF. Por favor, inténtalo nuevamente.");
  }
};
