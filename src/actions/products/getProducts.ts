import axiosInstance from "@/utils/axiosInstance";

export async function fetchProducts(name?: string, page: number = 0) {
  let url = `/products?page=${page}&size=10`;
  if (name) {
    url += `&name=${encodeURIComponent(name)}`;
  }
  const result = await axiosInstance.get(url);
  return result.data;
}