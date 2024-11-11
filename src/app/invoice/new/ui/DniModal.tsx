import React, { useState } from "react";

interface DniModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (dni: string) => void;
}
const DniModal: React.FC<DniModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [dni, setDni] = useState("");

  if (!isOpen) return null;

  return (
    <div
      className="absolute z-50 bg-white border border-gray-300 rounded-lg shadow-lg p-4 w-64"
      style={{ top: "10%", left: "10%" }} // Ajusta 'top' y 'left' para la posición deseada
    >
      <h3 className="text-lg font-medium text-gray-700 mb-2">Ingrese su DNI</h3>
      <input
        type="text"
        value={dni}
        onChange={(e) => setDni(e.target.value)}
        placeholder="DNI"
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="mt-4 flex justify-end space-x-2">
        <button
          onClick={onClose}
          className="px-3 py-1 text-sm font-medium text-gray-600 bg-gray-200 rounded hover:bg-gray-300"
        >
          Cancelar
        </button>
        <button
          onClick={() => {
            onSubmit(dni);
            onClose();
          }}
          className="px-3 py-1 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Aceptar
        </button>
      </div>
    </div>
  );
};

export default DniModal;
