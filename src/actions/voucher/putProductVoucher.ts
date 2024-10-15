import axiosInstance from "@/utils/axiosInstance";
import { toast } from "react-toastify";

export async function putProductVoucher(data: Voucher, id: string) {
  try {
    await toast.promise(
      axiosInstance.put(`/voucher/repair/${id}`, data),
      {
        pending: "Actualizando comprobante...",
        success: "Comprobante actualizado exitosamente",
        error: "Error al actualizar el comprobante",
      }
    );
    return { success: true };
  } catch (error) {
    toast.error("Error interno del servidor");
  }
}
