import path from "path";
import { defineConfig } from "vite";
import visualizer from "rollup-plugin-visualizer";
import vue from "@vitejs/plugin-vue";
import fs from "fs";

// 遍历examples文件夹形成input, 顺便写一份json配置进vis-three/website/examples/assets/menus.json
const input = {};
const menusJson = [];

const recursion = (parentDir) => {
  if (!fs.statSync(parentDir).isDirectory()) {
    return;
  }

  fs.readdirSync(parentDir).forEach((filename) => {
    if (path.extname(filename) === ".html") {
      const name = `${parentDir.replace(/\\/g, "/").split("/").pop()}/${
        filename.split(".")[0]
      }`;
      input[name] = path.resolve(parentDir, `./${filename}`);

      if (filename !== "index.html") {
        menusJson.push({
          name,
          url: `${name}.html`,
          poster: `poster/${name}.jpg`,
        });
      }
    } else if (!path.extname(filename)) {
      recursion(path.resolve(parentDir, `./${filename}`));
    }
  });
};

recursion(path.resolve(__dirname, "./engine"));
recursion(path.resolve(__dirname, "./controls"));
// console.log(input);
// console.log(menusJson);

const menusPath = path.resolve(
  __dirname,
  "../website/src/examples/assets/menus.json"
);

fs.writeFileSync(menusPath, JSON.stringify(menusJson));

export default defineConfig({
  base: "/vis-three/examples/",
  server: {
    open: "/index.html",
  },
  build: {
    outDir: path.resolve(__dirname, "../website/public/examples"),
    rollupOptions: {
      input,
      output: {
        manualChunks: {
          three: ["three"],
          "vis-three": ["vis-three"],
          Antd: ["ant-design-vue"],
          echarts: ["echarts"],
          zrender: ["zrender"],
          G6: ["@antv/g6"],
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
