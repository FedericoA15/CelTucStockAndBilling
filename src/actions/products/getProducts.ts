import axiosInstance from "@/utils/axiosInstance";

export async function fetchProducts(filters: Filters, page: number = 0) {
  let url = `/products?page=${page}&size=10`;

  // Itera sobre las propiedades de 'filters'
  for (const [key, value] of Object.entries(filters)) {
    if (typeof value === 'string' && value.trim() !== '') {
      // Si el valor es una cadena y no está vacía, lo agrega al URL
      url += `&${key}=${encodeURIComponent(value)}`;
    } else if (typeof value === 'object') {
      // Si el valor es un objeto, itera sobre sus propiedades y las agrega al URL
      for (const [subKey, subValue] of Object.entries(value)) {
        if ((subValue as string).trim() !== '') {
          url += `&variants.${subKey}=${encodeURIComponent(subValue as string)}`;
        }
      }
    }
  }

  const result = await axiosInstance.get(url);
  return result.data;
}
