import { PlusButton } from "@/components/buttons/Buttons";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/utils/cartContext";
import EditVariantModal from "@/components/editVariant/editVariantModal";

export const ItemComponent: React.FC<{ item: Item }> = ({ item }) => {
  const [showVariants, setShowVariants] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVariant, setCurrentVariant] = useState(null);
  const router = useRouter();
  const { addToCart } = useCart();

  const redirectProductVariant = () => {
    router.push("/products/productvariant/new");
  };

  const openModal = (variant: any) => {
    setCurrentVariant(variant);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentVariant(null);
  };

  return (
    <div className="bg-custom-grey-2 text-gray-200 p-4 my-4 relative w-full">
      <h2 className="font-bold text-xl">{item.name}</h2>
      <p>Stock General: {item.generalStock}</p>
      <p>Codigo: {item.code}</p>
      {item.variants.length > 0 && (
        <button
          className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setShowVariants(!showVariants)}
        >
          {showVariants ? "Ocultar" : "Mostrar"} Variantes
        </button>
      )}
      <div className="absolute right-0 top-0 flex items-center space-x-2">
        <p>Nueva variante</p>
        <PlusButton onClick={redirectProductVariant} />
      </div>
      {showVariants &&
        item.variants.map((variant) => (
          <div
            key={variant.id}
            className="mt-2 p-2 border-2 border-gray-600 bg-gray-600 text-gray-200 mb-4"
          >
            <p>----------</p>
            {/* <p>Id: {variant.id}</p> */}
            <p>Modelo: {variant.subModel}</p>
            <p>Estado: {variant.state}</p>
            <p>Capacidad: {variant.capacity}</p>
            <p>Color: {variant.color}</p>
            <p>Capacidad de Batería: {variant.batteryCapacity}</p>
            <p>Stock: {variant.stock}</p>
            <p>Precio: {variant.price}</p>
            <p>PrecioArs: {variant.priceArs}</p>
            <p>Sucursal: {variant.branchName}</p>
            <p>Detalles: {variant.details}</p>
            <p>Codigo: {variant.productCodes.join(", ")}</p>
            <button
              className="mt-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => addToCart({ variant, itemName: item.name })}
            >
              Agregar a la factura
            </button>
            <button
              className="mt-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => openModal(variant)}
            >
              Modificar producto
            </button>
            <p>----------</p>
          </div>
        ))}
      {isModalOpen && currentVariant && (
        <EditVariantModal isOpen={isModalOpen} onClose={closeModal} variant={currentVariant} />
      )}
    </div>
  );
};
