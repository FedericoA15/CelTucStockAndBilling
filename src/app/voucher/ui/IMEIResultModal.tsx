import React from "react";
import { X } from "lucide-react";

const IMEIResultModal: React.FC<IMEIResultModalProps> = ({
  product,
  onClose,
  onAddToVoucher,
}) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-custom-black-2 bg-opacity-50">
      <div className="bg-custom-black-2 p-6 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">
            Detalles del Producto
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition duration-300"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <div className="space-y-4 text-gray-300">
          <div>
            <span className="font-semibold text-white">Nombre:</span>{" "}
            {product.name}
          </div>
          <div>
            <span className="font-semibold text-white">Stock General:</span>{" "}
            {product.generalStock}
          </div>
          <div>
            <span className="font-semibold text-white">Variantes:</span>
            {product.variants.map((variant: Variant) => (
              <div
                key={variant.id}
                className="mt-2 p-4 bg-gray-700 rounded-md space-y-2"
              >
                <p>
                  <span className="font-semibold">Modelo:</span>{" "}
                  {variant.subModel}
                </p>
                <p>
                  <span className="font-semibold">Color:</span> {variant.color}
                </p>
                <p>
                  <span className="font-semibold">Capacidad de Batería:</span>{" "}
                  {variant.batteryCapacity}
                </p>
                <p>
                  <span className="font-semibold">Precio:</span> $
                  {variant.price}
                </p>
                <p>
                  <span className="font-semibold">Sucursal:</span>{" "}
                  {variant.branchName}
                </p>
                <p>
                  <span className="font-semibold">Detalles:</span>{" "}
                  {variant.details}
                </p>
                <p>
                  <span className="font-semibold">IMEI:</span>{" "}
                  {variant.productCodes.join(", ")}
                </p>
                <p>
                  <span className="font-semibold">Condición:</span>{" "}
                  {variant.state}
                </p>
                <button
                  onClick={() => onAddToVoucher(variant)}
                  className="mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                >
                  Cargar esta Variante al Voucher
                </button>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end mt-6 space-x-4">
          <button
            onClick={onClose}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default IMEIResultModal;
