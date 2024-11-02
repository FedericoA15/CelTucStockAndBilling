import axiosInstance from "@/utils/axiosInstance";
import { toast } from "react-toastify";

export async function deleteVoucher(id: string) {
  try {
    await toast.promise(
      axiosInstance.delete(`/voucher/${id}`),
      {
        pending: "Borrando comprobante...",
        success: "Comprobante borrado exitosamente",
        error: "Error al borrar comprobante",
      }
    );
    return { success: true };
  } catch (error) {
    toast.error("Error interno del servidor");
  }
}
