import axiosInstance from "@/utils/axiosInstance";
import { toast } from "react-toastify";

export async function getProductByIMEI(imei: string) {
  let url = `/products/phone/${imei}`;
  try {
    const result = await axiosInstance.get(url);
    toast.success("Producto encontrado exitosamente");
    return result.data;
  } catch (error) {
    toast.error("Error al buscar el producto por IMEI");
    throw error;
  }
}
