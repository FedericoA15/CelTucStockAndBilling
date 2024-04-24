// ListComponent.tsx
"use client";
import React, { useState, useEffect } from "react";
import { Pagination } from "@/components/pagination/Pagination";
import { fetchInvoices } from "@/actions/invoices/getInvoices";
import { ItemInvoice } from "./ItemInvoice";

const ListInvoice: React.FC = () => {
  const [data, setData] = useState<{ content: Invoice[]; totalPages: number }>({
    content: [],
    totalPages: 0,
  });
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const invoices = await fetchInvoices(currentPage);
      setData(invoices);
    };

    fetchData();
  }, [currentPage]);

  return (
    <div className="flex flex-col sm:flex-row">
      <div className="w-3/20">
      </div>
      <div className="w-full flex flex-col border-solid rounded-md bg-custom-black-2">
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
