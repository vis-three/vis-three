<template>
  <div class="App-container">
    <div class="ui">
      <div class="title">VIS-THREE</div>
      <div class="split-line"></div>
      <div class="operation">
        <a-button type="link" @click="jump(docs)" size="large"
          >文档（docs）</a-button
        >
      </div>
    </div>

    <div ref="renderWindow" class="three"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { engine } from "./assets/engine";

export default defineComponent({
  setup() {
    const renderWindow = ref<HTMLDivElement>();

    const jump = (url: string) => {
      window.open(url);
    };

    onMounted(() => {
      engine.setDom(renderWindow.value!).setSize().play();

      window.addEventListener("resize", () => {
        engine.setSize();
      });
    });

    return {
      jump,
      docs: "/vis-three/docs/index.html",
      renderWindow,
    };
  },
});
</script>

<style scoped="less">
.App-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.ui {
  position: absolute;
  top: calc(60% - 120px - 20px);
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  font-size: 120px;
  background: linear-gradient(
    45deg,
    red,
    orange,
    yellow,
    green,
    cyan,
    blue,
    purple
  );
  -webkit-background-clip: text;
  color: transparent;
  text-shadow: 1px 1px 20px rgb(246, 208, 255);
  animation: hueColor 3s ease infinite;
}

@keyframes hueColor {
  0% {
    filter: hue-rotate(0deg);
  }
  100% {
    filter: hue-rotate(360deg);
  }
}

.split-line {
  width: 580px;
  height: 5px;
  background: white;
  box-shadow: 1px 1px 6px rgb(255, 166, 251);
}

.operation {
  margin-top: 20px;
}

.ant-btn {
  color: rgb(235, 20, 255);
  text-shadow: 0px 0px 4px rgb(199, 253, 255);
}

.three {
  width: 100%;
  height: 100%;
}
</style>
