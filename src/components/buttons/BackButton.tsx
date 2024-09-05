"use client";

import { FaArrowLeft } from "react-icons/fa";

const BackButton: React.FC = () => {
  const goBack = () => {
    if (typeof window !== "undefined") {
      window.history.back();
    }
  };

  return (
    <button
      className="flex items-center gap-2 text-custom-white bg-custom-blue hover:bg-custom-blue-dark font-bold py-2 px-4 rounded-lg shadow-md transition-transform duration-300 transform hover:scale-105"
      onClick={goBack}
    >
      <FaArrowLeft className="text-custom-white" />
      <span>Volver</span>
    </button>
  );
};

export default BackButton;
