"use client"
import axiosInstance from "@/utils/axiosInstance";
import { Cart } from "./ui/Cart";

export default function NewInvoice() {

  const handleSubmit = async (data: any) => {
    try {
      const response = await axiosInstance.post('/invoice', data);
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
      <h2 className="text-white text-3xl text-center py-10">Nueva factura</h2>
      <Cart />
    </div>
  );
}
