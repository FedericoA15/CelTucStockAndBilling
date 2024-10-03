import React, { useState, ChangeEvent, useEffect } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

const SearchForm: React.FC<SearchFormProps> = ({ onSearchChange }) => {
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

  const [searchTriggered, setSearchTriggered] = useState(false);

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
      onSearchChange(filters);
      setSearchTriggered(false);
    }
  }, [searchTriggered, filters, onSearchChange]);

  return (
    <div className="text-white p-6 bg-custom-grey rounded-lg shadow-md w-full max-w-md mx-auto">
      <h2 className="text-lg font-bold mb-4">Buscar Productos</h2>
          <div className="flex justify-between mt-6">
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
            setSearchTriggered(false);
          }}
          className="py-2 px-4 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-md flex items-center"
        >
          <FaTimes className="mr-2" /> Restablecer
        </button>
        <button
          type="button"
          onClick={() => {
            setSearchTriggered(true);
          }}
          className="py-2 px-4 bg-custom-blue hover:bg-blue-700 text-white font-bold rounded-md flex items-center ml-4"
        >
          <FaSearch className="mr-2" /> Buscar
        </button>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Nombre</label>
          <input
            type="text"
            name="name"
            value={filters.name}
            onChange={handleFilterChange}
            className="w-full px-3 py-2 bg-custom-grey-3 text-custom-black rounded-md border border-custom-grey focus:border-custom-blue focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            Código universal
          </label>
          <input
            type="text"
            name="code"
            value={filters.code}
            onChange={handleFilterChange}
            className="w-full px-3 py-2 bg-custom-grey-3 text-custom-black rounded-md border border-custom-grey focus:border-custom-blue focus:outline-none"
            style={{ textTransform: "none" }}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Códigos</label>
          <input
            type="text"
            name="productCodes"
            value={filters.variant.productCodes}
            onChange={handleFilterChange}
            className="w-full px-3 py-2 bg-custom-grey-3 text-custom-black rounded-md border border-custom-grey focus:border-custom-blue focus:outline-none"
            style={{ textTransform: "none" }}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Sucursal</label>
          <select
            name="branchName"
            value={filters.branchName}
            onChange={handleFilterChange}
            className="w-full px-3 py-2 bg-custom-grey-3 text-custom-black rounded-md border border-custom-grey focus:border-custom-blue focus:outline-none"
          >
            <option value="">Todas</option>
            <option value="Yerba Buena">Yerba Buena</option>
            <option value="Solar">Solar</option>
            <option value="Centro">Centro</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Modelo</label>
          <input
            type="text"
            name="subModel"
            value={filters.variant.subModel}
            onChange={handleFilterChange}
            className="w-full px-3 py-2 bg-custom-grey-3 text-custom-black rounded-md border border-custom-grey focus:border-custom-blue focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Color</label>
          <input
            type="text"
            name="color"
            value={filters.variant.color}
            onChange={handleFilterChange}
            className="w-full px-3 py-2 bg-custom-grey-3 text-custom-black rounded-md border border-custom-grey focus:border-custom-blue focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Capacidad</label>
          <input
            type="text"
            name="capacity"
            value={filters.variant.capacity}
            onChange={handleFilterChange}
            className="w-full px-3 py-2 bg-custom-grey-3 text-custom-black rounded-md border border-custom-grey focus:border-custom-blue focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Stock</label>
          <input
            type="text"
            name="stock"
            value={filters.variant.stock}
            onChange={handleFilterChange}
            className="w-full px-3 py-2 bg-custom-grey-3 text-custom-black rounded-md border border-custom-grey focus:border-custom-blue focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Precio</label>
          <input
            type="text"
            name="price"
            value={filters.variant.price}
            onChange={handleFilterChange}
            className="w-full px-3 py-2 bg-custom-grey-3 text-custom-black rounded-md border border-custom-grey focus:border-custom-blue focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            Capacidad de batería
          </label>
          <input
            type="text"
            name="batteryCapacity"
            value={filters.variant.batteryCapacity}
            onChange={handleFilterChange}
            className="w-full px-3 py-2 bg-custom-grey-3 text-custom-black rounded-md border border-custom-grey focus:border-custom-blue focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Estado</label>
          <input
            type="text"
            name="state"
            value={filters.variant.state}
            onChange={handleFilterChange}
            className="w-full px-3 py-2 bg-custom-grey-3 text-custom-black rounded-md border border-custom-grey focus:border-custom-blue focus:outline-none"
          />
        </div>
      </div>

    </div>
  );
};

export default SearchForm;
