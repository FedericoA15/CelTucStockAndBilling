// /pages/api/generarFactura.ts
import { generarFactura } from '@/utils/afipClient';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const {
      tipoComprobante,
      puntoVenta,
      tipoDoc,
      nroDoc,
      importeTotal,
    } = req.body;

    try {
      const resultado = await generarFactura(
        tipoComprobante,
        puntoVenta,
        tipoDoc,
        nroDoc,
        importeTotal
      );

      res.status(200).json({ success: true, resultado });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
