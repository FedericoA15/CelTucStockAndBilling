import Link from "next/link";
import {
  FaCalendarAlt,
  FaUser,
  FaDollarSign,
  FaReceipt,
  FaTag,
  FaBox,
  FaInfoCircle,
} from "react-icons/fa";
import { MdSdStorage } from "react-icons/md";

export const ItemInvoice: React.FC<{ item: Invoice }> = ({ item }) => {
  return (
    <div className="bg-custom-grey-2 text-custom-white p-6 my-4 relative w-full rounded-lg shadow-lg transition duration-300 transform hover:scale-105 hover:shadow-2xl">
      <Link
        className="font-bold text-2xl mb-6 block hover:text-custom-blue transition duration-200"
        href={`/invoice/${item.id}`}
      >
        <FaReceipt className="inline mr-2" />
        ID del comprobante: {item.id}
      </Link>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <p className="flex items-center gap-2 mb-2">
          <FaCalendarAlt className="text-custom-cream" />
          <span className="font-semibold">Fecha:</span> {item.date.slice(0, 10)}
        </p>
        <p className="flex items-center gap-2 mb-2">
          <FaUser className="text-custom-blue" />
          <span className="font-semibold">Cliente:</span> {item.client}
        </p>
      </div>

      {item.invoiceItems.map((invoiceItem, index) => (
        <div
          key={index}
          className="p-4 mt-4 bg-custom-grey text-custom-white rounded-md shadow-md transition duration-300 transform hover:scale-105 hover:shadow-lg"
        >
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <FaBox className="text-custom-green" /> Item de la factura{" "}
            {index + 1}
          </h3>
          <p className="flex items-center gap-2 mb-2">
            <FaTag className="text-custom-blue" />
            <span className="font-semibold">Nombre del producto:</span>{" "}
            {invoiceItem.productName}
          </p>
          <p className="flex items-center gap-2 mb-2">
            <FaTag className="text-custom-blue" />
            <span className="font-semibold">Cantidad:</span>{" "}
            {invoiceItem.quantity}
          </p>
          <p className="flex items-center gap-2 mb-2">
            <FaDollarSign className="text-custom-cream" />
            <span className="font-semibold">Precio:</span> USD{" "}
            {invoiceItem.price.toFixed(2)}
          </p>
          <p className="flex items-center gap-2 mb-2">
            <FaDollarSign className="text-custom-cream" />
            <span className="font-semibold">Precio de contado:</span> USD{" "}
            {invoiceItem.productVariant.countedPrice.toFixed(2)}
          </p>
          <p className="flex items-center gap-2 mb-2">
            <MdSdStorage className="text-custom-black" />
            <span className="font-semibold">Precio ARS:</span> $
            {invoiceItem.productVariant.priceArs.toFixed(2)}
          </p>
          <p className="flex items-center gap-2 mb-2">
            <MdSdStorage className="text-custom-black" />
            <span className="font-semibold">Precio ARS contado:</span> $
            {invoiceItem.productVariant.priceArsCounted.toFixed(2)}
          </p>
        </div>
      ))}

      {item.payments.map((payment, index) => (
        <div
          key={index}
          className="p-4 mt-4 bg-custom-grey text-custom-white rounded-md shadow-md transition duration-300 transform hover:scale-105 hover:shadow-lg"
        >
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <FaDollarSign className="text-custom-green" /> Pago {index + 1}
          </h3>
          <p className="flex items-center gap-2 mb-2">
            <FaDollarSign className="text-custom-blue" />
            <span className="font-semibold">Método de pago:</span>{" "}
            {payment.paymentMethod}
          </p>
          <p className="flex items-center gap-2 mb-2">
            <FaDollarSign className="text-custom-cream" />
            <span className="font-semibold">Monto:</span> $
            {payment.amount.toFixed(2)}
          </p>
          <p className="flex items-center gap-2 mb-2">
            <FaInfoCircle className="text-custom-white" />
            <span className="font-semibold">Detalles:</span> {payment.details}
          </p>
        </div>
      ))}
    </div>
  );
};
