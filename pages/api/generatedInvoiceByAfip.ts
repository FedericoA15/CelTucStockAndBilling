
import { Afip, Factura } from 'afip.ts';

// Configuración de AFIP en modo de prueba o producción
const isProduction = false; // Cambiar a true para modo de producción

// Ruta de los certificados
const certPath = './certificates/cert.pem';
const keyPath = './certificates/private.key';

// Configuración del entorno de AFIP
const afipConfig = {
    CUIT: 12345678901, // Reemplaza con tu CUIT
    cert: certPath,
    key: keyPath,
    production: isProduction,
};

// Función para inicializar la conexión con AFIP
const afip = new Afip(afipConfig);

// Función para generar una factura electrónica
export const generarFactura = async ({
    tipoComprobante,
    puntoVenta,
    tipoDocumento,
    numeroDocumento,
    importeTotal,
    fechaEmision,
}: {
    tipoComprobante: number;
    puntoVenta: number;
    tipoDocumento: number;
    numeroDocumento: string;
    importeTotal: number;
    fechaEmision: string; // Formato: AAAA-MM-DD
}) => {
    try {
        // Crear la factura con los parámetros proporcionados
        const factura: Factura = {
            CantReg: 1, // Número de comprobantes a registrar
            PtoVta: puntoVenta,
            CbteTipo: tipoComprobante,
            Concepto: 1, // 1: Productos, 2: Servicios, 3: Productos y servicios
            DocTipo: tipoDocumento,
            DocNro: parseInt(numeroDocumento, 10),
            CbteDesde: 1, // Primer número de comprobante
            CbteHasta: 1, // Último número de comprobante
            ImpTotal: importeTotal,
            ImpTotConc: 0, // Importe no gravado
            ImpNeto: importeTotal, // Importe neto
            ImpOpEx: 0, // Operaciones exentas
            ImpIVA: 0, // IVA
            ImpTrib: 0, // Tributos
            MonId: 'PES', // Moneda (PES para pesos argentinos)
            MonCotiz: 1, // Cotización
            FchServDesde: null,
            FchServHasta: null,
            FchVtoPago: null,
            FchCbte: fechaEmision.replace(/-/g, ''), // Formato AAAAMMDD
        };

        // Llamar al servicio de AFIP para generar la factura
        const result = await afip.ElectronicBilling.createNextVoucher(factura);

        console.log('Factura generada exitosamente:', result);
        return result;
    } catch (error) {
        console.error('Error al generar la factura:', error);
        throw error;
    }
};

// Ejemplo de cómo usar el modo de prueba
export const setProductionMode = (production: boolean) => {
    afip.setProduction(production);
};
