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
          <Text>Fecha: {invoice.date.slice(0, 10)}</Text>
        </View>
        {invoice.invoiceItems.map((item, index) => (
          <View key={index} style={styles.section}>
            <Text>Producto {index + 1}</Text>
            <Text>{item.productName}</Text>
            <Text>Cantidad: {item.quantity}</Text>
            <Text>Sucursal: {item.productVariant.branchName}</Text>
            <Text>Modelo: {item.productVariant.subModel}</Text>
            <Text>------------------------</Text>
          </View>
        ))}
        {invoice.payments.map((payment, index) => (
          <View key={index} style={styles.section}>
            <Text>Forma de pago n° {index + 1}</Text>
            <Text>Método de pago: {payment.paymentMethod}</Text>
            <Text>Monto: ${payment.amount}</Text>
            <Text>------------------------</Text>
          </View>
        ))}
        <View style={styles.section}>
          <Text>Codigo: {id}</Text>
          <Text>------------------------</Text>

          <Text>
            Documento válido como garantía. La garantía sólo podrá ser reclamada
            por la persona que aparece en la orden, presentando una
            identificación oficial. Si la garantía aplica, el cambio del
            accesorio puede demorar hasta 10 días hábiles dependiendo de la
            disponibilidad del mismo. Todos accesorios
            (auriculares-cables-fuentes-periféricos-etc.)cuentan con sesenta
            (30) días de garantía, el plazo de la misma comienza a contar desde
            el día que se hace entrega del accesorio/s. Esta garantía NO cubre:
            Reembolsos/devoluciones; si el accesorio/s supera el plazo de
            garantía; daños, roturas, golpes, irregularidades y/o vicios
            aparentes de fácil e inmediata observación que no fueron verificados
            dentro del plazo de satisfacción de compra; daños por fluidos; daños
            derivados del uso anormal, o uso contrario al indicado en el manual
            de uso que incluye el kit de venta. robo o hurto del equipo
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default InvoicePDF;
