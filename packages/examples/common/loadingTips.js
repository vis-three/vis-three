import { message } from "ant-design-vue";
import "ant-design-vue/lib/message/style/index.css";

export default (engine) => {
  message.loading({
    content: "正在加载3D资源：0%",
    key: "loading",
    duration: 0,
  });

  engine.loaderManager.addEventListener("loading", (event) => {
    message.loading({
      content: `正在加载3D资源：${parseInt(
        ((event.loadSuccess / event.loadTotal) * 100).toString()
      )}
  %`,
      key: "loading",
      duration: 0,
    });
  });

  engine.loaderManager.addEventListener("loaded", (event) => {
    message.success({
      content: "加载完成！",
      key: "loading",
      duration: 1,
    });
  });

  return engine;
};
