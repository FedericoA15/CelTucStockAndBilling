import React, { useState, ChangeEvent, useEffect } from "react";
import { FaSearch, FaTimes, FaChevronDown, FaChevronUp } from "react-icons/fa";

interface SearchFormProps {
  onSearchChange: (filters: Filters) => void;
}

export default function Component(
  { onSearchChange }: SearchFormProps = { onSearchChange: () => {} }
) {
  const [filters, setFilters] = useState<Filters>({
    name: "",
    code: "",
    variant: {
      color: "",
      capacity: "",
      stock: "true",
      price: "",
      batteryCapacity: "",
      state: "",
      productCodes: "",
      subModel: "",
    },
    branchName: "",
  });

  const [searchTriggered, setSearchTriggered] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [stockFilterActive, setStockFilterActive] = useState(true);

  const handleFilterChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name in filters) {
      setFilters({ ...filters, [name]: value });
    } else {
      setFilters({
        ...filters,
        variant: { ...filters.variant, [name]: value },
      });
    }
  };

  useEffect(() => {
    if (searchTriggered) {
      const updatedFilters = {
        ...filters,
        variant: {
          ...filters.variant,
          stock: stockFilterActive.toString(),
        },
      };

      onSearchChange(updatedFilters);
      setSearchTriggered(false);
    }
  }, [searchTriggered, filters, onSearchChange, stockFilterActive]);

  const resetFilters = () => {
    setFilters({
      name: "",
      code: "",
      variant: {
        color: "",
        capacity: "",
        stock: "true",
        price: "",
        batteryCapacity: "",
        state: "",
        productCodes: "",
        subModel: "",
      },
      branchName: "",
    });
    setStockFilterActive(true);
    setSearchTriggered(true);
  };

  const toggleStockFilter = () => {
    setStockFilterActive(!stockFilterActive);
  };

  return (
    <div className="bg-custom-black-2 text-gray-100 p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-md mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
        <h2 className="text-xl font-bold">Buscar Productos</h2>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto m-5">
          <button
            type="button"
            onClick={resetFilters}
            className="w-full sm:w-auto py-2 px-4 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md flex items-center justify-center transition duration-300 ease-in-out"
          >
            <FaTimes className="mr-2 " /> Restablecer
          </button>
          <button
            type="button"
            onClick={() => setSearchTriggered(true)}
            className="w-full sm:w-auto py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md flex items-center justify-center transition duration-300 ease-in-out"
          >
            <FaSearch className="mr-2" /> Buscar
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nombre</label>
            <input
              type="text"
              name="name"
              value={filters.name}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 bg-gray-700 text-gray-100 rounded-md border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">
              Código universal
            </label>
            <input
              type="text"
              name="code"
              value={filters.code}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 bg-gray-700 text-gray-100 rounded-md border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
              style={{ textTransform: "none" }}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Códigos</label>
          <input
            type="text"
            name="productCodes"
            value={filters.variant.productCodes}
            onChange={handleFilterChange}
            className="w-full px-3 py-2 bg-gray-700 text-gray-100 rounded-md border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
            style={{ textTransform: "none" }}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Sucursal</label>
          <select
            name="branchName"
            value={filters.branchName}
            onChange={handleFilterChange}
            className="w-full px-3 py-2 bg-gray-700 text-gray-100 rounded-md border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
          >
            <option value="">Todas</option>
            <option value="Yerba Buena">Yerba Buena</option>
            <option value="Solar">Solar</option>
            <option value="Centro">Centro</option>
          </select>
        </div>

        <button
          type="button"
          onClick={toggleStockFilter}
          className={`w-full py-2 px-4 ${
            stockFilterActive ? "bg-green-600" : "bg-gray-700"
          } hover:bg-blue-600 text-gray-100 font-medium rounded-md flex items-center justify-center transition duration-300 ease-in-out`}
        >
          {stockFilterActive
            ? "Filtro de stock activado"
            : "Filtro de stock desactivado"}
        </button>

        <button
          type="button"
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          className="w-full py-2 px-4 bg-gray-700 hover:bg-gray-600 text-gray-100 font-medium rounded-md flex items-center justify-center transition duration-300 ease-in-out"
        >
          {showAdvancedFilters ? (
            <>
              <FaChevronUp className="mr-2" /> Ocultar filtros avanzados
            </>
          ) : (
            <>
              <FaChevronDown className="mr-2" /> Mostrar filtros avanzados
            </>
          )}
        </button>

        {showAdvancedFilters && (
          <div className="space-y-4 mt-4 border-t border-gray-700 pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Modelo</label>
                <input
                  type="text"
                  name="subModel"
                  value={filters.variant.subModel}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 bg-gray-700 text-gray-100 rounded-md border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Color</label>
                <input
                  type="text"
                  name="color"
                  value={filters.variant.color}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 bg-gray-700 text-gray-100 rounded-md border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Capacidad
                </label>
                <input
                  type="text"
                  name="capacity"
                  value={filters.variant.capacity}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 bg-gray-700 text-gray-100 rounded-md border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Capacidad de batería
                </label>
                <input
                  type="text"
                  name="batteryCapacity"
                  value={filters.variant.batteryCapacity}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 bg-gray-700 text-gray-100 rounded-md border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Estado</label>
                <select
                  name="state"
                  value={filters.variant.state}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 bg-gray-700 text-gray-100 rounded-md border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
                >
                  <option value="">Todos</option>
                  <option value="Nuevo">Nuevo</option>
                  <option value="Usado">Usado</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Precio</label>
                <input
                  type="text"
                  name="price"
                  value={filters.variant.price}
                  onChange={handleFilterChange}
                  className="w-full px-3 py-2 bg-gray-700 text-gray-100 rounded-md border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
