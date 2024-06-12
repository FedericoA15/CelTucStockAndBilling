import Link from "next/link";

export const ItemInvoice: React.FC<{ item: Invoice }> = ({ item }) => {
  return (
    <div className=" text-white p-6 my-4 rounded-md w-full">
      <Link className="font-bold text-2xl mb-4" href={`/invoice/${item.id}`}>
        ID de la factura: {item.id}
      </Link>
      <p className="mb-2">Email del usuario: {item.userEmail}</p>
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
          <p>Precio de contado: ${invoiceItem.productVariant.priceArsCounted}</p>
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
