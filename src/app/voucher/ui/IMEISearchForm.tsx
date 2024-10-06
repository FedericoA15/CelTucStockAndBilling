"use client";
import React, { useState } from "react";
import { Search } from "lucide-react";

const IMEISearchForm: React.FC<IMEISearchFormProps> = ({ onSearch }) => {
  const [imei, setImei] = useState("");

  const handleSearch = () => {
    if (imei.trim()) {
      onSearch(imei.trim());
    }
  };

  return (
    <div className="mb-6 bg-custom-black-2 p-6 rounded-lg shadow-md">
      <label
        htmlFor="imeiSearch"
        className="block text-lg font-semibold text-gray-200 mb-2"
      >
        Buscar celular por IMEI
      </label>
      <div className="flex items-center">
        <input
          type="text"
          id="imeiSearch"
          value={imei}
          onChange={(e) => setImei(e.target.value)}
          className="flex-grow px-4 py-2 text-gray-900 bg-gray-100 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ingrese el IMEI del celular"
        />
        <button
          type="button"
          onClick={handleSearch}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-md transition duration-300 ease-in-out flex items-center"
        >
          <Search className="w-5 h-5 mr-2" />
          Buscar
        </button>
      </div>
    </div>
  );
};

export default IMEISearchForm;
