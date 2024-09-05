import Link from "next/link";
import {
  FaUser,
  FaBox,
  FaCalendarAlt,
  FaComments,
  FaDollarSign,
  FaInfoCircle,
  FaTag,
  FaBatteryFull,
} from "react-icons/fa";

export const ItemRepair: React.FC<{ item: Voucher }> = ({ item }) => {
  return (
    <div className="bg-custom-grey-2 text-custom-white p-6 my-4 rounded-lg shadow-lg transition duration-300 transform hover:scale-105 hover:shadow-2xl">
      <Link
        className="font-bold text-2xl mb-6 block hover:text-custom-blue transition duration-200"
        href={`/repair/${item.id}`}
      >
        Código del Voucher: {item.id}
      </Link>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <p className="flex items-center gap-2 mb-2">
          <FaUser className="text-custom-blue" />
          <span className="font-semibold">Cliente:</span> {item.client}
        </p>
        <p className="flex items-center gap-2 mb-2">
          <FaBox className="text-custom-green" />
          <span className="font-semibold">Equipo:</span> {item.equipment}
        </p>
        <p className="flex items-center gap-2 mb-2">
          <FaCalendarAlt className="text-custom-cream" />
          <span className="font-semibold">Fecha:</span> {item.date.slice(0, 10)}
        </p>
        <p className="flex items-center gap-2 mb-2">
          <FaComments className="text-custom-grey" />
          <span className="font-semibold">Diagnóstico:</span> {item.diagnosis}
        </p>
        <p className="flex items-center gap-2 mb-2">
          <FaDollarSign className="text-custom-blue" />
          <span className="font-semibold">Presupuesto:</span> USD {item.budget}
        </p>
        <p className="flex items-center gap-2 mb-2">
          <FaTag className="text-custom-cream" />
          <span className="font-semibold">Seña:</span> {item.sign}
        </p>
        <p className="flex items-center gap-2 mb-2">
          <FaInfoCircle className="text-custom-grey" />
          <span className="font-semibold">Observaciones:</span> {item.obs}
        </p>
        <p className="flex items-center gap-2 mb-2">
          <FaInfoCircle className="text-custom-grey" />
          <span className="font-semibold">Pendiente:</span> {item.slope}
        </p>
      </div>
    </div>
  );
};
