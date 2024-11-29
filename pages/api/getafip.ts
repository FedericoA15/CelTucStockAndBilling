import { afip } from "@/utils/afipInstance";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const invoice = await afip.electronicBillingService.getVoucherInfo(6,6,8);
    // const invoice = await afip.electronicBillingService.getVoucherTypes();

    // const invoice = await afip.electronicBillingService.getLastVoucher(6, 8); 
    res.status(200).json(invoice);
  } catch (error: any) {
    console.error("Error al generar factura:", error);
    res.status(500).json({ error: error.message || "Error desconocido" });
  }
}
