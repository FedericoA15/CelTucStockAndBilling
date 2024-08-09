import axiosInstance from "@/utils/axiosInstance";

export async function getProductByIMEI(imei: string) {
  let url = `/products/phone/${imei}`;
  const result = await axiosInstance.get(url);
  return result.data;
}
