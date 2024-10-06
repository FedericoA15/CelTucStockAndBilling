import { Calendar, Hash, Search, User, X } from "lucide-react";
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

  const [searchTriggered, setSearchTriggered] = useState(false);

  useEffect(() => {
    if (searchTriggered) {
      onSearchChangeInvoice(filters);
      setSearchTriggered(false);
    }
  }, [searchTriggered, filters, onSearchChangeInvoice]);

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
  };

  return (
    <div className="bg-custom-black text-white p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Búsqueda de Facturas
      </h2>
      <div className="space-y-4">
        <div className="relative">
          <label
            htmlFor="client"
            className="block text-sm font-medium mb-1 text-gray-300"
          >
            Cliente
          </label>
          <input
            type="text"
            id="client"
            name="client"
            value={filters.client}
            onChange={handleFilterChange}
            className="w-full pl-10 pr-3 py-2 text-gray-300 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
            placeholder="Nombre del cliente"
          />
          <User className="absolute left-3 top-9 text-gray-400 h-5 w-5" />
        </div>
        <div className="relative">
          <label
            htmlFor="shortId"
            className="block text-sm font-medium mb-1 text-gray-300"
          >
            Código
          </label>
          <input
            type="text"
            id="shortId"
            name="shortId"
            value={filters.shortId}
            onChange={handleFilterChange}
            className="w-full pl-10 pr-3 py-2 text-gray-300 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
            placeholder="Código de la factura"
          />
          <Hash className="absolute left-3 top-9 text-gray-400 h-5 w-5" />
        </div>
        <div className="relative">
          <label
            htmlFor="createdAt"
            className="block text-sm font-medium mb-1 text-gray-300"
          >
            Fecha
          </label>
          <input
            type="date"
            id="createdAt"
            name="createdAt"
            value={filters.createdAt}
            onChange={handleFilterChange}
            className="w-full pl-10 pr-3 py-2 text-gray-300 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
          />
          <Calendar className="absolute left-3 top-9 text-gray-400 h-5 w-5" />
        </div>
      </div>
      <div className="flex justify-between mt-6">
        <button
          type="button"
          onClick={handleReset}
          className="flex items-center py-2 px-4 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          <X className="mr-2 h-5 w-5" />
          Restablecer
        </button>
        <button
          type="button"
          onClick={() => setSearchTriggered(true)}
          className="flex items-center py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <Search className="mr-2 h-5 w-5" />
          Buscar
        </button>
      </div>
    </div>
  );
};

export default SearchForm;
