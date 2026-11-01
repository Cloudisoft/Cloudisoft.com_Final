import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  base: "/",
  plugins: [react()],
  build: {
    sourcemap: false,
    // the /cloudicore page lazy-loads html2canvas + jsPDF; it is not on the home page path
    chunkSizeWarningLimit: 700,
  },
});
