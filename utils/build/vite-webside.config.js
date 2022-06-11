import path from "path";
import { defineConfig } from "vite";
import visualizer from "rollup-plugin-visualizer";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  root: path.resolve(__dirname, "../../website"),
  base: "/vis-three/",
  server: {
    open: "/index.html",
  },
  build: {
    outDir: path.resolve(__dirname, "../../dist-website"),
    rollupOptions: {
      output: {
        manualChunks: {
          three: ["three"],
          Antd: ["ant-design-vue"],
        },
      },
    },
  },
  plugins: [
    vue(),
    visualizer({
      open: true,
    }),
  ],
  resolve: {
    alias: {
      "@vis-three": path.resolve(__dirname, "../../dist/Vis.es.js"),
    },
  },
});
