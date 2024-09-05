import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'custom-bg': "url('/1.png')",
        'custom-bg2': "url('/m3-macbook-pro-wallpaper-8k.png')",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'custom-black': '#121212', // Un tono más oscuro para un fondo profundo
        'custom-black-2': '#1E1E1E', // Un tono ligeramente más claro para áreas secundarias
        'custom-grey': '#2C2C2C', // Gris medio para detalles y bordes
        'custom-grey-2': '#373737', // Gris más claro para contraste sutil
        'custom-cream': '#F2A64D', // Un tono de crema cálido para acentos
        'custom-white': '#F5F5F5', // Blanco para texto y detalles importantes
        'custom-blue': '#4A90E2', // Un azul claro para elementos interactivos
        'custom-green': '#50E3C2', // Verde para estados positivos o éxito
      },
    },
  },
  plugins: [],
};  
export default config;
