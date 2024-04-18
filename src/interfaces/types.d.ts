interface Variant {
  id: string;
  state: string;
  color: string;
  batteryCapacity: number;
  stock: number;
  capacity: number;
  price: number;
  branchName: string;
  details: string;
  priceArs: number;
}

interface Item {
  id: string;
  name: string;
  generalStock: number;
  variants: Variant[];
}

interface Field {
  name: string;
  label: string;
  type: string;
  options?: { id: string; name: string }[];
}

interface FormBuilderProps {
  fields: Field[];
  onSubmit: (data: any) => Promise<void>;
}

interface ApiResponse {
  content: Item[];
  totalPages: number;
  number: number;
}

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

interface ButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

interface InvoiceItem {
  productVariant: {
    id: string;
  };
  quantity: number;
  price: number;
}

interface InvoiceFormProps {
  invoiceItems: InvoiceItem[];
  onSubmit: (formData: Record<string, { quantity: number; price: number }>) => void;
}

interface CartContextProps {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
}

interface CartItem {
  variant: Variant;
  itemName: string;
}
interface FormState {
  [key: string]: string;
}
interface AuthenticationResponse {
  jwt: string;
  id: string;
  username: string;
  roles: string[];
}