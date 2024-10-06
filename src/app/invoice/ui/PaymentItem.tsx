import { InfoItem } from "@/components/info/InfoItem";
import { FaDollarSign, FaInfoCircle } from "react-icons/fa";

export const PaymentItem: React.FC<{ payment: any; index: number }> = ({
  payment,
  index,
}) => (
  <div className="bg-custom-grey p-4 rounded-lg shadow">
    <h4 className="font-semibold text-lg mb-2 text-white-600">
      <FaDollarSign className="inline mr-2 text-custom-green" />
      Pago {index + 1}
    </h4>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
      <InfoItem
        icon={<FaDollarSign />}
        label="Método de Pago"
        value={payment.paymentMethod}
      />
      <InfoItem
        icon={<FaDollarSign />}
        label="Monto"
        value={`$ ${payment.amount.toFixed(2)}`}
      />
      <InfoItem
        icon={<FaInfoCircle />}
        label="Detalles"
        value={payment.details}
      />
    </div>
  </div>
);
