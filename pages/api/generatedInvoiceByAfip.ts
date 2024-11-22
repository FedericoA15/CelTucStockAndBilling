import { afip } from '@/utils/afipInstance';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { invoiceItems, payments, client } = req.body;

  if (!invoiceItems || !payments || !client) {
    return res.status(400).json({ error: 'Faltan parámetros obligatorios' });
  }

  try {
    const date = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .split('T')[0];

    for (const item of invoiceItems) {
      const { branchName, price, quantity } = item;
      const puntoDeVenta = branchName === "Centro" ? 6 : 1; // Punto de venta dinámico
      const tipoDeFactura = 6; // Factura tipo B
      const docTipo = payments[0]?.dni ? 96 : 99; // 96 = DNI, 99 = Consumidor Final
      const docNro = payments[0]?.dni || 0; // Número de documento o 0 para Consumidor Final
      const importeNeto = price * quantity;
      const importeIva = importeNeto * 0.21; // IVA del 21%

      let data: any = {
        CantReg: 1, // Cantidad de comprobantes
        PtoVta: puntoDeVenta,
        CbteTipo: tipoDeFactura,
        Concepto: 1, // Productos
        DocTipo: docTipo,
        DocNro: docNro,
        CbteDesde: 1,
        CbteHasta: 1,
        CbteFch: parseInt(date.replace(/-/g, '')),
        ImpTotal: importeNeto + importeIva,
        ImpTotConc: 0,
        ImpNeto: importeNeto,
        ImpOpEx: 0,
        ImpIVA: importeIva,
        ImpTrib: 0,
        MonId: 'PES',
        MonCotiz: 1,
        Iva: [
          {
            Id: 5, // 21%
            BaseImp: importeNeto,
            Importe: importeIva,
          },
        ],
      };

      // Crear comprobante para este producto
      await afip.electronicBillingService.createVoucher(data);
    }

    res.status(200).json({ message: 'Facturas generadas exitosamente.' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
