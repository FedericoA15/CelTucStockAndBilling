import { afip } from '@/utils/afipInstance';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const { puntoDeVenta, tipoDeFactura, concepto, docTipo, docNro, importeNeto, importeIva } = req.body;

  // Si alguno de los parámetros no es proporcionado, devolvemos un error
  if (!puntoDeVenta || !tipoDeFactura || !concepto || !docTipo || !docNro || !importeNeto || !importeIva) {
    return res.status(400).json({ error: 'Faltan parámetros obligatorios' });
  }
  
const date = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
  .toISOString()
  .split('T')[0];

let data: any = {
  CantReg: 1, // Cantidad de comprobantes a registrar
  PtoVta: puntoDeVenta, // Punto de venta
  CbteTipo: tipoDeFactura, // Tipo de comprobante (ver tipos disponibles)
  Concepto: concepto, // Concepto del Comprobante: (1)Productos, (2)Servicios, (3)Productos y Servicios
  DocTipo: docTipo, // Tipo de documento del comprador (99 consumidor final, ver tipos disponibles)
  DocNro: docNro, // Número de documento del comprador (0 consumidor final)
  CbteDesde: 1, // Número de comprobante o número del primer comprobante en caso de ser más de uno
  CbteHasta: 1, // Número de comprobante o número del último comprobante en caso de ser más de uno
  CbteFch: parseInt(date.replace(/-/g, '')), // Fecha del comprobante (AAAAMMDD)
  ImpTotal: importeNeto + importeIva , // Importe total del comprobante
  ImpTotConc: 0, // Importe neto no gravado
  ImpNeto: importeNeto, // Importe neto gravado
  ImpOpEx: 0, // Importe exento de IVA
  ImpIVA: importeIva, // Importe total de IVA
  ImpTrib: 0, // Importe total de tributos
  MonId: 'PES', // Tipo de moneda usada en el comprobante ('PES' para pesos argentinos)
  MonCotiz: 1, // Cotización de la moneda usada (1 para pesos argentinos)
  Iva: [
    {
      Id: 5, // Id del tipo de IVA (5 para 21%)
      BaseImp: importeNeto, // Base imponible
      Importe: importeIva, // Importe
    },
  ],
};

try {
    const response = await afip.electronicBillingService.createVoucher(data)
    const salesPoints = await afip.electronicBillingService.getSalesPoints();
    res.status(200).json(salesPoints);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};


