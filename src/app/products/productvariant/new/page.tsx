"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { getAllBranches } from "@/actions/branchs/getAllBranchs";
import { getAllProducts } from "@/actions/products/getAllProducts";
import { postProductVariant } from "@/actions/products/postProductVariant";
import { useRouter } from "next/navigation";
const FormBuilder = dynamic(
  () => import("@/components/formbuilder/FormBuilder"),
  { ssr: false }
);

export default function NewSubProduct() {
  const [branches, setBranches] = useState([]);
  const [products, setProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getAllBranches().then(setBranches);
    getAllProducts().then(setProducts);
  }, []);

  const fields: Field[] = [
    { name: "color", label: "Color", type: "text" },
    {
      name: "batteryCapacity",
      label: "Capacidad de la bateria",
      type: "number",
    },
    { name: "stock", label: "Stock", type: "number" },
    { name: "price", label: "Precio", type: "number" },
    { name: "countedPrice", label: "Precio contado", type: "number" },
    { name: "branch", label: "Sucursal", type: "select", options: branches },
    { name: "product", label: "Producto", type: "select", options: products },
    { name: "state", label: "Estado", type: "text" },
    { name: "capacity", label: "Capacidad", type: "number" },
    { name: "details", label: "Detalles", type: "text" },
    { name: "subModel", label: "SubModelo", type: "text" },
    { name: "productCodes", label: "Codigos", type: "multi-text" },
  ];

  const handleSubmit = async (data: any) => {
    const transformedData = {
      ...data,
      branch: { id: data.branch },
      product: { id: data.product },
    };
    await postProductVariant(transformedData, router);
  };

  return (
    <div className="bg-custom-bg2  bg-cover bg-center bg-no-repeat min-h-screen text-gray-200">
      <h1 className="text-white text-3xl text-center py-10">
        Nueva Variante de producto
      </h1>
      <FormBuilder fields={fields} onSubmit={handleSubmit} />
    </div>
  );
}
