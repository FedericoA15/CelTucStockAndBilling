import { useCart } from "@/utils/cartContext";
import Link from "next/link";
import React, { useState } from "react";

const CartModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { cart } = useCart();

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
        Carrito 🛒
      </button>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-10">
          <div className="bg-white p-4 rounded-lg">
            {cart.map((item, index) => (
              <div key={index}>
                <p>------</p>
                <p>{item.itemName}</p>
                <p>{item.variant.subModel}</p>
                <p>Precio: USD{item.variant.price}</p>
                <p>Precio ARS: ${item.variant.priceArs}</p>
                <p>Precio de contado: USD{item.variant.countedPrice}</p>
                <p>Precio de contado ARS: ${item.variant.priceArsCounted}</p>
                <p>------</p>
              </div>
            ))}
            <button
              className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={closeModal}
            >
              Cerrar
            </button>
            <Link href="/invoice/new">Crear factura</Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartModal;
