import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    // Avoid HMR overlay blocking the app while deps are being optimized.
    hmr: { overlay: false },
  },
  optimizeDeps: {
    // Force Vite to re-prebundle deps when the graph changes to avoid the
    // "Outdated Optimize Dep" 504 loop.
    force: true,
    // Exclude toolchains that should never be scanned by Vite in this app.
    exclude: ["next"],
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
