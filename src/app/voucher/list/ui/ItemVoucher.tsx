import Link from "next/link";
import {
  FaUser,
  FaMobileAlt,
  FaCalendarAlt,
  FaComments,
  FaDollarSign,
  FaUserTie,
} from "react-icons/fa";
import { ProductVariant } from "./ProductVariant";
import { InfoItem } from "@/components/info/InfoItem";

export const ItemVoucher: React.FC<{ item: Voucher }> = ({ item }) => {
  return (
    <div className="bg-custom-black-2 rounded-xl shadow-lg overflow-hidden transition duration-300 hover:shadow-xl">
      <div className="p-6">
        <Link
          className="text-2xl font-bold text-white-600 hover:text-blue-400 transition duration-200"
          href={`/voucher/${item.id}`}
        >
          Comprobante: {item.id}
        </Link>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <InfoItem icon={<FaUser />} label="Cliente" value={item.client} />
          <InfoItem
            icon={<FaMobileAlt />}
            label="Equipo"
            value={item.concept}
          />
          <InfoItem
            icon={<FaCalendarAlt />}
            label="Fecha"
            value={item.date.slice(0, 10)}
          />
          <InfoItem
            icon={<FaComments />}
            label="Observaciones"
            value={item.obs}
          />
          <InfoItem
            icon={<FaDollarSign />}
            label="Método de Pago"
            value={item.paymentMethods}
          />
          <InfoItem icon={<FaUserTie />} label="Vendedor" value={item.user} />
        </div>
      </div>
      <div className="bg-custom-black p-6">
        <h3 className="text-xl font-semibold mb-4 text-white-600">Productos</h3>
        <div className="space-y-4">
          {item.productVariants.map((productVariant, index) => (
            <ProductVariant key={index} variant={productVariant} />
          ))}
        </div>
      </div>
    </div>
  );
};
