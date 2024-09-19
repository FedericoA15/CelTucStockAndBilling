import { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';
import { Readable } from 'stream';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const buffer = await getRawBody(req);
    const formData = await parseMultipartFormData(req, buffer);

    const pdfBuffer = extractPdfBuffer(buffer);

    // Configura el transporte de nodemailer
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.PASSWORD_EMAIL, 
      },
    });

    const info = await transporter.sendMail({
      from: "federicoalmeida15@gmail.com",
      to: formData.email,
      subject: formData.emailTitle,
      text: formData.emailContent,
      attachments: [
        {
          filename: formData.pdfName,
          content: Readable.from(pdfBuffer),
        },
      ],
    });

    // Verifica si el correo fue rechazado
    if (info.rejected.length > 0) {
      console.warn('Correos rechazados:', info.rejected);
      return res.status(400).json({ message: `Email delivery failed for: ${info.rejected.join(', ')}` });
    }

    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error sending email' });
  }
}

async function getRawBody(req: NextApiRequest): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: any[] = [];
    req.on('data', (chunk: Buffer) => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

async function parseMultipartFormData(req: NextApiRequest, buffer: Buffer): Promise<FormData> {
  const contentType = req.headers['content-type'];
  if (!contentType || !contentType.includes('multipart/form-data')) {
    throw new Error('Content-Type is not multipart/form-data');
  }

  const boundaryMatch = contentType.match(/boundary=(.+)/);
  if (!boundaryMatch) {
    throw new Error('No boundary found in Content-Type header');
  }

  const boundary = `--${boundaryMatch[1]}`;
  const parts = buffer.toString().split(boundary);

  const formData: Partial<FormData> = {};

  for (const part of parts) {
    if (part.includes('Content-Disposition')) {
      const nameMatch = part.match(/name="([^"]+)"/);
      const filenameMatch = part.match(/filename="([^"]+)"/);
      if (nameMatch && !filenameMatch) {
        const [, name] = nameMatch;
        const value = part.split('\r\n\r\n')[1]?.trim();
        (formData as any)[name] = value;
      }
    }
  }

  if (!formData.email || !formData.emailContent || !formData.emailTitle || !formData.pdfName) {
    throw new Error('Missing required form data');
  }

  return formData as FormData;
}

function extractPdfBuffer(buffer: Buffer): Buffer {
  const pdfStart = buffer.indexOf('Content-Type: application/pdf');
  if (pdfStart === -1) throw new Error('PDF content not found in request body');
  return buffer.slice(pdfStart);
}
