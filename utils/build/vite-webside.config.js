import path from "path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  root: path.resolve(__dirname, "./webside"),
  base: "/vis-three/",
  server: {
    open: "/index.html",
  },
  build: {
    outDir: path.resolve(__dirname, "../../dist-webside"),
  },
  plugins: [vue()],
});
