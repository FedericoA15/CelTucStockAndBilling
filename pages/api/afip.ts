import Afip from '@afipsdk/afip.js';

export async function POST(req: Request) {
  try {
    const { body } = await req.json();
    
    const afip = new Afip({
      CUIT: process.env.AFIP_CUIT_PRUEBA,
      production: false, 
      cert: process.env.AFIP_CERT_PRUEBA,
      key: process.env.AFIP_KEY_PRUEBA,
    });

    const data = {
      'CantReg'    : 1,          // Cantidad de comprobantes a registrar (en este caso, solo uno).
      'PtoVta'     : 1,          // Punto de venta desde el que se emite la factura (puede ser 1 u otro número que hayas configurado en AFIP).
      'CbteTipo'   : 6,          // Tipo de comprobante (Ej: 6 para Factura B. Otros tipos incluyen Factura A, etc.).
      'Concepto'   : 1,          // Tipo de concepto: 1 para productos, 2 para servicios, 3 para productos y servicios.
      'DocTipo'    : 99,         // Tipo de documento del receptor: 99 para consumidor final. Otros pueden ser DNI, CUIT, etc.
      'DocNro'     : 0,          // Número de documento del receptor. Para consumidor final, se coloca 0.
      'CbteDesde'  : 1,          // Número de comprobante desde (en este caso, es una factura individual, por lo que es 1).
      'CbteHasta'  : 1,          // Número de comprobante hasta (igualmente, es 1 si es un único comprobante).
      'CbteFch'    : parseInt((new Date()).toISOString().slice(0,10).replace(/-/g, '')), 
                                    // Fecha del comprobante en formato AAAAMMDD. Aquí se genera automáticamente la fecha actual.
      'ImpTotal'   : 121,        // Importe total de la factura (incluyendo impuestos).
      'ImpTotConc' : 0,          // Importe no gravado (si existe alguna parte del importe que no esté alcanzada por impuestos).
      'ImpNeto'    : 100,        // Importe neto gravado, es decir, el valor sin incluir IVA.
      'ImpOpEx'    : 0,          // Importe exento de impuestos (si aplica).
      'ImpIVA'     : 21,         // Importe del IVA total. Se calcula a partir del `ImpNeto` (en este caso, 21% de 100).
      'ImpTrib'    : 0,          // Importe de otros tributos (si existen otros impuestos aparte del IVA).
      'MonId'      : 'PES',      // Identificador de la moneda utilizada. 'PES' para pesos argentinos.
      'MonCotiz'   : 1,          // Cotización de la moneda, en este caso, 1 porque es en pesos argentinos.
      'Iva'        : [           // Detalle de la estructura del IVA aplicado.
        {
          'Id'       : 5,        // Código del tipo de IVA: 5 representa el 21% (otros códigos incluyen 4 para 10.5%, etc.).
          'BaseImp'  : 100,      // Base imponible para el cálculo del IVA, es decir, el importe neto gravado (en este caso, 100).
          'Importe'  : 21        // Importe correspondiente al IVA, calculado como el 21% del `BaseImp`.
        }
      ]
    };
    
    const res = await afip.ElectronicBilling.createVoucher(data);

    return new Response(JSON.stringify(res), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}