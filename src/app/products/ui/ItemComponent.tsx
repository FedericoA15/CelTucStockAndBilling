import { PlusButton } from "@/components/buttons/Buttons";
import { useRouter } from 'next/navigation'
import { useState } from "react";

export const ItemComponent: React.FC<{ item: Item }> = ({ item }) => {
    const [showVariants, setShowVariants] = useState(false);
    // const router = useRouter()


    // const test = ()=>{
    //     router.push('/products/new')
    // }
  
    return (
      <div className="border-2 border-gray-600 bg-gray-600 text-gray-200 p-4 m-2">
        <h2 className="font-bold text-xl">{item.name}</h2>
        <div className="flex justify-end mt-0">
          {/* <PlusButton onClick={test} /> */}
        </div>
        <p>Stock General: {item.generalStock}</p>
        {item.variants.length > 0 && (
          <button
            className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setShowVariants(!showVariants)}
          >
            {showVariants ? "Ocultar" : "Mostrar"} Variantes
          </button>
        )}
        {showVariants &&
          item.variants.map((variant) => (
            <div
              key={variant.id}
              className="mt-2 p-2 border-2 border-gray-600 bg-gray-600 text-gray-200 mb-4"
            >
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