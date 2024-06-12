import axiosInstance from "@/utils/axiosInstance";

export async function getDollar() {
  const response = await axiosInstance.get('/dollar');
  return response.data;
}

