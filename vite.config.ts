import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path from "path";
import dotenv from "dotenv";

dotenv.config();  // Load .env variables

export default defineConfig({
  plugins: [react(), themePlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
    },
  },
  root: "client",
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  define: {
    "import.meta.env.VITE_GITHUB_TOKEN": JSON.stringify(process.env.VITE_GITHUB_TOKEN),
    "import.meta.env.VITE_GITHUB_API_URL": JSON.stringify(process.env.VITE_GITHUB_API_URL),
  },
});
