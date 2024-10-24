## 内置引擎

`vis-three`已经提供了部分拥有常用功能的`engine`，可以直接下载安装使用。

### 原生引擎

原生引擎就是能够支持原生 three.js 项目开发的引擎，除了快速集成的引擎功能之外，其他的功能部分，都能够按照原生 three.js 项目开发的方式进行。

### @vis-three/display-engine

原生 `three.js` 展示型引擎，主要是提供用户快速构建展示化的原生 `three.js` 场景项目。

#### 安装

```
npm i three
npm i @vis-three/display-engine
```

#### 使用示例

```js
import * as THREE from "three";
import { DisplayEngine } from "@vis-three/display-engine";

const engine = new DisplayEngine()
  .setDom(document.getElementById("app"))
  .play();

engine.scene.add(THREE.AmbientLight());

engine.scene.add(
  new THREE.Mesh(
    new THREE.BoxBufferGeometry(10, 10, 10),
    new THREE.MeshStandardMaterial({ color: "rgb(255, 105, 100)" })
  )
);
```

#### 参考链接

- [engine/DisplayEngine.html](https://shiotsukikaedesari.github.io/vis-three/examples.html?example=engine/DisplayEngine.html)

#### 插件列表

- @vis-three/camera-adaptive-plugin
- @vis-three/css2d-renderer-plugin
- @vis-three/css3d-renderer-plugin
- @vis-three/effect-composer-plugin
- @vis-three/event-manager-plugin
- @vis-three/orbit-controls-plugin
- @vis-three/pointer-manager-plugin
- @vis-three/render-manager-plugin
- @vis-three/webgl-renderer-plugin

#### 策略列表

- @vis-three/css2d-render-strategy
- @vis-three/css3d-render-strategy
- @vis-three/effect-render-strategy
- @vis-three/orbit-render-strategy

### @vis-three/modeling-engine

原生 `three.js` 编辑期引擎，主要是更好的支持用户开发期进行原生`three.js`场景构建，提供视觉辅助与一定的调节监控功能。

#### 安装

```
npm i three
npm i @vis-three/modeling-engine
```

#### 使用示例

```js
import * as THREE from "three";
import { ModelingEngine } from "@vis-three/modeling-engine";

const engine = new ModelingEngine()
  .setDom(document.getElementById("app"))
  .setSize()
  .setStats(true)
  .play();

engine.scene.add(THREE.AmbientLight());

engine.scene.add(
  new THREE.Mesh(
    new THREE.BoxBufferGeometry(10, 10, 10),
    new THREE.MeshStandardMaterial({ color: "rgb(255, 105, 100)" })
  )
);
```

#### 参考链接

- [engine/ModelingEngine.html](https://shiotsukikaedesari.github.io/vis-three/examples.html?example=engine/ModelingEngine.html)

#### 插件列表

- @vis-three/axes-helper-plugin
- @vis-three/camera-adaptive-plugin
- @vis-three/css2d-renderer-plugin
- @vis-three/css3d-renderer-plugin
- @vis-three/effect-composer-plugin
- @vis-three/event-manager-plugin
- @vis-three/grid-helper-plugin
- @vis-three/keyboard-manager-plugin
- @vis-three/object-helper-plugin
- @vis-three/orbit-controls-plugin
- @vis-three/pointer-manager-plugin
- @vis-three/render-manager-plugin
- @vis-three/selection-plugin
- @vis-three/stats-plugin
- @vis-three/transform-controls-plugin
- @vis-three/viewpoint-plugin
- @vis-three/webgl-renderer-plugin

#### 策略列表

- @vis-three/css2d-render-strategy
- @vis-three/css3d-render-strategy
- @vis-three/effect-render-strategy
- @vis-three/grid-viewpoint-strategy
- @vis-three/helper-select-interact-strategy
- @vis-three/orbit-render-strategy
- @vis-three/orbit-viewpoint-strategy
- @vis-three/stats-render-strategy
- @vis-three/trans-select-event-strategy
- @vis-three/transform-keyboard-strategy

### 配置化引擎

配置化引擎除了能够支持原生化的场景开发外，接入了场景配置化的功能，将所有原生场景构建转化为配置，**你只用关心场景配置单**，剩下的代码组织细节，功能使用细节交给引擎完成。

### @vis-three/display-engine-support

在原生 `three.js` 展示型引擎基础上接入了配置化开发的能力，主要是提供用户快速配置化构建展示化的场景项目。

#### 安装

```
npm i three
npm i @vis-three/middleware
npm i @vis-three/display-engine-support
```

#### 使用示例

```js
import * as THREE from "three";
import { DisplayEngineSupport } from "@vis-three/display-engine-support";
import { generateConfig, CONFIGTYPE } from "@vis-three/middleware";

const engine = new DisplayEngineSupport()
  .setDom(document.getElementById("app"))
  .play();

generateConfig.injectEngine = engine;

const scene = generateConfig(CONFIGTYPE.SCENE);

engine.setSceneBySymbol(scene.vid);

generateConfig.injectScene = true;

generateConfig(CONFIGTYPE.POINTLIGHT, {
  position: {
    x: 30,
    y: 50,
  },
  distance: 100,
});

const material = generateConfig(CONFIGTYPE.MESHSTANDARDMATERIAL, {
  color: "rgb(255, 0, 0)",
});

const geometry = generateConfig(CONFIGTYPE.BOXGEOMETRY, {
  width: 20,
  height: 40,
  depth: 60,
});

generateConfig(CONFIGTYPE.MESH, {
  geometry: geometry.vid,
  material: material.vid,
});
```

#### 参考链接

- [engine/DisplayEngineSupport.html](https://shiotsukikaedesari.github.io/vis-three/examples.html?example=engine/DisplayEngineSupport.html)

#### 插件列表

- @vis-three/axes-helper-plugin
- @vis-three/camera-adaptive-plugin
- @vis-three/css2d-renderer-plugin
- @vis-three/css3d-renderer-plugin
- @vis-three/effect-composer-plugin
- @vis-three/event-manager-plugin
- @vis-three/grid-helper-plugin
- @vis-three/keyboard-manager-plugin
- @vis-three/object-helper-plugin
- @vis-three/orbit-controls-plugin
- @vis-three/pointer-manager-plugin
- @vis-three/render-manager-plugin
- @vis-three/selection-plugin
- @vis-three/stats-plugin
- @vis-three/transform-controls-plugin
- @vis-three/viewpoint-plugin
- @vis-three/webgl-renderer-plugin

#### 策略列表

- @vis-three/css2d-render-strategy
- @vis-three/css3d-render-strategy
- @vis-three/effect-render-strategy
- @vis-three/grid-viewpoint-strategy
- @vis-three/helper-select-interact-strategy
- @vis-three/orbit-render-strategy
- @vis-three/orbit-viewpoint-strategy
- @vis-three/stats-render-strategy
- @vis-three/trans-select-event-strategy
- @vis-three/transform-keyboard-strategy

### @vis-three/modeling-engine-support

在原生 `three.js` 编辑期引擎基础上接入了配置化开发的能力，主要是更好的支持用户开发期进行配置化的场景构建，提供视觉辅助与一定的调节监控功能。

#### 安装

```
npm i three
npm i @vis-three/middleware
npm i @vis-three/modeling-engine-support
```

#### 使用示例

```js
import * as THREE from "three";
import { ModelingEngineSupport } from "@vis-three/modeling-engine-support";
import { generateConfig, CONFIGTYPE } from "@vis-three/middleware";

const engine = new ModelingEngineSupport()
  .setDom(document.getElementById("app"))
  .play();

generateConfig.injectEngine = engine;

const scene = generateConfig(CONFIGTYPE.SCENE);

engine.setSceneBySymbol(scene.vid);

generateConfig.injectScene = true;

generateConfig(CONFIGTYPE.POINTLIGHT, {
  position: {
    x: 30,
    y: 50,
  },
  distance: 100,
});

const material = generateConfig(CONFIGTYPE.MESHSTANDARDMATERIAL, {
  color: "rgb(255, 0, 0)",
});

const geometry = generateConfig(CONFIGTYPE.BOXGEOMETRY, {
  width: 20,
  height: 40,
  depth: 60,
});

generateConfig(CONFIGTYPE.MESH, {
  geometry: geometry.vid,
  material: material.vid,
});
```

#### 参考链接

- [engine/ModelingEngineSupport.html](https://shiotsukikaedesari.github.io/vis-three/examples.html?example=engine/ModelingEngineSupport.html)

#### 插件列表

- @vis-three/axes-helper-plugin
- @vis-three/camera-adaptive-plugin
- @vis-three/css2d-renderer-plugin
- @vis-three/css3d-renderer-plugin
- @vis-three/effect-composer-plugin
- @vis-three/grid-helper-plugin
- @vis-three/keyboard-manager-plugin
- @vis-three/object-helper-plugin
- @vis-three/orbit-controls-plugin
- @vis-three/selection-plugin
- @vis-three/stats-plugin
- @vis-three/transform-controls-plugin
- @vis-three/viewpoint-plugin
- @vis-three/webgl-renderer-plugin

#### 策略列表

- @vis-three/composer-support-strategy
- @vis-three/css2d-render-strategy
- @vis-three/css3d-render-strategy
- @vis-three/css3d-renderer-support-strategy
- @vis-three/effect-render-strategy
- @vis-three/grid-viewpoint-strategy
- @vis-three/helper-select-interact-strategy
- @vis-three/orbit-controls-support-strategy
- @vis-three/orbit-render-strategy
- @vis-three/orbit-viewpoint-strategy
- @vis-three/stats-render-strategy
- @vis-three/trans-select-event-strategy
- @vis-three/transform-controls-helper-filter-strategy
- @vis-three/transform-controls-support-strategy
- @vis-three/transform-keyboard-strategy
- @vis-three/webgl-renderer-support-strategy

## 自定义引擎组装

除了已经配置好的这些`engine`之外，对于不同的项目不同的需求，我们还期望能够自定义的进行插件安装扩展，策略注入拖拽，从零组装我们需要的引擎或者说在已有的引擎基础上进行扩展，那么下面就来介绍一下如何进行自定义的引擎组装。

### 引擎核心

对于原生应用的引擎组装，我们需要从核心包`@vis-three/core`中引入我们的引擎核心，然后进行组装。

```
npm i @vis-three/core
```

```js
import { Engine } from "@vis-three/core";

import { defineEngine } from "@vis-three/core";
```

::: tip
`vis-three`提供了类形式的组装模式，也提供了函数式的组装模式。
:::

### 配置化引擎核心

配置化的引擎核心是在基础引擎核心的基础上添加了配置化所必要的依赖和插件，虽然我们可以从头开始组装，但是为了统一性我们还是从`@vis-three/middleware`包中引入我们的配置化引擎核心。

```
npm i @vis-three/middleware
```

```js
import { EngineSupport } from "@vis-three/middleware";
```

### 引擎插件组装

我们可以挑选我们所需要的插件进行安装。

```
npm i @vis-three/webgl-renderer-plugin
npm i @vis-three/effect-composer-plugin
npm i @vis-three/camera-adaptive-plugin
npm i @vis-three/render-manager-plugin
npm i @vis-three/grid-helper-plugin
```

```js
import { WebGLRendererPlugin } from "@vis-three/plugin-webgl-renderer";
import { CameraAdaptivePlugin } from "@vis-three/plugin-camera-adaptive";
import { RenderManagerPlugin } from "@vis-three/plugin-render-manager";
import { EffectComposerPlugin } from "@vis-three/plugin-effect-composer";
import { GridHelperPlugin } from "@vis-three/plugin-grid-helper";
import { Engine, defineEngine } from "@vis-three/core";

// 类实例安装
const engine = new Engine()
  .install(RenderManagerPlugin())
  .install(
    WebGLRendererPlugin({
      antialias: true,
      alpha: true,
    })
  )
  .install(
    EffectComposerPlugin({
      WebGLMultisampleRenderTarget: true,
    })
  )
  .install(CameraAdaptivePlugin())
  .install(GridHelperPlugin());

// 函数式安装
const engine = defineEngine({
  plugins: [
    RenderManagerPlugin(),
    WebGLRendererPlugin({
      antialias: true,
      alpha: true,
    }),
    EffectComposerPlugin({
      WebGLMultisampleRenderTarget: true,
    }),
    CameraAdaptivePlugin(),
    GridHelperPlugin(),
  ],
});
```

::: tip
关于插件的编写请参考[自定义插件](./plugin.md)部分。
:::

### 引擎策略组装

我们可以挑选我们所需要的策略进行安装。

```
npm i @vis-three/webgl-renderer-plugin
npm i @vis-three/effect-composer-plugin
npm i @vis-three/orbit-controls-plugin
npm i @vis-three/render-manager-plugin

npm i @vis-three/effect-render-strategy
npm i @vis-three/orbit-render-strategy
```

```js
import { WebGLRendererPlugin } from "@vis-three/plugin-webgl-renderer";
import { EffectComposerPlugin } from "@vis-three/plugin-effect-composer";
import { OrbitControlsPlugin } from "@vis-three/orbit-controls-plugin";
import { RenderManagerPlugin } from "@vis-three/plugin-render-manager";

import { EffectRenderStrategy } from "@vis-three/strategy-effect-render";
import { OrbitRenderStrategy } from "@vis-three/orbit-render-strategy";
import { Engine, defineEngine } from "@vis-three/core";

// 类实例安装
const engine = new Engine()
  .install(RenderManagerPlugin())
  .install(
    WebGLRendererPlugin({
      antialias: true,
      alpha: true,
    })
  )
  .install(
    EffectComposerPlugin({
      WebGLMultisampleRenderTarget: true,
    })
  )
  .install(OrbitControlsPlugin())

  .exec(EffectRenderStrategy())
  .exec(OrbitRenderStrategy());

// 函数式安装
const engine = defineEngine({
  plugins: [
    RenderManagerPlugin(),
    WebGLRendererPlugin({
      antialias: true,
      alpha: true,
    }),
    EffectComposerPlugin({
      WebGLMultisampleRenderTarget: true,
    }),
    OrbitControlsPlugin(),
  ],

  strategy: [EffectRenderStrategy(), OrbitRenderStrategy()],
});
```

::: tip
关于策略的编写请参考[自定义策略](./strategy.md)部分。
:::
