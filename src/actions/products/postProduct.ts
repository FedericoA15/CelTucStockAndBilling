import axiosInstance from "@/utils/axiosInstance";
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export async function postProduct(data: CreateProduct, router: ReturnType<typeof useRouter>) {
  try {
    await toast.promise(
      axiosInstance.post("/products", data),
      {
        pending: "Creando producto...",
        success: "Producto creado exitosamente",
        error: "Error al crear el producto"
      }
    );

    router.back();
  } catch (error) {
    toast.error("Error interno del servidor");
  }
}
