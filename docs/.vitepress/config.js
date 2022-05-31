export default {
  title: "VIS-THREE",
  description: "more convenient development for three.js",
  dest: "./dist",
  head: [["link", { rel: "icon", href: "/favicon.ico" }]],
  themeConfig: {
    nav: [
      { text: "首页", link: "/" },
      { text: "开始", link: "/start/index" },
      { text: "API", link: "/api/" },
      { text: "版本", link: "/version/" },
      {
        text: "github",
        link: "https://github.com/Shiotsukikaedesari/vis-three",
      },
    ],
    sidebar: {
      "/start/": [
        { text: "开始", link: "/start/index" },
        { text: "简介", link: "/start/intro" },
      ],
    },
  },
};
