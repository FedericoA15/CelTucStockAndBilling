"use client";
import { createContext, useContext, useState } from "react";

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = (item: CartItem) => {
      setCart([...cart, item]);
    };
  
    return (
      <CartContext.Provider value={{ cart, addToCart }}>
        {children}
      </CartContext.Provider>
    );
  };
  
  export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
      throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
