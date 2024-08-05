import axiosInstance from "@/utils/axiosInstance";
import { toast } from 'react-toastify';

export async function putDollar(data: string) {
  try {
    const response =  await toast.promise( axiosInstance.put("/dollar/f0f464e2-81c4-40a3-8614-51b9290f864c", { value: data }),
    {
      pending: "Act valor...",
      success: "Valor actulizado exitosamente",
      error: "Error al actulizar"
    }
  )

  } catch (error) {
    toast.error("Error interno del servidor");
  }
}



