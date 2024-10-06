import Link from "next/link";
import { FaCalendarAlt, FaUser, FaReceipt, FaDollarSign } from "react-icons/fa";

import { InfoItem } from "@/components/info/InfoItem";
import { InvoiceItem } from "./InvoiceItem";
import { PaymentItem } from "./PaymentItem";

export const ItemInvoice: React.FC<{ item: Invoice }> = ({ item }) => {
  return (
    <div className="bg-custom-black-2 rounded-xl shadow-lg overflow-hidden transition duration-300 hover:shadow-xl">
      <div className="p-6">
        <Link
          className="text-2xl font-bold text-white-600 hover:text-blue-400 transition duration-200"
          href={`/invoice/${item.id}`}
        >
          <FaReceipt className="inline mr-2" />
          ID del comprobante: {item.id}
        </Link>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <InfoItem
            icon={<FaCalendarAlt />}
            label="Fecha"
            value={item.date.slice(0, 10)}
          />
          <InfoItem icon={<FaUser />} label="Cliente" value={item.client} />
        </div>
      </div>

      <div className="bg-custom-black p-6">
        <h3 className="text-xl font-semibold mb-4 text-white-600">
          Items de la Factura
        </h3>
        <div className="space-y-4">
          {item.invoiceItems.map((invoiceItem, index) => (
            <InvoiceItem key={index} item={invoiceItem} index={index} />
          ))}
        </div>
      </div>

      <div className="bg-custom-black p-6 mt-4">
        <h3 className="text-xl font-semibold mb-4 text-white-600">Pagos</h3>
        <div className="space-y-4">
          {item.payments.map((payment, index) => (
            <PaymentItem key={index} payment={payment} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};
