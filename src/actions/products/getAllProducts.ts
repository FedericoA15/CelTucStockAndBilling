import axiosInstance from "@/utils/axiosInstance";

export async function getAllProducts() {
  const response = await axiosInstance.get('/products/all');
  return response.data;
}

