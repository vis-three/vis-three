## 安装

```
npm i vis-three
```

## 使用

```js
// 整体导入
import * as VIS from "vis-three";

// 按需导入
import {
  ModelingEngineSupport,
  SupportDataGenerator,
  generateConfig,
} from "vis-three";
```

## 基本用法

### 生成配置

VIS 支持的对象都有相应的基础配置，可以通过统一的 API 获取，并且 VIS 中已经提供了所有支持配置的枚举对象，可以配合 vscode 等编辑器快速查询需要的对象，也可以通过传入对应的`string`进行获取。大部分的类型与`three.js`的对象`type`一致。

```js
const pointLight = VIS.generateConfig(VIS.CONFIGTYPE.POINTLIGHT, {
  position: {
    x: 10,
    y: 20,
    z: 20,
  },
});

const pointLight = VIS.generateConfig("PointLight", {
  position: {
    x: 10,
    y: 20,
    z: 20,
  },
});
```

### 配置使用

配置化的开发我们需要使用支持的配置化开发的引擎，也就是`extends EngineSupport`的引擎对象。

目前内置的可直接使用的`EngineSupport`类有：

- `ModelingEngineSupport`：开发期，或者建模类型的`EngineSupport`
- `DisplayEngineSupport`：生产期，展示类型的`EngineSupport`

#### 动态加入

```js
const engine = new VIS.ModelingEngineSupport();

engine.applyConfig(
  VIS.generateConfig(VIS.CONFIGTYPE.POINTLIGHT, {
    position: {
      x: 10,
      y: 20,
      z: 20,
    },
  })
);

engine.applyConfig(
  VIS.generateConfig(VIS.CONFIGTYPE.BOXGEOMETRY, {
    width: 10,
    height: 10,
    depth: 10,
  })
);
```

#### 模块化加入

```js
const pointLight = VIS.generateConfig(VIS.CONFIGTYPE.POINTLIGHT, {
  position: {
    x: 10,
    y: 20,
    z: 20,
  },
});

const geometry = VIS.generateConfig(VIS.CONFIGTYPE.BOXGEOMETRY, {
  width: 10,
  height: 10,
  depth: 10,
});

const lightDataSupport = new VIS.LightDataSupport({
  [pointLight.vid]: pointLight,
});

const geometryDataSupport = new VIS.GeometryDataSupport({
  [geometry.vid]: geometry,
});

const engine = new VIS.ModelingEngineSupport({
  lightDataSupport,
  geometryDataSupport,
});
```

#### 自动注入

在单 engine 的应用下，我们可以使用`generateConfig`的自动注入功能自动应用配置：

```js
const engine = new VIS.ModelingEngineSupport();

VIS.generateConfig.injectEngie = engine;

VIS.generateConfig(VIS.CONFIGTYPE.POINTLIGHT, {
  position: {
    x: 10,
    y: 20,
    z: 20,
  },
});

VIS.generateConfig(VIS.CONFIGTYPE.BOXGEOMETRY, {
  width: 10,
  height: 10,
  depth: 10,
});
```

### 指定渲染场景

VIS 中的 engine 能够支持多场景切换，默认情况下自带一个空`scene`对象以防 render 报错，所以一般情况下我们需要指定渲染的场景。

```js
const scene = VIS.generateConfig(VIS.CONFIGTYPE.SCENE);
engine.applyConfig(scene).setScene(scene.vid);
```

### 指定渲染相机

VIS 中的 engine 支持相机切换，所以我们最好能够显示的指定当前需要渲染的相机。

```js
const camera = VIS.generateConfig(VIS.CONFIGTYPE.PERSPECTIVECAMERA, {
  position: {
    x: 50,
    y: 50,
    z: 50,
  },
  far: 5000,
});

engine.applyConfig(camera).setCamera(camera.vid);
```

::: tip

安装了部分插件的 engine 自带有默认相机配置，可以不用指定渲染相机，但是要注意展示期的相机使用。

:::

### 编辑场景物体

使用配置化的开发方式，所有的事情都可以通过配置进行解决，影响配置就能够影响各种相关的`three`对象。

```js
const engine = new VIS.ModelingEngineSupport();

VIS.generateConfig.injectEngie = engine;

const pointLight = VIS.generateConfig(VIS.CONFIGTYPE.POINTLIGHT, {
  position: {
    x: 10,
    y: 20,
    z: 20,
  },
});

pointLight.distance = 200;
```

### 导出配置

在进行完相关的场景编辑处理之后，我们可以导出相关的场景配置。

#### 导出 json 版本配置

```js
console.log(engineSupport.toJSON());
```

#### 导出 js 版本配置

```js
console.log(engineSupport.exportConfig());
```

::: tip

配置导出之后，可以进行相关的修改，存储，比如浏览器存储，本地存储，DB 存储。

:::

### 导入配置

```js
import config from "/examples/config.json";

const handlerConfig = JSON.parse(JSON.stringify(config), VIS.JSONHandler.parse);

new VIS.ModelingEngineSupport()
  .setDom(document.getElementById("app"))
  .setSize()
  .play()
  .loadConfigAsync(handlerConfig)
  .then((event) => {
    // loaded do something...
  });
```

::: tip

配置导入前最好能通过`VIS.JSONHandler.parse`转义一次，因为`Infinity`, `-Infinity`等值的 JSON 化存在问题，我们需要统一进行再处理。

:::
