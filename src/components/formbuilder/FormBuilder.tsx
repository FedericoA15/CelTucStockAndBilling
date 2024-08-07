import { useState, ChangeEvent, FormEvent } from "react";

const FormBuilder: React.FC<FormBuilderProps> = ({ fields, onSubmit }) => {
  const [form, setForm] = useState<FormState>(
    fields.reduce((obj, item) => Object.assign(obj, { [item.name]: item.name === 'productCodes' ? "" : "" }), {})
  );

  type FormState = {
    [key: string]: string | string[];
  };
  
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (e.target.name === 'productCodes') {
      const value = e.target.value as string;
      setForm({ ...form, [e.target.name]: value.split(',').map((item: string) => item.trim()) });
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
      className="text-white p-6 rounded-md h-screen flex flex-col justify-start items-center"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {fields.map((field) => (
          <div key={field.name} className="mb-4">
            <label className="block text-sm font-medium mb-2">
              {field.label}
            </label>
            {field.type === "select" ? (
              <select
                name={field.name}
                value={form[field.name]}
                onChange={handleChange}
                className="w-full px-3 py-2 text-gray-700 bg-gray-200 rounded-md focus:outline-none"
              >
                <option value="">Selecciona una opción</option>
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
                className="w-full px-3 py-2 text-gray-700 bg-gray-200 rounded-md focus:outline-none"
                placeholder="Ingresa los códigos, separados por comas"
              />
            ) : (
              <input
                type={field.type}
                name={field.name}
                value={form[field.name]}
                onChange={handleChange}
                className="w-full px-3 py-2 text-gray-700 bg-gray-200 rounded-md focus:outline-none"
              />
            )}
          </div>
        ))}
      </div>
      <div className="w-full self-end flex justify-end">
        <button
          type="submit"
          className="w-1/2 py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-md"
        >
          Crear
        </button>
      </div>
    </form>
  );
};

export default FormBuilder;
