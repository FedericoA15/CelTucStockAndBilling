"use client"
import React, { useState, useEffect } from 'react';
import { fetchProducts } from '@/actions/products/getProducts';

const ListComponent: React.FC = () => {
  const [data, setData] = useState<Item[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const products = await fetchProducts();
      setData(products);
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col">
      {data.map((item) => (
        <ItemComponent key={item.id} item={item} />
      ))}
    </div>
  );
};

const ItemComponent: React.FC<{ item: Item }> = ({ item }) => {
  const [showVariants, setShowVariants] = useState(false);

  return (
    <div className="border p-4 m-2">
      <h2 className="font-bold text-xl">{item.name}</h2>
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
        <div key={variant.id} className="mt-2 p-2 border">
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