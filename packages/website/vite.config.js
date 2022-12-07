import path from "path";
import { defineConfig } from "vite";
import visualizer from "rollup-plugin-visualizer";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  base: "/vis-three/",
  server: {
    open: "src/index.html",
  },
  build: {
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, "./src/index.html"),
        examples: path.resolve(__dirname, "./src/examples.html"),
      },
      output: {
        manualChunks: {
          three: ["three"],
          "vis-three": ["dist/Vis.es.js"],
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
  ]
});
