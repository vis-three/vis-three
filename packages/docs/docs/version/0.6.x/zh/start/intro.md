# 为什么要用 VIS-THREE？

## three.js 相关项目开发中遇到的问题

### 项目组织与迭代

当我们使用 three.js 进行 web3D 相关项目的开发，不管我们是参考[three.js 官网](https://threejs.org/)的例子，还是其他的插件 demo，或者是自己从事相关项目开发都会发现一个很大的问题，就是使用 three.js 进行开发构建项目时候的 **代码组织** 问题。

- 面对各式各样的需求功能，不同经验的开发者，不一样的前端技术栈与前端框架，我们该如何通过较好的组织架构保障项目的长远稳定的迭代与运行？

- 每当需求变更，功能业务新增，我们该如何去修改我们现有的代码，避免牵一发而动全身，出现问题的时候能够快速定位？

- 面对不同经验的开发者，开发流动性大的项目团队，新人需要花多长时间去熟悉才能有把握的上手？

### 灵活与“坑”多

three.js 算是一个 web3D 的库，它只提供了最基本或者最原始的项目构建手段，就是因为原始和基本，使得功能非常强大，但是也是因为原始基本，在项目构建的过程中，会有很多的细节问题需要我们去发现和攻克，也就是所谓的有很多“坑”。

- 我们该如何避免重复踩“坑”？

- 我们又该如何防止别人踩“坑”？

### 框架结合与渲染性能

数据驱动视图框架的兴起与热门，推动前端开发从项目复杂度与人员数量都上升了一个新台阶，其便利性使得一般的开发人员花费较低的技术成本，将更多的时间花在业务功能的思考上。

但是对于兴起的 3D 类项目，不管从开发思维与技术门槛，都产生了很大的变化。特别是对于 3D 实时渲染为主的 web3D 项目，在沿用当下热门的前端框架时：

- 如何处理好 3D 部分与热门前端框架间的关系？

- 如何保证实时 3D 渲染的性能？

高效的开发离不开当下热门的前端框架，但是要很好的保证 3D 实时渲染性能，或者说是网页运行的性能，开发 3D 类型的项目，对于开发的能力要求会十分的高，而且在开发期对于开发的心智负担也会加重，这对于当前大部分前端开发者来说，都是一个很大的挑战。

## VIS-THREE 框架介绍

### 功能插件化

为了解决`three.js`相关项目开发的代码组织问题，降低功能代码间的耦合，提高功能复用性，提高扩展能力，`vis-three`提出了功能插件化概念，采用了插件化的组织形式，`vis-three`的核心引擎提供功能插件的拔插能力，对各模块各功能进行解耦开发，持续集成，兼容拓展。

```js
import { defineEngine } from "@vis-three/core";
import { WebGLRendererPlugin } from "@vis-three/plugin-webgl-renderer";

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

- 如何解决各个功能之间的联通问题和兼容问题？

- 如何保证面对不同的业务功能需求，插件的功能都能满足与实现？

`vis-three`提出了逻辑策略化的概念，提供策略注入与策略回滚能力，策略是组织不同插件去实现一个完整的功能逻辑的方式，将逻辑与插件解耦，提高插件兼容，提高业务功能兼容，更好的持续集成。

```js
import { defineEngine } from "@vis-three/core";
import { WebGLRendererPlugin } from "@vis-three/plugin-webgl-renderer";
import { RenderManagerPlugin } from "@vis-three/plugin-render-manager";
import { EffectComposerPlugin } from "@vis-three/plugin-effect-composer";

import { EffectRenderStrategy } from "@vis-three/strategy-effect-render";

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

为了降低`three.js`本身的开发门槛，与避免重复踩坑，`vis-three`提供配置化中间层，将所有`three.js`对象动作配置化，我们在开发场景的时候，不用再过多的关注`three.js`本身的东西，只用关注我们场景配置单的结构。

`vis-three`还提供一系列工具和能力，更便利的操作配置单，通过配置单去映射整个 3D 场景与 3D 场景功能交互，降低开发门槛，提高开发效率。

**你只用关心配置，剩下的交给我们**。

```js
import { DisplayEngineSupport } from "@vis-three/engine-display-support";
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

### 工程组件化

## VIS-THREE 的优势

### 强大的兼容性

从框架的角度来说，`vis-three`主要提供了一套开发流程与机制来规范和加强 web3D 相关项目的开发，所以可以根据具体的业务需求和开发难度，去寻找或者自定义相关的插件、策略、配置化模块去进行项目开发。

在这套体系下，`vis-three`既能够支持原生`three.js`相关项目的开发，也能够支持`vis-three`机制下的配置化开发乃至后面的组件化开发。

### 更灵活的集成与迁移

`vis-three`框架构建的 3D 引擎，是通过各种插件与策略进行集成的，而且`vis-three`的插件和策略是可拔可插的，那么在引擎的功能变更上，就可以通过对不同的插件与策略的安装与取消进行便利的控制；在引擎功能迁移上，引入同样的插件与策略，迁移就已经完成。

### 更稳健的版本升级

`vis-three`通过插件化、策略化与配置化，将应用项目与`three.js`做了隔离，这种隔离在`three.js`更新的时候能够起到一个很好的缓冲作用。

在原生的`three.js`项目开发与应用构建途中，一旦确定了`three.js`的依赖版本，在遇到`three.js`大版本更新的时候，进行技术更新的成本会非常高，很容易导致不兼容与牵一发而动全身，进而导致项目大重构，升级成本和风险都很高。

但是如果使用了`vis-three`，在进行`three.js`的版本更新时，对于应用项目来讲基本是无感的，因为我们只用更新升级相关的插件与策略或者配置化模块，相关的版本就已经进行了更新兼容，这能在很大程度上保证了应用项目的稳定迭代。

### 更宽泛的框架结合

`vis-three`通过场景配置化的特性，其中很重要的一部分，是将需要的 UI 逻辑和 3D 渲染层进行解耦。

对于 UI 框架来说，3D 实时渲染的部分不再是 3D 库的东西，取而代之的是类似于`json`的配置单，UI 的所有操作都是在对一个简单的`json`配置单进行操作。

也就是说大部分情况下，UI 框架将不再会操作 3D 实时渲染所需要用到的对象和属性，将 3D 部分和 UI 部分进行了解耦，既保证了 UI 开发效率，又保证了 3D 实时渲染的性能，还降低了开发难度，保证整个 web3D 项目的运行与开发效率。

`vis-three`框架不会强行绑定特定的 UI 框架，比如：`vue2`、`vue3`、`react`等等，从框架的设计原理上来讲，`vis-three`能够与任意前端框架进行结合使用。

### 更顺畅的开发过渡

如果你已经使用过`three.js`进行 web3D 相关项目的开发，那么在你了解和使用`vis-three`进行项目构建的时候，可以让你很自然很顺畅的进行开发技术过渡。

官方提供的插件和策略，和相关的配置化模块，都是采用非侵入式的开发构建模式，也就是说，尽可能的不去影响和改变`three.js`原生的对象和属性与相关概念，在这种模式下，对于`three.js`的开发者在各种各样的功能与模块中都能够快速的熟悉与上手。

## 配置化的开发优势

### 开发降压

### 模板与组装

### 预处理和后处理

### 配置升级与逻辑升级

### 持久化与运行时

### 原生的渲染性能
