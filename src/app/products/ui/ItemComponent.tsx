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

  const renderValue = (value: any) =>
    value === null || value === "" ? "-" : value;

  return (
    <div className="bg-custom-grey-2 text-gray-200 p-4 my-4 relative w-full">
      <h2 className="font-bold text-xl">{item.name}</h2>
      <ul className="list-none ">
        <li>Stock General: {renderValue(item.generalStock)}</li>
        <li>Codigo: {renderValue(item.code)}</li>
        {isClient && role === "ADMIN" && (
          <div className="flex items-center space-x-2 my-2">
            <PlusButton
              onClick={redirectProductVariant}
              tittled="Nueva Variante"
            />
          </div>
        )}
      </ul>
      {item.variants.length > 0 && (
        <button
          className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setShowVariants(!showVariants)}
        >
          {showVariants ? "Ocultar" : "Mostrar"} Variantes
        </button>
      )}
      {showVariants && (
        <div className="mt-2">
          <ul className="list-none">
            <li className="font-bold grid grid-cols-6 gap-2">
              <span>Modelo</span>
              <span>Stock</span>
              <span>Estado</span>
              <span>Capacidad</span>
              <span>Color</span>
              <span>Precio USD</span>
              <span>Precio contado USD</span>
              <span>Precio ARS</span>
              <span>Precio contado ARS</span>
              <span>Sucursal</span>
              <span>Detalles</span>
              <span>Codigos</span>
            </li>
            {item.variants.map((variant) => (
              <li
                key={variant.id}
                className="grid grid-cols-6 gap-2 border-b border-gray-600 py-2"
              >
                <span>{renderValue(variant.subModel)}</span>
                <span>{renderValue(variant.stock)}</span>
                <span>{renderValue(variant.state)}</span>
                <span>{renderValue(variant.capacity)}</span>
                <span>{renderValue(variant.color)}</span>
                <span>USD {renderValue(variant.price)}</span>
                <span>USD {renderValue(variant.countedPrice)}</span>
                <span>${renderValue(variant.priceArs)}</span>
                <span>${renderValue(variant.priceArsCounted)}</span>
                <span>{renderValue(variant.branchName)}</span>
                <span>{renderValue(variant.details)}</span>
                <span>{renderValue(variant.productCodes.join(", "))}</span>
                <span className="flex justify-stretch space-x-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                    onClick={() => addToCart({ variant, itemName: item.name })}
                  >
                    Agregar
                  </button>
                  {isClient && role === "ADMIN" && (
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                      onClick={() => openModal(variant)}
                    >
                      Modificar
                    </button>
                  )}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
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
