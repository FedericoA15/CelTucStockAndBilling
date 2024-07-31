import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 10,
    width: 226.77, // 80mm in points
    height: 'auto', // Auto height to fit content
  },
  section: {
    margin: 5,
    padding: 5,
  },
  header: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  barcode: {
    marginVertical: 10,
    alignSelf: 'center',
    width: 150, // Width of the barcode image
    height: 50, // Height of the barcode image
  },
  qrCode: {
    alignSelf: 'center',
    width: 100, // Width of the QR code image
    height: 100, // Height of the QR code image
  },
});

const InvoicePDF: React.FC<InvoicePDFProps> = ({ invoice, barcode }) => {
  if (!invoice || !barcode) {
    return null; 
  }

  return (
    <Document>
      <Page size={[226.77, 'auto']} style={styles.page}>
        <View style={styles.header}>
          <Text>CelTuc</Text>
          <Text>de PADROS ESTEBAN NICOLAS</Text>
          <Text>Av. Salta 184</Text>
          <Text>San Miguel de Tucumán - Tucumán</Text>
          <Text>CUIT: 20-35094064-3</Text>
          <Text>I.I.B.B.: 20350940643</Text>
          <Text>Inicio de Actividades: 11/2019</Text>
          <Text>IVA RESPONSABLE INSCRIPTO</Text>
        </View>
        <View style={styles.section}>
          <Text>FACTURA B</Text>
          <Text>ORIGINAL (Cod. 008)</Text>
          {/* <Text>Nº {invoice.id}</Text> */}
          <Text>FECHA: {invoice.date.slice(0, 10)}</Text>
          <Text>CF</Text>
          {/* <Text>CUIT Nº: {invoice.clientCUIT}</Text> */}
          <Text>CONSUMIDOR FINAL</Text>
        </View>
        {invoice.invoiceItems.map((item, index) => (
          <View key={index} style={styles.section}>
            <Text>Item de la factura {index + 1}</Text>
            <Text>Nombre del producto: {item.productName}</Text>
            <Text>Cantidad: {item.quantity}</Text>
            <Text>Modelo: {item.productVariant.subModel}</Text>
            <Text>Precio: ${item.productVariant.priceArs}</Text>
            <Text>Precio de contado: ${item.productVariant.priceArsCounted}</Text>
            <Text>Sucursal: {item.productVariant.branchName}</Text>
          </View>
        ))}
        {invoice.payments.map((payment, index) => (
          <View key={index} style={styles.section}>
            <Text>Pago {index + 1}</Text>
            <Text>Método de pago: {payment.paymentMethod}</Text>
            <Text>Monto: ${payment.amount}</Text>
          </View>
        ))}
        <View style={styles.barcode}>
          <Image src={barcode} />
        </View>
        {/* <View style={styles.qrCode}>
          <Image src={invoice.qrCode} />
        </View> */}
        {/* <View style={styles.section}>
          <Text>C.A.E. Nro.: {invoice.caeNumber}</Text>
          <Text>Vto.: {invoice.caeExpirationDate}</Text>
        </View> */}
      </Page>
    </Document>
  );
};

export default InvoicePDF;
