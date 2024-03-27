import React, { FC } from 'react';

export const Pagination: FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <div className="flex justify-center mt-4">
            {pages.map((page) => (
                <button
                    key={page}
                    className={`mx-1 px-3 py-2 border rounded ${page === currentPage ? 'bg-blue-500 text-white' : ''}`}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </button>
            ))}
        </div>
    );
};
