import axiosInstance from "@/utils/axiosInstance";

export async function fetchInvoices(filters: FiltersInvoice, page: number = 0) {
  console.log(filters);
  let url = `/invoice?page=${page}&size=10`;
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
  console.log(url);
  const result = await axiosInstance.get(url);
  return result.data;
}
