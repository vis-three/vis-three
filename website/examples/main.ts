import { createApp } from "vue";
import App from "./App.vue";
import { Button } from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

import { GithubOutlined, CodeOutlined } from "@ant-design/icons-vue";

import np from "nprogress";
import "../common/css/init.css";
import "../common/css/nprogress.css";

np.start();

createApp(App)
  .use(Button)
  .component(GithubOutlined.displayName, GithubOutlined)
  .component(CodeOutlined.displayName, CodeOutlined)
  .mount("#app");

np.done();
