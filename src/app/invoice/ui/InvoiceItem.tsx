import { InfoItem } from "@/components/info/InfoItem";
import { FaBox, FaTag, FaDollarSign } from "react-icons/fa";
import { MdSdStorage } from "react-icons/md";

export const InvoiceItem: React.FC<{ item: any; index: number }> = ({
  item,
  index,
}) => (
  <div className="bg-custom-grey p-4 rounded-lg shadow">
    <h4 className="font-semibold text-lg mb-2 text-white-600">
      <FaBox className="inline mr-2 text-custom-green" />
      Item {index + 1}
    </h4>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
      <InfoItem icon={<FaTag />} label="Producto" value={item.productName} />
      <InfoItem icon={<FaTag />} label="Cantidad" value={item.quantity} />
      <InfoItem
        icon={<FaDollarSign />}
        label="Precio"
        value={`USD ${item.price.toFixed(2)}`}
      />
      <InfoItem
        icon={<MdSdStorage />}
        label="Precio ARS"
        value={`$ ${item.productVariant.priceArs.toFixed(2)}`}
      />
    </div>
  </div>
);
