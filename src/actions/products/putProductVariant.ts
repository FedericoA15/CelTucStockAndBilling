import axiosInstance from "@/utils/axiosInstance";
import { toast } from "react-toastify";

export async function putProduct(data: Variant, id: string) {
  try {
    await toast.promise(
      axiosInstance.put(`/products-variant/edit/${id}`, data),
      {
        pending: "Actualizando producto...",
        success: "Producto actualizado exitosamente",
        error: "Error al actualizar el producto",
      }
    );
    return { success: true };
  } catch (error) {
    toast.error("Error interno del servidor");
  }
}
