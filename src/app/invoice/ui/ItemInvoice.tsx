import Link from "next/link";

export const ItemInvoice: React.FC<{ item: Invoice }> = ({ item }) => {
  return (
    <div className="bg-custom-grey-2 text-gray-200 p-4 my-4 relative w-full rounded-md">
      <Link
        className="font-bold text-2xl mb-4 block hover:text-blue-500"
        href={`/invoice/${item.id}`}
      >
        ID del comprobante: {item.id}
      </Link>
      <p className="mb-2">Email del vendedor: {item.userEmail}</p>
      <p className="mb-2">Fecha: {item.date.slice(0, 10)}</p>
      <p className="mb-2">Cliente: {item.client}</p>
      {item.invoiceItems.map((invoiceItem, index) => (
        <div key={index} className="p-4 mt-4 bg-gray-700 rounded-md">
          <h3 className="font-bold text-lg mb-2">
            Item de la factura {index + 1}
          </h3>
          <p>Nombre del producto: {invoiceItem.productName}</p>
          <p>Cantidad: {invoiceItem.quantity}</p>
          <p>Precio: USD{invoiceItem.price}</p>
          <p>Precio de contado: USD{invoiceItem.productVariant.countedPrice}</p>
          <p>Precio: ${invoiceItem.productVariant.priceArs}</p>
          <p>
            Precio de contado: ${invoiceItem.productVariant.priceArsCounted}
          </p>
        </div>
      ))}
      {item.payments.map((payment, index) => (
        <div key={index} className="p-4 mt-4 bg-gray-700 rounded-md">
          <h3 className="font-bold text-lg mb-2">Pago {index + 1}</h3>
          <p>Método de pago: {payment.paymentMethod}</p>
          <p>Monto: {payment.amount}</p>
          <p>Detalles: {payment.details}</p>
        </div>
      ))}
    </div>
  );
};
