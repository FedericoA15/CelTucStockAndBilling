import { FaDollarSign, FaInfoCircle } from "react-icons/fa";

export const PaymentItem: React.FC<{ payment: any; index: number }> = ({
  payment,
  index,
}) => (
  <tr className="hover:bg-custom-black">
    <td className="px-4 py-2 text-white">Pago {index + 1}</td>
    <td className="px-4 py-2 text-gray-400">{payment.paymentMethod}</td>
    <td className="px-4 py-2 text-gray-400">
      ARS ${payment.amount.toFixed(2)}
    </td>
    <td className="px-4 py-2 text-gray-400">{payment.details}</td>
  </tr>
);
