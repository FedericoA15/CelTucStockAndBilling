import React, { FC } from "react";

export const Pagination: FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i);

  const handlePageChange = (page: number) => {
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Desplazamiento suave hacia arriba
  };

  return (
    <div className="flex justify-center mt-4 space-x-2">
      <button
        disabled={currentPage === 0}
        onClick={() => handlePageChange(currentPage - 1)}
        className={`pagination-button px-3 py-2 rounded-lg border transition-colors duration-300 ${
          currentPage === 0
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
        }`}
      >
        Anterior
      </button>
      {pages.map((page) => (
        <button
          key={page}
          className={`pagination-button px-3 py-2 rounded-lg border transition-colors duration-300 ${
            page === currentPage
              ? "bg-blue-600 text-white border-blue-600"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
          }`}
          onClick={() => handlePageChange(page)}
        >
          {page + 1}
        </button>
      ))}
      <button
        disabled={currentPage >= totalPages - 1}
        onClick={() => handlePageChange(currentPage + 1)}
        className={`pagination-button px-3 py-2 rounded-lg border transition-colors duration-300 ${
          currentPage >= totalPages - 1
            ? "bg-gray-200 text-gray-500 cursor-not-allowed"
            : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
        }`}
      >
        Siguiente
      </button>
    </div>
  );
};
