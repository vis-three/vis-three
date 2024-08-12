# Configurable Framework Integration

A major feature of configuration-based development is its ability to seamlessly integrate with popular front-end
frameworks, ensuring both the performance of 3D real-time rendering and compatibility with the development efficiency of
UI frameworks.

Moreover, after integration, updates can be made from both the UI side to the view and the 3D scene, and from the 3D
side as well.

## Integration with Vue2

Vue2's reactive features process related data objects using `Object.defineProperty`. We can define Vue2's preprocessing
methods through **global options**.

### Defining Global Proxy Extension Options

Global proxy extension options are injected into the generated configuration during the call to `@vis-three/middleware`'
s `generateConfig`. The final configuration will possess both the characteristics of `vis-three` and `vue2`.

```js
import Vue from "vue";
import {defineOption} from "@vis-three/middleware";

defineOption({
    proxy: {
        expand: Vue.observable,
        timing: "before",
    },
});
```

:::warning
The definition of global options must occur before the engine instance is created.
:::

### Usage in Components

Using it in components is no different from using a regular object. The only distinction is to remember to apply the
relevant configurations.

```vue

<template>
  <div class="operate-box">
    <span>
      box.x:
      <input v-model="box.position.x"/>
    </span>
    <span>
      computed:
      <input :value="computedAttr"/>
    </span>
    <span>
      watcher:
      <input :value="watchAttr"/>
    </span>
    <button @click="changeColor">change color</button>
  </div>
</template>

<script>
  import {generateConfig, CONFIGTYPE} from "@vis-three/middleware";
  import {engine, defaultScene} from "./engine.js";

  export default {
    data() {
      const geometry = generateConfig(CONFIGTYPE.BOXGEOMETRY, {
        width: 10,
        height: 10,
        depth: 10,
      });
      const material = generateConfig(CONFIGTYPE.MESHBASICMATERIAL, {
        color: "rgb(255, 0, 0)",
      });

      const box = generateConfig(CONFIGTYPE.MESH, {
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

### Usage in Vuex

Using it in `vuex` is similar to its usage in `components`, but the approach to using `vuex` tends to involve treating
a `vis-three` module as a `vuex` module, followed by further API extensions.

```js
// camera.js
import Vue from "vue";
import {MODULETYPE} from "@vis-three/middleware";
import {engine} from "./engine.js";

export const module = {
    namespaced: true,
    state: {
        target: engine.dataSupportManager
            .getDataSupport(MODULETYPE.CAMERA)
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

## Integration with Vue3

The integration with `vue3` is similar to that with `vue2`, but `vue3` uses `proxy` for reactive handling. However, in
some areas, only `vue3`'s reactive objects can be used, so there are some differences in detail.

### Defining Global Proxy Extension Options

Global proxy extension options are injected into the configuration during the call to `@vis-three/middleware`'
s `generateConfig`. The final configuration will include both the characteristics of `vis-three` and `vue3`.

```js
import {reactive, toRaw} from "vue";
import {defineOption} from "@vis-three/middleware";

defineOption({
    proxy: {
        expand: reactive,
        timing: "after",
    },
});
```

:::warning
It is important to note that the reactive mechanism of `vue3` must correspond to the timing being `after` to ensure that
certain mechanisms of `vue3`, such as the handling of `array` objects, do not malfunction.
:::

### Usage in Components

The usage in components is similar to that with `vue2`.

```vue

<template>
  <div class="operate-box">
    <span>
      box.x:
      <input v-model="box.position.x"/>
    </span>
    <span>
      computed:
      <input :value="computedAttr"/>
    </span>
    <span>
      watcher:
      <input :value="watchAttr"/>
    </span>
    <button @click="changeColor">change color</button>
  </div>
</template>

<script>
  import {defineComponent, onMounted, watch, computed, ref} from "vue";
  import {generateConfig, CONFIGTYPE} from "@vis-three/middleware";
  import {engine, defaultScene} from "./engine.js";

  export default defineComponent({
    setup() {
      const geometry = generateConfig(CONFIGTYPE.BOXGEOMETRY, {
        width: 10,
        height: 10,
        depth: 10,
      });
      const material = generateConfig(CONFIGTYPE.MESHBASICMATERIAL, {
        color: "rgb(255, 0, 0)",
      });

      const box = generateConfig(CONFIGTYPE.MESH, {
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

      return {box, computedAttr, watchAttr, changeColor};
    },
  });
</script>
```

### Usage in Vuex

Usage in `vuex` is consistent with that in `vue2`.

## Integration with React

## Influencing UI from the 3D Layer

The above discussion focuses on synchronizing 3D scenes with UI operations from the perspective of UI development.
However, there are many scenarios where we need to influence the UI view through the 3D scene, or affect both the 3D
scene and UI view through another modular structure. In such cases, we can use the `vis-three` framework.

### Obtaining Relevant Configurations Through the Engine

We can obtain configurations that are registered in the `engine` and applied in the UI framework layer through the
relevant APIs of the `engine`.

```js
import engine from "./engine.js";

// Retrieve by unique vid identifier
const config = engine.getConfigBySymbol(vid);

// Retrieve by 3D object
const config = engine.getObjectConfig(object3D);
```

### Updating Configurations

Updating configurations is similar to what is described in configuration-based development. Overall, as long as you can
find a way to access the relevant configurations, you will be able to influence both the view and the 3D scene.

```js
config.position.x = 10;
config.rotation.y = Math.PI / 2;

config.children.pop();
```

## Accessing 3D Native Objects in UI

We often encounter requirements that involve processing, calculating, and altering 3D native objects to obtain results.
As long as we have the relevant configurations, we can easily access these objects.

Below is an example of dynamically obtaining the number of vertices in a geometry.

```js
import {defineComponent, onMounted, watch, computed, ref} from "vue";
import {generateConfig, CONFIGTYPE} from "@vis-three/middleware";
import {engine, defaultScene} from "./engine.js";

export default defineComponent({
    setup() {
        const geometry = generateConfig(CONFIGTYPE.BOXGEOMETRY, {
            width: 10,
            height: 10,
            depth: 10,
        });
        const material = generateConfig(CONFIGTYPE.MESHBASICMATERIAL, {
            color: "rgb(255, 0, 0)",
        });

        const box = generateConfig(CONFIGTYPE.MESH, {
            geometry: geometry.vid,
            material: material.vid,
        });

        engine.applyConfig(geometry, material, box);
        defaultScene.children.push(box.vid);

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

        return {vertNum};
    },
});
```
