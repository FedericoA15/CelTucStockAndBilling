import axiosInstance from "@/utils/axiosInstance";

export async function fetchCashClosing(date: any) {
  console.log(date);
  let url = `/invoice/cash-closing?date=${date}`;
  const result = await axiosInstance.get(url);
  return result.data;
}
