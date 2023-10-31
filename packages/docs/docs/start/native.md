# 原生引擎构建

如果您已经有`three.js`相关项目的开发经验或者开发习惯，对于项目的开发需要更倾向于原生`three.js`的开发模式，本篇会引导您基于原生`three.js`的开发习惯下使用`vis-three`进行更高效的项目开发。

## 引擎准备

`vis-three`的引擎准备对比与原生`three.js`是十分高效的，我们先安装下面的依赖：

```
npm i three
npm i @types/three

// vis-three的基础核心
npm i @vis-three/core

// three.js的 WebGLRenderer相关插件
npm i @vis-three/plugin-webgl-renderer

// 网格辅助插件，能对前期场景起到视觉辅助作用
npm i @vis-three/plugin-grid-helper

// 相机自适应插件，自动适配不同的渲染窗口大小
npm i @vis-three/plugin-camera-adaptive
```

安装完毕之后直接进行引擎构建，`vis-three`提供了两种引擎构建方式，一种是`类实例化`,一种是`函数式`构建，这两种构建模式对于不同场景各有优势：

```js
import { Engine, defineEngine } from "@vis-three/core";
import { WebGLRendererPlugin } from "@vis-three/plugin-webgl-renderer";
import { GridHelperPlugin } from "@vis-three/plugin-grid-helper";
import { CameraAdaptivePlugin } from "@vis-three/plugin-camera-adaptive";

// 类实例化
const engine = new Engine()
  .install(
    WebGLRendererPlugin({
      antialias: true,
      alpha: true,
    })
  )
  .install(CameraAdaptivePlugin())
  .install(GridHelperPlugin());

// 函数式
const engine = defineEngine({
  plugins: [
    WebGLRendererPlugin({
      antialias: true,
      alpha: true,
    }),
    CameraAdaptivePlugin(),
    GridHelperPlugin(),
  ],
});
```

:::tip
不同的插件可以有不同的入参，我们可以通过插件文档查看各种插件的参数。
:::

## 页面挂载

得到引擎之后我们需要将其绑定到页面上的一个 dom 元素中，并且由于 dom 元素有各种各样的尺寸，我们期望引擎能直接适配尺寸：

```html
<div id="app"></div>
```

```js
engine.setDom(document.getElementById("app")).setSize();
```

由于中间不需要经过其他 api，我们可以直接进行链式调用 ，两种引擎构建模式都适用：

```js
const engine = defineEngine({
  plugins: [
    WebGLRendererPlugin({
      antialias: true,
      alpha: true,
    }),
    CameraAdaptivePlugin(),
    GridHelperPlugin(),
  ],
})
  .setDom(document.getElementById("app"))
  .setSize();
```

## 添加物体

引擎内部会默认一个场景与一个透视相机，我们可以直接向里面加入物体，但是别忘记引入`three.js`的依赖：

```js
// import ...
import * as THREE from "three";

// engine code

const pointLight = new THREE.PointLight("rgb(255, 255, 255)", 1, 300, 0);
pointLight.position.y = 30;

const box = new THREE.Mesh(
  new THREE.BoxBufferGeometry(10, 10, 10),
  new THREE.MeshStandardMaterial({ color: "rgb(255, 105, 100)" })
);
box.position.x = 10;

const line = new THREE.Line(box.geometry);

const points = new THREE.Points(box.geometry);

points.position.x = -10;

engine.scene.add(pointLight, box, line, points);
```

## 渲染场景

当我们的场景准备好之后我们就可以进行渲染了：

```js
engine.render();
```

## 物体动画

我们期望场景中的 box 有旋转动画，但是我们目前只能一帧一帧的进行渲染，面对动画可能需要自己手写定时器进行渲染控制，有什么方法能够更便捷可靠的进行动画集成呢？

很简单，去寻找一下有没有相关的功能插件即可，对于这个需求我们可以使用

`@vis-three/plugin-render-manager`

该插件会管理控制所有的渲染功能。

但是光引入该插件无法连通`WebGLRenderer`的渲染，所以我们还需要一个可以将`WebGLRenderer`渲染接入`RenderManager`的策略。

```
npm i @vis-three/plugin-render-manager

npm i @vis-three/strategy-webgl-render
```

```js
// import ...
import { RenderManagerPlugin } from "@vis-three/plugin-render-manager";
import { WebGLRenderStrategy } from "@vis-three/strategy-webgl-render";

const engine = defineEngine({
  plugins: [
    WebGLRendererPlugin({
      antialias: true,
      alpha: true,
    }),
    CameraAdaptivePlugin(),
    GridHelperPlugin(),
    RenderManagerPlugin(),
  ],
  strategy: [WebGLRenderStrategy()],
})
  .setDom(document.getElementById("app"))
  .setSize()
  .play();
```

:::tip
如果安装了`@vis-three/plugin-render-manager`插件，我们可以直接调用`play`方法，插件会自动管理所有的渲染。
:::

这个时候我们只用加入我们的动画即可。

```js
engine.renderManager.on("render", (event) => {
  box.rotation.y += event.delta * 3;
});
```

## 视角控件

我们希望能通过鼠标全方位的查看场景，该如何进行呢？不错，去寻找相关插件即可。

```
npm i @vis-three/plugin-orbit-controls
```

```js
// import
import { OrbitControlsPlugin } from "@vis-three/plugin-orbit-controls";

const engine = defineEngine({
  plugins: [
    // plugin
    OrbitControlsPlugin(),
  ],
  // strategy
});
// some code
```

## 物体事件

对于 web 项目的一大特色就是用户能够进行丰富的页面交互，我们又该如何进行呢？答案很简单了。

```
npm i @vis-three/plugin-event-manager
```

```js
// import
import { EventManagerPlugin } from "@vis-three/plugin-event-manager";

const engine = defineEngine({
  plugins: [
    // plugin
    EventManagerPlugin(),
  ],
  // strategy
});
// some code
```

但是这里直接进行该插件的安装会报错：
:::danger
EventManagerPlugin must install this plugin before: PointerManagerPlugin.
:::
意思是安装`EventManagerPlugin`需要再此之前安装`PointerManagerPlugin`。通过这个例子说明，插件也是有相互关系的，可以通过控制台或者文档查看每个插件的依赖关系。这个时候我们补充插件即可，安装的时候记得参照提示插件的**先后顺序安装**。

```
npm i @vis-three/plugin-pointer-manager
npm i @vis-three/plugin-event-manager
```

```js
// import
import { PointerManagerPlugin } from "@vis-three/plugin-pointer-manager";
import { EventManagerPlugin } from "@vis-three/plugin-event-manager";

const engine = defineEngine({
  plugins: [
    // plugin
    PointerManagerPlugin(),
    EventManagerPlugin(),
  ],
  // strategy
});
// some code
```

`EventManagerPlugin`插件提供的交互习惯跟我们的 dom 交互习惯是一致的，所以我们可以这样进行：

```js
box.addEventListener("click", (event) => {
  alert("hello vis-three");
});
```

## 模型导入

web3D 的一个很重要的功能就是能够进行外部模型资源的导入，在这里我们也可以去寻找相关插件进行。

```
npm i plugin-loader-manager
```

```js
// import
import { LoaderManagerPlugin } from "@vis-three/plugin-loader-manager";

const engine = defineEngine({
  plugins: [
    // plugin
    LoaderManagerPlugin({
      path: import.meta.env.BASE_URL,
    }),
  ],
  // strategy
});
// some code

engine.loaderManager.addEventListener("loaded", (event) => {
  const model = event.resourceMap.get("/model/katana/katana.obj");

  model.scale.set(20, 20, 20);

  engine.scene.add(model);
});

engine.loaderManager.load(["/model/katana/katana.obj"]);
```

:::tip
我们可以预先设置我们的加载公共路径，比如 vite 可以对 path 进行配置：**import.meta.env.BASE_URL**，详细参数和使用细节请查看相关文档。
:::

## 预置引擎

从上面的示例我们可以感受到`vis-three`持续集成的能力，但是对于一般的项目而已，有没有什么快速的方式能够直接进行呢?

这种时候就要用上我们的预置引擎了。

```
npm i @vis-three/engine-display
```

```js
import * as THREE from "three";
import { DisplayEngine } from "@vis-three/engine-display";

const engine = new DisplayEngine()
  .setDom(document.getElementById("app"))
  .setSize()
  .play();

engine.scene.add(
  new THREE.Mesh(
    new THREE.BoxBufferGeometry(10, 10, 10),
    new THREE.MeshBasicMaterial({ color: "rgb(255, 105, 100)" })
  )
);

// do something
```

:::tip
对于预置引擎所拥有的插件策略请查看相关文档。
:::

## 业务插件

对于不同的业务需求，官方提供的插件策略不可能全都能覆盖到，您可以根据自身的业务需求去编写相符的插件或者策略。

```js
// ./Plugin.js
export const MyPlugin = function () {
  return {
    name: "MyPlugin",
    install() {
      // ...
    },

    dispose() {
      // ...
    },
  };
};
```

:::tip
具体的自定义插件、策略开发流程介绍请查看文档：[自定义插件](./plugin.md)、[自定义策略](./strategy.md)
:::

如何引入插件呢？其实跟我们其他的插件引入方式一样。

```js
// import ...
import { MyPlugin } from "./Plugin.js";

const engine = new Engine().install(MyPlugin());
```

## 引擎修改

有时候我们会面对官方提供的预置引擎中有部分功能不需要的情况，或者说是影响了当前的效果的情况，那么我们在使用时，可以动态进行引擎修改。

```js
// import ...
import { MyPlugin } from "./Plugin.js";

const engine = new DisplayEngine()
  .uninstall("LoaderManagerPlugin")
  .rollback("EffectRenderStrategy")
  .install(MyPlugin())
  .setDom(document.getElementById("app"))
  .play();
```

:::tip
功能注销只用输入插件或者策略的`name`就行，如果直接注销插件，其所依赖的策略也会一同注销，不过不推荐这么做，在进行插件策略注销时希望**显式的按照依赖顺序级联注销**，方便进行问题排查。
:::
