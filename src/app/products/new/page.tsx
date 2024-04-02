"use client"
import dynamic from 'next/dynamic';
import axiosInstance from "@/utils/axiosInstance";
const FormBuilder = dynamic(() => import('@/components/formbuilder/FormBuilder'), { ssr: false });

const fields: Field[] = [
  { name: 'name', label: 'Nombre del producto', type: 'text' },
];

export default function NewProduct() {
  const handleSubmit = async (data: any) => {
    try {
      const response = await axiosInstance.post('/products', data);
      if (response.status === 200) {
        alert('Producto creado exitosamente');
      } else {
        alert('Error al crear el producto');
      }
    } catch (error) {
      alert('Error interno del servidor');
    }
  };

  return (
    <div>
      <h1>New Product</h1>
      <FormBuilder fields={fields} onSubmit={handleSubmit} />
    </div>
  );
}
