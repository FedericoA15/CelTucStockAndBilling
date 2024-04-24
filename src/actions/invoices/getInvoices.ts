import axiosInstance from "@/utils/axiosInstance";

export async function fetchInvoices(page: number = 0) {
  let url = `/invoice?page=${page}&size=10`;
  const result = await axiosInstance.get(url);
  return result.data;
}