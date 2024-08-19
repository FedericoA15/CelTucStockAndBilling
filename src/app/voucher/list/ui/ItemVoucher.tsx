import Link from "next/link";

export const ItemVoucher: React.FC<{ item: Voucher }> = ({ item }) => {
  return (
    <div className="bg-custom-grey-2 text-gray-200 p-4 my-4 relative w-full rounded-md">
      <Link
        className="font-bold text-2xl mb-4 block hover:text-blue-500"
        href={`/voucher/${item.id}`}
      >
        Código del Voucher: {item.id}
      </Link>
      <p className="mb-2">Cliente: {item.client}</p>
      <p className="mb-2">Equipo: {item.equipment}</p>
      <p className="mb-2">Fecha: {item.date.slice(0, 10)}</p>
      <p className="mb-2">Observaciones: {item.obs}</p>
      <p className="mb-2">Método de Pago: {item.paymentMethods}</p>
      <p className="mb-2">Vendedor: {item.user}</p>
      {item.productVariants.map((productVariant, index) => (
        <div key={index} className="p-4 mt-4 bg-gray-700 rounded-md">
          <h3 className="font-bold text-lg mb-2">Producto</h3>
          <p>Submodelo: {productVariant.subModel}</p>
          <p>Precio: USD{productVariant.price}</p>
          <p>Detalles: {productVariant.details}</p>
          <p>Estado: {productVariant.state}</p>
        </div>
      ))}
    </div>
  );
};
