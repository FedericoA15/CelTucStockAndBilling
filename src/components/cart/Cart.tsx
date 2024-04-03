import { useCart } from "@/utils/cardContext"; 

export const Cart = () => {
  const { cart } = useCart();

  return (
    <div>
      <h2>Carrito</h2>
      {cart.map((item, index) => (
        <p key={index}>{item}</p>
      ))}
    </div>
  );
};
