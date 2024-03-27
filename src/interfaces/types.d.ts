interface Variant {
  id: string;
  color: string;
  batteryCapacity: number;
  stock: number;
  price: number;
  branchName: string;
}

interface Item {
  id: string;
  name: string;
  generalStock: number;
  variants: Variant[];
}





interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

interface ButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}