import Link from "next/link";
import {
  FaUser,
  FaMobileAlt,
  FaCalendarAlt,
  FaComments,
  FaDollarSign,
  FaUserTie,
  FaBox,
  FaBatteryFull,
  FaTag,
  FaInfoCircle,
  FaCheckCircle,
} from "react-icons/fa";
import { MdSdStorage } from "react-icons/md";

export const ItemVoucher: React.FC<{ item: Voucher }> = ({ item }) => {
  return (
    <div className="bg-custom-grey-2 text-custom-white p-6 my-4 relative w-full rounded-lg shadow-lg transition duration-300 transform hover:scale-105 hover:shadow-2xl">
      <Link
        className="font-bold text-2xl mb-6 block hover:text-custom-blue transition duration-200"
        href={`/voucher/${item.id}`}
      >
        Código del Voucher: {item.id}
      </Link>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <p className="flex items-center gap-2 mb-2">
          <FaUser className="text-custom-blue" />
          <span className="font-semibold">Cliente:</span> {item.client}
        </p>
        <p className="flex items-center gap-2 mb-2">
          <FaMobileAlt className="text-custom-green" />
          <span className="font-semibold">Equipo:</span> {item.concept}
        </p>
        <p className="flex items-center gap-2 mb-2">
          <FaCalendarAlt className="text-custom-cream" />
          <span className="font-semibold">Fecha:</span> {item.date.slice(0, 10)}
        </p>
        <p className="flex items-center gap-2 mb-2">
          <FaComments className="text-custom-white" />
          <span className="font-semibold">Observaciones:</span> {item.obs}
        </p>
        <p className="flex items-center gap-2 mb-2">
          <FaDollarSign className="text-custom-blue" />
          <span className="font-semibold">Método de Pago:</span>{" "}
          {item.paymentMethods}
        </p>
        <p className="flex items-center gap-2 mb-2">
          <FaUserTie className="text-custom-green" />
          <span className="font-semibold">Vendedor:</span> {item.user}
        </p>
      </div>

      {item.productVariants.map((productVariant, index) => (
        <div
          key={index}
          className="p-4 mt-4 bg-custom-grey rounded-md shadow-md transition duration-300 transform hover:scale-105 hover:shadow-lg"
        >
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <FaBox className="text-custom-green" /> Producto
          </h3>
          <p className="flex items-center gap-2 mb-2">
            <FaMobileAlt className="text-custom-blue" />
            <span className="font-semibold">Submodelo:</span>{" "}
            {productVariant.subModel}
          </p>
          <p className="flex items-center gap-2 mb-2">
            <FaBatteryFull className="text-custom-cream" />
            <span className="font-semibold">Batería:</span>{" "}
            {productVariant.batteryCapacity}
          </p>
          <p className="flex items-center gap-2 mb-2">
            <FaTag className="text-custom-blue" />
            <span className="font-semibold">Precio:</span> USD{" "}
            {productVariant.price}
          </p>
          <p className="flex items-center gap-2 mb-2">
            <MdSdStorage className="text-custom-black" />
            <span className="font-semibold">Capacidad:</span>{" "}
            {productVariant.capacity}
          </p>
          <p className="flex items-center gap-2 mb-2">
            <FaInfoCircle className="text-custom-cream" />
            <span className="font-semibold">Detalles:</span>{" "}
            {productVariant.details}
          </p>
          <p className="flex items-center gap-2 mb-2">
            <FaCheckCircle className="text-custom-green" />
            <span className="font-semibold">Estado:</span>{" "}
            {productVariant.state}
          </p>
        </div>
      ))}
    </div>
  );
};
