import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between bg-custom-black p-2">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <span className="font-semibold text-xl tracking-tight">
          CelTuc Stock
        </span>
      </div>
      <div className="block lg:hidden">
        <button className="flex items-center px-3 py-2 border rounded text-white border-white hover:text-red-700 hover:border-red-700">
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
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <Link href="/products">
            <span className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-red-700 mr-4">
              Productos
            </span>
          </Link>
          <Link href="/invoice">
            <span className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-red-700 mr-4">
              Facturas
            </span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
