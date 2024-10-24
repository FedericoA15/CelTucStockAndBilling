import { Afip } from 'afip.ts';
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

// Obtener los datos de configuración de las variables de entorno
const cuit = process.env.AFIP_CUIT ? parseInt(process.env.AFIP_CUIT) : 0;
const certPath = process.env.AFIP_CERT_PATH || '';
const keyPath = process.env.AFIP_KEY_PATH || '';
const environment = process.env.AFIP_ENV || 'testing';

// Configurar la instancia de la AFIP
const afip = new Afip({
  CUIT: cuit, // CUIT del contribuyente
  cert: certPath, // Ruta al certificado
  key: keyPath, // Ruta a la clave privada
  production: environment === 'production', // Indica si es producción o testing
});

/**
 * Generar una factura electrónica para servicios con Factura A.
 * @param {number} tipoComprobante - Tipo de comprobante (habitualmente 1 para Factura A).
 * @param {number} puntoVenta - Punto de venta (habitualmente 1).
 * @param {number} tipoDoc - Tipo de documento del cliente (80 para CUIT, 96 para DNI).
 * @param {number} nroDoc - Número de documento del cliente.
 * @param {number} importeTotal - Importe total de la factura.
 * @param {number} concepto - Concepto de la operación (2 para Servicios).
 * @param {string} moneda - Código de la moneda (PES para pesos argentinos).
 * @returns {Promise<any>} - Resultado de la operación.
 */
export const generarFactura = async (
  tipoComprobante: number,
  puntoVenta: number,
  tipoDoc: number,
  nroDoc: number,
  importeTotal: number,
  concepto: number = 2, // 2 para Servicios
  moneda: string = 'PES', // Moneda en pesos
): Promise<any> => {
  try {
    // Obtener el último número de comprobante autorizado
    const ultimoComprobante = await afip.ElectronicBilling.getLastVoucher({
      sales_point: puntoVenta,
      type: tipoComprobante,
    });

    // Detalles de la factura
    const data = {
      CantReg: 1, // Cantidad de comprobantes a registrar
      PtoVta: puntoVenta, // Punto de venta
      CbteTipo: tipoComprobante, // Tipo de comprobante
      Concepto: concepto, // Concepto de la operación: Servicios
      DocTipo: tipoDoc, // Tipo de documento del cliente
      DocNro: nroDoc, // Número de documento del cliente
      CbteDesde: ultimoComprobante + 1, // Número de comprobante desde
      CbteHasta: ultimoComprobante + 1, // Número de comprobante hasta
      CbteFch: parseInt(new Date().toISOString().slice(0, 10).replace(/-/g, '')), // Fecha del comprobante en formato AAAAMMDD
      ImpTotal: importeTotal, // Importe total
      ImpTotConc: 0, // Importe neto no gravado
      ImpNeto: importeTotal, // Importe neto gravado
      ImpOpEx: 0, // Importe exento de IVA
      ImpIVA: 0, // Importe de IVA
      ImpTrib: 0, // Importe de tributos
      MonId: moneda, // Moneda (PES para pesos argentinos)
      MonCotiz: 1, // Cotización de la moneda
    };

    // Registrar la factura
    const respuesta = await afip.ElectronicBilling.createVoucher(data);
    return respuesta;
  } catch (error: any) {
    console.error('Error al generar la factura:', error);
    throw error;
  }
};
