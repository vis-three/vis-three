import pkg from "../../../../package.json";
import { defineConfig } from "vitepress";
import path from "path";
import fs from "fs";

export default defineConfig({
  base: "/vis-three/docs",
  lang: "zh-cn",
  title: "VIS-THREE",
  description: "more convenient development for three.js",
  outDir: path.resolve(__dirname, "../../../website/public/docs"),
  head: [["link", { rel: "icon", href: "/favicon.ico" }]],
  themeConfig: {
    nav: [
      { text: "首页", link: "/" },
      { text: "开始", link: "/start/start" },
      { text: "插件", link: "/plugins/start" },
      { text: "策略", link: "/strategy/start" },
      { text: "配置化", link: "/middleware/start" },
      { text: "其他", link: "/other/start" },
      { text: "版本", link: "/version/version0-5-0" },
      {
        text: "website",
        link: "https://shiotsukikaedesari.gitee.io/vis-three/",
      },
    ],
    sidebar: {
      "/start/": [
        { text: "开始", link: "/start/start" },
        { text: "引擎构建", link: "/start/engine" },
        { text: "自定义插件", link: "/start/plugin" },
        { text: "自定义策略", link: "/start/strategy" },
        { text: "配置化开发", link: "/start/middleware" },
        { text: "组件化开发-alpha", link: "/start/widget" },
      ],
      "/version/": fs
        .readdirSync(path.resolve(__dirname, "../version"))
        .map((version) => {
          const name = version.split(".").shift();
          return {
            text: name.split("-").join("."),
            link: `/version/${name}`,
          };
        }),
    },
    repo: pkg.repository,
    repoLabel: "github",

    docsDir: "docs",
    editLinkText: "编辑此页面",
    editLinks: true,
  },
});
