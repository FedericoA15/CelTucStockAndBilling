import { Afip } from 'afip.ts';
import { NextApiRequest, NextApiResponse } from 'next';

// Configuración del entorno
const isProduction = false; // Cambiar a true para modo de producción

// Ruta de los certificados
const certPath = './certificates/cert.pem';
const keyPath = './certificates/private.key';

// Configuración de AFIP
const afipConfig = {
  cuit: 23427179079, // Reemplaza con tu CUIT
  key: "-----BEGIN PRIVATE KEY-----MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCdcq8noINIeM99hRcZurCKvWjB0qICEcN2QWh/zyGpDLG7LXD7UBHrNvLh4R428SDPDfEWiYsRrCoyvBUlo5eXgXAqB3S8VDn33sTMC9CeTQi60hB1G4dQ4pFpv9Mk49HJXbTYPIa/USZMFJ38gOAGFH1vsrZN2oWi3qLkfzZh4+OTUKUZeMhiJK6CULrqrlJO9UmSKl3gFI8dFZlcGEgOgmP97n9bwzgbnMEYbx7bM2G4W+5giE5U4xvNIYyvxdk0Dj+M8oqiUFrha/ZgVIJ1obvt1rITYnNC8RPlfVeOAz3GohXRAhg4Ouqo6zdcTX+DW2n5Wc2WqAErNOTyd5jJAgMBAAECggEAA+DZpwHm2ffSh0aqUqxCQa34EPYtnsbDPXwk+n5RV5xZcGvmduT6XASRfQuSNqDqlvnCm4nYeXSijCINP00apH/AEeOhy4B49mhwCTqtRoj36GouP5mQVBIQqj3bEfM5WAV34++xvgVeCne44Im9evOG7M5xJn/LKj+OXE80jrqyw9t2uGq8nkSKCksiHHUG+fwJFYr0aP5azDxm9HrNeNIt1NgXD/0UlzOYNp2t/2y1+MXW15b7Fenw97gmWjtjuqMDOEhMii5MPYZf+zimGGsXFNpFqIYofh2bfwlV243SqWd721wUjfbK7vINiGCeSiqRffzIsyTya3NriGfsdQKBgQDTlGswPVyD+IJDrp0E/vCvHQ81aY/573lZ3U4jl3ljB+rhvgsjpsuKeJ6n2+Ar4e3zFgeaHunDU+E24FWhjDXMzqykKRSjAz1KO2H6GFTcXp8qQCjhjpJLAvo+iJooOojgK6EUxskjVEA4AKpSIxGBW62Mae3osJGjMUnGs27ITwKBgQC+gOUnR9GtLhbfF5ltkWGlQSxfEzBO6O0RbBjH7lAJFTyKEbN7aQnFKt2hNiBf9D4uLJZ3Bdzqic3mJEfdBIWkJv6tGq3vr4ok7AiVbWBU/gfhqhTPY2HIh7tf9wAdsD6nGPIb6uL3odl3IDHOsJ7ktfKIGoExgQXJD1ogVdmvZwKBgCPtyzn44ZIDjFNj/oQPqt2ByMhgMbPWp7vL6e3/VfysJoXJGOkn9N6B1ydYHjw1dIvYDNhuMXIa916zP7dcMPKjkguackewUCMf7GZk5Vw6sTqihI6xAES+r7IYzlzQe9fdcNAvZY6bSwB3lHS4Qcu+vrzebCkces7EmuukIsbfAoGAMPNd7qH9tspJBjpCKm1Y8eW1SRjdKOmhQQDNvVH3Lt5OGAxEWkm7QPaqzGnkF8Pi1mqOnzbadUnDpodcD+bBkFSUzFY2q4gnryUXb44TWsOLsujJQCEBV03JT/dgCEDpWHaIf7Pzbj4gawPSyJGJwqseDusAl3/XxLo1Jmno7bECgYAIQCF+zJW8jWOmlkRJT9PUuP+PVF0dZ56UCpnPrABHGGZUcOIDlDvtNUESFCaD6ci0Ndd/V4zu/zj3yuQi48MuX5e2H+sZtAuwNbcxY1FZLgVdd07hL9tQWQNgN96MXBlRKoY/IQUbHsYzvpeQr8RxgNGYs+1JLACemcsF6b+HgQ==-----END PRIVATE KEY-----",
  cert: "-----BEGIN CERTIFICATE-----MIIDRTCCAi2gAwIBAgIIE+2GpIX8xmgwDQYJKoZIhvcNAQENBQAwODEaMBgGA1UEAwwRQ29tcHV0YWRvcmVzIFRlc3QxDTALBgNVBAoMBEFGSVAxCzAJBgNVBAYTAkFSMB4XDTI0MTAyNTAyMjkxNloXDTI2MTAyNTAyMjkxNlowKzEOMAwGA1UEAwwFdGVzdDExGTAXBgNVBAUTEENVSVQgMjM0MjcxNzkwNzkwggEiMA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCdcq8noINIeM99hRcZurCKvWjB0qICEcN2QWh/zyGpDLG7LXD7UBHrNvLh4R428SDPDfEWiYsRrCoyvBUlo5eXgXAqB3S8VDn33sTMC9CeTQi60hB1G4dQ4pFpv9Mk49HJXbTYPIa/USZMFJ38gOAGFH1vsrZN2oWi3qLkfzZh4+OTUKUZeMhiJK6CULrqrlJO9UmSKl3gFI8dFZlcGEgOgmP97n9bwzgbnMEYbx7bM2G4W+5giE5U4xvNIYyvxdk0Dj+M8oqiUFrha/ZgVIJ1obvt1rITYnNC8RPlfVeOAz3GohXRAhg4Ouqo6zdcTX+DW2n5Wc2WqAErNOTyd5jJAgMBAAGjYDBeMAwGA1UdEwEB/wQCMAAwHwYDVR0jBBgwFoAUs7LT//3put7eja8RIZzWIH3yT28wHQYDVR0OBBYEFH3AM41gscaPfxcqB40tFlbniZWmMA4GA1UdDwEB/wQEAwIF4DANBgkqhkiG9w0BAQ0FAAOCAQEAOsR71i/EkXJTripCitRKjPoqB9hLhtTfufMjoiv6kUFghvgtGN06l3T3U+6p6GzStrK1LpTuQLBZhuDOnMVFkks7oxfY2YvlEyUPZCUrL+tvRonu32x0PXFECMpagZQsJdO2M9u8q7hPcqjpuNCb10jRb2vHwkY3e5GwVHNE0S2dfmsqQKVI4o767Yqt+Oot6spl575oZW/faRmiQlw3HUHKIIfsFZhs0/ZPqX9aCuuwJywR0YQdRrqF/41L4ceXoR7MjBOF5mZJp7LoWt5FrI1eIQKpaPf8WE8W7QzGIy5f6UcL2SnMw4o87QJBWu+wl/b9r1TrmmyosLXiGtfpaA==-----END CERTIFICATE-----",
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
    const response = await afip.electronicBillingService.createVoucher(data);
    res.status(200).json(response);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};


