"use client";
import React, { useState, useEffect } from "react";
import { Pagination } from "@/components/pagination/Pagination";
import { fetchInvoices } from "@/actions/invoices/getInvoices";
import { ItemInvoice } from "./ItemInvoice";
import { downloadExcel } from "@/utils/generateExcel";
import Cookies from "js-cookie";
import SearchForm from "./SearchForm";
import { FaFileExcel } from "react-icons/fa";
import { fetchCashClosing } from "@/actions/invoices/getcash";
import Cash from "./Cash";

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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [cashClosingData, setCashClosingData] = useState(null);

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

  const handleOpenCashClosingModal = async () => {
    if (!selectedDate) return;
    const cashClosing = await fetchCashClosing(selectedDate);
    setCashClosingData(cashClosing);
    setIsModalOpen(true);
  };

  const handleDateChange = (e: any) => {
    setSelectedDate(e.target.value);
  };

  return (
    <div className="flex flex-col sm:flex-row">
      <div className="w-3/20"></div>
      <SearchForm onSearchChangeInvoice={handleSearchChange} />
      <div className="w-full flex flex-col border-solid rounded-md">
        {role === "ADMIN" || role === "SUPERADMIN" ? (
          <div className="mb-4 flex justify-between">
            <button
              onClick={handleDownloadExcel}
              className="p-2 bg-blue-500 text-white rounded-md flex items-center gap-2"
            >
              <FaFileExcel />
              Download Excel
            </button>

            <div className="flex gap-4 items-center bg-gray-800 p-4 rounded-md shadow-lg">
              <label className="text-gray-300" htmlFor="date">
                Seleccionar Fecha:
              </label>
              <input
                id="date"
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                className="p-2 rounded-md border border-gray-600 bg-gray-700 text-gray-200 outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                onClick={handleOpenCashClosingModal}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-gray-100 rounded-md hover:bg-green-500 transition-colors duration-200 shadow-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 12h14m-7-7v14"
                  />
                </svg>
                Cierre de Caja
              </button>
            </div>
          </div>
        ) : null}

        {data.content.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-2 p-4 text-custom-white rounded-md mb-4"
          >
            <ItemInvoice item={item} key={item.id} />
          </div>
        ))}

        <div className="flex justify-center items-center mb-4">
          <Pagination
            totalPages={data.totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>

        {isModalOpen && (
          <Cash onClose={() => setIsModalOpen(false)} data={cashClosingData}>
            <h2 className="text-xl font-bold">
              Cash Closing for {selectedDate}
            </h2>
            <pre className="mt-4">
              {JSON.stringify(cashClosingData, null, 2)}
            </pre>
          </Cash>
        )}
      </div>
    </div>
  );
};

export default ListInvoice;
