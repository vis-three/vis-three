## 为什么要用 VIS-THREE

### 原生 three.js 项目开发功能模块难以组织

当我们使用 three.js 进行 web3D 相关项目的开发，不管我们是参考[three.js 官网](https://threejs.org/)的例子，还是其他的插件 demo，或者是自己从事项目开发都会发现一个很大的问题，就是使用 three.js 进行开发构建项目时候的 **代码组织** 问题。

我们会发现使用原生 three.js 进行项目开发的时候很难找到一个很好的形式去组织我们的项目代码。第一阶段的功能完成之后，大多数情况下，我们会得到一个“又臭又长”的引擎文件，就算在项目初期进行了很好的模块划分，但是我们还会遇到后面的问题。

![/image/start/long-engine.png](/image/start/long-engine.png)

### 项目迭代非常困难麻烦

项目功能迭代会非常头疼，每当要增加功能或者逻辑实现的时候，我们很难下手，因为很多功能逻辑的增加没有一个统一的接入点，我们需要在各种已经完成的逻辑块或者功能块之间去添加新的功能逻辑，如果这个时候再加上“敏捷开发”的 buff，项目会何去何从？开发人员们又将何去何从？

### 开发中所涉及到的“坑”特别多

three.js 算是一个 web3D 的库，它只提供了最基本或者最原始的项目构建手段，就是因为原始和基本，使得功能非常强大，但是也是因为原始基本，在项目构建的过程中，会有很多的细节问题需要我们去发现和攻克，“坑”踩了一遍，换了一个项目，还要踩第二遍？你踩了一遍，别人再踩一遍？

### 功能插件化

为了解决`three.js`相关项目开发的代码组织问题，降低功能代码间的耦合，提高功能复用性，提高扩展能力，`vis-three`采用了插件化的组织形式，`vis-three`的核心引擎提供功能插件的拔插能力，对各模块各功能进行解耦开发，持续集成，兼容拓展。

```js
import { defineEngine } from "@vis-three/core";
import { WebGLRendererPlugin } from "@vis-three/webgl-renderer-plugin";

const engine = defineEngine({
  plugins: [
    WebGLRendererPlugin({
      antialias: true,
      alpha: true,
    }),
  ],
});
```

### 逻辑策略化

功能插件化之后，提高了引擎的功能兼容和集成，但是如何解决各个功能之间的联通问题和兼容问题？`vis-three`提供策略注入与策略回滚能力，策略是组织不同插件去实现一个完整的功能逻辑的方式，将逻辑与插件解耦，提高插件兼容，提高业务功能兼容，更好的持续集成。

```js
import { defineEngine } from "@vis-three/core";
import { WebGLRendererPlugin } from "@vis-three/webgl-renderer-plugin";
import { RenderManagerPlugin } from "@vis-three/render-manager-plugin";
import { EffectComposerPlugin } from "@vis-three/effect-composer-plugin";

import { EffectRenderStrategy } from "@vis-three/effect-render-strategy";

const engine = defineEngine({
  plugins: [
    WebGLRendererPlugin({
      antialias: true,
      alpha: true,
    }),
    RenderManagerPlugin(),
    EffectComposerPlugin({
      WebGLMultisampleRenderTarget: true,
    }),
  ],
  strategy: [EffectRenderStrategy()],
});
```

### 场景配置化

插件化和策略化也只是一种更好的代码组织方式和形式，但是对于`three.js`相关项目开发的门槛是没有怎么改变的，我们在进行相关`three.js`相关项目开发的时候，`three.js`本身的门槛，比如对图形学的理解，各种对象的属性理解，各种各样的 api，这些东西本身的门槛就很高，需要我们有一定的理解和积累。

那么为了降低`three.js`本身的开发门槛，与避免重复踩坑，`vis-three`提供配置化中间层，将所有`three.js`对象动作配置化，我们在开发场景的时候，不用再过多的关注`three.js`本身的东西，而只用关注我们场景配置的结构，行程构成，这样子就降低开发负担，你只用关心配置，剩下的交给我们。

```js
import { DisplayEngineSupport } from "@vis-three/display-engine-support";
import { generateConfig, CONFIGTYPE } from "@vis-three/middleware";

const engine = new DisplayEngineSupport()
  .setDom(document.getElementById("app"))
  .play();

generateConfig.injectEngine = engine;

const scene = generateConfig(CONFIGTYPE.SCENE);

engine.setSceneBySymbol(scene.vid);

generateConfig.injectScene = true;

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

## 安装

### 整体安装

`vis-three`依赖于`three`，但是不强制依赖某一个特定版本，最优的依赖版本是官网示例的`three`版本，所以在安装`vis-three`之前，需要先安装`three`。

```
npm i three
npm i vis-three
```

::: warning
在`vis-three`@0.5.3 版本中，暂时不支持高版本`three`,推荐安装`three`的 0.141.0 版本，
待后续更新后会支持更高版本的`three`

```
npm i three@0.141.0
npm i vis-three
```

:::

### 整体安装后的使用

```js
import * as VIS from "vis-three";

const engine = new VIS.DisplayEngine();
```

### 按需安装

推荐使用按需安装，由于大多数情况下，大部分项目使用不到所有的插件，策略，各种库，为了保证构建效率和依赖下载效率，推荐使用按需安装，能够优化整体的开发流程。

```
npm i three
npm i @vis-three/display-engine
```

### 按需安装后的使用

```js
import { DisplayEngine } from "@vis-three/display-engine";

const engine = new DisplayEngine();
```

::: tip
`vis-three`官方的所有子包都在`npm`的`@vis-three`组织下，大家可以根据需要进行相关的查找安装使用。
:::
