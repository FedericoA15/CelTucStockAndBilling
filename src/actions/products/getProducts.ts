import axiosInstance from "@/utils/axiosInstance";

export async function fetchProducts() {
  const result = await axiosInstance.get('/products');
  return result.data.content;
}
