import Cookies from "js-cookie";
import { useState } from "react";
import { useCart } from "@/utils/cartContext";
import { postInvoice } from "@/actions/invoices/postInvoice";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FaPlus, FaShoppingCart, FaTrash } from "react-icons/fa";

const validateDNI = (dni: string): boolean => {
  // Remove any spaces or dots
  const cleanedDNI = dni.replace(/[\s.]/g, "");

  // Check if DNI contains only digits
  const dniRegex = /^\d{7,8}$/;

  return dniRegex.test(cleanedDNI);
};

export const Cart: React.FC = () => {
  const router = useRouter();
  const { cart, cleanCart } = useCart();
  const [paymentMethods, setPaymentMethods] = useState<string[]>([""]);
  const [amounts, setAmounts] = useState<string[]>([""]);
  const [details, setDetails] = useState<string[]>([""]);
  const [dniValues, setDniValues] = useState<string[]>([""]);
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
      setDniValues([...dniValues, ""]);
    }
  };

  const handleRemovePaymentMethod = (index: number) => {
    if (paymentMethods.length > 1) {
      setPaymentMethods(paymentMethods.filter((_, i) => i !== index));
      setAmounts(amounts.filter((_, i) => i !== index));
      setDetails(details.filter((_, i) => i !== index));
      setDniValues(dniValues.filter((_, i) => i !== index));
    }
  };

  const handleAmountChange = (value: string, index: number) => {
    const updatedAmounts = [...amounts];
    updatedAmounts[index] = value;
    setAmounts(updatedAmounts);
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

      // Check if payment method requires DNI
      if (
        ["transferencia", "tarjeta"].includes(
          paymentMethods[i].toLowerCase()
        ) &&
        parseFloat(amounts[i]) > 50000
      ) {
        const dni = dniValues[i]?.trim(); // Elimina espacios en blanco

        // Check if DNI is empty or invalid
        if (!dni) {
          toast.error(
            `Por favor, ingrese un DNI válido para el método de pago ${i + 1}.`
          );
          return;
        }

        // Validate DNI format
        if (!validateDNI(dni)) {
          toast.error(
            `El DNI para el método de pago ${i + 1} no tiene un formato válido.`
          );
          return;
        }
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
        dni: dniValues[index] || null,
      })),
    };

    try {
      // Uncomment these when ready to actually process the invoice
      // await postInvoice(invoiceData, router);
      // cleanCart();
      toast.success("Factura creada exitosamente.");

      // Procesa cada método de pago que requiere AFIP.
      for (const [index, method] of paymentMethods.entries()) {
        const lowerMethod = method.toLowerCase();
        if (["transferencia", "tarjeta"].includes(lowerMethod)) {
          const paymentData = {
            method,
            amount: parseFloat(amounts[index]),
            details: details[index],
            dni: dniValues[index] || null,
          };

          try {
            await handleAfip(paymentData);
            toast.success(
              `Declaración en AFIP completada para el método: ${method}.`
            );
          } catch (afipError) {
            console.error(
              `Error al declarar en AFIP para el método: ${method}`,
              afipError
            );
            toast.error(
              `Ocurrió un error al declarar en AFIP para el método: ${method}.`
            );
          }
        }
      }
    } catch (error) {
      toast.error("Ocurrió un error al crear la factura.");
    } finally {
      setLoading(false);
    }
  };
  const handleAfip = async (payments: {
    method: string;
    amount: number;
    details: string;
    dni: string | null;
  }) => {
    const invoiceItems = cart.map((item) => ({
      branchName: item.variant.branchName,
      price: item.variant.priceArs,
      quantity: productCounts[item.variant.id],
    }));

    const client = {
      name: clientName || "Consumidor Final",
      dni: payments.dni || null,
    };

    const afipPayload = { invoiceItems, payments, client };
    try {
      const response = await fetch("/api/generatedInvoiceByAfip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(afipPayload),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success(
          data.message || "Factura generada en AFIP correctamente."
        );
      } else {
        const errorData = await response.json();
        toast.error(
          errorData.error || "Error desconocido al facturar con AFIP."
        );
      }
    } catch (error) {
      toast.error("Error de conexión con AFIP.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-custom-grey rounded-xl shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
          <h2 className="text-3xl font-extrabold text-white flex items-center justify-center">
            <FaShoppingCart className="mr-4" />
            Nuevo Comprobante
          </h2>
        </div>
        <div className="p-6">
          <div className="mt-6 bg-custom-black-2 p-4 rounded-lg">
            <p className="text-lg font-semibold text-white">
              Total en USD: ${totalUSD.toFixed(2)}
            </p>
            <p className="text-lg font-semibold text-white">
              Total en ARS: ${totalARS.toFixed(2)}
            </p>
            <p className="text-lg font-semibold text-white">
              Total en ARS (Contado): ${totalARSCounted.toFixed(2)}
            </p>
          </div>

          <div className="mt-8">
            <label className="block text-sm font-medium text-white mb-2">
              Nombre del Cliente
            </label>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="Ingrese el nombre del cliente"
              className="mt-1 bg-custom-black-2 block w-full border text-white rounded-md shadow-sm py-2 px-3 focus:outline-none sm:text-sm"
            />
          </div>
          {paymentMethods.map((method, index) => (
            <div
              key={index}
              className="mt-6 bg-custom-black-2 p-4 rounded-lg relative"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-white">
                  Método de Pago {index + 1}
                </h3>
                <button
                  type="button"
                  onClick={() => handleRemovePaymentMethod(index)}
                  className="text-red-600 hover:text-red-800 transition duration-200"
                >
                  <FaTrash className="text-lg" />
                </button>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                <select
                  value={method}
                  onChange={(e) =>
                    setPaymentMethods(
                      paymentMethods.map((m, i) =>
                        i === index ? e.target.value : m
                      )
                    )
                  }
                  className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                >
                  <option value="">Seleccione método de pago</option>
                  <option value="tarjeta">Tarjeta</option>
                  <option value="transferencia">Transferencia</option>
                  <option value="efectivo">Efectivo</option>
                </select>

                <input
                  type="text"
                  placeholder="Monto"
                  value={amounts[index]}
                  onChange={(e) => handleAmountChange(e.target.value, index)}
                  className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />

                <input
                  type="text"
                  placeholder="Detalles"
                  value={details[index]}
                  onChange={(e) =>
                    setDetails(
                      details.map((d, i) => (i === index ? e.target.value : d))
                    )
                  }
                  className="block w-full mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              {["transferencia", "tarjeta"].includes(method.toLowerCase()) && (
                <input
                  type="text"
                  placeholder="Ingrese su DNI"
                  value={dniValues[index] || ""}
                  onChange={(e) =>
                    setDniValues(
                      dniValues.map((dni, i) =>
                        i === index ? e.target.value : dni
                      )
                    )
                  }
                  className="block w-full mt-4 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              )}
            </div>
          ))}
          <button
            onClick={handleAddPaymentMethod}
            className="mt-4 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none"
          >
            <FaPlus className="mr-2" />
            Agregar Método de Pago
          </button>
          <button
            onClick={handleCreateInvoice}
            disabled={loading}
            className="mt-6 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none"
          >
            {loading ? "Creando factura..." : "Crear Factura"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
