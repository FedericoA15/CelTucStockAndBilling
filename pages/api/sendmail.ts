import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import formidable from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false, 
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).json({ error: 'Error al procesar el formulario' });
      }

      const { email, emailContent, pdfName } = fields;
      const pdfFile = files.pdf as formidable.File | formidable.File[];

      if (!email || Array.isArray(email) || !pdfFile) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
      }

      const pdfBuffer = Array.isArray(pdfFile) ? fs.readFileSync(pdfFile[0].filepath) : fs.readFileSync(pdfFile.filepath);

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: "federicoalmeida15@gmail.com",
          pass: "dhuz yfqo dlvx lscj",
        },
      });

      try {
        await transporter.sendMail({
          from: "federicoalmeida15@gmail.com",
          to: Array.isArray(email) ? email[0] : email,
          subject: 'Comprobante de Compra',
          text: Array.isArray(emailContent) ? emailContent[0] : emailContent || 'Adjunto tu comprobante de compra.',
          attachments: [
            {
              filename: Array.isArray(pdfName) ? pdfName[0] : pdfName || 'Comprobante-Compra.pdf',
              content: pdfBuffer,
            },
          ],
        });

        res.status(200).json({ success: true });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al enviar el correo' });
      }
    });
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
}
