# 框架结合

配置化开发的一大特性就是能更轻松的与当下热门的前端框架进行结合，既保证 3D 实时渲染的性能，又能够兼容 UI 框架的开发效率。

而且在结合之后，既可以从 UI 端更新视图与 3D 场景，也可以从 3D 端更新视图与 3D 场景。

## vue2 结合

`vue2`的响应式特性会将相关的数据对象通过`Object.defineproperty`进行相关处理，我们可以通过**全局选项**定义`vue2`的预处理方法。

### 定义全局代理拓展选项

全局代理拓展选项，会在`@vis-three/tdcm`的`generateConfig`调用时，将相关的拓展方法注入到生成的配置中，最后生成的相关配置既会有`vis-three`的特性，也会有`vue2`的特性。

```js
import Vue from "vue";
import { defineOption } from "@vis-three/tdcm";

defineOption({
  proxy: {
    expand: Vue.observable,
    timing: "before",
  },
});
```

:::warning
全局选项的定义一定要在实例引擎之前。
:::

### component 中使用

在 component 中的使用跟普通的对象没有区别，唯一的不同点在于，记得应用相关配置。

```vue
<template>
  <div class="operate-box">
    <span>
      box.x:
      <input v-model="box.position.x" />
    </span>
    <span>
      computed:
      <input :value="computedAttr" />
    </span>
    <span>
      watcher:
      <input :value="watchAttr" />
    </span>
    <button @click="changeColor">change color</button>
  </div>
</template>

<script>
import { generateConfig, CONFIG_TYPE } from "@vis-three/tdcm";
import { engine, defaultScene } from "./engine.js";

export default {
  data() {
    const geometry = generateConfig(CONFIG_TYPE.BOXGEOMETRY, {
      width: 10,
      height: 10,
      depth: 10,
    });
    const material = generateConfig(CONFIG_TYPE.MESHBASICMATERIAL, {
      color: "rgb(255, 0, 0)",
    });

    const box = generateConfig(CONFIG_TYPE.MESH, {
      geometry: geometry.vid,
      material: material.vid,
    });

    engine.applyConfig(geometry, material, box);
    defaultScene.children.push(box.vid);

    return {
      geometry,
      material,
      box,
      watchAttr: 0,
    };
  },
  computed: {
    computedAttr() {
      return this.box.position.x + this.box.position.y;
    },
  },
  methods: {
    changeColor() {
      this.material.color = "rgb(0, 255, 255)";
    },
  },
  watch: {
    "box.position.y"(val) {
      const position = this.box.position;
      this.watchAttr = position.x + position.y + position.z;
    },
  },
};
</script>
```

### vuex 中使用

在 `vuex` 中的使用和 `component` 中的使用差不多，但是对于 `vuex` 的使用定位，更倾向于将`vis-three`的一个模块作为`vuex`的一个模块进行对应，然后再进行相关的 api 拓展。

```js
// camera.js
import Vue from "vue";
import { MODULE_TYPE } from "@vis-three/tdcm";
import { engine } from "./engine.js";

export const module = {
  namespaced: true,
  state: {
    target: engine.dataSupportManager
      .getDataSupport(MODULE_TYPE.CAMERA)
      .getData(),
  },
  getters: {
    cameraList(state) {
      return Object.values(state.target);
    },
  },
  mutations: {
    addCamera(state, config) {
      Vue.set(state.target, config.vid, config);
    },
  },
};
```

## vue3 结合

`vue3`的结合与`vue2`的结合差不多，但是`vue3`所使用的是`proxy`进行的响应式处理，而且部分地方只能使用`vue3`的响应式对象进行处理，所以细节上有点差别。

### 定义全局代理拓展选项

全局代理拓展选项，会在`@vis-three/tdcm`的`generateConfig`调用时，将相关的拓展方法注入到生成的配置中，最后生成的相关配置既会有`vis-three`的特性，也会有`vue3`的特性。

```js
import { reactive, toRaw } from "vue";
import { defineOption } from "@vis-three/tdcm";

defineOption({
  proxy: {
    expand: reactive,
    timing: "after",
  },
});
```

:::warning
这里注意，`vue3`的响应机制一定对应`timing`为`after`之时，这样子才能确保`vue3`的部分机制，比如说`array`对象的处理上不会出错。
:::

### component 中使用

在 component 的使用与`vue2`差不多。

```vue
<template>
  <div class="operate-box">
    <span>
      box.x:
      <input v-model="box.position.x" />
    </span>
    <span>
      computed:
      <input :value="computedAttr" />
    </span>
    <span>
      watcher:
      <input :value="watchAttr" />
    </span>
    <button @click="changeColor">change color</button>
  </div>
</template>

<script>
import { defineComponent, onMounted, watch, computed, ref } from "vue";
import { generateConfig, CONFIG_TYPE } from "@vis-three/tdcm";
import { engine, defaultScene } from "./engine.js";

export default defineComponent({
  setup() {
    const geometry = generateConfig(CONFIG_TYPE.BOXGEOMETRY, {
      width: 10,
      height: 10,
      depth: 10,
    });
    const material = generateConfig(CONFIG_TYPE.MESHBASICMATERIAL, {
      color: "rgb(255, 0, 0)",
    });

    const box = generateConfig(CONFIG_TYPE.MESH, {
      geometry: geometry.vid,
      material: material.vid,
    });

    const computedAttr = computed(() => box.position.x + box.position.y);

    const watchAttr = ref(0);

    watch(
      () => box.position.y,
      (val) => {
        const position = box.position;
        watchAttr = position.x + position.y + position.z;
      }
    );

    const changeColor = () => {
      material.color = "rgb(0, 255, 255)";
    };

    onMounted(() => {
      engine.applyConfig(geometry, material, box);
      defaultScene.children.push(box.vid);
    });

    return { box, computedAttr, watchAttr, changeColor };
  },
});
</script>
```

### vuex 中使用

`vuex`中使用与`vue2`一致。

## react 结合

## 从 3D 层影响 UI

上方介绍的都是从 UI 开发的角度去同步 3D 场景与 UI 操作，但是有很多情况我们需要通过 3D 场景去影响 UI 视图，或者通过另外的模块结构对象去影响 3D 场景与 UI 视图，这种时候，我们可以通过`vis-three`框架去进行。

### 通过 engine 获取相关配置

我们可以通过`engine`的相关 API 获取既在`engine`中注册了的配置，又在`UI`框架层中应用了的配置。

```js
import engine from "./engine.js";

// 通过vid唯一标识获取
const config = engine.getConfigBySymbol(vid);

// 通过3D对象获取
const config = engine.getObjectConfig(object3D);
```

### 更新配置

更新配置和配置化开发中介绍的一样，总的来说，你只要能想方法拿到相关配置，就能够既影响视图，又能够影响 3D 场景。

```js
config.position.x = 10;
config.rotation.y = Math.PI / 2;

config.children.pop();
```

## 在 UI 中获取 3D 原生对象

我们还会遇到一批需求是需要通过对 3D 原生对象进行处理，计算，变更然后得到，这个时候只要我们有相关的配置，便能够轻松获取。

下面是一个能够动态获取几何顶点数量的例子。

```js
import { defineComponent, onMounted, watch, computed, ref } from "vue";
import { generateConfig, CONFIG_TYPE, toSymbol } from "@vis-three/tdcm";
import { engine, defaultScene } from "./engine.js";

export default defineComponent({
  setup() {
    const geometry = generateConfig(CONFIG_TYPE.BOXGEOMETRY, {
      width: 10,
      height: 10,
      depth: 10,
    });
    const material = generateConfig(CONFIG_TYPE.MESHBASICMATERIAL, {
      color: "rgb(255, 0, 0)",
    });

    const box = generateConfig(CONFIG_TYPE.MESH, {
      geometry: toSymbol(geometry),
      material: toSymbol(material),
    });

    engine.applyConfig(geometry, material, box);
    defaultScene.children.push(toSymbol(box));

    const vertNum = ref(0);

    watch(
      geometry,
      (value) => {
        const bufferGeometry = engine.getObjectBySymbol(geometry.vid);

        vertNum.value =
          bufferGeometry.getAttribute("position").array.length / 3;
      },
      {
        immidiate: true,
        deep: true,
      }
    );

    return { vertNum };
  },
});
```
