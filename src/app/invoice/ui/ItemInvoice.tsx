import React from "react";
import Link from "next/link";
import { FaCalendarAlt, FaUser, FaReceipt, FaDollarSign } from "react-icons/fa";
import { PaymentItem } from "./PaymentItem";

export const ItemInvoice: React.FC<{ item: Invoice }> = ({ item }) => {
  return (
    <div className="border border-gray-700 bg-custom-black-2 shadow overflow-hidden transition duration-300 hover:shadow-lg rounded-lg flex-1">
      <div className="grid grid-cols-1 md:grid-cols-3 bg-custom-black-2 border-b border-gray-700">
        <Link
          className="p-4 font-bold text-blue-400 hover:text-blue-500 transition duration-200 underline"
          href={`/invoice/${item.id}`}
        >
          <FaReceipt className="inline mr-2" />
          ID del comprobante: {item.id}
        </Link>
        <div className="p-4 border-l border-gray-700 text-white-600">
          <FaCalendarAlt className="inline mr-2 text-gray-400" />
          {item.date.slice(0, 10)}
        </div>
        <div className="p-4 border-l border-gray-700 text-white-600">
          <FaUser className="inline mr-2 text-gray-400" />
          {item.client}
        </div>
      </div>

      <div className="mt-4">
        <h3 className="bg-custom-black text-white-600 font-semibold p-4 border-b border-gray-700">
          Items de la Factura
        </h3>
        <div className="divide-y divide-gray-700">
          {item.invoiceItems.map((invoiceItem, index) => (
            <InvoiceItem key={index} item={invoiceItem} index={index} />
          ))}
        </div>
      </div>

      <div className="mt-4">
        <h3 className="bg-custom-black text-white-600 font-semibold p-4 border-b border-gray-700">
          Pagos
        </h3>
        <div className="divide-y divide-gray-700">
          {item.payments.map((payment, index) => (
            <PaymentItem key={index} payment={payment} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export const InvoiceItem: React.FC<{ item: any; index: number }> = ({
  item,
  index,
}) => (
  <div className="grid grid-cols-1 sm:grid-cols-4 p-4 bg-custom-black-2 hover:bg-custom-black">
    <div className="col-span-1 font-semibold text-white-600">
      Item {index + 1}: {item.productName}
    </div>
    <div className="col-span-1 text-gray-400 border-l border-gray-700 pl-4">
      Cantidad: {item.quantity}
    </div>
    <div className="col-span-1 text-gray-400 border-l border-gray-700 pl-4">
      USD {item.price.toFixed(2)}
    </div>
    <div className="col-span-1 text-gray-400 border-l border-gray-700 pl-4">
      ARS ${item.productVariant.priceArs.toFixed(2)}
    </div>
  </div>
);
