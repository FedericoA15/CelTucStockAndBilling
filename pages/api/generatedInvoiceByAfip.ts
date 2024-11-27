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
      const { branchName, price, quantity } = item;

      const puntoDeVenta = branchName === "Centro" ? 6 : branchName === "Solar" ? 7 : 1;
      const tipoDeFactura = 6; 

      const esConsumidorFinal = !payments.dni || payments.dni === 0;
      const docTipo = esConsumidorFinal ? 99 : 96;
      const docNro = payments.dni;

      const importeNeto = price * quantity;
      const importeIva = importeNeto * 0.21; 
      const importeTotal = importeNeto + importeIva;

      const ultimoComprobante: any =
        await afip.electronicBillingService.getLastVoucher(
          puntoDeVenta,
          tipoDeFactura
        );

      const proximoComprobante = ultimoComprobante.CbteNro + 1;

      const data: any = {
        CantReg: 1,
        PtoVta: puntoDeVenta,
        CbteTipo: tipoDeFactura,
        Concepto: 1,
        DocTipo: docTipo,
        DocNro: docNro,
        CbteDesde: proximoComprobante, 
        CbteHasta: proximoComprobante, 
        CbteFch: parseInt(date),
        ImpTotal: importeTotal.toFixed(2),
        ImpTotConc: 0, 
        ImpNeto: importeNeto.toFixed(2),
        ImpOpEx: 0,
        ImpIVA: importeIva.toFixed(2),
        ImpTrib: 0, 
        MonId: "PES",
        MonCotiz: 1, 
        Iva: [
          {
            Id: 5, 
            BaseImp: importeNeto.toFixed(2),
            Importe: importeIva.toFixed(2),
          },
        ],
      };

      const invoice = await afip.electronicBillingService.createVoucher(data);
      res.status(200).json(invoice);
    }
  } catch (error: any) {
    console.error("Error al generar factura:", error);
    res.status(500).json({ error: error.message || "Error desconocido" });
  }
}
