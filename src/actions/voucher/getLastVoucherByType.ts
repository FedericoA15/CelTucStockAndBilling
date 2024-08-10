import axiosInstance from "@/utils/axiosInstance";

export async function getLastVoucherByType(type: string) {
  let url = `/voucher?type=${type}`;
  const result = await axiosInstance.get(url);
  return result.data;
  console.log(result.data);
}