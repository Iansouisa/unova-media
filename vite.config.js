import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

export default defineConfig({
  base: "/",
  plugins: [tailwindcss()],
  server: { open: true },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        privacy: resolve(__dirname, "privacy-policy/index.html"),
        terms: resolve(__dirname, "terms-and-conditions/index.html"),
      },
    },
  },
});
