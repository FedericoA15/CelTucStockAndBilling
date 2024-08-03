import axiosInstance from "@/utils/axiosInstance";

export async function putDollar(data: string) {
  try {
    const response = await axiosInstance.put("/dollar/f0f464e2-81c4-40a3-8614-51b9290f864c", { value: data });
    if (response.status === 200) {
      alert("Dolar actulizado");
    } else {
      alert("Error");
    }
  } catch (error) {
    alert("Error interno del servidor");
  }
}
