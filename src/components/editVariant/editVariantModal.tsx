import { useState, useEffect } from "react";
import { putProduct } from "@/actions/products/putProductVariant";
import {
  FaTimes,
  FaPen,
  FaTag,
  FaBatteryFull,
  FaWarehouse,
  FaDollarSign,
  FaBox,
  FaInfoCircle,
  FaList,
  FaSlidersH,
} from "react-icons/fa"; // Iconos añadidos

const EditVariantModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  variant: Variant;
}> = ({ isOpen, onClose, variant }) => {
  const [formData, setFormData] = useState<any>({
    ...variant,
    productCodes: variant.productCodes.join(", "),
  });

  useEffect(() => {
    setFormData({
      ...variant,
      productCodes: variant.productCodes.join(", "),
    });
  }, [variant]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedFormData = {
      ...formData,
      productCodes: formData.productCodes
        .split(",")
        .map((code: string) => code.trim()),
    };

    const response = await putProduct(updatedFormData, variant.id);
    if (response?.success) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-custom-black-2 bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-custom-black p-8 rounded-lg w-full max-w-lg relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-custom-white hover:text-custom-grey-2 transition duration-200"
        >
          <FaTimes size={20} />
        </button>
        <h2 className="text-2xl font-bold text-custom-cream mb-6 text-center flex items-center justify-center">
          <FaPen className="mr-2" /> Modificar Variante de Producto
        </h2>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {[
            {
              name: "color",
              placeholder: "Color",
              icon: <FaTag />,
              label: "Color",
            },
            {
              name: "batteryCapacity",
              placeholder: "Capacidad de la batería",
              icon: <FaBatteryFull />,
              label: "Capacidad de la batería",
            },
            {
              name: "stock",
              placeholder: "Stock",
              icon: <FaBox />,
              label: "Stock",
            },
            {
              name: "price",
              placeholder: "Precio",
              icon: <FaDollarSign />,
              label: "Precio",
            },
            {
              name: "branchName",
              placeholder: "Sucursal",
              icon: <FaWarehouse />,
              label: "Sucursal",
            },
            {
              name: "state",
              placeholder: "Estado",
              icon: <FaList />,
              label: "Estado",
            },
            {
              name: "details",
              placeholder: "Detalles",
              icon: <FaInfoCircle />,
              label: "Detalles",
            },
            {
              name: "capacity",
              placeholder: "Capacidad",
              icon: <FaSlidersH />,
              label: "Capacidad",
            },
            {
              name: "subModel",
              placeholder: "SubModelo",
              icon: <FaTag />,
              label: "SubModelo",
              fullWidth: true,
            },
            {
              name: "productCodes",
              placeholder: "Ingresa los códigos, separados por comas",
              icon: <FaTag />,
              label: "Códigos de producto",
              fullWidth: true,
            },
          ].map((field) => (
            <div
              key={field.name}
              className={`flex flex-col ${field.fullWidth ? "col-span-2" : ""}`}
            >
              <label className="flex items-center text-sm font-semibold text-custom-white mb-1">
                {field.icon}
                <span className="ml-2">{field.label}</span>
              </label>
              <div className="flex items-center bg-custom-grey-2 rounded border-2 border-custom-grey">
                <input
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className={`flex-1 p-2 bg-transparent text-custom-white placeholder-custom-grey-2 focus:outline-none focus:border-custom-blue transition duration-200 ${
                    field.fullWidth ? "w-full" : ""
                  }`}
                />
              </div>
            </div>
          ))}
          <button
            type="submit"
            className="col-span-2 flex items-center justify-center py-2 px-4 bg-custom-green hover:bg-custom-cream text-custom-black font-bold rounded-lg shadow-md transform hover:scale-105 transition duration-300"
          >
            <FaPen className="mr-2" /> Modificar
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditVariantModal;
