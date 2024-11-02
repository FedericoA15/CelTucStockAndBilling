import { useState, useEffect } from "react";
import { useCart } from "@/utils/cartContext";
import EditVariantModal from "@/components/editVariant/editVariantModal";
import Cookies from "js-cookie";
import {
  FaEdit,
  FaCartPlus,
  FaChevronDown,
  FaChevronUp,
  FaTrash,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { deleteProduct } from "@/actions/products/deleteProductVariant";
import ConfirmDeleteModal from "@/components/modalDeleted/ConfirmDeleteModal";

export const ItemComponent: React.FC<{ item: Item }> = ({ item }) => {
  const [showVariants, setShowVariants] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVariant, setCurrentVariant] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [variantToDelete, setVariantToDelete] = useState<string | null>(null);

  const { addToCart } = useCart();
  const role = Cookies.get("roles");

  const openModal = (variant: any) => {
    setCurrentVariant(variant);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentVariant(null);
  };

  const openDeleteModal = (variantId: string) => {
    setVariantToDelete(variantId);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setVariantToDelete(null);
  };

  const handleDeleteVariant = (id: string) => {
    if (variantToDelete) {
      deleteProduct(variantToDelete);
      closeDeleteModal();
    }
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  const renderValue = (value: any) =>
    value === null || value === "" ? "-" : value;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-custom-black-2 rounded-lg shadow-md overflow-hidden"
    >
      <div className="p-6 bg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <h2 className="text-2xl font-bold text-white">{item.name}</h2>
          <div className="flex flex-wrap space-x-2 mt-2 md:mt-0">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold">
              Stock: {renderValue(item.generalStock)}
            </span>
            <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-semibold">
              Código: {renderValue(item.code)}
            </span>
          </div>
        </div>

        {item.variants.length > 0 && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md flex items-center justify-center transition duration-300 ease-in-out"
            onClick={() => setShowVariants(!showVariants)}
          >
            {showVariants ? (
              <FaChevronUp className="mr-2" />
            ) : (
              <FaChevronDown className="mr-2" />
            )}
            {showVariants ? "Ocultar" : "Mostrar"} Variantes
          </motion.button>
        )}

        <AnimatePresence>
          {showVariants && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 overflow-x-auto"
            >
              <table className="min-w-full divide-y">
                <thead className="bg-custom-black">
                  <tr>
                    {[
                      "Modelo",
                      "Estado",
                      "Color",
                      "Batería",
                      "Capacidad",
                      "Descripción",
                      "Precio Lista (ARS)",
                      "Precio Contado (ARS)",
                      "Precio Lista (USD)",
                      "Precio Contado (USD)",
                      "Stock",
                      "Sucursal",
                      "Código",
                      "Acciones",
                    ].map((header) => (
                      <th
                        key={header}
                        className="px-2 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-custom-grey-2 divide-y">
                  {item.variants.map((variant) => (
                    <tr key={variant.id} className="hover:bg-custom-black-2">
                      <td className="px-2 py-4 whitespace-nowrap text-sm text-white">
                        {renderValue(variant.subModel)}
                      </td>
                      <td className="px-2 py-4 whitespace-nowrap text-sm text-white">
                        {renderValue(variant.state)}
                      </td>
                      <td className="px-2 py-4 whitespace-nowrap text-sm text-white">
                        {renderValue(variant.color)}
                      </td>
                      <td className="px-2 py-4 whitespace-nowrap text-sm text-white">
                        {renderValue(variant.batteryCapacity)}
                      </td>
                      <td className="px-2 py-4 whitespace-nowrap text-sm text-white">
                        {renderValue(variant.capacity)}
                      </td>
                      <td className="px-2 py-4 whitespace-nowrap text-sm text-white">
                        {renderValue(variant.details)}
                      </td>
                      <td className="px-2 py-4 whitespace-nowrap text-sm text-white">
                        ARS {renderValue(variant.priceArs)}
                      </td>
                      <td className="px-2 py-4 whitespace-nowrap text-sm text-white">
                        ARS {renderValue(variant.priceArsCounted)}
                      </td>
                      <td className="px-2 py-4 whitespace-nowrap text-sm text-white">
                        USD {renderValue(variant.price)}
                      </td>
                      <td className="px-2 py-4 whitespace-nowrap text-sm text-white">
                        USD {renderValue(variant.countedPrice)}
                      </td>
                      <td className="px-2 py-4 whitespace-nowrap text-sm text-white">
                        {renderValue(variant.stock)}
                      </td>
                      <td className="px-2 py-4 whitespace-nowrap text-sm text-white">
                        {renderValue(variant.branchName)}
                      </td>
                      <td className="px-2 py-4 whitespace-nowrap text-sm text-white">
                        {renderValue(variant.productCodes.join(", "))}
                      </td>
                      <td className="px-2 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded-lg flex items-center transition duration-300 ease-in-out"
                            onClick={() =>
                              addToCart({ variant, itemName: item.name })
                            }
                          >
                            <FaCartPlus className="mr-1" /> Agregar
                          </motion.button>
                          {showActions &&
                            ((isClient && role === "ADMIN") ||
                              role === "SUPERADMIN") && (
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-1 px-2 rounded-lg flex items-center transition duration-300 ease-in-out"
                                onClick={() => openModal(variant)}
                              >
                                <FaEdit className="mr-1" /> Modificar
                              </motion.button>
                            )}
                          {showActions && isClient && role === "SUPERADMIN" && (
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded-lg flex items-center transition duration-300 ease-in-out"
                              onClick={() => openDeleteModal(variant.id)}
                            >
                              <FaTrash className="mr-1" /> Borrar
                            </motion.button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {isModalOpen && currentVariant && (
        <EditVariantModal
          isOpen={isModalOpen}
          onClose={closeModal}
          variant={currentVariant}
        />
      )}

      <ConfirmDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleDeleteVariant}
      />
      {(role === "ADMIN" || role === "SUPERADMIN") && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full mt-4 bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-lg shadow-md transition duration-300 ease-in-out"
          onClick={() => setShowActions(!showActions)}
        >
          {showActions ? "Ocultar acciones" : "Más acciones"}
        </motion.button>
      )}
    </motion.div>
  );
};
