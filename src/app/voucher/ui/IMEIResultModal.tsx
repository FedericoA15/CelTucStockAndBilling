import React from "react";

interface IMEIResultModalProps {
  product: any;
  onClose: () => void;
  onAddToVoucher: () => void;
}

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
            <div key={variant.id}>
              <p>Modelo: {variant.subModel}</p>
              <p>Color: {variant.color}</p>
              <p>Capacidad de Batería: {variant.batteryCapacity}</p>
              <p>Precio: {variant.price}</p>
              <p>Sucursal: {variant.branchName}</p>
              <p>Precio: {variant.price}</p>
              <p>Detalles: {variant.details}</p>
              <p>IMEI: {variant.productCodes}</p>
              <p>Condicion: {variant.state}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          <button
            onClick={onAddToVoucher}
            className="bg-green-700 hover:bg-opacity-80 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Cargar al Voucher
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
