import { InfoItem } from "@/components/info/InfoItem";
import Link from "next/link";
import {
  FaUser,
  FaBox,
  FaCalendarAlt,
  FaComments,
  FaDollarSign,
  FaInfoCircle,
  FaTag,
} from "react-icons/fa";

const formatDate = (dateString: string) => {
  const [year, month, day] = dateString.split("-");
  return `${day}-${month}-${year}`;
};
export const ItemRepair: React.FC<{ item: Voucher }> = ({ item }) => {
  return (
    <div className="bg-custom-black-2 rounded-xl shadow-lg overflow-hidden transition duration-300 hover:shadow-xl">
      <div className="p-6">
        <Link
          className="text-2xl font-bold text-white-600 hover:text-blue-400 transition duration-200"
          href={`/repair/${item.id}`}
        >
          Código del Voucher: {item.id}
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <InfoItem
            icon={<FaUser className="text-custom-blue" />}
            label="Cliente"
            value={item.client}
          />
          <InfoItem
            icon={<FaBox className="text-custom-green" />}
            label="Equipo"
            value={item.equipment}
          />
          <InfoItem
            icon={<FaCalendarAlt />}
            label="Fecha"
            value={formatDate(item.date)}
          />
          <InfoItem
            icon={<FaComments className="text-custom-grey" />}
            label="Diagnóstico"
            value={item.diagnosis}
          />
          <InfoItem
            icon={<FaDollarSign className="text-custom-blue" />}
            label="Presupuesto"
            value={`${item.budget}`}
          />
          <InfoItem
            icon={<FaTag className="text-custom-cream" />}
            label="Seña"
            value={item.sign}
          />
          <InfoItem
            icon={<FaInfoCircle className="text-custom-grey" />}
            label="Observaciones"
            value={item.obs}
          />
          <InfoItem
            icon={<FaInfoCircle className="text-custom-grey" />}
            label="Pendiente"
            value={item.slope}
          />
        </div>
      </div>
    </div>
  );
};
