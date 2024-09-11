import { useState, useEffect } from "react";
import { useCart } from "@/utils/cartContext";
import EditVariantModal from "@/components/editVariant/editVariantModal";
import Cookies from "js-cookie";
import { FaPlus, FaEdit, FaCartPlus } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

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
    <div className="bg-custom-grey-2 rounded-lg p-4 shadow-md">
      <h2 className="font-semibold text-lg text-custom-white">{item.name}</h2>
      <ul className="mb-4 divide-y divide-custom-grey">
        <li className="py-1 text-xs">
          <span className="font-medium">Stock General:</span>
          {renderValue(item.generalStock)}
        </li>
        <li className="py-1 text-xs">
          <span className="font-medium">Código:</span> {renderValue(item.code)}
        </li>
      </ul>
      {isClient && role === "ADMIN" && (
        <div className="flex space-x-4 mb-4">
          <button
            className="bg-custom-blue text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out flex items-center"
            onClick={redirectProductVariant}
          >
            <FaPlus className="mr-2" /> Nueva Variante
          </button>
        </div>
      )}
      {item.variants.length > 0 && (
        <button
          className={`bg-custom-blue text-white py-2 px-4 rounded-lg shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out ${
            showVariants ? "bg-blue-700" : "bg-blue-500"
          }`}
          onClick={() => setShowVariants(!showVariants)}
        >
          {showVariants ? "Ocultar" : "Mostrar"} Variantes
        </button>
      )}
      <AnimatePresence>
        {showVariants && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 overflow-auto"
          >
            <table className="min-w-full border-collapse border border-custom-grey">
              <thead>
                <tr className="bg-custom-black">
                  <th className="px-4 py-2 text-left text-xs font-semibold text-custom-white uppercase tracking-wider">
                    Modelo
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-custom-white uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-custom-white uppercase tracking-wider">
                    Color
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-custom-white uppercase tracking-wider">
                    Descripción
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-custom-white uppercase tracking-wider">
                    Precio Lista (ARS)
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-custom-white uppercase tracking-wider">
                    Precio Contado (ARS)
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-custom-white uppercase tracking-wider">
                    Precio Lista (USD)
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-custom-white uppercase tracking-wider">
                    Precio Contado (USD)
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-custom-white uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-custom-white uppercase tracking-wider">
                    Código
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-semibold text-custom-white uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-custom-grey divide-y divide-custom-grey">
                {item.variants.map((variant) => (
                  <tr key={variant.id} className="hover:bg-custom-grey-2">
                    <td className="px-4 py-2 text-sm text-custom-white">
                      {renderValue(variant.subModel)}
                    </td>
                    <td className="px-4 py-2 text-sm text-custom-white">
                      {renderValue(variant.state)}
                    </td>
                    <td className="px-4 py-2 text-sm text-custom-white">
                      {renderValue(variant.color)}
                    </td>
                    <td className="px-4 py-2 text-sm text-custom-white">
                      {renderValue(variant.details)}
                    </td>
                    <td className="px-4 py-2 text-sm text-custom-white">
                      ARS {renderValue(variant.priceArs)}
                    </td>
                    <td className="px-4 py-2 text-sm text-custom-white">
                      ARS {renderValue(variant.priceArsCounted)}
                    </td>
                    <td className="px-4 py-2 text-sm text-custom-white">
                      USD {renderValue(variant.price)}
                    </td>
                    <td className="px-4 py-2 text-sm text-custom-white">
                      USD {renderValue(variant.countedPrice)}
                    </td>
                    <td className="px-4 py-2 text-sm text-custom-white">
                      {renderValue(variant.stock)}
                    </td>
                    <td className="px-4 py-2 text-sm text-custom-white">
                      {renderValue(variant.productCodes.join(", "))}
                    </td>
                    <td className="px-4 py-2 flex space-x-2">
                      <button
                        className="bg-custom-green hover:bg-green-700 text-white font-bold py-1 px-2 rounded-lg flex items-center"
                        onClick={() =>
                          addToCart({ variant, itemName: item.name })
                        }
                      >
                        <FaCartPlus className="mr-2" /> Agregar
                      </button>
                      {isClient && role === "ADMIN" && (
                        <button
                          className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded-lg flex items-center"
                          onClick={() => openModal(variant)}
                        >
                          <FaEdit className="mr-2" /> Modificar
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
      </AnimatePresence>
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
