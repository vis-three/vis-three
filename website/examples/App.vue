<template>
  <div class="App-container">
    <div class="sidebar">
      <div class="sidebar-header">
        <div class="header-title">
          <a-image
            :src="basePath + '/favicon.ico'"
            :preview="false"
            @click="toHome"
          ></a-image>
          <span>VIS-THREE-EXAMPLES</span>
        </div>
        <div class="header-operation">
          <a-input v-model:value="filterText">
            <template #suffix>
              <search-outlined></search-outlined>
            </template>
          </a-input>
        </div>
      </div>
      <div class="sidebar-box">
        <div
          v-for="item in filterMenus"
          :key="item.name"
          class="sidebar-item"
          :class="{ 'sidebar-item-active': item.url === currentExample }"
          @click="changeExample(item.url)"
        >
          <a-image
            :preview="false"
            :src="getExamplePoster(item.poster)"
            fallback="data:image/png;base64,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"
          ></a-image>
          <div class="item-title">{{ item.name }}</div>
        </div>
      </div>
    </div>
    <div class="iframe-main">
      <iframe :src="getExampleUrl(currentExample)" frameborder="0"></iframe>
      <a-button
        type="primary"
        size="large"
        shape="circle"
        title="打开源码"
        class="code-open"
        @click="jump(repoPrefix + currentExample)"
      >
        <template #icon><CodeOutlined /></template>
      </a-button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import menus from "./assets/menus.json";
import URLParse from "url-parse";

export default defineComponent({
  setup() {
    const query = new URLParse(window.location.href, true).query;

    // data
    const currentExample = ref<string>(query.example || menus[0].url);
    const filterText = ref<string>(query.search || "");

    // computed
    const filterMenus = computed(() => {
      return menus.filter((elem) =>
        elem.url.toLocaleLowerCase().includes(filterText.value)
      );
    });

    // methods
    const jump = (url: string) => {
      window.open(url);
    };

    const getExampleUrl = (url: string) => {
      return `${import.meta.env.BASE_URL}examples/${url}`;
    };

    const getExamplePoster = (poster: string) => {
      return `${import.meta.env.BASE_URL}examples/${poster}`;
    };

    const changeExample = (url: string) => {
      currentExample.value = url;

      let urlState = `${window.location.origin}${
        import.meta.env.BASE_URL
      }examples.html?example=${url}`;

      if (filterText.value) {
        urlState += `&search=${filterText.value}`;
      }

      history.replaceState(null, "", urlState);
    };

    const toHome = () => {
      window.location.href = window.location.origin + "/vis-three/";
    };

    return {
      filterText,
      currentExample,
      jump,
      getExampleUrl,
      getExamplePoster,
      toHome,
      changeExample,
      basePath: import.meta.env.BASE_URL,
      repoPrefix:
        "https://github.com/Shiotsukikaedesari/vis-three/tree/main/examples/",
      filterMenus,
    };
  },
});
</script>

<style scoped lang="less">
@siderbarHeader: 100px;
@siderbarWidth: 300px;

.App-container {
  width: 100%;
  height: 100%;
  display: flex;
}

.sidebar {
  width: @siderbarWidth;
  height: 100%;
}

.iframe-main {
  width: calc(100% - @siderbarWidth);
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

.sidebar-header {
  height: @siderbarHeader;
  width: 100%;
  padding: 8px 12px;

  > .header-title {
    display: flex;
    align-items: center;
    margin-bottom: 4px;
    > :deep(.ant-image) {
      width: 45px;
      height: 45px;
      cursor: pointer;
    }
    > span {
      margin-left: 5px;
      font-weight: bold;
      font-size: 18px;
    }
  }
}

.sidebar-box {
  height: calc(100% - @siderbarHeader);
  width: 100%;
  overflow: auto;
}

.sidebar-item {
  width: 100%;
  padding: 12px;
  cursor: pointer;
  transition: all ease 800ms;

  > .item-title {
    font-size: 16px;
    text-align: center;
  }
  :deep(.ant-image) {
    width: 100%;
    height: 200px;
    border-radius: 8px;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
}

.sidebar-item-active {
  background: rgba(230, 20, 240, 0.5) !important;
}
</style>
