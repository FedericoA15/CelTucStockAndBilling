"use client";
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (item: CartItem) => {
    setCart([...cart, item]);
    toast.success("Se agrego correctamente el producto");
  };

  const removeFromCart = (item: CartItem) => {
    setCart(cart.filter((cartItem) => cartItem.variant.id !== item.variant.id));
    toast.error("Se elimino correctamente el producto");
  };

  const cleanCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, cleanCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
