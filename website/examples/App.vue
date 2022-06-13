<template>
  <div class="App-container">
    <div class="sidebar">
      <p v-for="item in menus" :key="item.name">{{ item.name }}</p>
    </div>
    <div class="iframe-main">
      <iframe src="/vis-three/examples/index.html" frameborder="0"></iframe>
      <a-button
        type="primary"
        size="large"
        shape="circle"
        title="打开源码"
        class="code-open"
        @click="jump(prefix + '/index.html')"
      >
        <template #icon><CodeOutlined /></template>
      </a-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import menus from "./assets/menus.json";

export default defineComponent({
  setup() {
    const jump = (url) => {
      window.open(url);
    };

    return {
      jump,
      prefix:
        "https://github.com/Shiotsukikaedesari/vis-three/tree/main/examples",
      menus,
    };
  },
});
</script>

<style scoped lang="less">
.App-container {
  width: 100%;
  height: 100%;
  display: flex;
}

.sidebar {
  width: 300px;
  height: 100%;
  overflow: auto;
}

.iframe-main {
  width: calc(100% - 300px);
  height: 100%;
  display: flex;
  position: relative;
}

.code-open {
  position: absolute;
  bottom: 20px;
  right: 20px;
  left: unset;
}
</style>
