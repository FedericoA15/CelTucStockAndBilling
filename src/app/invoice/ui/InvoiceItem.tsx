import { InfoItem } from "@/components/info/InfoItem";
import { FaBox, FaTag, FaDollarSign } from "react-icons/fa";
import { MdSdStorage } from "react-icons/md";

export const InvoiceItem: React.FC<{ item: any; index: number }> = ({
  item,
  index,
}) => (
  <div className="grid grid-cols-1 sm:grid-cols-4 p-4 bg-white hover:bg-gray-50">
    <div className="col-span-1 font-semibold text-gray-700">
      Item {index + 1}: {item.productName}
    </div>
    <div className="col-span-1 text-gray-600 border-l border-gray-300 pl-4">
      Cantidad: {item.quantity}
    </div>
    <div className="col-span-1 text-gray-600 border-l border-gray-300 pl-4">
      USD {item.price.toFixed(2)}
    </div>
    <div className="col-span-1 text-gray-600 border-l border-gray-300 pl-4">
      ARS ${item.productVariant.priceArs.toFixed(2)}
    </div>
  </div>
);
