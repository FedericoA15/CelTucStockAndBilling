import axiosInstance from "@/utils/axiosInstance";

export async function fetchInvoiceById(id: string) {
  let url = `/invoice/${id}`;
  console.log(url);
  const result = await axiosInstance.get(url);
  return result.data;
}