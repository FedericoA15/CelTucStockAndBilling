import axiosInstance from "@/utils/axiosInstance";
import { toast } from "react-toastify";

export async function deleteProduct(id: string) {
  try {
    await toast.promise(
      axiosInstance.delete(`/products-variant/${id}`),
      {
        pending: "Borrando producto...",
        success: "Producto borrado exitosamente",
        error: "Error al borrar producto",
      }
    );
    return { success: true };
  } catch (error) {
    toast.error("Error interno del servidor");
  }
}
