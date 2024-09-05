import Cookies from "js-cookie";
import { useState } from "react";
import { useCart } from "@/utils/cartContext";
import { postInvoice } from "@/actions/invoices/postInvoice";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FaDollarSign, FaTrash } from "react-icons/fa";

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

  const handleRemovePaymentMethod = (index: number) => {
    if (paymentMethods.length > 1) {
      const updatedMethods = paymentMethods.filter((_, i) => i !== index);
      const updatedAmounts = amounts.filter((_, i) => i !== index);
      const updatedDetails = details.filter((_, i) => i !== index);

      setPaymentMethods(updatedMethods);
      setAmounts(updatedAmounts);
      setDetails(updatedDetails);
    }
  };

  const handleCreateInvoice = async () => {
    if (!clientName) {
      toast.error("Por favor, ingrese el nombre del cliente.");
      return;
    }

    for (let i = 0; i < amounts.length; i++) {
      if (
        !amounts[i] ||
        isNaN(parseFloat(amounts[i])) ||
        parseFloat(amounts[i]) <= 0
      ) {
        toast.error(`El monto para el método de pago ${i + 1} no es válido.`);
        return;
      }
    }

    setLoading(true);
    const id = Cookies.get("id");
    if (!id) {
      toast.error("Usuario no identificado");
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

    try {
      await postInvoice(invoiceData, router);
      cleanCart();
      toast.success("Factura creada exitosamente.");
    } catch (error) {
      toast.error("Ocurrió un error al crear la factura.");
    } finally {
      setLoading(false);
    }
  };

  const uniqueCartItems = Array.from(
    new Set(cart.map((item) => item.variant.id))
  ).map((id) => cart.find((item) => item.variant.id === id)!);

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="h-screen flex flex-col items-center p-6"
    >
      <div className="w-full max-w-4xl bg-custom-grey-2 text-custom-white rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-bold mb-6 text-center flex items-center justify-center">
          <FaDollarSign className="mr-2 text-custom-blue" />
          Nuevo Comprobante
        </h2>
        <div className="overflow-x-auto">
          <ul className="space-y-4 mb-6">
            <li className="grid grid-cols-5 gap-4 text-center font-bold text-custom-cream">
              <p>Producto</p>
              <p>Precio en USD</p>
              <p>Precio en ARS</p>
              <p>Precio en ARS Contado</p>
              <p>Cantidad</p>
            </li>
            {uniqueCartItems.map((item) => (
              <li
                key={item.variant.id}
                className="grid grid-cols-5 gap-4 text-center"
              >
                <p>{item.itemName}</p>
                <p>${item.variant.price.toFixed(2)}</p>
                <p>${item.variant.priceArs.toFixed(2)}</p>
                <p>${item.variant.priceArsCounted.toFixed(2)}</p>
                <p>{productCounts[item.variant.id]}</p>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-6">
          <p className="text-lg font-semibold">
            Total en USD: ${totalUSD.toFixed(2)}
          </p>
          <p className="text-lg font-semibold">
            Total en ARS: ${totalARS.toFixed(2)}
          </p>
          <p className="text-lg font-semibold">
            Total en ARS (Contado): ${totalARSCounted.toFixed(2)}
          </p>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-custom-white mb-2">
            Nombre del Cliente
          </label>
          <input
            type="text"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            placeholder="Ingrese el nombre del cliente"
            className="mt-2 p-3 rounded w-full text-black border border-gray-300 focus:border-custom-blue focus:ring-1 focus:ring-custom-blue transition duration-200"
          />
        </div>

        {paymentMethods.map((method, index) => (
          <div key={index} className="mt-6 flex flex-col space-y-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-custom-white mb-2">
                  Método de Pago {index + 1}
                </label>
                <select
                  value={method}
                  onChange={(e) => {
                    const updatedMethods = [...paymentMethods];
                    updatedMethods[index] = e.target.value;
                    setPaymentMethods(updatedMethods);
                  }}
                  className="p-3 rounded w-full text-black border border-gray-300 focus:border-custom-blue focus:ring-1 focus:ring-custom-blue transition duration-200"
                >
                  <option value="" disabled>
                    Selecciona el método de pago
                  </option>
                  <option value="tarjeta">Tarjeta</option>
                  <option value="efectivo">Efectivo</option>
                  <option value="transferencia">Transferencia</option>
                </select>
              </div>
              <button
                type="button"
                onClick={() => handleRemovePaymentMethod(index)}
                className="text-red-600 hover:text-red-800 transition duration-200"
              >
                <FaTrash className="text-lg" />
              </button>
            </div>
            <input
              type="text"
              placeholder="Monto"
              value={amounts[index]}
              onChange={(e) => {
                const updatedAmounts = [...amounts];
                updatedAmounts[index] = e.target.value;
                setAmounts(updatedAmounts);
              }}
              className="p-3 rounded w-full text-black border border-gray-300 focus:border-custom-blue focus:ring-1 focus:ring-custom-blue transition duration-200"
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
              className="p-3 rounded w-full text-black border border-gray-300 focus:border-custom-blue focus:ring-1 focus:ring-custom-blue transition duration-200"
            />
          </div>
        ))}

        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={handleAddPaymentMethod}
            className="bg-custom-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200"
          >
            Agregar método de pago
          </button>
          <button
            type="button"
            onClick={handleCreateInvoice}
            className="bg-custom-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-200"
            disabled={loading}
          >
            {loading ? "Creando..." : "Crear factura"}
          </button>
        </div>
      </div>
    </form>
  );
};
