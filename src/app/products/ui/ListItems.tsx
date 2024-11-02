"use client";
import { useState, useEffect } from "react";
import { fetchProducts } from "@/actions/products/getProducts";
import { Pagination } from "@/components/pagination/Pagination";
import SearchForm from "./SearchForm";
import { ItemComponent } from "./ItemComponent";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import CartModal from "@/components/cartModal/CartModal";
import { motion } from "framer-motion";
import { FaPlus } from "react-icons/fa";

const ListComponent: React.FC = () => {
  const [data, setData] = useState<{ content: Item[]; totalPages: number }>({
    content: [],
    totalPages: 0,
  });
  const [filters, setFilters] = useState<Filters>({
    name: "",
    code: "",
    variant: {
      color: "",
      capacity: "",
      stock: "true",
      price: "",
      batteryCapacity: "",
      state: "",
      productCodes: "",
      subModel: "",
    },
    branchName: "",
  });
  const [currentPage, setCurrentPage] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const role = Cookies.get("roles");

  const redirectProduct = () => {
    router.push("/products/new");
  };

  const redirectProductVariant = () => {
    router.push("/products/productvariant/new");
  };

  useEffect(() => {
    const fetchData = async () => {
      const products = await fetchProducts(filters, currentPage);
      setData(products);
    };
    fetchData();
  }, [filters, currentPage]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSearchChange = (newFilters: Filters) => {
    setFilters(newFilters);
    setCurrentPage(0);
  };

  return (
    <div className="flex flex-col sm:flex-row p-4 text-white shadow-lg rounded-lg">
      <div>
        <CartModal />
        <SearchForm onSearchChange={handleSearchChange} />
      </div>
      <div className="w-full p-4 overflow-auto">
        <div className="flex justify-between items-center mb-4">
          {(isClient && role === "ADMIN") ||
            (role === "SUPERADMIN" && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded flex items-center"
                onClick={redirectProduct}
              >
                <FaPlus className="mr-2" /> Nuevo Producto{" "}
              </motion.button>
            ))}
          {(isClient && role === "ADMIN") ||
            (role === "SUPERADMIN" && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mb-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg shadow-md flex items-center transition duration-300 ease-in-out"
                onClick={redirectProductVariant}
              >
                <FaPlus className="mr-2 " /> Nueva Variante
              </motion.button>
            ))}
        </div>
        <div className="space-y-4  w-full">
          {data.content.map((item) => (
            <ItemComponent key={item.id} item={item} />
          ))}
        </div>
        {data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};

export default ListComponent;
