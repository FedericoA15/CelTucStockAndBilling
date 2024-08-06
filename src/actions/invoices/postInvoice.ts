import axiosInstance from "@/utils/axiosInstance";
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export async function postInvoice(data: any, router: ReturnType<typeof useRouter>) {
  try {
    const response = await toast.promise(
      axiosInstance.post("/invoice", data),
      {
        pending: "Creando comprobante...",
        success: "Comprobante creado exitosamente",
        error: "Error al crear el comprobante"
      }
    );
    const invoiceId = response.data.id;
    router.push(`${invoiceId}`);
  } catch (error) {
    toast.error("Error interno del servidor");
  }
}
