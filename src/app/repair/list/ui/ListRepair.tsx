"use client";
import React, { useState, useEffect } from "react";
import { Pagination } from "@/components/pagination/Pagination";
import { ItemRepair } from "./ItemRepair";
import { getVoucherByWarranty } from "@/actions/voucher/getVoucherByWarranty";
import SearchForm from "@/components/searchFormForVouchers/SearchForm";

const ListRepair: React.FC = () => {
  const [data, setData] = useState<{ content: Voucher[]; totalPages: number }>({
    content: [],
    totalPages: 0,
  });
  const [currentPage, setCurrentPage] = useState(0);
  const [filters, setFilters] = useState<FiltersVoucher>({
    client: "",
    code: "",
    createdAt: "",
    equipment: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const vouchers = await getVoucherByWarranty(filters, currentPage);
      setData(vouchers);
    };

    fetchData();
  }, [filters, currentPage]);

  const handleSearchChange = (newFilters: FiltersVoucher) => {
    setFilters(newFilters);
    setCurrentPage(0);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 p-6  text-custom-white">
      <div className="lg:w-1/6 w-full p-4 rounded-lg shadow-lg ">
        <SearchForm onSearchChangeVoucher={handleSearchChange} />
      </div>
      <div className="flex-1 flex flex-col gap-6">
        {data?.content.map((item) => (
          <ItemRepair key={item.id} item={item} />
        ))}
        <div className="flex justify-center mt-6">
          <Pagination
            totalPages={data?.totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
    </div>
  );
};

export default ListRepair;
