import axiosInstance from "@/utils/axiosInstance";

export async function getVoucherById(id: string) {
  let url = `/voucher/${id}`;
  const result = await axiosInstance.get(url);
  return result.data;
}