import axiosInstance from "@/utils/axiosInstance";
import { toast } from 'react-toastify';

function formatDate(dateString: any) {
  const [year, month, day] = dateString.split('-');
  return `${day}-${month}-${year}`;
}

export async function getVoucherBySales(filters: object, page: number = 0) {
  try {
    let url = `/voucher/filter?type=Compra&page=${page}&size=5`;

    for (const [key, value] of Object.entries(filters)) {
      if (key === 'date' || key === 'untilDate') {
        if (value && typeof value === 'string' && value.trim() !== '') {
          const formattedDate = formatDate(value);
          url += `&${key}=${encodeURIComponent(formattedDate)}`;
        }
      } else if (typeof value === "string" && value.trim() !== "") {
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
