import axiosInstance from "@/utils/axiosInstance";

export async function fetchProductById(id: string) {
  let url = `/product/${id}`;
  const result = await axiosInstance.get(url);
  return result.data;
}