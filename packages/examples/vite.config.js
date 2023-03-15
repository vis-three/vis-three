import path from "path";
import { defineConfig } from "vite";
import visualizer from "rollup-plugin-visualizer";
import vue from "@vitejs/plugin-vue";
import fs from "fs";

// 遍历examples文件夹形成input, 顺便写一份json配置进vis-three/website/examples/assets/menus.json
const input = {};
const menusJson = [];
const routerJson = [];

const recursion = (parentDir) => {
  if (!fs.statSync(parentDir).isDirectory()) {
    return;
  }

  const parentName = parentDir.replace(/\\/g, "/").split("/").pop();

  const tempRouter = {
    router: parentName,
    children: [],
  };

  fs.readdirSync(parentDir).forEach((filename) => {
    if (path.extname(filename) === ".html") {
      const name = `${parentName}/${filename.split(".")[0]}`;

      input[name] = path.resolve(parentDir, `./${filename}`);

      tempRouter.children.push(`/${filename}`);

      menusJson.push({
        name,
        url: `${name}.html`,
        poster: `poster/${name}.jpg`,
      });
    }
  });

  routerJson.push(tempRouter);
};

recursion(path.resolve(__dirname, "./engine"));
recursion(path.resolve(__dirname, "./plugins"));
recursion(path.resolve(__dirname, "./strategy"));
recursion(path.resolve(__dirname, "./convenient"));
recursion(path.resolve(__dirname, "./middleware"));
recursion(path.resolve(__dirname, "./modifier"));
recursion(path.resolve(__dirname, "./demo"));
recursion(path.resolve(__dirname, "./test"));

// console.log(routerJson);
// console.log(menusJson);

const menusPath = path.resolve(
  __dirname,
  "../website/src/examples/assets/menus.json"
);

fs.writeFileSync(menusPath, JSON.stringify(menusJson));
fs.writeFileSync(
  path.resolve(__dirname, "./router.json"),
  JSON.stringify(routerJson)
);
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
          Antdv: ["ant-design-vue"],
          echarts: ["echarts"],
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
