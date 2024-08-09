import axiosInstance from "@/utils/axiosInstance";
import { toast } from 'react-toastify';

export async function getVoucherBySales(filters: any, page: number = 0) {
  try {
    let url = "/voucher?type=Compra";
    
    if (filters && typeof filters === 'object') {
      const queryParameters = new URLSearchParams();

      for (const [key, value] of Object.entries(filters)) {
        if (typeof value === 'string' && value.trim() !== '') {
          queryParameters.append(key, encodeURIComponent(value));
        } else if (typeof value === 'object' && value !== null) {
          for (const [subKey, subValue] of Object.entries(value)) {
            if (typeof subValue === 'string' && subValue.trim() !== '') {
              queryParameters.append(`variants.${subKey}`, encodeURIComponent(subValue));
            }
          }
        }
      }

      if (queryParameters.toString()) {
        url += `?${queryParameters.toString()}`;
      }
    }

    const response = await toast.promise(
      axiosInstance.get(url),
      {
        pending: "Cargando comprobantes...",
        success: "Comprobantes cargados",
        error: "Error al cargar los comprobantes"
      }
    );
    
    return response.data;
  } catch (error) {
    toast.error("Error interno del servidor");
  }
}
