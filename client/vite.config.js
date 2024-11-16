import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import { v6 as uuidv6 } from "uuid";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: "../.env" });

const uniqueId = uuidv6();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({
      // open: true, // Opens the report in the browser
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        // Use UUID for JavaScript/Chunk file names
        chunkFileNames: `assets/js/${uniqueId}-[name].js`,
        entryFileNames: `assets/js/${uniqueId}-[name].js`,
        // Use UUID for other assets (e.g., images, fonts, CSS)
        assetFileNames: (assetInfo) => {
          // Handle different asset types (images, fonts, CSS, etc.)
          const ext = assetInfo.name?.split(".").pop();
          return `assets/${ext}/${uniqueId}-[name].[ext]`;
        },
      },
    },
  },
  server: {
    proxy: {
      "/bms": {
        target: "http://localhost:8000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  define: {
    "process.env": process.env,
  },
});
