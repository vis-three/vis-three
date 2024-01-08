# 组件化开发模式

经过长期的市场与项目验证，将 web 开发效率提升到另一个高度的组件化开发模式，也是`vis-three`有所借鉴的。`vis-three`本身具有配置化开发层，通过与热门的`vue`框架的核心`@vue/reactivity`结合，提供了类似具有`vue`组件化的开发模式，当中也添加了许多 3D 部分的特性供开发者使用。期望通过组件化的开发模式将 web3D 项目推向另一个高度。

> 代码案例查看：https://vis-three.github.io/examples.html?example=widget/widget.html

:::tip

- 当前版本处于 alpha 试验阶段，欢迎各位提出相关的意见与建议或者共同参与构建。
- 当前的组件化开发为 browser runtime 版本。
  :::

## 引擎准备

组件化引擎和配置化与原生引擎一致，我们先安装如下依赖：

```
npm i three
npm i @types/three

// vis-three的组件化核心
npm i @vis-three/widget

// 配置化模块库
npm i @vis-three/library-module

// three.js的 WebGLRenderer相关插件
npm i @vis-three/plugin-webgl-renderer

// 网格辅助插件，能对前期场景起到视觉辅助作用
npm i @vis-three/plugin-grid-helper

// 相机自适应插件，自动适配不同的渲染窗口大小
npm i @vis-three/plugin-camera-adaptive

// 轨道控制器插件，能够自由的旋转视角
npm i @vis-three/@vis-three/plugin-orbit-controls

// WebGLRenderer渲染策略
npm i @vis-three/strategy-webgl-render
```

:::tip
组件化引擎，是基于配置化引擎衍生而来，具有配置化引擎的**全部能力**。
:::

安装完毕之后进行引擎构建，组件化引擎构建方式同配置化引擎与原生构建一致，也提供了两种构建方式：

```js
import { EngineWidget, defineEngineWidget } from "@vis-three/widget";

import { WebGLRendererPlugin } from "@vis-three/plugin-webgl-renderer";
import { CameraAdaptivePlugin } from "@vis-three/plugin-camera-adaptive";
import { RenderManagerPlugin } from "@vis-three/plugin-render-manager";
import { GridHelperPlugin } from "@vis-three/plugin-grid-helper";
import { OrbitControlsPlugin } from "@vis-three/plugin-orbit-controls";

import { WebGLRenderStrategy } from "@vis-three/strategy-webgl-render";

import * as ModuleLibrary from "@vis-three/library-module";

// 类实例
const engine = new EngineWidget()
  .registModule(ModuleLibrary.light)
  .registModule(ModuleLibrary.geometry)
  .registModule(ModuleLibrary.material)
  //...
  .install(
    WebGLRendererPlugin({
      antialias: true,
      alpha: true,
    })
  )
  .install(CameraAdaptivePlugin())
  .install(GridHelperPlugin())
  .exec(WebGLRenderStrategy());

// 函数式
const engine = new defineEngineWidget({
  plugins: [
    WebGLRendererPlugin({
      antialias: true,
      alpha: true,
    }),
    CameraAdaptivePlugin(),
    GridHelperPlugin(),
    OrbitControlsPlugin(),
  ],
  strategy: [WebGLRenderStrategy(), WebGLRendererSupportStrategy()],
  modules: Object.values(ModuleLibrary),
});
```

## 页面挂载

页面挂载的方式和[原生引擎](./native.md)构建一致。这里我们加多一部，就是直接进行组件的渲染。

```js
engine.play();
```

## 定义组件

组件化的开发方式首先是要定义相关的组件，我们可以从`@vis-three/widget`中导入`defineComponent`进行。

```js
import { defineComponent } from "@vis-three/widget";

const root = defineComponent({
  render() {},
  setup() {},
});
```

当然不用`defineComponent`API 也可以进行，不过`defineComponent`本身会有很好的类型提示。

```js
export default {
  render() {},
  setip() {},
};
```

## 组件挂载

组件挂载我们可以通过`engine`的相关 api 进行。`mount`函数不用传参数。

```js
engine.createWidget(root).mount();
```

## 渲染模板

如果我们使用过 vue，除了一般所使用的`template`之外，还会有一个`render`对象提供完全编程能力，如果有了解过 vue 原理的同学也会发现，`template`本身会通过一个模板解析与编译期，将其中的内容转换为`render`的相关写法。

`vis-three`的`render`函数写法和`vue`的基本保持一致，不过在一些地方做了优化。

### 基础模板

通过`h`函数创建相关结构，可以加将`h`理解为`generateConfing`的另一种写法。

```js
import { h } from "@vis-three/widget";

const root = defineComponent({
  render() {
    const geometry = h("BoxGeometry", {
      width: 5,
      height: 1,
      depth: 5,
    });

    const material = h("MeshStandardMaterial", {
      transparent: true,
      opacity: 0.8,
    });

    h("Mesh", {
      geometry,
      material,
    });
  },
});
```

这里有几个值得注意的地方：

1、3D 组件模板的结构和 `dom` 的主要区别在于目前暂时不存在嵌套，所以书写流程就是自上而下的。

2、基于第一点的特性，所以我们的 `render` 函数不需要 `return`，只要在 `render` 中通过 `h` 函数创建的内容会自动识别为当前的组件结构。

3、结构的引用不需要像配置化开发一样仅传 vid，而是可以传输整个结构。

所以基于以上几点我们可以简化成这样：

```js
import { h } from "@vis-three/widget";

const root = defineComponent({
  render() {
    h("Mesh", {
      geometry: h("BoxGeometry", {
        width: 5,
        height: 1,
        depth: 5,
      }),
      material: h("MeshStandardMaterial", {
        transparent: true,
        opacity: 0.8,
      }),
    });
  },
});
```

### 条件模板

如果模板中部分内容需要根据相关的条件进行渲染切换，我们应该要把这部分内容放入`vif`方法中，这样子在模板渲染的时候会对这部分内容进行优化处理。

```js
import { h, vif } from "@vis-three/widget";

const root = defineComponent({
  render() {
    let geometry;

    vif(() => {
      if (Math.random() > 0.5) {
        geometry = h("BoxGeometry");
      } else if (Math.random() > 0.7) {
        geometry = h("ConeGeometry");
      } else {
        geometry = h("SpheraGeometry");
      }
    });

    h("Mesh", {
      geometry,
      material: h("MeshStandardMaterial", {
        transparent: true,
        opacity: 0.8,
      }),
    });
  },
});
```

### 列表模板

如果模板中部分内容需要根据一组列表进行渲染，我们应该要把这部分内容放入`vfor`方法中，这样子在模板渲染的时候会对这部分内容进行优化处理。

```js
import { h, vfor } from "@vis-three/widget";

const root = defineComponent({
  render() {
    const geometry = h("BoxGeometry", {
      width: 5,
      height: 1,
      depth: 5,
    });
    const material = h("MeshStandardMaterial", {
      transparent: true,
      opacity: 0.8,
    });

    vfor(() => {
      for (let i = 0; i < 10; i += 1) {
        h("Mesh", {
          geometry,
          material,
          position: {
            x: i * 5,
          },
        });
      }
    });

    vfor(() => {
      [1, 2, 3, 4].forEach((item) => {
        h("Mesh", {
          geometry,
          material,
          position: {
            x: item + 2,
          },
        });
      });
    });
  },
});
```

### 组件模板

对于组件模板，我们可以从`render`函数中的`components`参数获取：

```js
import { h } from "@vis-three/widget";

const child = defineComponent({
  render() {
    h("Mesh", {
      geometry: h("BoxGeometry", {
        width: 5,
        height: 1,
        depth: 5,
      }),
      material: h("MeshStandardMaterial", {
        transparent: true,
        opacity: 0.8,
      }),
    });
  },
});

const root = defineComponent({
  components: { child },
  render({ components }) {
    h(components.child, {
      // prop
    });
  },
});
```

## 响应数据

`MVVM`模式的组件化开发，首要的就是通过数据去驱动视图变化，由于`vis-three`是通过`@vue/reactivity`实现，所以响应数据的构建和`vue`基本相同。

但是这里注意，在`render`中，会将`this`指向`setup`返回的对象，你可以通过`this.xxx`访问，`setup`的数据。

```js
import { h, ref, reactive, computed } from "@vis-three/widget";

const root = defineComponent({
  render() {
    h("Mesh", {
      position: {
        x: this.positionX,
      },
      scale: this.scale,
      rotation: this.rotation,
    });
  },
  setup() {
    const positionX = ref(0);
    const scale = reactive({ x: 1, y: 1.2, z: 1.5 });
    const rotation = computed(() => {
      return {
        x: scale.x + 0.2,
        y: scale.y + 0.1,
        z: scale.z,
      };
    });

    return {
      positonX,
      scale,
      rotation,
    };
  },
});
```

:::tip
在`render`中访问由`ref`构造的变量，可以直接通过`this.xxx`访问其值，而不用`this.xxx.value`，这个特性和`vue`保持一致。
:::

## 父子组件

组件化很重要的特性，就是能封装组件进行复用，对于组件的嵌套使用前面也提到过，关于组件的使用其实有两种方式：

### 直接使用

直接使用就是在需要的地方，直接通过`h`函数使用相关的组件。

```js
import { h } from "@vis-three/widget";

const child = defineComponent({});

const root = defineComponent({
  render() {
    h(child, {});
  },
});
```

### 注册使用

注册使用就是在需要使用的组件前，先进行组件注册，然后通过`render`函数的`components`结构参数调用，更推荐这种方法。

```js
import { h } from "@vis-three/widget";

const child = defineComponent({});

const root = defineComponent({
  components: { child },
  render({ components }) {
    h(components.child, {});
  },
});
```

## 组件传参

对于子组件，可以通过预设`props`参数，供父组件根据需要传入。在模板中使用时，我们可以理解为与`setup`一致，可以通过`this`直接访问。

```js
import { h } from "@vis-three/widget";

const child = defineComponent({
  props: {
    positionX: {
      type: Number,
      default: 0,
    },
  },
  render() {
    h("Mesh", {
      position: {
        x: this.positionX,
      },
    });
  },
});

const root = defineComponent({
  components: { child },
  render({ components }) {
    h(components.child, {
      positionX: 100,
    });
  },
});
```

:::tip
这里要注意，目前`props`的预设结构是固定的，也就是你需要书写`type`和`default`以防出现其他情况。

还需要注意命名问题，如果`props`的命名和`setup`中的命名一致，会产生冲突。
:::

## 组件事件

我们希望组件能够直接处理相关的事件，下面看看该如何进行。

### 基础事件

基础事件就是基础元素本身具有的一批事件，添加方式是使用`on` + `事件名`驼峰写法。

```js
import { h } from "@vis-three/widget";

const root = defineComponent({
  render() {
    h("Mesh", {
      onClick: this.handler,
    });
  },

  setup() {
    return {
      handler() {
        console.log(alert("hello world"));
      },
    };
  },
});
```

### 组件事件

除了基础事件外，对于组件来说，希望组件本身能够抛出事件，比如我们期望父组件能够根据子组件的一些变化而做出响应，我们可以通过组件事件进行。

```js
import { h, ref } from "@vis-three/widget";

const child = defineComponent({
  emits: {
    show: true,
  },
  render() {
    h("Mesh", {
      visible: {
        x: this.status,
      },
      onClick: this.triggle,
    });
  },

  setup({ emit }) {
    const status = ref(true);
    const triggle = () => {
      status.value = !status.value;
      emit("show", status.value);
    };
    return {
      status,
      triggle,
    };
  },
});

const root = defineComponent({
  components: { child },
  render({ components }) {
    h(components.child, {
      onShow: (status) => console.log(alert("child " + status)),
    });
  },
});
```

从上面的示例可以看到：

1. 逐渐的事件需要现在组件的`emits`属性中进行声明。
2. 如何触发可以通过`setup`结构参数的`emit`对象进行触发。

:::tip
目前的组件`emit`方式只能提供一个参数，所以复数的参数，可以写成对象形式。
:::

## 资源使用

`vis-three`组件提供了外部资源的注册使用对象，可以在组件内部创建相关的资源供模板使用。

下面我们来看一下使用外部 Canvas 对象，作为模板贴图的示例。

```js
import {
  defineComponent,
  h,
  ref,
  computed,
  onMounted,
  watch,
} from "@vis-three/widget";
import { CanvasGenerator } from "@vis-three/convenient";

const root = defineComponent({
  render({ resources }) {
    const texture = h("CanvasTexture", {
      url: resources.text,
      ref: "texture",
    });

    h("Mesh", {
      material: h("MeshBasicMaterial", {
        ref: "box",
        color: "rgb(255, 0, 0)",
        map: texture,
      }),
    });
  },
  resources() {
    return {
      text: this.textGenerator.getDom(),
    };
  },
  setup({ resources }) {
    return {
      textGenerator: new CanvasGenerator().draw((ctx) => {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, 512, 512);
        ctx.translate(256, 256);
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillStyle = "black";
        ctx.font = " bold 52px 微软雅黑";
        ctx.fillText("Hello vis-three", 0, 0);
        ctx.translate(-256, -256);
      }),
    };
  },
});
```

从上面的示例可以看到：

1. 我们可以将外部资源的生成方法写在`setup`中，这样有一个好处就是，资源可以根据响应式数据进行变化，而且处在同一作用域下。

2. 外部资源需要注册到`resources`中，而且目前来说`resources`的`this`和`render`一样。

3. 在`render`中使用资源，我们可以从`render`的结构参数`resources`中访问。

## 预置引擎

组件化开发也有相应的预置引擎：

- `@vis-three/engine-display-widget`
