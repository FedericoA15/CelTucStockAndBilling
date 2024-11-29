import { afip } from "@/utils/afipInstance";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { invoiceItems, payments, client } = req.body;

  if (!invoiceItems || !payments || !client) {
    return res.status(400).json({ error: "Faltan parámetros obligatorios" });
  }

  try {
    const date = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .split("T")[0]
      .replace(/-/g, "");

    for (const item of invoiceItems) {
      const { branchName } = item;

      const puntoDeVenta =
        branchName === "Centro" ? 6 : branchName === "Solar" ? 7 : 1;
      const tipoDeFactura = 6; // Factura B

      const esConsumidorFinal = !payments.dni || payments.dni === 0;
      const docTipo = esConsumidorFinal ? 99 : 96;
      const docNro = payments.dni || 0;

      const importeTotal = payments.amount;
      const importeNeto = importeTotal / 1.21; // Base imponible sin IVA
      const importeIVA = importeTotal - importeNeto; // IVA calculado

      const ultimoComprobante: any =
        await afip.electronicBillingService.getLastVoucher(
          puntoDeVenta,
          tipoDeFactura
        );

      const proximoComprobante = ultimoComprobante.CbteNro + 1;

      const data: any = {
        CantReg: 1, // Cantidad de registros
        PtoVta: puntoDeVenta, // Punto de venta
        CbteTipo: tipoDeFactura, // Tipo de comprobante: 6 (Factura B)
        Concepto: 1, // Concepto: Productos
        DocTipo: docTipo, // Tipo de documento
        DocNro: docNro, // Número de documento
        CbteDesde: proximoComprobante, // Comprobante desde
        CbteHasta: proximoComprobante, // Comprobante hasta
        CbteFch: parseInt(date), // Fecha del comprobante
        ImpTotal: importeTotal.toFixed(2), // Importe total
        ImpTotConc: 0, // Importe no gravado
        ImpNeto: importeNeto.toFixed(2), // Importe neto gravado
        ImpOpEx: 0, // Operaciones exentas
        ImpIVA: importeIVA.toFixed(2), // Importe de IVA
        ImpTrib: 0, // Otros tributos
        MonId: "PES", // Moneda: PES
        MonCotiz: 1, // Cotización de la moneda
        Iva: [
          {
            Id: 5, // Alícuota del 21%
            BaseImp: importeNeto.toFixed(2), // Base imponible
            Importe: importeIVA.toFixed(2), // Importe del IVA
          },
        ],
      };

      // Crear la factura en AFIP
      const invoice = await afip.electronicBillingService.createVoucher(data);
      res.status(200).json(invoice);
    }
  } catch (error: any) {
    console.error("Error al generar factura:", error);
    res.status(500).json({ error: error.message || "Error desconocido" });
  }
}
