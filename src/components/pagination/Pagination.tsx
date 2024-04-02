import React, { FC } from 'react';

export const Pagination: FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i);

  return (
    <div className="flex justify-center mt-4">
      <button
        disabled={currentPage === 0}
        onClick={() => onPageChange(currentPage - 1)}
        className="mx-1 px-3 py-2 border-2 border-black bg-white text-black"
      >
        Anterior
      </button>
      {pages.map((page) => (
        <button
          key={page}
          className={`mx-1 px-3 py-2 border-2 border-black ${page === currentPage ? 'bg-black text-white' : 'bg-white text-black'}`}
          onClick={() => onPageChange(page)}
        >
          {page + 1}
        </button>
      ))}
      {/* <div className="mx-1 px-3 py-2 border-2 border-black bg-white text-black">
        Página {currentPage + 1} de {totalPages}
      </div> */}
      <button
        disabled={currentPage >= totalPages - 1}
        onClick={() => onPageChange(currentPage + 1)}
        className="mx-1 px-3 py-2 border-2 border-black bg-white text-black"
      >
        Siguiente
      </button>
    </div>
  );
};
