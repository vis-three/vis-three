import path from "path";
import { defineConfig } from "vite";
import visualizer from "rollup-plugin-visualizer";
import vue from "@vitejs/plugin-vue";
import fs from "fs";

// 遍历examples文件夹形成input
const input = {};
const examplesDir = path.resolve(__dirname, "../../examples");

const recursion = (parentDir) => {
  fs.readdirSync(parentDir).forEach((filename) => {
    console.log(filename);
    if (path.extname(filename) === ".html") {
      input[`${filename.split(".")[0]}-${parseInt(Math.random() * 100)}`] =
        path.resolve(parentDir, `./${filename}`);
    } else if (!path.extname(filename)) {
      recursion(path.resolve(parentDir, `./${filename}`));
    }
  });
};

recursion(examplesDir);
console.log(input);

export default defineConfig({
  root: path.resolve(__dirname, "../../examples"),
  base: "/vis-three/examples/",
  server: {
    open: "/index.html",
  },
  build: {
    outDir: path.resolve(__dirname, "../../website/public/examples"),
    rollupOptions: {
      input,
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
  ],
  resolve: {
    alias: {
      "vis-three": path.resolve(__dirname, "../../dist/Vis.es.js"),
    },
  },
});
