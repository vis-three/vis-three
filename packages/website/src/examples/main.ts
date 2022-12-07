import { createApp } from "vue";
import App from "./App.vue";
import { Button, Image, Input } from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

import {
  GithubOutlined,
  CodeOutlined,
  HomeOutlined,
  SearchOutlined,
} from "@ant-design/icons-vue";

import np from "nprogress";
import "../common/css/init.css";
import "../common/css/nprogress.css";

np.start();

createApp(App)
  .use(Button)
  .use(Image)
  .use(Input)
  .component(GithubOutlined.displayName, GithubOutlined)
  .component(CodeOutlined.displayName, CodeOutlined)
  .component(HomeOutlined.displayName, HomeOutlined)
  .component(SearchOutlined.displayName, SearchOutlined)
  .mount("#app");

np.done();
