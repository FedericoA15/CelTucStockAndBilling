"use client";
import React, { useState, useEffect } from "react";
import { Pagination } from "@/components/pagination/Pagination";
import { fetchInvoices } from "@/actions/invoices/getInvoices";
import { ItemInvoice } from "./ItemInvoice";
import { downloadExcel } from "@/utils/generateExcel";
import Cookies from "js-cookie";
import SearchForm from "./SearchForm";

const ListInvoice: React.FC = () => {
  const role = Cookies.get("roles");
  const [data, setData] = useState<{ content: Invoice[]; totalPages: number }>({
    content: [],
    totalPages: 0,
  });
  const [currentPage, setCurrentPage] = useState(0);
  const [filters, setFilters] = useState<FiltersInvoice>({
    client: "",
    seller: "",
    createdAt: "",
    shortId: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const invoices = await fetchInvoices(filters, currentPage);
      setData(invoices);
    };

    fetchData();
  }, [filters, currentPage]);

  const handleSearchChange = (newFilters: FiltersInvoice) => {
    setFilters(newFilters);
    setCurrentPage(0);
  };

  const handleDownloadExcel = async () => {
    downloadExcel(filters, currentPage);
  };

  return (
    <div className="flex flex-col sm:flex-row">
      <div className="w-3/20"></div>
      <SearchForm onSearchChangeInvoice={handleSearchChange} />
      <div className="w-full flex flex-col border-solid rounded-md ">
        {role == "ADMIN" && (
          <button
            onClick={handleDownloadExcel}
            className="mb-4 p-2 bg-blue-500 text-white rounded-md"
          >
            Descargar Excel
          </button>
        )}
        {data.content.map((item) => (
          <ItemInvoice key={item.id} item={item} />
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

export default ListInvoice;
