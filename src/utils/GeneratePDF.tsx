import { PDFDocument, StandardFonts, degrees, rgb } from "pdf-lib";
import { toast } from "react-toastify";

const cmToPt = (cm: any): any => cm * 28.3465;
const inToPt = (inch: any): any => inch * 72;

export const GeneratePDFByReceipt = async (
  data: any,
  branchName: string,
  clientEmail?: string
) => {
  try {
    const existingPdfBytes = await fetch("/newCompra.pdf").then((res) =>
      res.arrayBuffer()
    );
    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    const pages = pdfDoc.getPages();
    const firstPage = pages[0];

    const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

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
    const batteryCapacityStr = data.batteryCapacity?.toString() ?? "";
    const imeiStr = data.imei?.toString() ?? "";
    const paymentMethodsStr = data.paymentMethods?.toString() ?? "";
    const warrantyStr = data.warranty?.toString() ?? "";
    const obsStr = data.obs?.toString() ?? "";
    const slopeStr = data.slope?.toString() ?? "";
    const additionNew = additionStr + " USD";

    addText(branchName, cmToPt(3.5), cmToPt(19.08));
    addText(couponStr, cmToPt(9.3), cmToPt(26.6));
    addText(dateStr, cmToPt(9.4), cmToPt(25.75));
    addText(clientStr, cmToPt(3.7), cmToPt(24.8));
    addText(dniStr, cmToPt(2.7), cmToPt(24.3));
    addText(phoneStr, cmToPt(9.8), cmToPt(24.3));
    addText(additionNew, cmToPt(4.1), cmToPt(23.84));
    addText(conceptStr, cmToPt(2.1), cmToPt(22.9));
    addText(batteryCapacityStr, cmToPt(3.7), cmToPt(20.5));
    addText(imeiStr, cmToPt(3.2), cmToPt(20));
    addText(paymentMethodsStr, cmToPt(4.4), cmToPt(21.93));
    addText(warrantyStr, cmToPt(3.6), cmToPt(19.56));
    addText(totalStr, cmToPt(10.83), cmToPt(19.76));
    addText(obsStr, cmToPt(2.7), cmToPt(18.6));
    addText(slopeStr, cmToPt(6.6), cmToPt(21.47));

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

export const GeneratePDFByRepair = async (
  data: any,
  branchName: string,
  clientEmail?: string
) => {
  try {
    const existingPdfBytes = await fetch("/newReparacion.pdf").then((res) =>
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
    const branchStr = branchName?.toString() ?? "";
    const budgetStr = data.budget?.toString() ?? "";
    const codeStr = data.code?.toString() ?? "";
    const phoneStr = data.phone?.toString() ?? "";
    const diagnosisStr = data.diagnosis?.toString() ?? "";
    const cashStr = data.warranty?.toString() ?? "";

    addText(couponStr, cmToPt(9.36), cmToPt(26.64));
    addText(dateStr, cmToPt(9.4), cmToPt(25.78));
    addText(clientStr, cmToPt(3.7), cmToPt(24.82));
    addText(equipmentStr, cmToPt(4.3), cmToPt(24.35));
    addText(failureStr, cmToPt(2), cmToPt(23.4));
    addText(obsStr, cmToPt(2.83), cmToPt(17.89));
    addText(receptionStr, cmToPt(3.8), cmToPt(20.3));
    addText(branchStr, cmToPt(3.45), cmToPt(19.8));
    addText(budgetStr, cmToPt(11.15), cmToPt(19.32));
    addText(cashStr, cmToPt(13.26), cmToPt(19.35));
    addText(codeStr, cmToPt(4.5), cmToPt(19.33));
    addText(phoneStr, cmToPt(2.6), cmToPt(18.88));
    addText(diagnosisStr, cmToPt(2), cmToPt(22.24));

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
    const existingPdfBytes = await fetch("/newsena.pdf").then((res) =>
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
      size = 10
      // rotate = -90 // Degrees to rotate, 0 = normal, 90 = vertical
    ) => {
      firstPage.drawText(text, {
        x,
        y,
        size,
        font,
        color: rgb(0, 0, 0),
        // rotate: degrees(rotate), // Convert degrees to radians
      });
    };

    // Datos convertidos a string
    const dateStr = data.date?.toString() ?? "";
    const couponStr = data.coupon?.toString() ?? "";
    const clientStr = data.client?.toString() ?? "";
    const phoneStr = data.phone?.toString() ?? "";
    const signStr = data.sign?.toString() ?? "";
    const conceptStr = data.concept?.toString() ?? "";

    const changeStr = data.obs?.toString() ?? "";

    const totalStr = data.total?.toString() ?? "";
    const signatureStr = data.signature?.toString() ?? "";
    const slopeStr = data.slope?.toString() ?? "";
    const dniStr = data.dni?.toString() ?? "";

    addText(couponStr, inToPt(4.95), inToPt(10.19)); // Nº (número de recibo en la esquina superior derecha)
    addText(dateStr, inToPt(4.79), inToPt(9.95)); // FECHA (en la esquina superior derecha)
    addText(clientStr, inToPt(1.47), inToPt(9.67)); // RECIBÍ DE:
    addText(dniStr, inToPt(4.5), inToPt(9.67)); // DNI:
    addText(phoneStr, inToPt(1.21), inToPt(9.39)); // TEL:
    addText(conceptStr, inToPt(3.25), inToPt(9.39)); // EN CONCEPTO DE:
    addText(signStr, inToPt(1.65), inToPt(9.26)); // LA SUMA DE:
    addText(changeStr, inToPt(2.04), inToPt(8.99)); // CAMBIO:
    addText(totalStr, inToPt(1.69), inToPt(8.79)); // VALOR TOTAL:
    addText(branchName, inToPt(1.52), inToPt(8.58)); // sucursal

    addText(slopeStr, inToPt(5.0), inToPt(8.78)); // SALDO USD $ (campo en la parte inferior izquierda)

    // Firma (ubicada en la parte inferior)
    addText(signatureStr, inToPt(3.62), inToPt(8.42), signatureFont);

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
