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
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const router = useRouter();
  
  const redirectProduct = () => {
    router.push("/products/new");
  };

  useEffect(() => {
    const fetchData = async () => {
      const products = await fetchProducts(search, currentPage);
      setData(products);
    };

    fetchData();
  }, [search, currentPage]);

  return (
    <div className="flex flex-col sm:flex-row">
      <div className="w-3/20">
      <CartModal/>
        <SearchForm />
      </div>
      <div className="w-4/5 flex flex-col">
        <div className="flex justify-end items-center mb-4 text-gray-200">
          <p className="font-bold text-xl ">Nuevo Producto</p>
          <PlusButton onClick={redirectProduct} />
        </div>
        {data.content.map((item) => (
          <ItemComponent key={item.id} item={item} />
        ))}
        <Pagination
          totalPages={data.totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default ListComponent;
