import React, { FC } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

export const Pagination: FC<PaginationProps> = ({
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const handlePageChange = (page: number) => {
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 0; i < totalPages; i++) {
        pageNumbers.push(renderPageButton(i));
      }
    } else {
      if (currentPage < 3) {
        for (let i = 0; i < 3; i++) {
          pageNumbers.push(renderPageButton(i));
        }
        pageNumbers.push(renderEllipsis());
        pageNumbers.push(renderPageButton(totalPages - 1));
      } else if (currentPage > totalPages - 4) {
        pageNumbers.push(renderPageButton(0));
        pageNumbers.push(renderEllipsis());
        for (let i = totalPages - 3; i < totalPages; i++) {
          pageNumbers.push(renderPageButton(i));
        }
      } else {
        pageNumbers.push(renderPageButton(0));
        pageNumbers.push(renderEllipsis());
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(renderPageButton(i));
        }
        pageNumbers.push(renderEllipsis());
        pageNumbers.push(renderPageButton(totalPages - 1));
      }
    }

    return pageNumbers;
  };

  const renderPageButton = (page: number) => (
    <button
      key={page}
      className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors duration-300 ${
        page === currentPage
          ? "bg-blue-600 text-white"
          : "bg-gray-700 text-gray-300 hover:bg-gray-600"
      }`}
      onClick={() => handlePageChange(page)}
    >
      {page + 1}
    </button>
  );

  const renderEllipsis = () => (
    <span
      key="ellipsis"
      className="w-10 h-10 flex items-center justify-center text-gray-400"
    >
      ...
    </span>
  );

  return (
    <div className="flex items-center justify-center mt-8 space-x-2">
      <button
        disabled={currentPage === 0}
        onClick={() => handlePageChange(0)}
        className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors duration-300 ${
          currentPage === 0
            ? "bg-gray-800 text-gray-600 cursor-not-allowed"
            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
        }`}
        aria-label="First page"
      >
        <ChevronsLeft size={20} />
      </button>
      <button
        disabled={currentPage === 0}
        onClick={() => handlePageChange(currentPage - 1)}
        className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors duration-300 ${
          currentPage === 0
            ? "bg-gray-800 text-gray-600 cursor-not-allowed"
            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
        }`}
        aria-label="Previous page"
      >
        <ChevronLeft size={20} />
      </button>
      {renderPageNumbers()}
      <button
        disabled={currentPage >= totalPages - 1}
        onClick={() => handlePageChange(currentPage + 1)}
        className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors duration-300 ${
          currentPage >= totalPages - 1
            ? "bg-gray-800 text-gray-600 cursor-not-allowed"
            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
        }`}
        aria-label="Next page"
      >
        <ChevronRight size={20} />
      </button>
      <button
        disabled={currentPage >= totalPages - 1}
        onClick={() => handlePageChange(totalPages - 1)}
        className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors duration-300 ${
          currentPage >= totalPages - 1
            ? "bg-gray-800 text-gray-600 cursor-not-allowed"
            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
        }`}
        aria-label="Last page"
      >
        <ChevronsRight size={20} />
      </button>
    </div>
  );
};
