import { afip } from '@/utils/afipInstance';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { invoiceItems, payments, client } = req.body;

  if (!invoiceItems || !payments || !client) {
    return res.status(400).json({ error: 'Faltan parámetros obligatorios' });
  }

  try {
    // Obtener fecha formateada en YYYYMMDD
    const date = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .split('T')[0]
      .replace(/-/g, '');

    const responses = [];

    for (const item of invoiceItems) {
      const { branchName, price, quantity } = item;

      // Determinar punto de venta y tipo de factura
      const puntoDeVenta = branchName === "Centro" ? 6 : 1;
      const tipoDeFactura = 6; // Factura tipo B

      // Determinar tipo y número de documento
      const esConsumidorFinal = !payments[0]?.dni || payments[0]?.dni === 0;
      const docTipo = esConsumidorFinal ? 99 : 96; // 99 = Consumidor Final, 96 = DNI
      const docNro = esConsumidorFinal ? 0 : payments[0]?.dni;

      // Calcular montos
      const importeNeto = price * quantity;
      const importeIva = importeNeto * 0.21; // IVA del 21%
      const importeTotal = importeNeto + importeIva;

      // Obtener último comprobante autorizado
      const ultimoComprobante: any = await afip.electronicBillingService.getLastVoucher(
         puntoDeVenta,
         tipoDeFactura,
      );

      // Configurar datos del comprobante
      const data : any= {
        CantReg: 1,
        PtoVta: puntoDeVenta,
        CbteTipo: tipoDeFactura,
        Concepto: 1, // Productos
        DocTipo: docTipo,
        DocNro: docNro,
        CbteDesde: ultimoComprobante.CbteTipo + 1,
        CbteHasta: ultimoComprobante.CbteNro + 1,
        CbteFch: parseInt(date),
        ImpTotal: importeTotal.toFixed(2),
        ImpTotConc: 0, // No gravado
        ImpNeto: importeNeto.toFixed(2),
        ImpOpEx: 0, // Operaciones exentas
        ImpIVA: importeIva.toFixed(2),
        ImpTrib: 0, // Otros tributos
        MonId: 'PES', // Moneda (PES para pesos argentinos)
        MonCotiz: 1, // Cotización de la moneda
        Iva: [
          {
            Id: 5, // IVA 21%
            BaseImp: importeNeto.toFixed(2),
            Importe: importeIva.toFixed(2),
          },
        ],
      };

      // Crear comprobante
      const invoice = await afip.electronicBillingService.createVoucher(data);
      // responses.push({ item, invoice });
    res.status(200).json({
      message: "Facturas generadas exitosamente",
      details: invoice,
    });
    }


  } catch (error: any) {
    console.error("Error al generar factura:", error);
    res.status(500).json({ error: error.message || "Error desconocido" });
  }
}
