import { useState, ChangeEvent, FormEvent } from "react";
import { FaPlusCircle } from "react-icons/fa"; // Ejemplo de uso de ícono

const FormBuilder: React.FC<FormBuilderProps> = ({ fields, onSubmit }) => {
  const [form, setForm] = useState<FormState>(
    fields.reduce(
      (obj, item) =>
        Object.assign(obj, {
          [item.name]: item.name === "productCodes" ? "" : "",
        }),
      {}
    )
  );

  type FormState = {
    [key: string]: string | string[];
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (e.target.name === "productCodes") {
      const value = e.target.value as string;
      setForm({
        ...form,
        [e.target.name]: value.split(",").map((item: string) => item.trim()),
      });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-custom-black-2 text-custom-white p-8 rounded-lg flex flex-col items-center max-w-3xl mx-auto mt-6 space-y-6 shadow-lg"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
        {fields.map((field) => (
          <div key={field.name} className="flex flex-col space-y-2">
            <label className="text-sm font-semibold text-custom-white">
              {field.label}
            </label>
            {field.type === "select" ? (
              <select
                name={field.name}
                value={form[field.name]}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-custom-grey-2 text-custom-white border-2 border-custom-grey rounded-lg focus:outline-none focus:border-custom-blue transition duration-200"
              >
                <option value="" disabled>
                  Selecciona una opción
                </option>
                {field.options?.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            ) : field.type === "multi-text" ? (
              <input
                type="text"
                name={field.name}
                value={form[field.name]}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-custom-grey-2 text-custom-white border-2 border-custom-grey rounded-lg focus:outline-none focus:border-custom-blue transition duration-200"
                placeholder="Ingresa los códigos, separados por comas"
              />
            ) : (
              <input
                type={field.type}
                name={field.name}
                value={form[field.name]}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-custom-grey-2 text-custom-white border-2 border-custom-grey rounded-lg focus:outline-none focus:border-custom-blue transition duration-200"
              />
            )}
          </div>
        ))}
      </div>
      <div className="w-full flex justify-end mt-4">
        <button
          type="submit"
          className="flex items-center justify-center py-2 px-4 bg-custom-green hover:bg-custom-cream text-custom-black font-bold rounded-lg shadow-md transform hover:scale-105 transition duration-300 ease-in-out"
        >
          <FaPlusCircle className="mr-2" /> Crear
        </button>
      </div>
    </form>
  );
};

export default FormBuilder;
