import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Fija la base a la ruta de producción que ya sabemos que es correcta.
  // Esto garantiza que el HTML de GitHub Pages funcione siempre.
  base: '/PhotonTech-web/', 
  
  plugins: [
    react(),
    tailwindcss(),
  ],
});