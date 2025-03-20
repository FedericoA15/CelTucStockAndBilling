import Link from "next/link";
import {
  FaUser,
  FaMobileAlt,
  FaCalendarAlt,
  FaComments,
  FaDollarSign,
  FaUserTie,
  FaTag,
} from "react-icons/fa";
import { ProductVariant } from "./ProductVariant";
import { InfoItem } from "@/components/info/InfoItem";

const formatDate = (dateString: string) => {
  const [year, month, day] = dateString.split("-");
  return `${day}-${month}-${year}`;
};
export const ItemVoucher: React.FC<{ item: Voucher }> = ({ item }) => {
  return (
    <div className="bg-custom-black-2 rounded-xl shadow-lg overflow-hidden transition duration-300 hover:shadow-xl">
      <div className="p-6">
        <Link
          className="text-2xl font-bold text-white-600 hover:text-blue-400 transition duration-200"
          href={`/sign/${item.id}`}
        >
          Comprobante: {item.id}
        </Link>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <InfoItem icon={<FaUser />} label="Cliente" value={item.client} />
          <InfoItem
            icon={<FaMobileAlt />}
            label="Equipo: "
            value={item.concept}
          />
          <InfoItem
            icon={<FaCalendarAlt />}
            label="Fecha: "
            value={formatDate(item.date)}
          />
          {/* <InfoItem
            icon={<FaComments />}
            label="Observaciones: "
            value={item.obs}
          /> */}
          <InfoItem
            icon={<FaDollarSign />}
            label="Abonado: "
            value={`USD ${item.sign}`}
          />
          <InfoItem icon={<FaUserTie />} label="Vendedor" value={item.user} />
          <InfoItem
            icon={<FaTag />}
            label="Precio: "
            value={`USD ${item.total}`}
          />
          <InfoItem
            icon={<FaTag />}
            label="Saldo restante: "
            value={`USD ${item.slope}`}
          />
        </div>
      </div>
    </div>
  );
};
