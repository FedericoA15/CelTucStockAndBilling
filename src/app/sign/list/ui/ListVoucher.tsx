"use client";
import React, { useState, useEffect } from "react";
import { Pagination } from "@/components/pagination/Pagination";
import { ItemVoucher } from "./ItemVoucher";
import SearchForm from "@/components/searchFormForVouchers/SearchForm";
import { getVoucherBySign } from "@/actions/voucher/getVoucherBySign";

const ListVoucher: React.FC = () => {
  const [data, setData] = useState<{ content: Voucher[]; totalPages: number }>({
    content: [],
    totalPages: 0,
  });
  const [currentPage, setCurrentPage] = useState(0);
  const [filters, setFilters] = useState<FiltersVoucher>({
    client: "",
    code: "",
    createdAt: "",
    date: "",
    branchName: "",
    concept: "",
    equipment: "",
    untilDate: "",
    email: "",
  });

  // coupon: "",
  // date: getCurrentDate(),
  // client: "",
  // concept: "",
  // sign: "",
  // obs: "",
  // budget: "",
  // total: "",
  // slope: "",
  // branch: { id: "" },
  // signature: "",

  useEffect(() => {
    const fetchData = async () => {
      const vouchers = await getVoucherBySign(filters, currentPage);
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
          <ItemVoucher key={item.id} item={item} />
        ))}
        <div className="flex justify-start items-center mt-6">
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

export default ListVoucher;
