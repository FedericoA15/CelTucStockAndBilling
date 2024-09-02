import React, { useState, ChangeEvent, useEffect } from "react";

const SearchForm: React.FC<SearchFormProps> = ({ onSearchChange }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filters, setFilters] = useState<Filters>({
    name: "",
    code: "",
    variant: {
      color: "",
      capacity: "",
      stock: "",
      price: "",
      batteryCapacity: "",
      state: "",
      productCodes: "",
      subModel: "",
    },
    branchName: "",
  });

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name in filters) {
      if (name === "branchName") {
        setFilters({ ...filters, [name]: value });
      } else {
        setFilters({ ...filters, [name]: value });
      }
    } else {
      setFilters({
        ...filters,
        variant: { ...filters.variant, [name]: value },
      });
    }
  };

  useEffect(() => {
    onSearchChange(filters);
  }, [filters]);

  return (
    <div className="text-white p-6 rounded-md w-full max-w-sm mx-auto">
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Nombre</label>
        <input
          type="text"
          name="name"
          value={filters.name}
          onChange={handleFilterChange}
          className="w-full px-3 py-2 mb-4 text-gray-700 bg-gray-200 rounded-md focus:outline-none"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Código universal
        </label>
        <input
          type="text"
          name="code"
          value={filters.code}
          onChange={handleFilterChange}
          className="w-full px-3 py-2 mb-4 text-gray-700 bg-gray-200 rounded-md focus:outline-none"
          style={{ textTransform: "none" }}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Códigos</label>
        <input
          type="text"
          name="productCodes"
          value={filters.variant.productCodes}
          onChange={handleFilterChange}
          className="w-full px-3 py-2 text-gray-700 bg-gray-200 rounded-md focus:outline-none"
          style={{ textTransform: "none" }}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Sucursal</label>
        <select
          name="branchName"
          value={filters.branchName}
          onChange={handleFilterChange}
          className="w-full px-3 py-2 text-gray-700 bg-gray-200 rounded-md focus:outline-none"
        >
          <option value="">Todas</option>
          <option value="Yerba Buena">Yerba Buena</option>
          <option value="Solar">Solar</option>
          <option value="Centro">Centro</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Modelo</label>
        <input
          type="text"
          name="subModel"
          value={filters.variant.subModel}
          onChange={handleFilterChange}
          className="w-full px-3 py-2 text-gray-700 bg-gray-200 rounded-md focus:outline-none"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Color</label>
        <input
          type="text"
          name="color"
          value={filters.variant.color}
          onChange={handleFilterChange}
          className="w-full px-3 py-2 text-gray-700 bg-gray-200 rounded-md focus:outline-none"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Capacidad</label>
        <input
          type="text"
          name="capacity"
          value={filters.variant.capacity}
          onChange={handleFilterChange}
          className="w-full px-3 py-2 text-gray-700 bg-gray-200 rounded-md focus:outline-none"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Stock</label>
        <input
          type="text"
          name="stock"
          value={filters.variant.stock}
          onChange={handleFilterChange}
          className="w-full px-3 py-2 text-gray-700 bg-gray-200 rounded-md focus:outline-none"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Precio</label>
        <input
          type="text"
          name="price"
          value={filters.variant.price}
          onChange={handleFilterChange}
          className="w-full px-3 py-2 text-gray-700 bg-gray-200 rounded-md focus:outline-none"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">
          Capacidad de batería
        </label>
        <input
          type="text"
          name="batteryCapacity"
          value={filters.variant.batteryCapacity}
          onChange={handleFilterChange}
          className="w-full px-3 py-2 text-gray-700 bg-gray-200 rounded-md focus:outline-none"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Estado</label>
        <input
          type="text"
          name="state"
          value={filters.variant.state}
          onChange={handleFilterChange}
          className="w-full px-3 py-2 text-gray-700 bg-gray-200 rounded-md focus:outline-none"
        />
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={() => {
            setFilters({
              name: "",
              code: "",
              variant: {
                color: "",
                capacity: "",
                stock: "",
                price: "",
                batteryCapacity: "",
                state: "",
                productCodes: "",
                subModel: "",
              },
              branchName: "",
            });
          }}
          className="py-2 px-4 bg-gray-500 hover:bg-gray-700 text-white font-bold rounded-md"
        >
          Restablecer
        </button>
      </div>
    </div>
  );
};

export default SearchForm;
