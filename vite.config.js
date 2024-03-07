import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/codeinair-calculator",
  build: {
    chunkSizeWarningLimit: 1000, // Ajuste o limite de tamanho dos chunks para 1000kB
    minify: false, // Desativa a minificação
    rollupOptions: {
      output: {
        format: "es", // Mantém a estrutura do código ES Module
        freeze: false, // Desativa o congelamento de objetos
        hoistTransitiveImports: false, // Desativa a elevação de importações transitivas
        manualChunks: undefined, // Desativa a criação manual de chunks
      },
    },
  },
});
