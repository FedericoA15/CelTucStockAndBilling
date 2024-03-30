"use client"
import { useState, ChangeEvent } from 'react';

const FormBuilder: React.FC<FormBuilderProps> = ({ fields }) => {
  const [form, setForm] = useState(
    fields.reduce((obj, item) => Object.assign(obj, { [item.name]: '' }), {})
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <form className="bg-gray-800 text-white p-6 rounded-md">
      {fields.map((field) => (
        <div key={field.name} className="mb-4">
          <label className="block text-sm font-medium mb-2">{field.label}</label>
          <input
            type={field.type}
            name={field.name}
            value={form[field.name]}
            onChange={handleChange}
            className="w-full px-3 py-2 text-gray-700 bg-gray-200 rounded-md focus:outline-none"
          />
        </div>
      ))}
      <button type="submit" className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-md">
        Submit
      </button>
    </form>
  );
};

export default FormBuilder