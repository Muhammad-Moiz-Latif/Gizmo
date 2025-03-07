import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    watch: {
      usePolling: true, // Ensures Vite detects file changes
    },
    strictPort: true, // Prevents port conflicts
    host: true, // Enables access from other devices
  },
})
