import axiosInstance from "@/utils/axiosInstance";
import { toast } from 'react-toastify';

export async function postTimeSheet(data: any) {
  try {
    await toast.promise(
      axiosInstance.post(`/timesheet`, data),
      {
        pending: "Creando turno...",
        success: "Turno creado exitosamente",
        error: "Error al crear el turno"
      }
    );
    } catch (error) {
    toast.error("Error interno del servidor");
  }
}
