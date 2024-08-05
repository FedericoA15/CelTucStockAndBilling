import axiosInstance from "@/utils/axiosInstance";
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
// router: ReturnType<typeof useRouter>
export async function postVoucher(data: any) {
  try {
    const response = await toast.promise(
      axiosInstance.post("/voucher", data),
      {
        pending: "Creando comprobante...",
        success: "Comprobante creado exitosamente",
        error: "Error al crear el comprobante"
      }
    );
    // router.push(`${invoiceId}`);
  } catch (error) {
    toast.error("Error interno del servidor");
  }
}
