## 配置化开发

`vis-three`为了降低开发复杂度，将`three.js`的种种功能和相关动作等转化为配置，通过提供一系列工具和能力，更便利的操作配置单，通过配置单去映射整个 3D 场景与 3D 场景功能交互，降低开发门槛，提高开发效率。

### 更好的 UI 框架结合

我们前端常用的框架，比如：`vue`， `react`， `angular`这类的 MVVM 框架，或者说是`jquery`，`layui`等等偏向于原生的框架，大家在使用的时候，大部分情况下其实都是作为前端 UI 框架进行使用。

而且大部分情况下，大部分开发的大部分时间，都是在为业务功能进行思考，对于 3D 实时渲染的特性了解较少。作者认为，3D 实时渲染和 UI 框架应该是两个平等的部分，特别是对于 3D 实时渲染为主的 web3D 项目，更应该将 UI 框架和 3D 渲染框架做很好的解耦，不然很容易造成性能问题，特别是对于 MVVM 类型的框架来讲，如果按照原本的 UI 开发模式去结合 3D 实时渲染功能，性能问题会十分堪忧。

但是这里就会遇到一个问题，高效的 UI 开发离不开当下热门的 MVVM 前端框架，但是要很好的保证 3D 实时渲染性能，或者说是网页运行的性能，这种情况下，开发 web3D 类型的项目，对于开发的能力要求会十分的高，而且在开发期对于开发的心智负担也会加重。

`vis-three`通过场景配置化的特性，其中很重要的一部分，是将需要的 UI 逻辑和 3D 渲染层进行解耦，对于 UI 框架来说，3D 实时渲染的部分不再是 3D 框架所需要的东西，取而代之的是类似于`json`的配置单，UI 的所有操作都是在对一个简单的`json`配置单进行操作，也就是说大部分情况下，UI 框架将不再会操作 3D 实时渲染所需要用到的对象和属性，这样子就将 3D 部分和 UI 部分进行了很好的解耦，既保证了 UI 开发效率，又保证了 3D 实时渲染的性能，进而降低了开发难度，保证整个 web3D 项目的运行效率。

### 更轻松高效的开发过程

3D 场景配置化后，对于大部分 UI 交互开发为主的项目来说，开发者将不用再关注 3D 实时渲染原生的对象功能，只用关注配置的变化，配置单的变化就行。配置单对于开发者来讲，就是各种最简单的数据结构的数据组合，对配置的操作也就是最常见的`CRUD`，配置单就是 3D 场景的映射，对配置单的操作也就是对 3D 场景的操作，通过最简单的数据操作，影响改变整个 3D 渲染场景。

### “坑”已经填了

如果大家经常开发`three.js`3D 项目，应该会发现`three.js`本身会遇到非常多的坑，包括但不限于各类功能控件的结合使用，运行期场景与场景重现的种种冲突和复现难度，这每一部分所遇到的问题，都需要花费大量的时间去做填补和兼容处理，`vis-three`的配置化过程中，已经将遇到的“坑”填好了，保证配置和配置对应的 3D 场景功能能够稳定运行。

### 安装配置化开发

```
npm i @vis-three/middleware
```

::: tip

配置化开发的核心部分在`@vis-three/middleware`这个包中。
:::

### 生成配置

配置化开发的首要部分就是各种配置单的生成和配置单对应的对象功能。

```js
import { DisplayEngineSupport } from "@vis-three/display-engine-support";
import { generateConfig, CONFIGTYPE } from "@vis-three/middleware";

const engine = new DisplayEngineSupport()
  .setDom(document.getElementById("app"))
  .play();

const material = generateConfig(CONFIGTYPE.MESHSTANDARDMATERIAL, {
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
});

const scene = generateConfig(CONFIGTYPE.SCENE, {
  children: [mesh.vid],
});

engine.applyConfig(material, geometry, mesh, scene);
```

::: tip

- 配置化开发需要使用支持配置化的引擎，也就是继承`EngineSupport`的引擎。
- `generateConfig`是生成配置的统一 api。
- `CONFIGTYPE`中枚举了当下支持的所有物体配置单。
  :::

### 编辑配置

通过`generateConfig`生成的配置，其实就是一个很简单的对象，我们只用操作这个对象的相关属性，就能够影响 3D 场景中对象做出相关的变化。

```js
mesh.position.x = 10;
mesh.rotation.y = Math.PI / 2;

scene.children.pop();
```

### 保存配置

配置化开发的一大特点就是，只要有相关的配置的，在哪里都能够复现当前的场景，那么首要的部分就是配置单的保存。

```js
const json = engine.toJSON(); // 直接导出json配置单

const jsObject = engine.exportConfig(); // 导出干净的js对象
```

::: tip
有很多的需求是在保存之前需要对配置单进行统一的操作，可以直接操作`jsObject`对象，`exportConfig`导出的 js 对象是深拷贝对象，不会影响运行期的配置。
:::

### 应用配置

如何通过配置单还原整个场景？我们只用调用一个`api`就能搞定！

```js
import jsonConfig from "jsonConfig.json";
import { JSONHanlder } from "@vis-three/middleware";

const config = JSONHanlder.clone(jsonConfig);

engine.loadConfig(config. () => {
  // do something
  });

engine.loadConfigAsync(config).then((res) => {
  // do something
});
```

::: tip
在应用配置单之前，我们需要通过`JSONHanlder`处理一次，因为比如`Infinity`, `-Infinity`等的数字对象在普通的`json`化过程中会丢失，所以需要特殊处理。
:::
