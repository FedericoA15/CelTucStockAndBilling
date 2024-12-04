import { motion } from "framer-motion";
import { FaCalendarAlt, FaUser, FaReceipt } from "react-icons/fa";
import { PaymentItem } from "./PaymentItem";

export const ItemInvoice: React.FC<{ item: Invoice }> = ({ item }) => {
  return (
    // <div className="border border-gray-700 bg-custom-black-2 shadow overflow-hidden transition duration-300 hover:shadow-lg rounded-lg flex-1">
    // <div className="grid grid-cols-1 md:grid-cols-3 bg-custom-black-2 border-b border-gray-700">
    //   <Link
    //     className="p-4 font-bold text-blue-400 hover:text-blue-500 transition duration-200 underline"
    //     href={`/invoice/${item.id}`}
    //   >

    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="border border-gray-700 bg-custom-black-2 shadow overflow-hidden transition duration-300 hover:shadow-lg rounded-lg flex-1"
    >
      <div className="p-4">
        <h2 className="text-2xl font-bold text-white mb-4">
          <FaReceipt className="inline mr-2" />
          ID Comprobante: {item.id}
        </h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-gray-400">
            <FaCalendarAlt className="inline mr-2" /> Fecha:{" "}
            {item.date.slice(0, 10)}
          </div>
          <div className="text-gray-400">
            <FaUser className="inline mr-2" /> Cliente: {item.client}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-700 text-sm">
            <thead className="bg-custom-black">
              <tr>
                <th className="px-4 py-2 text-left text-white">Producto</th>
                <th className="px-4 py-2 text-left text-white">Cantidad</th>
                <th className="px-4 py-2 text-left text-white">USD</th>
                <th className="px-4 py-2 text-left text-white">ARS</th>
              </tr>
            </thead>
            <tbody className="bg-custom-black-2 divide-y divide-gray-700">
              {item.invoiceItems.map((invoiceItem, index) => (
                <InvoiceItem key={index} item={invoiceItem} />
              ))}
            </tbody>
          </table>
        </div>
        <h3 className="text-xl font-semibold text-white mt-6">Pagos</h3>
        <div className="overflow-x-auto mt-2">
          <table className="min-w-full divide-y divide-gray-700 text-sm">
            <thead className="bg-custom-black">
              <tr>
                <th className="px-4 py-2 text-left text-white">Pago</th>
                <th className="px-4 py-2 text-left text-white">Método</th>
                <th className="px-4 py-2 text-left text-white">Monto</th>
                <th className="px-4 py-2 text-left text-white">Detalles</th>
              </tr>
            </thead>
            <tbody className="bg-custom-black-2 divide-y divide-gray-700">
              {item.payments.map((payment, index) => (
                <PaymentItem key={index} payment={payment} index={index} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export const InvoiceItem: React.FC<{ item: any }> = ({ item }) => (
  <tr className="hover:bg-custom-black">
    <td className="px-4 py-2 text-white">{item.productName}</td>
    <td className="px-4 py-2 text-gray-400">{item.quantity}</td>
    <td className="px-4 py-2 text-gray-400">USD {item.price.toFixed(2)}</td>
    <td className="px-4 py-2 text-gray-400">
      ARS ${item.productVariant.priceArs.toFixed(2)}
    </td>
  </tr>
);
