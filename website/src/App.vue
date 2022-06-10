<template>
  <div class="App-container">
    <div class="operation">
      <a-button type="link" @click="jump(docs)">文档（docs）</a-button>
    </div>
    <div ref="renderWindow" class="three"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { engine } from "../assets/engine";

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
.three {
  width: 100%;
  height: 100%;
}

.operation {
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
