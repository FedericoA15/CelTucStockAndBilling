import React, { FC, MouseEventHandler } from "react";

export const PlusButton: FC<ButtonProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="border-white border-2 hover:text-slate-300 text-white font-bold py-1.5 px-3 rounded"
  >
    +
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
