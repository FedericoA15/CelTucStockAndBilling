import { fetchInvoicesByExcel } from "@/actions/invoices/getInvoicesByExcel";
import { saveAs } from "file-saver";
import ExcelJS from "exceljs";

export const downloadExcel = async (
  filters: FiltersInvoice,
  currentPage: number
) => {
  try {
    const invoices = await fetchInvoicesByExcel(filters, currentPage);

    const excelData = invoices.content.map((invoice: Invoice) => {
      const payments = { efectivo: 0, transferencia: 0, tarjeta: 0 };

      invoice.payments.forEach((payment) => {
        const method =
          payment.paymentMethod.toLowerCase() as keyof typeof payments;

        if (payments[method] !== undefined) {
          payments[method] += payment.amount;
        }
      });

      return {
        dia: invoice.date,
        nombre: invoice.invoiceItems.map((item) => item.productName).join(", "),
        modelo: invoice.invoiceItems
          .map((item) => item.productVariant.subModel)
          .join(", "),
        cantidad: invoice.invoiceItems.reduce(
          (sum, item) => sum + item.quantity,
          0
        ),
        sucursal: invoice.invoiceItems
          .map((item) => item.productVariant.branchName)
          .join(", "),
        efectivo: payments.efectivo,
        transferencia: payments.transferencia,
        tarjeta: payments.tarjeta,
      };
    });

    const totals = { efectivo: 0, transferencia: 0, tarjeta: 0 };
    excelData.forEach((row: any) => {
      totals.efectivo += row.efectivo;
      totals.transferencia += row.transferencia;
      totals.tarjeta += row.tarjeta;
    });

    const workbook = generateExcel(excelData, totals);

    workbook.xlsx.writeBuffer().then((buffer) => {
      saveAs(new Blob([buffer]), "invoices.xlsx");
    });
  } catch (error) {
    console.error("Error downloading Excel", error);
  }
};

const generateExcel = (
  data: any[],
  totals: { efectivo: number; transferencia: number; tarjeta: number }
) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Facturas");

  worksheet.columns = [
    { header: "Día", key: "dia", width: 20 },
    { header: "Nombre", key: "nombre", width: 20 },
    { header: "Modelo", key: "modelo", width: 30 },
    { header: "Cantidad", key: "cantidad", width: 10 },
    { header: "Sucursal", key: "sucursal", width: 20 },
    { header: "Efectivo", key: "efectivo", width: 15 },
    { header: "Transferencia", key: "transferencia", width: 15 },
    { header: "Tarjeta", key: "tarjeta", width: 15 },
  ];

  data.forEach((row) => {
    worksheet.addRow(row);
  });

  worksheet.addRow([]);
  worksheet.addRow([]);
  worksheet.addRow(["Totales"]);
  worksheet.addRow(["Efectivo", totals.efectivo]);
  worksheet.addRow(["Transferencia", totals.transferencia]);
  worksheet.addRow(["Tarjeta", totals.tarjeta]);

  return workbook;
};
