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
    logo: "/favicon.ico",
    outline: {
      label: "本页目录",
    },
    nav: [
      { text: "首页", link: "/" },
      { text: "开始", link: "/start/intro" },
      { text: "API", link: "/api/start" },
      { text: "库", link: "/library/start" },
      { text: "版本", link: "/version/version0-5-0" },
      {
        text: "主页",
        link: "https://shiotsukikaedesari.gitee.io/vis-three/",
      },
    ],
    sidebar: {
      "/start/": [
        {
          items: [
            { text: "介绍", link: "/start/intro" },
            { text: "开始", link: "/start/start" },
            { text: "配置化开发", link: "/start/middleware" },
            { text: "配置化与框架结合", link: "/start/combine" },
            { text: "自定义插件", link: "/start/plugin" },
            { text: "自定义策略", link: "/start/strategy" },
            { text: "自定义配置化模块", link: "/start/module" },
            // { text: "组件化开发-alpha", link: "/start/widget" },
            { text: "不只是three.js", link: "/start/more" },
            { text: "Q & A", link: "/start/qa" },
          ],
        },
      ],
      // "/plugins/": [
      //   {
      //     text: "plugins",
      //     items: fs
      //       .readdirSync(path.resolve(__dirname, "../plugins"))
      //       .filter((name) => name !== "start.md")
      //       .map((version) => {
      //         const name = version.split(".").shift();
      //         return {
      //           text: name.split("-").reduce((str, elem) => {
      //             return (str += elem[0].toUpperCase() + elem.slice(1));
      //           }, ""),
      //           link: `/plugins/${name}`,
      //         };
      //       }),
      //   },
      // ],
      // "/strategy/": [
      //   {
      //     text: "strategy",
      //     items: fs
      //       .readdirSync(path.resolve(__dirname, "../strategy"))
      //       .filter((name) => name !== "start.md")
      //       .map((version) => {
      //         const name = version.split(".").shift();
      //         return {
      //           text: name.split("-").reduce((str, elem) => {
      //             return (str += elem[0].toUpperCase() + elem.slice(1));
      //           }, ""),
      //           link: `/strategy/${name}`,
      //         };
      //       }),
      //   },
      // ],
      "/version/": [
        {
          text: "version",
          items: fs
            .readdirSync(path.resolve(__dirname, "../version"))
            .map((version) => {
              const name = version.split(".").shift();
              return {
                text: name.split("-").join("."),
                link: `/version/${name}`,
              };
            }),
        },
      ],
    },
    repo: "https://github.com/Shiotsukikaedesari/vis-three",
    repoLabel: "github",

    lastUpdatedText: "更新日期",
    editLink: {
      pattern:
        "https://github.com/Shiotsukikaedesari/vis-three/tree/main/packages/docs/docs/:path",
      text: "在github上编辑此页",
    },

    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/Shiotsukikaedesari/vis-three",
      },
    ],

    docFooter: {
      prev: "上一篇",
      next: "下一篇",
    },
  },
});
