<template>
  <div class="App-container">
    <div class="ui">
      <div class="title">VIS-THREE</div>
      <div class="intro">more convenient development for three.js</div>
      <div class="split-line"></div>
      <div class="operation">
        <a-button type="link" size="large" @click="jump(docs)">
          文档（docs）
        </a-button>
        <a-button type="link" size="large" @click="jump(docs)">
          示例（demo）
        </a-button>
        <a-button type="link" size="large" @click="jump(github)">
          <template #icon>
            <github-outlined></github-outlined>
          </template>
          github
        </a-button>
        <a-button type="link" size="large" @click="jump(gitee)">gitee</a-button>
      </div>
    </div>

    <div class="mask"></div>
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
      window.location.href = url;
    };

    onMounted(() => {
      engine.setDom(renderWindow.value!).play();

      window.addEventListener("resize", () => {
        engine.setSize();
      });
    });

    return {
      jump,
      docs: "/vis-three/docs/index.html",
      github: "https://github.com/Shiotsukikaedesari/vis-three",
      gitee: "https://gitee.com/Shiotsukikaedesari/vis-three",
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
  z-index: 10;
}

.title {
  font-size: 110px;
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
  text-shadow: 1px 1px 20px rgb(255, 255, 255);
  animation: hueColor 2s ease infinite;
}

@keyframes hueColor {
  0% {
    filter: hue-rotate(0deg);
  }
  100% {
    filter: hue-rotate(360deg);
  }
}

.intro {
  font-size: 28px;
  color: white;
  margin: 12px;
  text-shadow: 1px 1px 12px rgb(255, 255, 255);
}

.split-line {
  width: 50vw;
  height: 3px;
  background: white;
  box-shadow: 1px 1px 6px rgb(255, 166, 251);
  margin: 20px;
}

.operation {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.ant-btn {
  color: rgb(235, 20, 255);
  text-shadow: 0px 0px 4px rgb(255, 56, 245);
}

.mask {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  width: 100%;
  height: 100%;
  background: radial-gradient(rgba(0, 0, 0, 0.45) 70%, rgba(0, 0, 0, 0.8) 100%);
}

.three {
  width: 100%;
  height: 100%;
}

@media screen and (max-width: 768px) and (min-width: 0px) {
  .title {
    font-size: 54px;
  }

  .intro {
    font-size: 14px;
  }

  .split-line {
    width: 80vw;
  }
}
</style>
