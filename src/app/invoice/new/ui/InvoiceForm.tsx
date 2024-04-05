import React, { useState, ChangeEvent, FormEvent } from 'react';

interface InvoiceItem {
  productVariant: {
    id: string;
  };
  quantity: number;
  price: number;
}

interface InvoiceFormProps {
  invoiceItems: InvoiceItem[];
  onSubmit: (formData: Record<string, { quantity: number; price: number }>) => void;
}

const InvoiceForm: React.FC<InvoiceFormProps> = ({ invoiceItems, onSubmit }) => {
  const [formState, setFormState] = useState<Record<string, { quantity: number; price: number }>>(
    invoiceItems.reduce((acc, item) => {
      return { ...acc, [item.productVariant.id]: { quantity: item.quantity, price: item.price } };
    }, {})
  );

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, productId: string) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [productId]: {
        ...prevState[productId],
        [name]: parseFloat(value), // Parse input value as a number
      },
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Aquí puedes enviar los datos del formulario al servidor o realizar otras acciones necesarias
    onSubmit(formState);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-800 text-white p-6 rounded-md h-screen flex flex-col justify-start items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {invoiceItems.map((item) => (
          <div key={item.productVariant.id} className="mb-4">
            <h3 className="text-lg font-semibold mb-2">{item.productVariant.id}</h3>
            <label className="block text-sm font-medium mb-2">Cantidad:</label>
            <input
              type="number"
              name="quantity"
              value={formState[item.productVariant.id].quantity}
              onChange={(e) => handleInputChange(e, item.productVariant.id)}
              className="w-full px-3 py-2 text-gray-700 bg-gray-200 rounded-md focus:outline-none"
            />
            <label className="block text-sm font-medium mb-2">Precio:</label>
            <input
              type="number"
              name="price"
              value={formState[item.productVariant.id].price}
              onChange={(e) => handleInputChange(e, item.productVariant.id)}
              className="w-full px-3 py-2 text-gray-700 bg-gray-200 rounded-md focus:outline-none"
            />
          </div>
        ))}
      </div>
      <div className="w-full self-end flex justify-end">
        <button type="submit" className="w-1/2 py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-md">
          Guardar
        </button>
      </div>
    </form>
  );
};

export default InvoiceForm;
