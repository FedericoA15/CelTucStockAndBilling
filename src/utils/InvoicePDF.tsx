import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 10,
    width: 226.77, // 80mm in points
    height: "auto", // Auto height to fit content
  },
  section: {
    margin: 5,
    padding: 5,
    fontSize: 8, // Ajusta el tamaño de la fuente para que todo quepa
  },
  header: {
    fontSize: 10,
    marginBottom: 10,
    textAlign: "center",
  },
  barcode: {
    marginVertical: 10,
    alignSelf: "center",
    width: 50,
    height: "auto",
  },
});

const InvoicePDF: React.FC<InvoicePDFProps> = ({ invoice, barcode, id }) => {
  if (!invoice || !barcode) {
    return null;
  }
  return (
    <Document>
      <Page size={[226.77, "auto"]} style={styles.page}>
        <View style={styles.header}>
          <Text>CelTuc</Text>
        </View>
        <View style={styles.section}>
          <Text>FECHA: {invoice.date.slice(0, 10)}</Text>
        </View>
        {invoice.invoiceItems.map((item, index) => (
          <View key={index} style={styles.section}>
            <Text>Producto {index + 1}</Text>
            <Text>{item.productName}</Text>
            <Text>Cantidad: {item.quantity}</Text>
            <Text>Sucursal: {item.productVariant.branchName}</Text>
            <Text>Modelo: {item.productVariant.subModel}</Text>
            <Text>Precio: ${item.productVariant.priceArs}</Text>
            <Text>
              Precio de contado: ${item.productVariant.priceArsCounted}
            </Text>
          </View>
        ))}
        {invoice.payments.map((payment, index) => (
          <View key={index} style={styles.section}>
            <Text>Pago {index + 1}</Text>
            <Text>Método de pago: {payment.paymentMethod}</Text>
            <Text>Monto: ${payment.amount}</Text>
          </View>
        ))}
        <View style={styles.section}>
          <Text>{id}</Text>
        </View>
      </Page>
    </Document>
  );
};

export default InvoicePDF;
