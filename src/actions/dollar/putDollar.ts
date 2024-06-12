import axiosInstance from "@/utils/axiosInstance";

export async function putDollar(data: number) {
  try {
    const response = await axiosInstance.post("/dollar/0fa80126-0543-4216-85ea-9e6b1488a5e7", data);
    if (response.status === 200) {
      alert("Dolar actulizado");
    } else {
      alert("Error");
    }
  } catch (error) {
    alert("Error interno del servidor");
  }
}
