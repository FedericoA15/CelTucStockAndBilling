import { putProductVoucher } from "@/actions/voucher/putProductVoucher";
import { useState, useEffect } from "react";

const EditVoucherModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  voucher: Voucher;
}> = ({ isOpen, onClose, voucher }) => {
  const [formData, setFormData] = useState<Voucher>({ ...voucher });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    setFormData({ ...voucher });
  }, [voucher]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage(null);

    const response = await putProductVoucher(formData, voucher.id);
    setIsSubmitting(false);
    if (response?.success) {
      setSuccessMessage("Voucher modificado exitosamente.");
      setTimeout(() => {
        setSuccessMessage(null);
        onClose();
      }, 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-950 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-custom-black p-8 rounded-lg w-2/3 relative">
        <h2 className="text-2xl font-bold mb-4">Modificar Voucher</h2>
        {successMessage && (
          <div className="mb-4 text-green-500">{successMessage}</div>
        )}
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-white mb-1">Presupuesto</label>
            <input
              name="budget"
              placeholder="Ingrese el presupuesto"
              value={formData.budget}
              onChange={handleChange}
              className="p-2 bg-gray-700 text-white rounded w-full"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-white mb-1">Seña</label>
            <input
              name="sign"
              placeholder="Ingrese la seña"
              value={formData.sign}
              onChange={handleChange}
              className="p-2 bg-gray-700 text-white rounded w-full"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-white mb-1">Pendiente</label>
            <input
              name="slope"
              placeholder="Ingrese la pendiente"
              value={formData.slope}
              onChange={handleChange}
              className="p-2 bg-gray-700 text-white rounded w-full"
            />
          </div>
          <div className="col-span-2">
            <label className="block text-white mb-1">Diagnóstico</label>
            <textarea
              name="diagnosis"
              placeholder="Ingrese el diagnóstico"
              value={formData.diagnosis}
              onChange={handleChange}
              className="p-2 bg-gray-700 text-white rounded w-full"
            />
          </div>
          <div className="col-span-2 flex justify-end">
            <button
              type="submit"
              className={`bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded mr-2 ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Guardando..." : "Modificar"}
            </button>
            <button
              onClick={onClose}
              className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded"
            >
              Cancelar
            </button>
          </div>
        </form>
        <button
          onClick={onClose}
          className="absolute top-0 right-0 mt-4 mr-4 text-white"
        >
          X
        </button>
      </div>
    </div>
  );
};

export default EditVoucherModal;
