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
      { text: "插件", link: "/api/engine" },
      { text: "策略", link: "/api/engine" },
      { text: "配置化", link: "/api/engine" },
      { text: "版本", link: "/version/version0-1-13" },
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
        { text: "自定义策略", link: "/start/startegy" },
        { text: "配置化", link: "/start/middleware" },
        { text: "TODO", link: "/start/todo" },
      ],
      "/api/": [
        { text: "引擎", link: "/api/engine" },
        { text: "引擎插件", link: "/api/plugins" },
        { text: "支持模块", link: "/api/support" },
        { text: "事件库", link: "/api/eventLibrary" },
        { text: "脚本动画库", link: "/api/aniScriptLibrary" },
        { text: "shader库", link: "/api/shaderLibrary" },
        {
          text: "便利工具",
          children: fs
            .readdirSync(path.resolve(__dirname, "../api/convenient"))
            .map((filename) => {
              const name = filename.split(".").shift();
              return {
                text: name.split("-").join("."),
                link: `/api/convenient/${name}`,
              };
            }),
        },
        { text: "展示器", link: "/api/displayer" },
        {
          text: "管理器",
          children: fs
            .readdirSync(path.resolve(__dirname, "../api/manager"))
            .map((filename) => {
              const name = filename.split(".").shift();
              return {
                text: name.split("-").join("."),
                link: `/api/manager/${name}`,
              };
            }),
        },
        { text: "修改器", link: "/api/modifier" },
        { text: "物体辅助", link: "/api/helper" },
        { text: "加载器", link: "/api/loader" },
        { text: "核心", link: "/api/core" },
        { text: "拓展", link: "/api/extends" },
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
