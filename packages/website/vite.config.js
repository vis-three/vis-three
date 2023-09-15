import path from "path";
import { defineConfig } from "vite";
import visualizer from "rollup-plugin-visualizer";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  server: {
    open: "src/index.html",
  },
  build: {
    outDir: path.resolve(__dirname, "../../docs"),
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, "./index.html"),
        examples: path.resolve(__dirname, "./examples.html"),
      },
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
});
