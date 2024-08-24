"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="flex items-center justify-between flex-wrap bg-custom-black p-2">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-xl tracking-tight">
          CelTuc Stock
        </span>
      </div>
      <div className="block lg:hidden">
        <button
          onClick={toggleMenu}
          className="flex items-center px-3 py-2 border rounded text-white border-white hover:text-blue-700 hover:border-blue-700"
        >
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v15z" />
          </svg>
        </button>
      </div>
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } w-full block flex-grow lg:flex lg:items-center lg:w-auto`}
      >
        <div className="text-sm lg:flex-grow">
          <Link href="/products">
            <span className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-blue-700 mr-4">
              Productos
            </span>
          </Link>
          <Link href="/invoice">
            <span className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-blue-700 mr-4">
              Comprobantes
            </span>
          </Link>
          <Link href="/voucher">
            <span className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-blue-700 mr-4">
              Comprobantes de equipos
            </span>
          </Link>
          <Link href="/repair">
            <span className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-blue-700 mr-4">
              Comprobantes de reparaciones
            </span>
          </Link>
          <Link href="/contract">
            <span className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-blue-700 mr-4">
              Comprobantes de contratos
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
