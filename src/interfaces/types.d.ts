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
  subModel: string;
}

interface Item {
  id: string;
  name: string;
  code: string;
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
  content: Item[] | InvoiceItem [];
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

interface VariantFilters {
  color: string;
  capacity: string;
  stock: string;
  price: string;
  batteryCapacity: string;
  state: string;
}

interface Filters {
  name: string;
  variant: VariantFilters;
}

interface SearchFormProps {
  onSearchChange: (filters: Filters) => void;
}


interface InvoiceItem {
  productName: string;
  productVariant: Variant;
  quantity: number;
  price: number;
}

interface Payment {
  paymentMethod: string;
  amount: number;
  details: string;
}

interface Invoice {
  id: string;
  userEmail: string;
  date: string;
  client: string;
  invoiceItems: InvoiceItem[];
  payments: Payment[];
}

interface Props {
  params: {
    id: string;
  };
}