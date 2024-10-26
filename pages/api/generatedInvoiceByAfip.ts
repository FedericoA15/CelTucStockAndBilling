// const Afip = require('@afipsdk/afip.js');
import { Afip } from 'afip.ts';
import { NextApiRequest, NextApiResponse } from 'next';
const fs = require('fs');

// Configuración del entorno
const isProduction = false; // Cambiar a true para modo de producción

// Ruta de los certificados
const cert = fs.readFileSync('./cert.crt', {encoding: 'utf8'});

// Key (Puede estar guardado en archivos, DB, etc)
const key = fs.readFileSync('./key.key', {encoding: 'utf8'});
console.log(key);
// Configuración de AFIP
const afipConfig = {
  cuit: 23427179079, // Reemplaza con tu CUIT
  key: key,
  cert: cert,
  production: isProduction,
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const afip = new Afip(afipConfig);

// Formato de fecha para el comprobante
const date = new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
  .toISOString()
  .split('T')[0];

// Configuración de los datos del comprobante
let data: any = {
  CantReg: 1, // Cantidad de comprobantes a registrar
  PtoVta: 1, // Punto de venta
  CbteTipo: 6, // Tipo de comprobante (ver tipos disponibles)
  Concepto: 1, // Concepto del Comprobante: (1)Productos, (2)Servicios, (3)Productos y Servicios
  DocTipo: 99, // Tipo de documento del comprador (99 consumidor final, ver tipos disponibles)
  DocNro: 0, // Número de documento del comprador (0 consumidor final)
  CbteDesde: 1, // Número de comprobante o número del primer comprobante en caso de ser más de uno
  CbteHasta: 1, // Número de comprobante o número del último comprobante en caso de ser más de uno
  CbteFch: parseInt(date.replace(/-/g, '')), // Fecha del comprobante (AAAAMMDD)
  ImpTotal: 121, // Importe total del comprobante
  ImpTotConc: 0, // Importe neto no gravado
  ImpNeto: 100, // Importe neto gravado
  ImpOpEx: 0, // Importe exento de IVA
  ImpIVA: 21, // Importe total de IVA
  ImpTrib: 0, // Importe total de tributos
  MonId: 'PES', // Tipo de moneda usada en el comprobante ('PES' para pesos argentinos)
  MonCotiz: 1, // Cotización de la moneda usada (1 para pesos argentinos)
  Iva: [
    {
      Id: 5, // Id del tipo de IVA (5 para 21%)
      BaseImp: 100, // Base imponible
      Importe: 21, // Importe
    },
  ],
};

// Generar el comprobante
try {
    const response = await afip.electronicBillingService.createVoucher(data)
    res.status(200).json(response);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};


