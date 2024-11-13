import React from "react";

const Cash: React.FC<any> = ({ data, onClose }) => {
  const formatCurrency = (amount?: number) => {
    return amount !== undefined
      ? new Intl.NumberFormat("es-AR", {
          style: "currency",
          currency: "ARS",
        }).format(amount)
      : "-";
  };

  const locations = ["Centro", "Solar", "Yerba Buena"];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center">
      <div className="bg-gray-900 p-6 rounded-lg w-11/12 max-w-4xl max-h-[90vh] overflow-auto shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-100">Cierre de Caja</h2>
          <button onClick={onClose} className="text-red-400 hover:text-red-600">
            Cerrar
          </button>
        </div>

        <div className="text-lg mt-4 text-gray-300">
          <h3 className="text-xl font-semibold mb-4 text-gray-200">
            Resumen de Ventas por Sucursal
          </h3>
          {locations.map((location) => (
            <div key={location} className="mt-4 p-4 bg-gray-800 rounded-md">
              <p className="text-lg text-gray-100">
                <strong>{location}:</strong>
              </p>
              <p className="text-gray-400">
                Transferencia: {formatCurrency(data[location]?.Transferencia)}
              </p>
              <p className="text-gray-400">
                Efectivo: {formatCurrency(data[location]?.Efectivo)}
              </p>
              <p className="text-gray-400">
                Tarjeta: {formatCurrency(data[location]?.Tarjeta)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cash;
