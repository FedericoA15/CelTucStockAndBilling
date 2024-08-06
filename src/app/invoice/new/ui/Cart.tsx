import { useState } from "react";
import { useCart } from "@/utils/cartContext";
import Cookies from "js-cookie";
import { postInvoice } from "@/actions/invoices/postInvoice";
import { useRouter } from "next/navigation";

export const Cart: React.FC = () => {
  const router = useRouter();
  const { cart, cleanCart } = useCart();
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
  const totalARSCounted = cart.reduce(
    (acc, item) => acc + item.variant.priceArsCounted,
    0
  );

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
      invoiceItems: Object.keys(productCounts).map((variantId) => {
        const item = cart.find((item) => item.variant.id === variantId);
        return {
          productVariant: { id: variantId },
          quantity: productCounts[variantId],
          price: item?.variant.price,
        };
      }),
      payments: paymentMethods.map((method, index) => ({
        paymentMethod: method,
        amount: parseFloat(amounts[index]),
        details: details[index],
      })),
    };

    postInvoice(invoiceData, router);
    cleanCart();
  };

  const uniqueCartItems = Array.from(
    new Set(cart.map((item) => item.variant.id))
  ).map((id) => cart.find((item) => item.variant.id === id)!);

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="h-screen flex flex-col  items-center "
    >
      <div className="w-full  border-gray-600 bg-gray-600 text-gray-200 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Nuevo Comprobante
        </h2>
        <div className="overflow-x-auto">
          <ul className="space-y-2 mb-4">
            <li className="grid grid-cols-5 gap-4 text-center">
              <p className="font-bold">Producto</p>
              <p className="font-bold">Precio en USD</p>
              <p className="font-bold">Precio en ARS</p>
              <p className="font-bold">Precio en ARS Contado</p>
              <p className="font-bold">Cantidad</p>
            </li>
            {uniqueCartItems.map((item) => (
              <li
                key={item.variant.id}
                className="grid grid-cols-5 gap-4 text-center"
              >
                <p>{item.itemName}</p>
                <p>${item.variant.price} USD</p>
                <p>${item.variant.priceArs} ARS</p>
                <p>${item.variant.priceArsCounted} ARS</p>
                <p>{productCounts[item.variant.id]}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4">
          <p className="text-lg">Total en USD: ${totalUSD} USD</p>
          <p className="text-lg">Total en ARS: ${totalARS} ARS</p>
          <p className="text-lg">
            Total en ARS (Contado): ${totalARSCounted} ARS
          </p>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-200 mb-2">
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
          <div key={index} className="mt-4">
            <label className="block text-sm font-medium text-gray-200 mb-2">
              Método de Pago {index + 1}
            </label>
            <select
              value={method}
              onChange={(e) => {
                const updatedMethods = [...paymentMethods];
                updatedMethods[index] = e.target.value;
                setPaymentMethods(updatedMethods);
              }}
              className="p-2 rounded w-full text-black"
            >
              <option value="" disabled>
                Selecciona el método de pago
              </option>
              <option value="tarjeta">Tarjeta</option>
              <option value="efectivo">Efectivo</option>
              <option value="transferencia">Transferencia</option>
            </select>
            <input
              type="text"
              placeholder="Monto"
              value={amounts[index]}
              onChange={(e) => {
                const updatedAmounts = [...amounts];
                updatedAmounts[index] = e.target.value;
                setAmounts(updatedAmounts);
              }}
              className="mt-2 p-2 rounded w-full text-black"
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
              className="mt-2 p-2 rounded w-full text-black"
            />
          </div>
        ))}

        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={handleAddPaymentMethod}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Agregar método de pago
          </button>
          <button
            type="button"
            onClick={handleCreateInvoice}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            disabled={loading}
          >
            {loading ? "Creando..." : "Crear factura"}
          </button>
        </div>
      </div>
    </form>
  );
};
