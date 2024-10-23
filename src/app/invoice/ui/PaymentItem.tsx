import { InfoItem } from "@/components/info/InfoItem";
import { FaDollarSign, FaInfoCircle } from "react-icons/fa";

export const PaymentItem: React.FC<{ payment: any; index: number }> = ({
  payment,
  index,
}) => (
  <div className="grid grid-cols-1 sm:grid-cols-3 p-4 bg-custom-black-2 hover:bg-custom-black border-b border-gray-700">
    <div className="col-span-1 font-semibold text-white-600">
      <FaDollarSign className="inline mr-2 text-custom-green" />
      Pago {index + 1}
    </div>
    <div className="col-span-1 text-gray-400 border-l border-gray-700 pl-4">
      <FaDollarSign className="inline mr-1 text-gray-400" />
      Método de Pago: {payment.paymentMethod}
    </div>
    <div className="col-span-1 text-gray-400 border-l border-gray-700 pl-4">
      <FaDollarSign className="inline mr-1 text-gray-400" />
      Monto: ${payment.amount.toFixed(2)}
    </div>
    <div className="col-span-1 text-gray-400 border-l border-gray-700 pl-4">
      <FaInfoCircle className="inline mr-1 text-gray-400" />
      Detalles: {payment.details}
    </div>
  </div>
);
