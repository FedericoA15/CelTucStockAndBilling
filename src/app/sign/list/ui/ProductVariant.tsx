import { InfoItem } from "@/components/info/InfoItem";
import {
  FaBatteryFull,
  FaCheckCircle,
  FaInfoCircle,
  FaTag,
} from "react-icons/fa";
import { MdSdStorage } from "react-icons/md";

export const ProductVariant: React.FC<{ variant: any }> = ({ variant }) => (
  <div className="bg-custom-grey p-4 rounded-lg shadow">
    <h4 className="font-semibold text-lg mb-2 text-white-600">
      {variant.subModel}
    </h4>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
      <InfoItem
        icon={<FaBatteryFull />}
        label="Batería: "
        value={variant.batteryCapacity}
      />
      <InfoItem
        icon={<MdSdStorage />}
        label="Capacidad: "
        value={variant.capacity}
      />
      <InfoItem
        icon={<FaInfoCircle />}
        label="Detalles: "
        value={variant.details}
      />
      <InfoItem
        icon={<FaCheckCircle />}
        label="Estado: "
        value={variant.state}
      />
    </div>
  </div>
);
