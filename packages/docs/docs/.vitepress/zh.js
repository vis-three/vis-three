import path from "path";
import fs from "fs";

export const META_URL = ''
export const META_TITLE = "VIS-THREE"
export const META_DESCRIPTION = 'A web 3D development framework for assembled based on three.js'


const getAPIModules = function (url) {
    const apiPath = path.resolve(__dirname, "../api");
    const targetPath = path.resolve(apiPath, `./${url}/modules`);
    const list = [];

    const files = fs.readdirSync(targetPath);

    files.forEach((file) => {
        const name = path.basename(file, path.extname(file));

        list.push({
            text: name,
            link: `/api/${url}/modules/${name}.md`,
        });
    });

    return list;
};

const getEnginesLibraryModules = function () {
    const libraryPath = path.resolve(__dirname, "../library");
    const targetPath = path.resolve(libraryPath, `./engines`);
    const list = [];

    const files = fs.readdirSync(targetPath);

    files.forEach((file) => {
        list.push({
            text: path.basename(file, path.extname(file)),
            link: `/library/engines/${file}`,
        });
    });

    return list;
};

const getPluginsLibraryModules = function () {
    const libraryPath = path.resolve(__dirname, "../library");
    const targetPath = path.resolve(libraryPath, `./plugins`);
    const list = [];

    const files = fs.readdirSync(targetPath);

    files.forEach((file) => {
        list.push({
            text: path.basename(file, path.extname(file)),
            link: `/library/plugins/${file}`,
        });
    });

    return list;
};

const getStrategysLibraryModules = function () {
    const libraryPath = path.resolve(__dirname, "../library");
    const targetPath = path.resolve(libraryPath, `./strategys`);
    const list = [];

    const files = fs.readdirSync(targetPath);

    files.forEach((file) => {
        list.push({
            text: path.basename(file, path.extname(file)),
            link: `/library/strategys/${file}`,
        });
    });

    return list;
};

const getModuleLibraryModules = function () {
    const libraryPath = path.resolve(__dirname, "../library");
    const targetPath = path.resolve(libraryPath, `./module`);
    const list = [];

    const files = fs.readdirSync(targetPath);

    files.forEach((file) => {
        list.push({
            text: file,
            link: `/library/module/${file}/readme.md`,
        });
    });

    return list;
};

export const zhConfig = {
    description: META_DESCRIPTION,
    head: [["link", {rel: "icon", href: "/favicon.ico"}]],
    outlineTitle: "本页目录",
    themeConfig: {
        nav: [
            {text: "首页", link: "/"},
            {text: "开始", link: "/start/intro"},
            {text: "API", link: "/api/core/modules/engine"},
            {text: "库", link: "/library/engines/engine-display"},
            {
                text: "主页",
                link: "https://vis-three.github.io",
            },
        ],
        sidebar: {
            "/start/": [
                {
                    items: [
                        {text: "介绍", link: "/start/intro"},
                        {text: "安装", link: "/start/install"},
                        {text: "原生化开发", link: "/start/native"},
                        {text: "配置化开发", link: "/start/config"},
                        {text: "组件化开发-alpha", link: "/start/widget"},
                        {text: "配置化框架结合", link: "/start/combine"},
                        {text: "自定义插件", link: "/start/plugin"},
                        {text: "自定义策略", link: "/start/strategy"},
                        {text: "自定义配置化模块", link: "/start/module"},
                        {text: "不只是three.js", link: "/start/more"},
                        {text: "Q & A", link: "/start/qa"},
                    ],
                },
            ],
            "/api/": [
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
            "/library/": [
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
