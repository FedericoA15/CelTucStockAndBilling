import Link from "next/link";

export const ItemRepair: React.FC<{ item: Voucher }> = ({ item }) => {
  return (
    <div className="bg-custom-grey-2 text-gray-200 p-4 my-4 relative w-full rounded-md">
      <Link
        className="font-bold text-2xl mb-4 block hover:text-blue-500"
        href={`/repair/${item.id}`}
      >
        Código del Voucher: {item.id}
      </Link>
      <p className="mb-2">Cliente: {item.client}</p>
      <p className="mb-2">Equipo: {item.equipment}</p>
      <p className="mb-2">Fecha: {item.date.slice(0, 10)}</p>
      <p className="mb-2">Diagnóstico: {item.diagnosis}</p>
      <p className="mb-2">Observaciones: {item.obs}</p>
      <p className="mb-2">Método de Pago: {item.paymentMethods}</p>
      <p className="mb-2">Recepcion: {item.reception}</p>
      <p className="mb-2">Presupuesto: {item.budget}</p>
      <p className="mb-2">Seña: {item.sign}</p>
      <p className="mb-2">Pendiente: {item.slope}</p>
    </div>
  );
};
