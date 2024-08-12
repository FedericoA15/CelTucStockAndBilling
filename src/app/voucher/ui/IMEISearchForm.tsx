"use client";
import React, { useState } from "react";

const IMEISearchForm: React.FC<IMEISearchFormProps> = ({ onSearch }) => {
  const [imei, setImei] = useState("");

  const handleSearch = () => {
    if (imei) {
      onSearch(imei);
    }
  };

  return (
    <div className="mb-4">
      <label htmlFor="imeiSearch" className="block font-medium">
        Pon el IMEI del celular que quieras buscar
      </label>
      <div className="flex">
        <input
          type="text"
          id="imeiSearch"
          value={imei}
          onChange={(e) => setImei(e.target.value)}
          className="mt-1 block w-full text-black border-gray-300 rounded-md shadow-sm"
        />
        <button
          type="button"
          onClick={handleSearch}
          className="ml-2 bg-blue-700 hover:bg-opacity-80 text-white font-bold py-2 px-4 rounded"
        >
          Buscar
        </button>
      </div>
    </div>
  );
};

export default IMEISearchForm;
