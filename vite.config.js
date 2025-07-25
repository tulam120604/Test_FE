import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    watch: {
      // ❗ Bỏ qua file db.json để không bị reload khi json-server ghi lại
      ignored: ["**/db.json"],
    },
  },
});
