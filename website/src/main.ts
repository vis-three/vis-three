import { createApp } from "vue";
import App from "./App.vue";
import { Button } from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

import { GithubOutlined } from "@ant-design/icons-vue";

import "./index.less";
import np from "nprogress";
import "./assets/css/nprogress.css";

np.start();

createApp(App)
  .use(Button)
  .component(GithubOutlined.displayName, GithubOutlined)
  .mount("#app");
