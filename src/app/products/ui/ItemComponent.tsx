import { PlusButton } from "@/components/buttons/Buttons";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useCart } from "@/utils/cartContext";
import EditVariantModal from "@/components/editVariant/editVariantModal";
import Cookies from "js-cookie";

export const ItemComponent: React.FC<{ item: Item }> = ({ item }) => {
  const [showVariants, setShowVariants] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVariant, setCurrentVariant] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const { addToCart } = useCart();
  const router = useRouter();
  const role = Cookies.get("roles");

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

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="bg-custom-grey-2 text-gray-200 p-4 my-4 relative w-full">
      <h2 className="font-bold text-xl">{item.name}</h2>
      <p>Stock General: {item.generalStock}</p>
      <p>Codigo: {item.code}</p>
      {isClient && role === "ADMIN" && (
        <div className=" top-0 flex items-center space-x-2">
          <PlusButton
            onClick={redirectProductVariant}
            tittled="Nueva Variante"
          />
        </div>
      )}
      {item.variants.length > 0 && (
        <button
          className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setShowVariants(!showVariants)}
        >
          {showVariants ? "Ocultar" : "Mostrar"} Variantes
        </button>
      )}
      {showVariants &&
        item.variants.map((variant) => (
          <div
            key={variant.id}
            className="mt-2 p-2 border-2 border-gray-600 bg-gray-600 text-gray-200 mb-4"
          >
            <p>----------</p>
            <p>Modelo: {variant.subModel}</p>
            <p>Estado: {variant.state}</p>
            <p>Capacidad: {variant.capacity}</p>
            <p>Color: {variant.color}</p>
            <p>Capacidad de Batería: {variant.batteryCapacity}</p>
            <p>Stock: {variant.stock}</p>
            <p>Precio USD: USD{variant.price}</p>
            <p>Precio de contado USD: USD{variant.countedPrice}</p>
            <p>Precio Ars: ${variant.priceArs}</p>
            <p>Precio contado Ars: ${variant.priceArsCounted}</p>
            <p>Sucursal: {variant.branchName}</p>
            <p>Detalles: {variant.details}</p>
            <p>Codigo: {variant.productCodes.join(", ")}</p>
            <button
              className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-2"
              onClick={() => addToCart({ variant, itemName: item.name })}
            >
              Agregar al comprobante
            </button>
            {isClient && role === "ADMIN" && (
              <button
                className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => openModal(variant)}
              >
                Modificar producto
              </button>
            )}
            <p>----------</p>
          </div>
        ))}
      {isModalOpen && currentVariant && (
        <EditVariantModal
          isOpen={isModalOpen}
          onClose={closeModal}
          variant={currentVariant}
        />
      )}
    </div>
  );
};
