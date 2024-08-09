"use client";
import React, { useState, useEffect } from "react";
import { Pagination } from "@/components/pagination/Pagination";
import { getVoucherBySales } from "@/actions/voucher/getVoucherBySales";
import { ItemVoucher } from "./ItemVoucher";
import SearchForm from "./SearchForm";

const ListVoucher: React.FC = () => {
  const [data, setData] = useState<{ content: Voucher[]; totalPages: number }>({
    content: [],
    totalPages: 0,
  });
  const [currentPage, setCurrentPage] = useState(0);
  const [filters, setFilters] = useState<FiltersVoucher>({
    client: "",
    code: "",
    date: "",
    equipment: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const vouchers = await getVoucherBySales(filters, currentPage);
      setData(vouchers);
    };

    fetchData();
  }, [filters, currentPage]);

  return (
    <div className="flex flex-col sm:flex-row">
      <div className="w-3/20"></div>
      <SearchForm onSearchChangeVoucher={setFilters} />
      <div className="w-full flex flex-col border-solid rounded-md">
        {data.content.map((item) => (
          <ItemVoucher key={item.id} item={item} />
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

export default ListVoucher;