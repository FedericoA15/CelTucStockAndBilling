import { useCart } from "@/utils/cartContext";
import Link from "next/link";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { FaCartPlus, FaTimes } from "react-icons/fa";

const CartModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { cart, removeFromCart } = useCart();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateInvoice = () => {
    if (cart.length === 0) {
      toast.error("El carrito está vacío. No se puede crear un comprobante.");
    }
  };

  return (
    <div>
      <div className="flex justify-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-custom-blue hover:bg-blue-700 text-white py-2 px-4 rounded-lg flex items-center"
          onClick={openModal}
        >
          <FaCartPlus className="mr-2" /> Comprobante
        </motion.button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <div className="bg-custom-black-2 p-6 rounded-lg w-full max-w-md relative">
            <button
              className="absolute top-4 right-4 text-white"
              onClick={closeModal}
            >
              <FaTimes />
            </button>
            <div className="overflow-y-auto max-h-80">
              {cart.length > 0 ? (
                cart.map((item) => (
                  <div
                    className="bg-custom-grey-2 text-white my-2 p-4 rounded flex justify-between items-center"
                    key={item.variant.id}
                  >
                    <div>
                      <p className="font-bold text-lg">{item.itemName}</p>
                      <p>Modelo: {item.variant.subModel}</p>
                      <p>Precio: USD {item.variant.price}</p>
                      <p>Precio ARS: ${item.variant.priceArs}</p>
                      <p>Precio de contado: USD {item.variant.countedPrice}</p>
                      <p>
                        Precio de contado ARS: ${item.variant.priceArsCounted}
                      </p>
                    </div>
                    <button
                      className="ml-4 bg-red-600 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-full"
                      onClick={() => removeFromCart(item)}
                    >
                      <FaTimes />
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-400">
                  El carrito está vacío.
                </p>
              )}
            </div>
            <div className="flex justify-between mt-4">
              <button
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={closeModal}
              >
                Cerrar
              </button>
              {cart.length > 0 ? (
                <Link
                  className="bg-custom-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  href="/invoice/new"
                >
                  Crear comprobante
                </Link>
              ) : (
                <button
                  className="bg-gray-400 text-white font-bold py-2 px-4 rounded cursor-not-allowed"
                  onClick={handleCreateInvoice}
                  disabled
                >
                  Crear comprobante
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartModal;
