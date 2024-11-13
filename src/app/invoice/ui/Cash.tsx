import React, { ReactNode } from "react";

const Cash: React.FC<CashProps> = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg w-3/4 sm:w-1/2">
        <button onClick={onClose} className="text-red-500 mb-4">
          Close
        </button>
        {children}
      </div>
    </div>
  );
};

export default Cash;
