import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  barcode: {
    marginVertical: 20,
    alignSelf: 'center',
    width: '100%',
    height: 'auto',
  },
});

const InvoicePDF: React.FC<InvoicePDFProps> = ({ invoice, barcode }) => {
    if (!invoice || !barcode) {
      return null; // Manejo básico de carga, podrías mostrar un mensaje de error o de carga
    }
  
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          <View style={styles.header}>
            <Text>CelTuc</Text>
            <Text>Factura</Text>
          </View>
          <View style={styles.section}>
            <Text>Cliente: {invoice.client}</Text>
            <Text>Fecha: {invoice.date.slice(0, 10)}</Text>
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
              <Text>Monto: {payment.amount}</Text>
            </View>
          ))}
          <View style={styles.barcode}>
            <Image src={barcode} />
          </View>
        </Page>
      </Document>
    );
  };
  
  export default InvoicePDF;