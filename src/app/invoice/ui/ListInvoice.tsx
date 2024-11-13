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

            <div className="flex gap-2 items-center">
              <input
                type="date"
                value={selectedDate}
                onChange={handleDateChange}
                className="border p-2 rounded"
              />
              <button
                onClick={handleOpenCashClosingModal}
                className="p-2 bg-green-500 text-white rounded-md"
              >
                Cash Closing
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

        {/* Cash Closing Modal */}
        {isModalOpen && (
          <Cash onClose={() => setIsModalOpen(false)}>
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
