import { putProductVoucher } from "@/actions/voucher/putProductVoucher";
import { useState, useEffect } from "react";

const EditVoucherModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  voucher: Voucher;
}> = ({ isOpen, onClose, voucher }) => {
  const [formData, setFormData] = useState<Voucher>({
    ...voucher,
  });

  useEffect(() => {
    setFormData({
      ...voucher,
    });
  }, [voucher]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await putProductVoucher(formData, voucher.id);
    if (response?.success) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-950 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-custom-black p-8 rounded-lg w-2/3">
        <h2 className="text-2xl font-bold mb-4">Modificar Voucher</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <input
            name="budget"
            placeholder="Presupuesto"
            value={formData.budget}
            onChange={handleChange}
            className="p-2 bg-gray-700 text-white rounded"
          />
          <input
            name="sign"
            placeholder="Seña"
            value={formData.sign}
            onChange={handleChange}
            className="p-2 bg-gray-700 text-white rounded"
          />
          <input
            name="slope"
            placeholder="Pendiente"
            value={formData.slope}
            onChange={handleChange}
            className="p-2 bg-gray-700 text-white rounded"
          />
          <input
            name="slope"
            placeholder="Dignostico"
            value={formData.diagnosis}
            onChange={handleChange}
            className="p-2 bg-gray-700 text-white rounded"
          />
          <button
            type="submit"
            className="col-span-2 bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
          >
            Modificar
          </button>
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
