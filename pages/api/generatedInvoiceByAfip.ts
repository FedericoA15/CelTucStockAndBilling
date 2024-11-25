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

    // Procesar cada ítem de la factura
    const responses = [];
    for (const item of invoiceItems) {
      const { branchName, price, quantity } = item;
      
      // Determinar punto de venta y tipo de factura
      const puntoDeVenta = branchName === "Centro" ? 6 : 1; 
      const tipoDeFactura = 6; // Factura tipo B

      // Definir tipo y número de documento
      const docTipo = payments[0]?.dni ? 96 : 99; // 96 = DNI, 99 = Consumidor Final
      const docNro = payments[0]?.dni || 0; // Número de documento o 0 para Consumidor Final

      // Calcular montos
      const importeNeto = price * quantity;
      const importeIva = importeNeto * 0.21; // IVA del 21%
      const importeTotal = importeNeto + importeIva;

      // Obtener el último comprobante autorizado
      const ultimoComprobante: any = await afip.electronicBillingService.getLastVoucher(
        PtoVta: puntoDeVenta,
        CbteTipo: tipoDeFactura,
      );

      // Configurar los datos del comprobante
      const data: any = {
        CantReg: 1,
        PtoVta: puntoDeVenta,
        CbteTipo: tipoDeFactura,
        Concepto: 1, // Productos
        DocTipo: docTipo,
        DocNro: docNro,
        CbteDesde: ultimoComprobante + 1,
        CbteHasta: ultimoComprobante + 1,
        CbteFch: parseInt(date),
        ImpTotal: importeTotal,
        ImpTotConc: 0, // No gravado
        ImpNeto: importeNeto,
        ImpOpEx: 0, // Operaciones exentas
        ImpIVA: importeIva,
        ImpTrib: 0, // Otros tributos
        MonId: 'PES', // Moneda (PES para pesos argentinos)
        MonCotiz: 1, // Cotización de la moneda
        Iva: [
          {
            Id: 5, // IVA 21%
            BaseImp: importeNeto,
            Importe: importeIva,
          },
        ],
      };

      // Crear comprobante
      const invoice = await afip.electronicBillingService.createVoucher(data);
      responses.push(invoice);
    }

    // Enviar respuesta
    res.status(200).json({ message: "Facturas generadas exitosamente", responses });

  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
