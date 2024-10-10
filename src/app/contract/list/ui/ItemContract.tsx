import { InfoItem } from "@/components/info/InfoItem";
import Link from "next/link";

export const ItemContract: React.FC<{ item: Voucher }> = ({ item }) => {
  return (
    <div className="bg-custom-black-2 rounded-xl shadow-lg overflow-hidden transition duration-300 hover:shadow-xl">
      <div className="p-6">
        <Link
          className="font-bold text-2xl mb-4 block text-white hover:text-blue-400 transition duration-200"
          href={`/contract/${item.id}`}
        >
          Código del Voucher: {item.id}
        </Link>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <InfoItem
            icon={<span className="text-custom-blue">👤</span>}
            label="Cliente"
            value={item.client}
          />
          <InfoItem
            icon={<span className="text-custom-green">🏷️</span>}
            label="Marca"
            value={item.brand}
          />
          <InfoItem
            icon={<span className="text-custom-cream">📱</span>}
            label="Modelo"
            value={item.model}
          />
          <InfoItem
            icon={<span className="text-custom-cream">📅</span>}
            label="Fecha"
            value={item.date.slice(0, 10)}
          />
          <InfoItem
            icon={<span className="text-custom-grey">🔑</span>}
            label="Imei"
            value={item.imei}
          />
          <InfoItem
            icon={<span className="text-custom-grey">🔑</span>}
            label="Imei 2"
            value={item.imei2}
          />
          <InfoItem
            icon={<span className="text-custom-blue">👨‍💼</span>}
            label="Vendedor"
            value={item.reception}
          />
          <InfoItem
            icon={<span className="text-custom-grey">📝</span>}
            label="Observaciones"
            value={item.obs}
          />
          <InfoItem
            icon={<span className="text-custom-blue">💰</span>}
            label="Total"
            value={`USD ${item.total}`}
          />
        </div>
      </div>
    </div>
  );
};
