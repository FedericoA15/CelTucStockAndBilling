import axiosInstance from "@/utils/axiosInstance";
import { toast } from "react-toastify";

export async function getVoucherBySign(filters: object, page: number = 0) {
  try {
    let url = `/voucher/filter?type=Sena&page=${page}&size=5`;

    for (const [key, value] of Object.entries(filters)) {
      if (typeof value === "string" && value.trim() !== "") {
        url += `&${key}=${encodeURIComponent(value)}`;
      } else if (typeof value === "object") {
        for (const [subKey, subValue] of Object.entries(value)) {
          if ((subValue as string).trim() !== "") {
            url += `&variants.${subKey}=${encodeURIComponent(
              subValue as string
            )}`;
          }
        }
      }
    }
    const response = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    toast.error("Error interno del servidor");
  }
}
