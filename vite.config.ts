import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  base: '/',
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    // Pré-bundle les libs 3D (évite la ré-optimisation Vite en plein vol au 1er chargement du robot)
    include: ["three", "@react-three/fiber", "@react-three/drei"],
  },
  build: {
    outDir: 'docs',
    emptyOutDir: true,
  },
}));
