<template>
  <div class="App-container">
    <div class="logo"></div>
    <div class="operation">
      <a-button type="link" @click="jump(docs)">文档（docs）</a-button>
    </div>
    <div class="three"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { generateConfig } from "@vis-three";

export default defineComponent({
  setup() {
    const jump = (url: string) => {
      window.open(url);
    };

    return {
      jump,
      docs: "/vis-three/docs/index.html",
    };
  },
});
</script>

<style scoped="less">

</style>
