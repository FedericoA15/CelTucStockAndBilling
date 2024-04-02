"use client"
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import axiosInstance from "@/utils/axiosInstance";
import { getAllBranches } from '@/actions/branchs/getAllBranchs';
import { getAllProducts } from '@/actions/products/getAllProducts';
const FormBuilder = dynamic(() => import('@/components/formbuilder/FormBuilder'), { ssr: false });


export default function NewSubProduct() {
  const [branches, setBranches] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllBranches().then(setBranches);
    getAllProducts().then(setProducts);
  }, []);

  const fields: Field[] = [
    { name: 'color', label: 'Color', type: 'text' },
    { name: "batteryCapacity", label: 'Capacidad de la bateria', type: "number" },
    { name: "stock", label: 'Stock', type: "number" },
    { name: "price", label: 'Precio', type: "number" },
    { name: 'branch', label: 'Sucursal', type: 'select', options: branches },
    { name: 'product', label: 'Producto', type: 'select', options: products },
    // { name: "product", label: 'Producto', type: "text" },
    { name: "state", label: 'Estado', type: "text" },
    { name: "capacity", label: 'Capacidad', type: "number" },
    { name: "details", label: 'Detalles', type: "text" },
  ];
  

  const handleSubmit = async (data: any) => {
    try {
      console.log(data);
      const response = await axiosInstance.post('/products-variant', data);
      if (response.status === 200) {
        alert('Producto creado exitosamente');
      } else {
        alert('Error al crear el producto');
      }
    } catch (error) {
      console.log(error);
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