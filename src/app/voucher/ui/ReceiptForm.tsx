"use client";
import React, { useState, useEffect } from "react";
import { getLastVoucherByType } from "@/actions/voucher/getLastVoucherByType";
import { postVoucher } from "@/actions/voucher/postVoucher";
import { GeneratePDFByReceipt } from "@/utils/GeneratePDF";
import Cookies from "js-cookie";
import IMEIResultModal from "./IMEIResultModal";
import { getProductByIMEI } from "@/actions/products/getProductByIMEI";
import IMEISearchForm from "./IMEISearchForm";
import Link from "next/link";

const ReceiptForm: React.FC = () => {
  const id = Cookies.get("id");
  const role = Cookies.get("roles");
  const [clientEmail, setClientEmail] = useState("");
  const [product, setProduct] = useState<any>();
  const [formData, setFormData] = useState({
    coupon: "",
    date: new Date().toISOString().split("T")[0],
    client: "",
    dni: "",
    phone: "",
    concept: "",
    condition: "",
    imei: "",
    warranty: "",
    paymentMethods: "",
    obs: "",
    addition: "",
    total: "",
    branch: { id: "" },
    signature: "",
  });

  useEffect(() => {
    async function fetchLastCoupon() {
      try {
        const lastVoucher = await getLastVoucherByType("Compra");
        const lastCoupon = lastVoucher.content[0]?.coupon || 0;

        setFormData((prevData) => ({
          ...prevData,
          coupon: (parseInt(lastCoupon, 10) + 1).toString(),
        }));
      } catch (error) {
        console.error("Error al obtener el último cupón:", error);
      }
    }

    fetchLastCoupon();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "clientEmail") {
      setClientEmail(value);
    }
  };

  const handleSearch = async (imei: string) => {
    try {
      const foundProduct = await getProductByIMEI(imei);
      setProduct(foundProduct);
    } catch (error) {
      console.error("Error al buscar el producto por IMEI:", error);
    }
  };

  const handleAddToVoucher = (variant: Item) => {
    if (variant) {
      setFormData({
        ...formData,
        concept: `${product.name} - ${product.variants[0].subModel} - ${product.variants[0].details}`,
        imei: product.variants[0].productCodes[0],
        condition: product.variants[0].state,
        total: product.variants[0].price,
        addition: product.variants[0].price,
      });
      setProduct(null);
    }
  };

  const branchNames: { [key: string]: string } = {
    "e692d1b3-71a7-431a-ba8a-36754f2c64a5": "Yerba Buena",
    "e692d1b3-71a7-431a-ba8a-36754f2c64a9": "Solar",
    "e692d1b3-71a7-431a-ba8a-36754f2c64a3": "Centro",
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.branch.id) {
      alert(
        "Por favor, selecciona una sucursal antes de enviar el formulario."
      );
      return;
    }
    const foundProduct = await getProductByIMEI(formData.imei);

    const formDataWithType = {
      ...formData,
      type: "Compra",
      user: { id },
      productVariants: [foundProduct.variants[0]],
    };

    const branchName =
      branchNames[formData.branch.id] || "Sucursal desconocida";

    postVoucher(formDataWithType);
    GeneratePDFByReceipt(formDataWithType, branchName, clientEmail);
  };

  const handleCloseModal = () => {
    setProduct(null);
  };

  return (
    <div className="flex text-white items-start justify-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl p-6 bg-custom-black-2 shadow-lg rounded-lg space-y-4"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          RECIBO DE COMPRA DE EQUIPO/S
        </h2>
        <IMEISearchForm onSearch={handleSearch} />
        <div className="mb-4">
          <label htmlFor="branch" className="block font-medium">
            Sucursal
          </label>
          <select
            id="branch"
            name="branch"
            value={formData.branch.id}
            onChange={(e) =>
              setFormData({
                ...formData,
                branch: { id: e.target.value },
              })
            }
            className="mt-1 block w-full text-black border-gray-300 rounded-md shadow-sm"
          >
            <option value="" disabled>
              Selecciona una sucursal
            </option>
            <option value="e692d1b3-71a7-431a-ba8a-36754f2c64a5">
              Yerba Buena
            </option>
            <option value="e692d1b3-71a7-431a-ba8a-36754f2c64a9">Solar</option>
            <option value="e692d1b3-71a7-431a-ba8a-36754f2c64a3">Centro</option>
          </select>
        </div>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4 space-y-4 md:space-y-0">
          <div className="flex flex-col">
            <span className="font-bold">CELTUC</span>
          </div>
          <div className="w-full md:w-auto">
            <div className="flex flex-col mb-2">
              <label htmlFor="coupon" className="block font-medium">
                CUPON Nº
              </label>
              <input
                type="text"
                id="coupon"
                name="coupon"
                value={formData.coupon}
                onChange={handleChange}
                className="mt-1 block w-full text-black border-gray-300 rounded-md shadow-sm"
                readOnly
              />
            </div>
            <div className="flex flex-col mb-2">
              <label htmlFor="date" className="block font-medium">
                FECHA
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="mt-1 block w-full text-black border-gray-300 rounded-md shadow-sm"
              />
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="client" className="block font-medium">
            RECIBI DE
          </label>
          <input
            type="text"
            id="client"
            name="client"
            value={formData.client}
            onChange={handleChange}
            className="mt-1 block w-full text-black border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="dni" className="block font-medium">
              DNI
            </label>
            <input
              type="text"
              id="dni"
              name="dni"
              value={formData.dni}
              onChange={handleChange}
              className="mt-1 block w-full text-black border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block font-medium">
              Nº TEL
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 block w-full text-black border-gray-300 rounded-md shadow-sm"
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="clientEmail" className="block font-medium">
            Email
          </label>
          <input
            type="text"
            id="clientEmail"
            name="clientEmail"
            value={clientEmail}
            onChange={handleChange}
            className="mt-1 block w-full text-black border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="addition" className="block font-medium">
            LA SUMA DE
          </label>
          <input
            type="text"
            id="addition"
            name="addition"
            value={formData.addition}
            onChange={handleChange}
            className="mt-1 block w-full text-black border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="concept" className="block font-medium">
            EN CONCEPTO DE LA COMPRA DE EQUIPO/S
          </label>
          <textarea
            id="concept"
            name="concept"
            value={formData.concept}
            onChange={handleChange}
            className="mt-1 block w-full text-black border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="condition" className="block font-medium">
              CONDICION
            </label>
            <input
              type="text"
              id="condition"
              name="condition"
              value={formData.condition}
              onChange={handleChange}
              className="mt-1 block w-full text-black border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label htmlFor="total" className="block font-medium">
              TOTAL $
            </label>
            <input
              type="text"
              id="total"
              name="total"
              value={formData.total}
              onChange={handleChange}
              className="mt-1 block w-full text-black border-gray-300 rounded-md shadow-sm"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label htmlFor="imei" className="block font-medium">
              IMEI
            </label>
            <input
              type="text"
              id="imei"
              name="imei"
              value={formData.imei}
              onChange={handleChange}
              className="mt-1 block w-full text-black border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label htmlFor="warranty" className="block font-medium">
              GARANTIA
            </label>
            <input
              type="text"
              id="warranty"
              name="warranty"
              value={formData.warranty}
              onChange={handleChange}
              className="mt-1 block w-full text-black border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div>
            <label htmlFor="paymentMethods" className="block font-medium">
              FORMA DE PAGO
            </label>
            <input
              type="text"
              id="paymentMethods"
              name="paymentMethods"
              value={formData.paymentMethods}
              onChange={handleChange}
              className="mt-1 block w-full text-black border-gray-300 rounded-md shadow-sm"
            />
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="obs" className="block font-medium">
            OBSERVACIONES
          </label>
          <textarea
            id="obs"
            name="obs"
            value={formData.obs}
            onChange={handleChange}
            className="mt-1 block w-full text-black border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="signature" className="block font-medium">
            Firma
          </label>
          <textarea
            id="signature"
            name="signature"
            value={formData.signature}
            onChange={handleChange}
            className="mt-1 block w-full text-black border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-green-700 hover:bg-opacity-80 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Generar PDF y Guardar
          </button>
        </div>
        {role == "ADMIN" && (
          <div className="text-center">
            <Link href="/voucher/list">
              <button
                type="button"
                className="bg-blue-700 hover:bg-opacity-80 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Ver comprobantes
              </button>
            </Link>
          </div>
        )}
      </form>
      {product && (
        <IMEIResultModal
          product={product}
          onClose={handleCloseModal}
          onAddToVoucher={handleAddToVoucher}
        />
      )}
    </div>
  );
};

export default ReceiptForm;

// import {
//   FaStore,
//   FaCalendarAlt,
//   FaUser,
//   FaBarcode,
//   FaDollarSign,
//   FaCommentDots,
//   FaSignature,
// } from "react-icons/fa";
// import { MdEmail } from "react-icons/md";
// import Link from "next/link";

// const ReceiptForm: React.FC = () => {
//   const id = Cookies.get("id");
//   const role = Cookies.get("roles");
//   const [clientEmail, setClientEmail] = useState("");
//   const [product, setProduct] = useState<any>();
//   const [formData, setFormData] = useState({
//     coupon: "",
//     date: new Date().toISOString().split("T")[0],
//     client: "",
//     dni: "",
//     phone: "",
//     concept: "",
//     condition: "",
//     imei: "",
//     warranty: "",
//     paymentMethods: "",
//     obs: "",
//     addition: "",
//     total: "",
//     branch: { id: "" },
//     signature: "",
//   });

//   useEffect(() => {
//     async function fetchLastCoupon() {
//       try {
//         const lastVoucher = await getLastVoucherByType("Compra");
//         const lastCoupon = lastVoucher.content[0]?.coupon || 0;

//         setFormData((prevData) => ({
//           ...prevData,
//           coupon: (parseInt(lastCoupon, 10) + 1).toString(),
//         }));
//       } catch (error) {
//         console.error("Error al obtener el último cupón:", error);
//       }
//     }

//     fetchLastCoupon();
//   }, []);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     if (name === "clientEmail") {
//       setClientEmail(value);
//     }
//   };

//   const handleSearch = async (imei: string) => {
//     try {
//       const foundProduct = await getProductByIMEI(imei);
//       setProduct(foundProduct);
//     } catch (error) {
//       console.error("Error al buscar el producto por IMEI:", error);
//     }
//   };

//   const handleAddToVoucher = (variant: Item) => {
//     if (variant) {
//       setFormData({
//         ...formData,
//         concept: `${product.name} - ${product.variants[0].subModel} - ${product.variants[0].details}`,
//         imei: product.variants[0].productCodes[0],
//         condition: product.variants[0].state,
//         total: product.variants[0].price,
//         addition: product.variants[0].price,
//       });
//       setProduct(null);
//     }
//   };

//   const branchNames: { [key: string]: string } = {
//     "e692d1b3-71a7-431a-ba8a-36754f2c64a5": "Yerba Buena",
//     "e692d1b3-71a7-431a-ba8a-36754f2c64a9": "Solar",
//     "e692d1b3-71a7-431a-ba8a-36754f2c64a3": "Centro",
//   };

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();

//     if (!formData.branch.id) {
//       alert(
//         "Por favor, selecciona una sucursal antes de enviar el formulario."
//       );
//       return;
//     }
//     const foundProduct = await getProductByIMEI(formData.imei);

//     const formDataWithType = {
//       ...formData,
//       type: "Compra",
//       user: { id },
//       productVariants: [foundProduct.variants[0]],
//     };

//     const branchName =
//       branchNames[formData.branch.id] || "Sucursal desconocida";

//     postVoucher(formDataWithType);
//     GeneratePDFByReceipt(formDataWithType, branchName, clientEmail);
//   };

//   const handleCloseModal = () => {
//     setProduct(null);
//   };

//   return (
//     <div className="flex text-custom-white items-start justify-center min-h-screen ">
//       <form
//         onSubmit={handleSubmit}
//         className="w-full max-w-3xl p-8 bg-custom-black-2 shadow-lg rounded-lg space-y-6"
//       >
//         <h2 className="text-3xl font-extrabold text-center mb-6 text-custom-cream">
//           <FaStore className="inline-block mr-2" />
//           RECIBO DE COMPRA DE EQUIPO/S
//         </h2>
//         <IMEISearchForm onSearch={handleSearch} />
//         <div className="mb-6">
//           <label
//             htmlFor="branch"
//             className="block font-semibold text-custom-cream mb-2"
//           >
//             <FaStore className="inline-block mr-2" />
//             Sucursal
//           </label>
//           <select
//             id="branch"
//             name="branch"
//             value={formData.branch.id}
//             onChange={(e) =>
//               setFormData({
//                 ...formData,
//                 branch: { id: e.target.value },
//               })
//             }
//             className="w-full p-2 border-custom-grey-2 text-custom-black rounded-lg focus:ring focus:ring-custom-blue"
//           >
//             <option value="" disabled>
//               Selecciona una sucursal
//             </option>
//             {Object.entries(branchNames).map(([id, name]) => (
//               <option key={id} value={id}>
//                 {name}
//               </option>
//             ))}
//           </select>
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//           <div className="flex flex-col">
//             <label
//               htmlFor="coupon"
//               className="font-semibold text-custom-cream mb-2"
//             >
//               <FaCalendarAlt className="inline-block mr-2" />
//               CUPON Nº
//             </label>
//             <input
//               type="text"
//               id="coupon"
//               name="coupon"
//               value={formData.coupon}
//               onChange={handleChange}
//               className="w-full p-2 border-custom-grey-2 text-custom-black rounded-lg focus:ring focus:ring-custom-blue"
//               readOnly
//             />
//           </div>
//           <div className="flex flex-col">
//             <label
//               htmlFor="date"
//               className="font-semibold text-custom-cream mb-2"
//             >
//               <FaCalendarAlt className="inline-block mr-2" />
//               FECHA
//             </label>
//             <input
//               type="date"
//               id="date"
//               name="date"
//               value={formData.date}
//               onChange={handleChange}
//               className="w-full p-2 border-custom-grey-2 text-custom-black rounded-lg focus:ring focus:ring-custom-blue"
//             />
//           </div>
//         </div>
//         <div className="mb-6">
//           <label
//             htmlFor="client"
//             className="block font-semibold text-custom-cream mb-2"
//           >
//             <FaUser className="inline-block mr-2" />
//             RECIBI DE
//           </label>
//           <input
//             type="text"
//             id="client"
//             name="client"
//             value={formData.client}
//             onChange={handleChange}
//             className="w-full p-2 border-custom-grey-2 text-custom-black rounded-lg focus:ring focus:ring-custom-blue"
//           />
//         </div>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//           <div className="flex flex-col">
//             <label
//               htmlFor="dni"
//               className="font-semibold text-custom-cream mb-2"
//             >
//               <FaUser className="inline-block mr-2" />
//               DNI
//             </label>
//             <input
//               type="text"
//               id="dni"
//               name="dni"
//               value={formData.dni}
//               onChange={handleChange}
//               className="w-full p-2 border-custom-grey-2 text-custom-black rounded-lg focus:ring focus:ring-custom-blue"
//             />
//           </div>
//           <div className="flex flex-col">
//             <label
//               htmlFor="phone"
//               className="font-semibold text-custom-cream mb-2"
//             >
//               <FaBarcode className="inline-block mr-2" />
//               TELEFONO
//             </label>
//             <input
//               type="text"
//               id="phone"
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               className="w-full p-2 border-custom-grey-2 text-custom-black rounded-lg focus:ring focus:ring-custom-blue"
//             />
//           </div>
//         </div>
//         {/* Aquí se pueden añadir más campos y secciones según sea necesario */}
//         <div className="text-center mt-8">
//           <button
//             type="submit"
//             className="py-2 px-6 bg-custom-blue text-custom-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
//           >
//             Generar Recibo
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ReceiptForm;
