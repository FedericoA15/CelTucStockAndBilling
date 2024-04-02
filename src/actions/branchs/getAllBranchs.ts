import axiosInstance from "@/utils/axiosInstance";

export async function getAllBranches() {
  const response = await axiosInstance.get('/branchs/all');
  return response.data;
}

