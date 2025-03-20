"use client";

import React, { useState } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import {
  Menu,
  X,
  Smartphone,
  FileText,
  FileCheck,
  FileSignature,
  PenTool,
  LogOut,
} from "lucide-react";

// Define la estructura de los elementos del menú
interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export default function Navbar(): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = (): void => {
    setIsOpen(!isOpen);
  };

  const handleLogout = (): void => {
    Object.keys(Cookies.get()).forEach((cookieName) =>
      Cookies.remove(cookieName)
    );
    window.location.href = "/";
  };

  const navItems: NavItem[] = [
    { href: "/products", label: "Productos", icon: Smartphone },
    { href: "/invoice", label: "Comprobantes", icon: FileText },
    { href: "/voucher", label: "Comprobantes de equipos", icon: FileCheck },
    { href: "/repair", label: "Comprobantes de reparaciones", icon: PenTool },
    {
      href: "/contract",
      label: "Comprobantes de contratos",
      icon: FileSignature,
    },
    {
      href: "/sign",
      label: "Comprobantes de señas",
      icon: FileSignature,
    },
  ];

  return (
    <nav className="bg-custom-black-2 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/">
              <span className="flex-shrink-0 text-white font-bold text-xl">
                CelTuc Stock
              </span>
            </Link>
          </div>
          <div className="hidden md:flex items-center">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <span className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out flex items-center">
                    <item.icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </span>
                </Link>
              ))}
              <button
                onClick={handleLogout}
                className="text-gray-300 hover:bg-red-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out flex items-center"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Cerrar sesión
              </button>
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <span className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out flex items-center">
                  <item.icon className="w-5 h-5 mr-2" />
                  {item.label}
                </span>
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="text-gray-300 hover:bg-red-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium transition duration-300 ease-in-out flex items-center"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Cerrar sesión
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
