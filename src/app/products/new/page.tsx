"use client";
import dynamic from "next/dynamic";
import { postProduct } from "@/actions/products/postProduct";
import { useRouter } from "next/navigation";
const FormBuilder = dynamic(
  () => import("@/components/formbuilder/FormBuilder"),
  { ssr: false }
);
const fields: Field[] = [
  { name: "name", label: "Nombre del producto", type: "text" },
  { name: "code", label: "Codigo del producto", type: "text" },
];

export default function NewProduct() {
  const router = useRouter();
  const handleSubmit = async (data: CreateProduct) => {
      await postProduct(data,router);
  };

  return (
    <div>
      <h2 className="text-white text-3xl text-center py-10">Nuevo producto</h2>
      <FormBuilder fields={fields} onSubmit={handleSubmit} />
    </div>
  );
}
