import { useState, useEffect } from 'react';
import axiosInstance from '@/utils/axiosInstance';
import { on } from 'events';


const EditVariantModal: React.FC<{ isOpen: boolean, onClose: () => void, variant: Variant }> = ({ isOpen, onClose, variant }) => {
  const [formData, setFormData] = useState<Variant>(variant);

  useEffect(() => {
    setFormData(variant);
  }, [variant]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.put(`/products-variant/edit/${variant.id}`,formData);
      if (response.status === 200) {
        alert("Producto editado correctamente");
        onClose();
      } else {
        alert("Error al editar producto");
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-800 p-8 rounded-lg w-2/3">
        <h2 className="text-2xl font-bold mb-4">Modificar Variante de producto</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <input
            name="color"
            placeholder="Color"
            value={formData.color}
            onChange={handleChange}
            className="p-2 bg-gray-700 text-white rounded"
          />
          <input
            name="batteryCapacity"
            placeholder="Capacidad de la batería"
            value={formData.batteryCapacity}
            onChange={handleChange}
            className="p-2 bg-gray-700 text-white rounded"
          />
          <input
            name="stock"
            placeholder="Stock"
            value={formData.stock}
            onChange={handleChange}
            className="p-2 bg-gray-700 text-white rounded"
          />
          <input
            name="price"
            placeholder="Precio"
            value={formData.price}
            onChange={handleChange}
            className="p-2 bg-gray-700 text-white rounded"
          />
          <input
            name="branchName"
            placeholder="Sucursal"
            value={formData.branchName}
            onChange={handleChange}
            className="p-2 bg-gray-700 text-white rounded"
          />
          <input
            name="state"
            placeholder="Estado"
            value={formData.state}
            onChange={handleChange}
            className="p-2 bg-gray-700 text-white rounded"
          />
          <input
            name="details"
            placeholder="Detalles"
            value={formData.details}
            onChange={handleChange}
            className="p-2 bg-gray-700 text-white rounded"
          />
          <input
            name="capacity"
            placeholder="Capacidad"
            value={formData.capacity}
            onChange={handleChange}
            className="p-2 bg-gray-700 text-white rounded"
          />
          <input
            name="subModel"
            placeholder="SubModelo"
            value={formData.subModel}
            onChange={handleChange}
            className="p-2 bg-gray-700 text-white rounded"
          />
          {/* <input
            name="productCodes"
            placeholder="Ingresa los códigos, separados por comas"
            value={formData.productCodes}
            onChange={handleChange}
            className="col-span-2 p-2 bg-gray-700 text-white rounded"
          /> */}
          <button
            type="submit"
            className="col-span-2 bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
          >
            Modificar
          </button>
        </form>
        <button
          onClick={onClose}
          className="absolute top-0 right-0 mt-4 mr-4 text-white"
        >
          X
        </button>
      </div>
    </div>
  );
};

export default EditVariantModal;
