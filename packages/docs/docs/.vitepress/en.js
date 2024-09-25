import path from "path";
import fs from "fs";

export const META_URL = "";
export const META_TITLE = "VIS-THREE";
export const META_DESCRIPTION =
  "A web 3D development framework for assembled based on three.js";

const getAPIModules = function (url) {
  const apiPath = path.resolve(__dirname, "../en/api");
  const targetPath = path.resolve(apiPath, `./${url}/modules`);
  const list = [];

  const files = fs.readdirSync(targetPath);

  files.forEach((file) => {
    const name = path.basename(file, path.extname(file));

    list.push({
      text: name,
      link: `/en/api/${url}/modules/${name}.md`,
    });
  });

  return list;
};

const getEnginesLibraryModules = function () {
  const libraryPath = path.resolve(__dirname, "../en/library");
  const targetPath = path.resolve(libraryPath, `./engines`);
  const list = [];

  const files = fs.readdirSync(targetPath);

  files.forEach((file) => {
    list.push({
      text: path.basename(file, path.extname(file)),
      link: `/en/library/engines/${file}`,
    });
  });

  return list;
};

const getPluginsLibraryModules = function () {
  const libraryPath = path.resolve(__dirname, "../en/library");
  const targetPath = path.resolve(libraryPath, `./plugins`);
  const list = [];

  const files = fs.readdirSync(targetPath);

  files.forEach((file) => {
    list.push({
      text: path.basename(file, path.extname(file)),
      link: `/en/library/plugins/${file}`,
    });
  });

  return list;
};

const getStrategysLibraryModules = function () {
  const libraryPath = path.resolve(__dirname, "../en/library");
  const targetPath = path.resolve(libraryPath, `./strategys`);
  const list = [];

  const files = fs.readdirSync(targetPath);

  files.forEach((file) => {
    list.push({
      text: path.basename(file, path.extname(file)),
      link: `/en/library/strategys/${file}`,
    });
  });

  return list;
};

const getModuleLibraryModules = function () {
  const libraryPath = path.resolve(__dirname, "../en/library");
  const targetPath = path.resolve(libraryPath, `./module`);
  const list = [];

  const files = fs.readdirSync(targetPath);

  files.forEach((file) => {
    list.push({
      text: file,
      link: `/en/library/module/${file}/readme.md`,
    });
  });

  return list;
};

export const enConfig = {
  description: META_DESCRIPTION,
  head: [["link", { rel: "icon", href: "/favicon.ico" }]],
  outlineTitle: "On this page",
  themeConfig: {
    nav: [
      { text: "Home", link: "/en/" },
      { text: "Get Started", link: "/en/start/intro" },
      { text: "API", link: "/en/api/core/modules/engine" },
      { text: "Library", link: "/en/library/engines/engine-display" },
      {
        text: "Homepage",
        link: "https://vis-three.github.io",
      },
      {
        text: "version",
        items: [{ text: "0.6.x", link: "/version/0.6.x/en/index.html" }],
      },
    ],
    sidebar: {
      "/en/start/": [
        {
          items: [
            { text: "Introduction", link: "/en/start/intro" },
            { text: "Installation", link: "/en/start/install" },
            { text: "Native Development", link: "/en/start/native" },
            {
              text: "Configuration-Driven Development",
              link: "/en/start/config",
            },
            {
              text: "Component-Based Development (Alpha)",
              link: "/en/start/widget",
            },
            {
              text: "Configurable Framework Integration",
              link: "/en/start/combine",
            },
            { text: "Custom Plugins", link: "/en/start/plugin" },
            { text: "Custom Strategy", link: "/en/start/strategy" },
            { text: "Custom Configuration Modules", link: "/en/start/module" },
            { text: "Not Just Three.js", link: "/en/start/more" },
            { text: "Q & A", link: "/en/start/qa" },
          ],
        },
      ],
      "/en/api/": [
        {
          text: "@vis-three/core",
          items: getAPIModules("core"),
        },
        {
          text: "@vis-three/middleware",
          items: getAPIModules("middleware"),
        },
        {
          text: "@vis-three/convenient",
          items: getAPIModules("convenient"),
        },
        {
          text: "@vis-three/utils",
          items: getAPIModules("utils"),
        },
      ],
      "/en/library/": [
        {
          text: "Engine",
          items: getEnginesLibraryModules(),
          collapsed: false,
        },
        {
          text: "Plugin",
          items: getPluginsLibraryModules(),
          collapsed: true,
        },
        {
          text: "Strategy",
          items: getStrategysLibraryModules(),
          collapsed: true,
        },
        {
          text: "Module",
          items: getModuleLibraryModules(),
          collapsed: true,
        },
        {
          text: "Library",
          collapsed: true,
          items: [
            {
              text: "Event",
            },
            {
              text: "Scripted Animation",
            },
            {
              text: "Shader",
            },
            {
              text: "Parser",
            },
            {
              text: "Modifier",
            },
            {
              text: "Constraint",
            },
          ],
        },
      ],
    },
    editLink: {
      pattern:
        "https://github.com/vis-three/vis-three/tree/main/packages/docs/docs/:path",
      text: "Edit this page on github",
    },
    docFooter: {
      prev: "Previous page",
      next: "Next page",
    },
    lastUpdatedText: "LastUpdated",
  },
};
