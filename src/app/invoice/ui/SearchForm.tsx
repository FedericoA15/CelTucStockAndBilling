import React, { useState, ChangeEvent, useEffect } from "react";

const SearchForm: React.FC<SearchFormPropsInvoice> = ({
  onSearchChangeInvoice,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filters, setFilters] = useState<FiltersInvoice>({
    client: "",
    date: "",
    id: "",
  });

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    onSearchChangeInvoice(filters);
  }, [filters]);

  return (
    <div className="text-white p-6 rounded-md w-full max-w-sm mx-auto">
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Cliente</label>
        <input
          type="text"
          name="client"
          value={filters.client}
          onChange={handleFilterChange}
          className="w-full px-3 py-2 mb-4 text-gray-700 bg-gray-200 rounded-md focus:outline-none"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Fecha</label>
        <input
          type="text"
          name="date"
          value={filters.date}
          onChange={handleFilterChange}
          className="w-full px-3 py-2 mb-4 text-gray-700 bg-gray-200 rounded-md focus:outline-none"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Codigo</label>
        <input
          type="text"
          name="id"
          value={filters.id}
          onChange={handleFilterChange}
          className="w-full px-3 py-2 mb-4 text-gray-700 bg-gray-200 rounded-md focus:outline-none"
        />
      </div>
      <div className="flex justify-between">
        <button
          type="reset"
          className="py-2 px-4 bg-gray-500 hover:bg-gray-700 text-white font-bold rounded-md"
        >
          Resteo
        </button>
        <button
          type="submit"
          className="py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-md"
        >
          Buscar
        </button>
      </div>
    </div>
  );
};

export default SearchForm;