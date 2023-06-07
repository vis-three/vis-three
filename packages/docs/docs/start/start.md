# 开始

## 安装 three.js

`vis-three`依赖于`three`，但是不强制依赖某一个特定版本，最优的依赖版本是官网示例的`three`版本，所以在安装`vis-three`之前，需要先安装`three`。

```
npm i three
```

::: tip
目前所有示例所使用的 three.js 版本为：`^0.141.0`
:::

## 安装 vis-three

在你使用和安装`vis-three`之前，你可以根据你目前的技术水准、项目周期或者业务需要去选择相关的开发流程和集成模式，`vis-three`提供了几种模式去进行，下面从高效率到高拓展进行列举。

## 使用预置原生 3D 引擎

官方提供的已经集成好的原生 3D 引擎包括：

1. `@vis-three/engine-display`展示用的原生 3D 引擎——如：模型展示等
2. `@vis-three/engine-modeling`编辑用的原生 3D 引擎——如：编辑器应用等

### 安装依赖

```
npm i @vis-three/engine-display
// 或者
npm i @vis-three/engine-modeling


```

### 引擎使用

```js
import * as THREE from "three";
import { DisplayEngine } from "@vis-three/engine-display";
// import { ModelingEngine } from "@vis-three/engine-modeling";

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
```

### 引擎功能拓展

预置的引擎已经提供了大部分通用的功能模块，面对三方插件与面对特定的业务性功能需要自己根据具体情况进行开发相关的插件和策略，这个时候就需要额外安装拓展功能。

```js
// controls.js

export const ControlsPlugin = function () {
  // ...
};
```

```js
import { ControlsPlugin } from "./controls.js";

import { LoaderManagerPlugin } from "@vis-three/plugin-loader-manager";
import { EffectRenderStrategy } from "@vis-three/strategy-effect-render";

const engine = new DisplayEngine()
  .install(LoaderManagerPlugin())
  .install(ControlsPlugin())
  .exec(EffectRenderStrategy())
  .setDom(document.getElementById("app"))
  .play();
```

### 引擎功能注销

有时候我们会面对官方提供的引擎中有部分功能不需要的情况，或者说是影响了当前的效果的情况，那么我们在使用时，可以动态进行引擎修改。

```js
const engine = new DisplayEngine()
  .uninstall("LoaderManagerPlugin")
  .rollback("EffectRenderStrategy")
  .setDom(document.getElementById("app"))
  .play();
```

## 使用预置配置化 3D 引擎

官方提供的已经集成好的配置化 3D 引擎包括：

1. `@vis-three/engine-display-support`展示用的配置化 3D 引擎——如：模型展示等
2. `@vis-three/engine-modeling-support`编辑用的配置化 3D 引擎——如：编辑器应用等

### 安装依赖

```
npm i @vis-three/middleware
npm i @vis-three/engine-display-support
// 或者
npm i @vis-three/engine-modeling-support

```

:::tip
由于使用配置化引擎需要用到配置化相关的功能，为了 IDE 等有相关提示，我们可以预先安装`@vis-three/middleware`
:::

### 引擎使用

```js
import { DisplayEngineSupport } from "@vis-three/engine-display-support";
// import { ModelingEngineSupport } from "@vis-three/engine-modeling-support";

import { generateConfig, CONFIGTYPE } from "@vis-three/middleware";

const engine = new DisplayEngineSupport()
  .setDom(document.getElementById("app"))
  .setSize()
  .play();

const scene = generateConfig(CONFIGTYPE.SCENE);

engine.setSceneBySymbol(scene.vid);

generateConfig.injectScene = true;

const material = generateConfig(CONFIGTYPE.MESHBASICMATERIAL, {
  color: "rgb(255, 0, 0)",
});

const geometry = generateConfig(CONFIGTYPE.BOXGEOMETRY, {
  width: 20,
  height: 40,
  depth: 60,
});

const mesh = generateConfig(CONFIGTYPE.MESH, {
  geometry: geometry.vid,
  material: material.vid,
  position: {
    x: 10,
  },
});

engine.applyConfig(material, geometry, mesh);
```

### 功能拓展与注销功能与原生一致。

## 按需自定义组装原生 3D 引擎

## 按需自定义组装配置化 3D 引擎

::: tip
`vis-three`官方的所有子包都在`npm`的`@vis-three`组织下，大家可以根据需要进行相关的查找安装使用。
:::
