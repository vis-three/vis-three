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

### @vis-three/modeling-engine-support

## 自定义引擎组装
