import React from "react";
import { motion } from "framer-motion";

const ConfirmDeleteModal: React.FC<any> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="bg-custom-grey rounded-lg shadow-lg p-6 w-full max-w-md"
      >
        <h2 className="text-lg font-bold mb-4">Confirmar eliminación</h2>
        <p className="mb-4">¿Estás seguro de que deseas eliminar?</p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          >
            Eliminar
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ConfirmDeleteModal;
