import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Usamos una función para acceder al estado de la ejecución
export default defineConfig(({ command }) => {
  
  // Si el comando es 'build' (npm run deploy), usamos la ruta de GitHub.
  // Si el comando es 'serve' (npm run dev), usamos la raíz (/).
  const isProd = command === 'build';
  const base = isProd ? '/PhotonTech-web/' : '/';

  console.log(`Vite running in mode: ${command}. Base path set to: ${base}`);

  return {
    base,
    plugins: [
      react(),
      tailwindcss(),
    ],
  }
});