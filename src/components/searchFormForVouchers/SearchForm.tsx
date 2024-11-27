import React, { useState, ChangeEvent, useEffect } from "react";
import {
  Search,
  User,
  Hash,
  Smartphone,
  Calendar,
  X,
  Home,
  Phone,
  Code,
} from "lucide-react";

const SearchForm: React.FC<SearchFormPropsVoucher> = ({
  onSearchChangeVoucher,
}) => {
  const [filters, setFilters] = useState<FiltersVoucher>({
    client: "",
    code: "",
    date: "",
    concept: "",
    branchName: "",
    equipment: "",
    untilDate: "",
    email: "",
    imei: "",
  });

  const [searchTriggered, setSearchTriggered] = useState(false);

  useEffect(() => {
    if (searchTriggered) {
      onSearchChangeVoucher(filters);
      setSearchTriggered(false);
    }
  }, [searchTriggered, filters, onSearchChangeVoucher]);

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleReset = () => {
    setFilters({
      client: "",
      code: "",
      concept: "",
      date: "",
      branchName: "",
      equipment: "",
      untilDate: "",
      email: "",
    });
  };

  return (
    <div className="bg-custom-black text-white p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Búsqueda de Comprobantes
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
            htmlFor="seller"
            className="block text-sm font-medium mb-1 text-gray-300"
          >
            Vendedor
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={filters.email}
            onChange={handleFilterChange}
            className="w-full pl-10 pr-3 py-2 text-gray-300 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
            placeholder="Email del vendedor"
          />
          <User className="absolute left-3 top-9 text-gray-400 h-5 w-5" />
        </div>

        <div className="relative">
          <label
            htmlFor="seller"
            className="block text-sm font-medium mb-1 text-gray-300"
          >
            Sucursal
          </label>
          <input
            type="text"
            id="branchName"
            name="branchName"
            value={filters.branchName}
            onChange={handleFilterChange}
            className="w-full pl-10 pr-3 py-2 text-gray-300 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
            placeholder="Sucursal"
          />
          <Home className="absolute left-3 top-9 text-gray-400 h-5 w-5" />
        </div>

        <div className="relative">
          <label
            htmlFor="seller"
            className="block text-sm font-medium mb-1 text-gray-300"
          >
            Equipo
          </label>
          <input
            type="text"
            id="concept"
            name="concept"
            value={filters.concept}
            onChange={handleFilterChange}
            className="w-full pl-10 pr-3 py-2 text-gray-300 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
            placeholder="Equipo"
          />
          <Phone className="absolute left-3 top-9 text-gray-400 h-5 w-5" />
        </div>

        <div className="relative">
          <label
            htmlFor="seller"
            className="block text-sm font-medium mb-1 text-gray-300"
          >
            Imei
          </label>
          <input
            type="text"
            id="imei"
            name="imei"
            value={filters.imei}
            onChange={handleFilterChange}
            className="w-full pl-10 pr-3 py-2 text-gray-300 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
            placeholder="Imei"
          />
          <Code className="absolute left-3 top-9 text-gray-400 h-5 w-5" />
        </div>

        {/* Campo Fecha */}
        <div className="relative">
          <label
            htmlFor="createdAt"
            className="block text-sm font-medium mb-1 text-gray-300"
          >
            Fecha
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={filters.date}
            onChange={handleFilterChange}
            className="w-full pl-10 pr-3 py-2 text-gray-300 bg-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
          />
          <Calendar className="absolute left-3 top-9 text-gray-400 h-5 w-5" />
        </div>

        {/* Campo Fecha Hasta (untilDate) */}
        <div className="relative">
          <label
            htmlFor="untilDate"
            className="block text-sm font-medium mb-1 text-gray-300"
          >
            Fecha Hasta
          </label>
          <input
            type="date"
            id="untilDate"
            name="untilDate"
            value={filters.untilDate}
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
