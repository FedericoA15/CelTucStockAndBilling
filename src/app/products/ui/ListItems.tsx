// ListComponent.tsx
"use client";
import React, { useState, useEffect } from "react";
import { fetchProducts } from "@/actions/products/getProducts";
import { Pagination } from "@/components/pagination/Pagination";
import SearchForm from "./SearchForm";
import { ItemComponent } from "./ItemComponent";
import { PlusButton } from "@/components/buttons/Buttons";
import { useRouter } from "next/navigation";
import CartModal from "@/components/cartModal/CartModal";

const ListComponent: React.FC = () => {
  const [data, setData] = useState<{ content: Item[]; totalPages: number }>({
    content: [],
    totalPages: 0,
  });
  const [filters, setFilters] = useState<Filters>({
    name: '',
    code: '',
    variant: {
      color: '',
      capacity: '',
      stock: '',
      price: '',
      batteryCapacity: '',
      state: '',
      productCodes: '',
    },
  });
  const [currentPage, setCurrentPage] = useState(0);
  const router = useRouter();

  const redirectProduct = () => {
    router.push("/products/new");
  };

  useEffect(() => {
    const fetchData = async () => {
      const products = await fetchProducts(filters, currentPage);
      setData(products);
    };

    fetchData();
  }, [filters, currentPage]);

  return (
    <div className="flex flex-col sm:flex-row">
      <div className="w-3/20">
        <div className="flex justify-center items-center">
          <CartModal />
        </div>
        <SearchForm onSearchChange={setFilters} />
      </div>
      <div className="w-full flex flex-col border-solid rounded-md bg-custom-black-2">
        <div className="flex justify-end items-center mb-4 text-gray-200 ">
          <p className="font-bold text-xl mr-4">Nuevo Producto</p>
          <div>
            <PlusButton onClick={redirectProduct} />
          </div>
        </div>
        {data.content.map((item) => (
          <ItemComponent key={item.id} item={item} />
        ))}
        <div className="flex justify-start items-center">
          <Pagination
            totalPages={data.totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default ListComponent;
