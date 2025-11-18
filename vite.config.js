import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    outDir: "dist",
    assetsDir: "assets",
    rollupOptions: {
      input: {
        main: "./index.html",
        signup: "./signup.html",
        books: "./src/pages/books.html",
        gallery: "./src/pages/gallery.html",
        reader: "./src/pages/reader.html",
      },
    },
  },
});
