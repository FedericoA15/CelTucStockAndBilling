import { Afip } from 'afip.ts';

const isProduction = false; 

const key: string | undefined = process.env.NEXT_PUBLIC_KEY;

const cert: string |undefined = process.env.NEXT_PUBLIC_CERT;

const afipConfig: any = {
  key: key,
  cert: cert,
  cuit: 20350940643, 
  production: isProduction,
};

export const afip = new Afip(afipConfig);

