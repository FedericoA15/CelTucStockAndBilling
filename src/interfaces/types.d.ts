interface Variant {
  id: string;
  productCodes: string[];
  state: string;
  color: string;
  batteryCapacity: number;
  stock: number;
  capacity: number;
  price: number;
  countedPrice: number;
  branchName: string;
  details: string;
  priceArs: number;
  priceArsCounted: number;
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
  content: Item[] | InvoiceItem[];
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
  tittled: string;
}

interface InvoiceFormProps {
  invoiceItems: InvoiceItem[];
  onSubmit: (
    formData: Record<string, { quantity: number; price: number }>
  ) => void;
}

interface CartContextProps {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (item: CartItem) => void;
  cleanCart: () => void;
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
  productCodes: string
  subModel: string
}

interface Filters {
  name: string;
  code: string;
  variant: VariantFilters;
  branchName: string;
}

interface FiltersInvoice {
  client: string;
  createdAt: string;
  seller: string; 
  shortId: string;
}

interface SearchFormProps {
  onSearchChange: (filters: Filters) => void;
}
interface SearchFormPropsInvoice {
  onSearchChangeInvoice: (filters: FiltersInvoice) => void;
}

interface SearchFormPropsVoucher {
  onSearchChangeVoucher: (filters: FiltersVoucher) => void;
}


interface IMEISearchFormProps {
  onSearch: (imei: string) => void;
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
  shortId: string;
  invoiceItems: InvoiceItem[];
  payments: Payment[];
}

interface Props {
  params: {
    id: string;
  };
}

type FormState = {
  [key: string]: string | string[];
};

interface CartItemInvoice {
  itemName: string;
  variant: {
    id: string;
    price: number;
    priceArs: number;
    priceArsCounted: number;
  };
}

interface PropsId {
  id: string;
}

interface InvoicePDFProps {
  invoice: {
    client: string;
    date: string;
    invoiceItems: {
      productName: string;
      quantity: number;
      productVariant: {
        subModel: string;
        priceArs: number;
        priceArsCounted: number;
        branchName: string;
      };
    }[];
    payments: {
      paymentMethod: string;
      amount: number;
    }[];
  };
  barcode: string | null;
  id: string;
}

interface CreateProduct{
  name: string;
  code: string;
}

interface Voucher {
  id: string;
  coupon: number;
  date: string;
  client?: string;
  equipment?: string;
  failure?: string;
  obs?: string;
  reception?: string | null;
  code?: string;
  phone?: string;
  budget?: string;
  sign?: string;
  slope?: string;
  diagnosis?: string;
  DNI?: string | null;
  concept?: string | null;
  condition?: string | null;
  imei?: string | null;
  warranty?: string | null;
  paymentMethods?: string;
  total?: string | null;
  type?: string;
  user?: string;
  addition?: string;
  productVariants: Variant[];
  dniBuyer?: string
  imei2?: string
  color?: string
  brand?: string
  model?: string
}


interface FiltersVoucher {
  client: string;
  code: string;
  createdAt?: string;
  concept?: string;
  equipment: string;
  date: string;
  branchName: string;
  untilDate: string;
  email: string;
  imei?: string;
}

interface IMEIResultModalProps {
  product: any;
  onClose: () => void;
  onAddToVoucher: (item: Item | Variant) => void; // Cambia aquí para aceptar ambos tipos
}

interface FormData {
  color: string;
  batteryCapacity: string;
  stock: string;
  price: string;
  branchName: string;
  state: string;
  details: string;
  capacity: string;
  subModel: string;
  productCodes: string;
  id?: string;
  countedPrice?: string;
  priceArs?: string;
  priceArsCounted?: string;
}

interface FormData {
  email: string;
  emailContent: string;
  emailTitle: string;
  pdfName: string;
}

interface TimeSheetProps {
  onSubmit: (data: {
    startTime: string;
    endTime: string;
    name: string;
  }) => void;
}

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (id: string) => void;
  id: string; 
}