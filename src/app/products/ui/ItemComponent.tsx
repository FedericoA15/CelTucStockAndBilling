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
        <div className="mt-2 overflow-auto">
          <table className="min-w-full divide-y divide-gray-600">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-bold text-white">
                  Nombre
                </th>
                <th className="px-4 py-2 text-left text-sm font-bold text-white">
                  Descripción
                </th>
                <th className="px-4 py-2 text-left text-sm font-bold text-white">
                  Precio Lista
                </th>
                <th className="px-4 py-2 text-left text-sm font-bold text-white">
                  Precio Contado
                </th>
                <th className="px-4 py-2 text-left text-sm font-bold text-white">
                  Precio Lista USD
                </th>
                <th className="px-4 py-2 text-left text-sm font-bold text-white">
                  Precio Contado USD
                </th>
                <th className="px-4 py-2 text-left text-sm font-bold text-white">
                  Stock
                </th>
                <th className="px-4 py-2 text-left text-sm font-bold text-white">
                  Codigo
                </th>
              </tr>
            </thead>
            <tbody className="bg-custom-grey divide-y divide-gray-600">
              {item.variants.map((variant) => (
                <tr key={variant.id} className="hover:bg-gray-700">
                  <td className="px-4 py-2">{renderValue(variant.subModel)}</td>
                  <td className="px-4 py-2">{renderValue(variant.details)}</td>
                  <td className="px-4 py-2">
                    ARS {renderValue(variant.priceArs)}
                  </td>
                  <td className="px-4 py-2">
                    ARS {renderValue(variant.priceArsCounted)}
                  </td>
                  <td className="px-4 py-2">
                    USD {renderValue(variant.price)}
                  </td>
                  <td className="px-4 py-2">
                    USD {renderValue(variant.countedPrice)}
                  </td>
                  <td className="px-4 py-2">{renderValue(variant.stock)}</td>
                  <td className="px-4 py-2">
                    {renderValue(variant.productCodes.join(", "))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
