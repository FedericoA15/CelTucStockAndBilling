import axiosInstance from "@/utils/axiosInstance";

export async function fetchInvpices(name?: string, page: number = 0) {
  let url = `/invoices?page=${page}&size=10`;
  if (name) {
    url += `&name=${encodeURIComponent(name)}`;
  }
  const result = await axiosInstance.get(url);
  return result.data;
}