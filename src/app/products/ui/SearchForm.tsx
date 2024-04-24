import React, { useState, ChangeEvent, useEffect } from 'react';

const SearchForm: React.FC<SearchFormProps> = ({ onSearchChange }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filters, setFilters] = useState<Filters>({
    name: '',
    variant: {
      color: '',
      capacity: '',
      stock: '',
      price: '',
      batteryCapacity: '',
      state: '',
    },
  });

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name in filters) {
      setFilters({ ...filters, [e.target.name]: e.target.value });
    } else {
      setFilters({ ...filters, variant: { ...filters.variant, [e.target.name]: e.target.value } });
    }
  };

  useEffect(() => {
    onSearchChange(filters);
  }, [filters]);

  return (
    <div className="text-white p-6 rounded-md w-full max-w-sm mx-auto">
      <input
        type="text"
        name="name"
        value={filters.name}
        onChange={handleFilterChange}
        placeholder="Search by name"
        className="w-full px-3 py-2 mb-4 text-gray-700 bg-gray-200 rounded-md focus:outline-none"
      />
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
        <label className="block text-sm font-medium mb-2">Capacity</label>
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
        <label className="block text-sm font-medium mb-2">Price</label>
        <input
          type="text"
          name="price"
          value={filters.variant.price}
          onChange={handleFilterChange}
          className="w-full px-3 py-2 text-gray-700 bg-gray-200 rounded-md focus:outline-none"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Battery Capacity</label>
        <input
          type="text"
          name="battery_capacity"
          value={filters.variant.batteryCapacity}
          onChange={handleFilterChange}
          className="w-full px-3 py-2 text-gray-700 bg-gray-200 rounded-md focus:outline-none"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">State</label>
        <input
          type="text"
          name="state"
          value={filters.variant.state}
          onChange={handleFilterChange}
          className="w-full px-3 py-2 text-gray-700 bg-gray-200 rounded-md focus:outline-none"
        />
      </div>
      <div className="flex justify-between">
        <button type="reset" className="py-2 px-4 bg-gray-500 hover:bg-gray-700 text-white font-bold rounded-md">
          Reset
        </button>
        <button type="submit" className="py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-md">
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchForm;
