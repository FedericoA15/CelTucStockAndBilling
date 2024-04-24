import axiosInstance from "@/utils/axiosInstance";

export async function postProduct(data: any) {
  try {
    const response = await axiosInstance.post("/products", data);
    if (response.status === 200) {
      alert("Producto creado exitosamente");
    } else {
      alert("Error al crear el producto");
    }
  } catch (error) {
    alert("Error interno del servidor");
  }
}
