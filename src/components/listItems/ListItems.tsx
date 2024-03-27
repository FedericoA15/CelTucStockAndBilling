"use client"
import React, { useState, useEffect } from 'react';
import { fetchProducts } from '@/actions/products/getProducts';
import { PlusButton } from '../buttons/Buttons';
import { SearchBar } from '../searchbar/SearchBar';
import { Pagination } from '../pagination/Pagination';

const ListComponent: React.FC = () => {
  const [data, setData] = useState<Item[]>([]);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      const products = await fetchProducts(search, currentPage);
      setData(products.content);
    };

    fetchData();
  }, [search, currentPage]);

  return (
    <div className="flex flex-col">
      <SearchBar onSearch={setSearch}></SearchBar>
      {data.map((item) => (
        <ItemComponent key={item.id} item={item} />
      ))}
      <Pagination totalPages={data.totalPages} currentPage={currentPage} onPageChange={setCurrentPage} />
    </div>
  );
};

const ItemComponent: React.FC<{ item: Item }> = ({ item }) => {
  const [showVariants, setShowVariants] = useState(false);

  return (
    <div className="border-2 border-gray-600 bg-gray-600 text-gray-200 p-4 m-2">
      <h2 className="font-bold text-xl">{item.name}</h2>
      <div className="flex justify-end mt-0">
        <PlusButton />
      </div>
      <p>Stock General: {item.generalStock}</p>
      {item.variants.length > 0 && (
        <button
          className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setShowVariants(!showVariants)}
        >
          {showVariants ? 'Ocultar' : 'Mostrar'} Variantes
        </button>
      )}
      {showVariants && item.variants.map((variant) => (
        <div key={variant.id} className="mt-2 p-2 border-2 border-gray-600 bg-gray-600 text-gray-200 mb-4">
          <p>Color: {variant.color}</p>
          <p>Capacidad de Batería: {variant.batteryCapacity}</p>
          <p>Stock: {variant.stock}</p>
          <p>Precio: {variant.price}</p>
          <p>Sucursal: {variant.branchName}</p>
        </div>
      ))}
    </div>
  );
};

export default ListComponent;
