import React, { FC } from "react";

export const PlusButton: FC<ButtonProps> = ({ onClick, tittled }) => (
  <button
    onClick={onClick}
    className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
    {tittled}
  </button>
);

export const TrashButton: FC<ButtonProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
  >
    🗑️
  </button>
);

export const FormButton: FC<ButtonProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="border-white border-2 hover:text-green-400 text-white font-bold py-1.5 px-3 rounded">
    📝
  </button>
);
