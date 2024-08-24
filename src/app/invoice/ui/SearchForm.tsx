import React, { useState, ChangeEvent, useEffect } from "react";

const SearchForm: React.FC<SearchFormPropsInvoice> = ({
  onSearchChangeInvoice,
}) => {
  const [filters, setFilters] = useState<FiltersInvoice>({
    client: "",
    seller: "",
    createdAt: "",
    shortId: "",
  });

  useEffect(() => {
    onSearchChangeInvoice(filters);
  }, [filters]);

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    setFilters({
      client: "",
      seller: "",
      createdAt: "",
      shortId: "",
    });
    onSearchChangeInvoice({
      client: "",
      seller: "",
      createdAt: "",
      shortId: "",
    });
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="text-white p-6 rounded-md w-full max-w-sm mx-auto"
    >
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
        <label className="block text-sm font-medium mb-2">Código</label>
        <input
          type="text"
          name="shortId"
          value={filters.shortId}
          onChange={handleFilterChange}
          className="w-full px-3 py-2 mb-4 text-gray-700 bg-gray-200 rounded-md focus:outline-none"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Fecha</label>
        <input
          type="date"
          name="createdAt"
          value={filters.createdAt}
          onChange={handleFilterChange}
          className="w-full px-3 py-2 mb-4 text-gray-700 bg-gray-200 rounded-md focus:outline-none"
        />
      </div>
      <div className="flex justify-between">
        <button
          type="button"
          onClick={handleReset}
          className="py-2 px-4 bg-gray-500 hover:bg-gray-700 text-white font-bold rounded-md"
        >
          Restablecer
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
