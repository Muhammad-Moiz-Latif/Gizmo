import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // Use absolute path
    },
  },
  server: {
    watch: {
      usePolling: true,
    },
    strictPort: true,
    host: true,
  },
  build: {
    outDir: "../dist", // 👈 Places the build files outside "client"
  },
});
