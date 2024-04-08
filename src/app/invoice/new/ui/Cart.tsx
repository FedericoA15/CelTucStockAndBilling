import { useState } from "react";
import { useCart } from "@/utils/cartContext";
import axiosInstance from "@/utils/axiosInstance";

export const Cart: React.FC = () => {
  const { cart } = useCart();
  const [paymentMethods, setPaymentMethods] = useState<string[]>([""]);
  const [amounts, setAmounts] = useState<string[]>([""]);
  const [details, setDetails] = useState<string[]>([""]);

  const productCounts: Record<string, number> = {};

  cart.forEach((item) => {
    const productId = item.variant.id;
    if (productCounts[productId]) {
      productCounts[productId] += 1;
    } else {
      productCounts[productId] = 1;
    }
  });

  const totalUSD = cart.reduce((acc, item) => acc + item.variant.price, 0);
  const totalARS = cart.reduce((acc, item) => acc + item.variant.priceArs, 0);

  const handleAddPaymentMethod = () => {
    if (paymentMethods.length < 3) {
      setPaymentMethods([...paymentMethods, ""]);
      setAmounts([...amounts, ""]);
      setDetails([...details, ""]);
    }
  };

  const handleCreateInvoice = async () => {
    const invoiceData = {
      user: {
        id: "a6655912-049f-464d-8f6c-079de4b284c4",
      },
      invoiceItems: cart.map((item) => ({
        productVariant: {
          id: item.variant.id,
        },
        quantity: productCounts[item.variant.id],
        price: item.variant.price,
      })),
      payments: paymentMethods.map((method, index) => ({
        paymentMethod: method,
        amount: parseFloat(amounts[index]),
        details: details[index],
      })),
    };
    try {
      const response = await axiosInstance.post("/invoice", invoiceData);
      if (response.status === 200) {
        alert("Factura creada exitosamente");
      } else {
        alert("Error al crear la factura");
      }
    } catch (error) {
      alert("Error interno del servidor");
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="border-gray-600 bg-gray-600 text-gray-200 rounded-lg shadow-md p-4">
        <h2 className="text-xl font-semibold mb-4">Carrito</h2>
        <ul className="space-y-2">
          <li className="flex items-center">
            <p className="flex-grow">Nombre</p>
            <p> Precio en USD</p>
            <p className="ml-2"> Precio en ARS</p>
            <p className="ml-2">Cantidad </p>
          </li>
          {cart.map((item: CartItem, index) => (
            <li key={index} className="flex items-center">
              <p className="flex-grow">{item.itemName}</p>
              <p>${item.variant.price} USD</p>
              <p className="ml-2">{item.variant.priceArs} ARS</p>
              <p className="ml-2">Cantidad: {productCounts[item.variant.id]}</p>
            </li>
          ))}
        </ul>
        <div>
          <p>Total en USD: {totalUSD} USD</p>
          <p>Total en ARS: {totalARS} ARS</p>
        </div>
        {paymentMethods.map((method, index) => (
          <div key={index} className="mt-2">
            <input
              type="text"
              placeholder={`Método de pago ${index + 1}`}
              value={method}
              onChange={(e) => {
                const updatedMethods = [...paymentMethods];
                updatedMethods[index] = e.target.value;
                setPaymentMethods(updatedMethods);
              }}
              className="p-2 rounded"
            />
            <input
              type="text"
              placeholder="Monto"
              value={amounts[index]}
              onChange={(e) => {
                const updatedAmounts = [...amounts];
                updatedAmounts[index] = e.target.value;
                setAmounts(updatedAmounts);
              }}
              className="mt-2 p-2 rounded"
            />
            <input
              type="text"
              placeholder="Detalles"
              value={details[index]}
              onChange={(e) => {
                const updatedDetails = [...details];
                updatedDetails[index] = e.target.value;
                setDetails(updatedDetails);
              }}
              className="mt-2 p-2 rounded"
            />
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddPaymentMethod}
          className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Agregar método de pago
        </button>
        <button
          type="button"
          onClick={handleCreateInvoice}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Crear factura
        </button>
      </div>
    </form>
  );
};
