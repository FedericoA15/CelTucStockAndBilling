import FormBuilder from "@/components/formbuilder/FormBuilder";
import { Metadata } from "next";

const fields: Field[] = [
  { name: 'productName', label: 'Product Name', type: 'text' },
  { name: 'productDescription', label: 'Product Description', type: 'text' },
];

export const metadata: Metadata = {
  title: "test",
};

export default function newProduct() {
  return (
    <div>
      <h1>New Product</h1>
      <FormBuilder fields={fields} />
    </div>
  );
}
