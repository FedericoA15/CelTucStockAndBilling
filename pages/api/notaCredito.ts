import { afip } from "@/utils/afipInstance";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const puntoDeVenta = 6;  // Punto de venta de la factura original
    const tipoFacturaOriginal = 6;  // Factura B (Factura tipo 6)
    const numeroFacturaOriginal = 7786;  // Número de la factura original

    // Datos de la factura original
    const datosFacturaOriginal = {
      DocTipo: 96,  // Tipo de documento (CUIT)
      DocNro: 42717907,  // Número de documento (CUIT)
      Cuit: "20350940643",  // CUIT del receptor
      ImpTotal: 1331000,  // Monto total
      ImpTotConc: 0,  // Total no sujeto a IVA
      ImpNeto: 1100000,  // Monto neto gravado
      ImpOpEx: 0,  // Exento (si aplica)
      ImpIVA: 231000,  // IVA
      ImpTrib: 0,  // Tributos
      MonId: "PES",  // Moneda (PES)
      MonCotiz: 1,  // Cotización de la moneda
      CbteFch: "20241127",  // Fecha de la factura original
      CuitReceptor: "20350940643",  // CUIT del receptor
    };

    const data = {
      CantReg: 1,  // Cantidad de registros (por lo general 1)
      PtoVta: puntoDeVenta,  // Punto de venta
      CbteTipo: 8,  // Tipo de comprobante: Nota de Crédito B
      Concepto: 1,  // Concepto: 1 para productos
      DocTipo: datosFacturaOriginal.DocTipo,  // Tipo de documento del cliente (Ej. CUIT, DNI)
      DocNro: datosFacturaOriginal.DocNro,  // Número de documento del cliente
      CbteDesde: 6,  // Número de la Nota de Crédito (debe ser el siguiente número en serie)
      CbteHasta: 6,  // Igual al 'CbteDesde' ya que es solo un comprobante
      CbteFch: datosFacturaOriginal.CbteFch,  // Fecha de la Nota de Crédito (de la factura original)
      ImpTotal: datosFacturaOriginal.ImpTotal,  // Total a acreditar (monto total de la factura original)
      ImpTotConc: datosFacturaOriginal.ImpTotConc,  // Total no sujeto a IVA
      ImpNeto: datosFacturaOriginal.ImpNeto,  // Monto neto gravado de la factura original
      ImpOpEx: datosFacturaOriginal.ImpOpEx,  // Exento (si aplica)
      ImpIVA: datosFacturaOriginal.ImpIVA,  // IVA de la factura original
      ImpTrib: datosFacturaOriginal.ImpTrib,  // Tributos (si aplica)
      MonId: datosFacturaOriginal.MonId,  // Moneda (por ejemplo, 'PES')
      MonCotiz: datosFacturaOriginal.MonCotiz,  // Cotización de la moneda (por lo general 1)
      CbtesAsoc: [
        {
          Tipo: tipoFacturaOriginal,  // Tipo de factura original (6 para Factura B)
          PtoVta: puntoDeVenta,  // Punto de venta de la factura original
          Nro: numeroFacturaOriginal,  // Número de la factura original
          Cuit: datosFacturaOriginal.Cuit,  // CUIT del receptor de la factura original
        },
      ],
      Iva: [
        {
          Id: 5,  // ID del IVA (por ejemplo, 5 para la alícuota del 21%)
          BaseImp: datosFacturaOriginal.ImpNeto,  // Base imponible
          Importe: datosFacturaOriginal.ImpIVA,  // Importe del IVA
        },
      ],
    };

    // Crear la Nota de Crédito en AFIP
    const resultado = await afip.electronicBillingService.createVoucher(data);
    res.status(200).json(resultado);
  } catch (error ) {
    console.error("Error al crear la Nota de Crédito:", error);
    res.status(500).json({ error: error || "Error desconocido" });
  }
}
