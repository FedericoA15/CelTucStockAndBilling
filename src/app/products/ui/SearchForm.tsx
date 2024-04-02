"use client"
import { useState } from 'react';

const SearchForm = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    name: '',
    manufacturer: '',
    dateOfEntry: '',
    status: '',
  });

  const handleSearchChange = (e: any) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e: any) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-gray-800 text-white p-6 rounded-md w-full max-w-sm mx-auto">
      <input
        type="text"
        name="search"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search by name, type, manufacturer, etc."
        className="w-full px-3 py-2 mb-4 text-gray-700 bg-gray-200 rounded-md focus:outline-none"
      />
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Name</label>
        <input
          type="text"
          name="name"
          value={filters.name}
          onChange={handleFilterChange}
          className="w-full px-3 py-2 text-gray-700 bg-gray-200 rounded-md focus:outline-none"
        />
      </div>
      {/* Repite este bloque para los demás filtros (Manufacturer, Date of Entry, Status) */}
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
