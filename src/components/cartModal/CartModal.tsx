import { useCart } from "@/utils/cartContext";
import Link from "next/link";
import React, { useState } from "react";

const CartModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { cart, removeFromCart } = useCart();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={openModal}
      >
        Comprobante 🛒
      </button>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <div className="bg-custom-black-2 p-4 rounded-lg w-80 relative">
            {cart.map((item, index) => (
              <div
                className="bg-custom-grey-2 text-white my-2 p-2 rounded flex justify-between items-center"
                key={item.variant.id}
              >
                <div>
                  <p>-----------------------------</p>
                  <p>{item.itemName}</p>
                  <p>Modelo: {item.variant.subModel}</p>
                  <p>Precio: USD{item.variant.price}</p>
                  <p>Precio ARS: ${item.variant.priceArs}</p>
                  <p>Precio de contado: USD{item.variant.countedPrice}</p>
                  <p>Precio de contado ARS: ${item.variant.priceArsCounted}</p>
                  <p>-----------------------------</p>
                </div>
                <button
                  className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-full"
                  onClick={() => removeFromCart(item)}
                >
                  X
                </button>
              </div>
            ))}
            <div className="flex justify-between mt-4">
              <button
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={closeModal}
              >
                Cerrar
              </button>
              <Link
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                href="/invoice/new"
              >
                Crear comprobante
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartModal;
