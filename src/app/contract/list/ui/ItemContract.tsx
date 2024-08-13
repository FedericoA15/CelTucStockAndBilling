import Link from "next/link";

export const ItemContract: React.FC<{ item: Voucher }> = ({ item }) => {
  return (
    <div className="bg-custom-grey-2 text-gray-200 p-4 my-4 relative w-full rounded-md">
      <Link
        className="font-bold text-2xl mb-4 block hover:text-blue-500"
        href={`/contract/${item.id}`}
      >
        Código del Voucher: {item.id}
      </Link>
      <p className="mb-2">Cliente: {item.client}</p>
      <p className="mb-2">Marca: {item.brand}</p>
      <p className="mb-2">Modelo: {item.model}</p>
      <p className="mb-2">Fecha: {item.date.slice(0, 10)}</p>
      <p className="mb-2">Imei: {item.imei}</p>
      <p className="mb-2">Imei 2: {item.imei2}</p>
      <p className="mb-2">Vendedor: {item.reception}</p>
      <p className="mb-2">Observaciones: {item.obs}</p>
      <p className="mb-2">Total: {item.total}</p>
    </div>
  );
};
