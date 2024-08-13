import React from "react";

const IMEIResultModal: React.FC<IMEIResultModalProps> = ({
  product,
  onClose,
  onAddToVoucher,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-custom-grey-2 p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Detalles del Producto</h2>
        <div className="mb-4">
          <strong>Nombre:</strong> {product.name}
        </div>
        <div className="mb-4">
          <strong>Stock General:</strong> {product.generalStock}
        </div>
        <div className="mb-4">
          <strong>Variante:</strong>
          {product.variants.map((variant: Variant) => (
            <div key={variant.id} className="mb-2 p-2 bg-gray-800 rounded-md">
              <p>
                <strong>Modelo:</strong> {variant.subModel}
              </p>
              <p>
                <strong>Color:</strong> {variant.color}
              </p>
              <p>
                <strong>Capacidad de Batería:</strong> {variant.batteryCapacity}
              </p>
              <p>
                <strong>Precio:</strong> ${variant.price}
              </p>
              <p>
                <strong>Sucursal:</strong> {variant.branchName}
              </p>
              <p>
                <strong>Detalles:</strong> {variant.details}
              </p>
              <p>
                <strong>IMEI:</strong> {variant.productCodes.join(", ")}
              </p>
              <p>
                <strong>Condición:</strong> {variant.state}
              </p>
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={() => onAddToVoucher(product)}
            className="bg-green-700 hover:bg-opacity-80 text-white font-bold py-2 px-4 mx-3 rounded"
          >
            Cargar esta Variante al Voucher
          </button>
          <button
            onClick={onClose}
            className="bg-red-700 hover:bg-opacity-80 text-white font-bold py-2 px-4 rounded"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default IMEIResultModal;
