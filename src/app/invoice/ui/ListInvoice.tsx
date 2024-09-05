"use client";
import React, { useState, useEffect } from "react";
import { Pagination } from "@/components/pagination/Pagination";
import { fetchInvoices } from "@/actions/invoices/getInvoices";
import { ItemInvoice } from "./ItemInvoice";
import { downloadExcel } from "@/utils/generateExcel";
import Cookies from "js-cookie";
import SearchForm from "./SearchForm";
import {
  FaFileExcel,
  FaCalendarAlt,
  FaUser,
  FaSearch,
  FaFileInvoice,
} from "react-icons/fa";

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
            className="mb-4 p-2 bg-blue-500 text-white rounded-md flex items-center gap-2"
          >
            <FaFileExcel />
            Descargar Excel
          </button>
        )}
        {data.content.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-2 p-4  text-custom-white rounded-md mb-4"
          >
            <ItemInvoice item={item} />
          </div>
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
