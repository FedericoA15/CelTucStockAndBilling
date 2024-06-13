import { useState } from "react";
import { useCart } from "@/utils/cartContext";
import axiosInstance from "@/utils/axiosInstance";
import Cookies from "js-cookie";

export const Cart: React.FC = () => {
  const { cart } = useCart();
  const [paymentMethods, setPaymentMethods] = useState<string[]>([""]);
  const [amounts, setAmounts] = useState<string[]>([""]);
  const [details, setDetails] = useState<string[]>([""]);
  const [clientName, setClientName] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const productCounts: Record<string, number> = cart.reduce((acc, item) => {
    acc[item.variant.id] = (acc[item.variant.id] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

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
    if (!clientName) {
      alert("Por favor, ingrese el nombre del cliente.");
      return;
    }
    setLoading(true);
    const id = Cookies.get("id");
    if (!id) {
      alert("Usuario no identificado");
      setLoading(false);
      return;
    }

    const invoiceData = {
      user: { id },
      client: clientName,
      invoiceItems: cart.map((item) => ({
        productVariant: { id: item.variant.id },
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
    } finally {
      setLoading(false);
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
          {cart.map((item: CartItemInvoice, index) => (
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
        
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-200">
            Nombre del Cliente
          </label>
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="Ingrese el nombre del cliente"
            className="mt-2 p-2 rounded w-full text-black"
          />
        </div>

        {paymentMethods.map((method, index) => (
          <div key={index} className="text-black mt-2">
            <input
              type="text"
              placeholder={`Método de pago ${index + 1}`}
              value={method}
              onChange={(e) => {
                const updatedMethods = [...paymentMethods];
                updatedMethods[index] = e.target.value;
                setPaymentMethods(updatedMethods);
              }}
              className="p-2 rounded w-full"
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
              className="mt-2 p-2 rounded w-full"
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
              className="mt-2 p-2 rounded w-full"
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
          disabled={loading}
        >
          {loading ? "Creando..." : "Crear factura"}
        </button>
      </div>
    </form>
  );
};
