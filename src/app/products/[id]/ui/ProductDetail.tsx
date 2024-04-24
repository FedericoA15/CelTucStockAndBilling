"use client";
import { useEffect, useState } from "react";
import { fetchProductById } from "@/actions/products/getProductsById";

interface Props {
  id: string;
}

export const ProductDetail: React.FC<Props> = ({ id }) => {
  const [product, setProduct] = useState<Variant | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const fetchedProduct = await fetchProductById(id);
      setProduct(fetchedProduct);
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="bg-custom-black-2 text-white p-6 my-4 rounded-md w-full">

    </div>
  );
};
