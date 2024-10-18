import path from "path";
import fs from "fs";

export const META_URL = "";
export const META_TITLE = "VIS-THREE";
export const META_DESCRIPTION =
  "A web 3D development framework for assembled based on three.js";

const getAPIModules = function (url) {
  const apiPath = path.resolve(__dirname, "../zh/api");
  const targetPath = path.resolve(apiPath, `./${url}`);
  const list = [];

  const files = fs.readdirSync(targetPath);

  files.forEach((file) => {
    const name = path.basename(file, path.extname(file));

    list.push({
      text: name,
      link: `/zh/api/${url}/${name}.md`,
    });
  });

  return list;
};

const getEnginesLibraryModules = function () {
  const libraryPath = path.resolve(__dirname, "../zh/library");
  const targetPath = path.resolve(libraryPath, `./engines`);
  const list = [];

  const files = fs.readdirSync(targetPath);

  files.forEach((file) => {
    list.push({
      text: path.basename(file, path.extname(file)),
      link: `/zh/library/engines/${file}`,
    });
  });

  return list;
};

const getPluginsLibraryModules = function () {
  const libraryPath = path.resolve(__dirname, "../zh/library");
  const targetPath = path.resolve(libraryPath, `./plugins`);
  const list = [];

  const files = fs.readdirSync(targetPath);

  files.forEach((file) => {
    list.push({
      text: path.basename(file, path.extname(file)),
      link: `/zh/library/plugins/${file}`,
    });
  });

  return list;
};

const getStrategysLibraryModules = function () {
  const libraryPath = path.resolve(__dirname, "../zh/library");
  const targetPath = path.resolve(libraryPath, `./strategys`);
  const list = [];

  const files = fs.readdirSync(targetPath);

  files.forEach((file) => {
    list.push({
      text: path.basename(file, path.extname(file)),
      link: `/zh/library/strategys/${file}`,
    });
  });

  return list;
};

const getModuleLibraryModules = function () {
  const libraryPath = path.resolve(__dirname, "../zh/library");
  const targetPath = path.resolve(libraryPath, `./module`);
  const list = [];

  const files = fs.readdirSync(targetPath);

  files.forEach((file) => {
    list.push({
      text: file,
      link: `/zh/library/module/${file}/readme.md`,
    });
  });

  return list;
};

export const zhConfig = {
  description: META_DESCRIPTION,
  head: [["link", { rel: "icon", href: "/favicon.ico" }]],
  outlineTitle: "本页目录",
  themeConfig: {
    nav: [
      { text: "首页", link: "/zh/" },
      { text: "开始", link: "/zh/start/intro" },
      { text: "API", link: "/zh/api/core/Base" },
      { text: "库", link: "/zh/library/engines/engine-display" },
      {
        text: "主页",
        link: "https://vis-three.github.io",
      },
      // {
      //   text: "版本",
      //   items: [
      //     { text: "0.7.x", link: "/zh/index.html" },
      //     { text: "0.6.x", link: "/version/0.6.x/zh/index.html" },
      //   ],
      // },
    ],
    sidebar: {
      "/zh/start/": [
        {
          items: [
            { text: "介绍", link: "/zh/start/intro" },
            { text: "安装", link: "/zh/start/install" },
            { text: "原生化开发", link: "/zh/start/native" },
            { text: "配置化开发", link: "/zh/start/config" },
            { text: "组件化开发", link: "/zh/start/widget" },
            { text: "自定义插件", link: "/zh/start/plugin" },
            { text: "自定义策略", link: "/zh/start/strategy" },
            { text: "自定义配置化模块", link: "/zh/start/module" },
            { text: "自定义配置化模型", link: "/zh/start/model" },
            { text: "配置化框架结合", link: "/zh/start/combine" },
            { text: "设计与原理", link: "/zh/start/design" },
            { text: "不只是three.js", link: "/zh/start/more" },
            { text: "Q & A", link: "/zh/start/qa" },
          ],
        },
      ],
      "/zh/api/": [
        {
          text: "@vis-three/core",
          items: getAPIModules("core"),
        },
        {
          text: "@vis-three/tdcm",
          items: getAPIModules("tdcm"),
        },
        // {
        //   text: "@vis-three/convenient",
        //   items: getAPIModules("convenient"),
        // },
        // {
        //   text: "@vis-three/utils",
        //   items: getAPIModules("utils"),
        // },
      ],
      "/zh/library/": [
        {
          text: "引擎",
          items: getEnginesLibraryModules(),
          collapsed: false,
        },
        {
          text: "插件",
          items: getPluginsLibraryModules(),
          collapsed: true,
        },
        {
          text: "策略",
          items: getStrategysLibraryModules(),
          collapsed: true,
        },
        {
          text: "模块",
          items: getModuleLibraryModules(),
          collapsed: true,
        },
        {
          text: "库",
          collapsed: true,
          items: [
            {
              text: "事件",
            },
            {
              text: "脚本动画",
            },
            {
              text: "着色器",
            },
            {
              text: "解析器",
            },
            {
              text: "修改器",
            },
            {
              text: "约束器",
            },
          ],
        },
      ],
    },
    editLink: {
      pattern:
        "https://github.com/vis-three/vis-three/tree/main/packages/docs/docs/:path",
      text: "在github上编辑此页",
    },
    docFooter: {
      prev: "上一篇",
      next: "下一篇",
    },
    lastUpdatedText: "更新日期",
  },
};
