# 配置化开发

## 开发介绍

配置化开发模式主要是针对复杂的、有持久化需求的业务场景，比如：编辑器类应用、平台类应用等等，这些业务场景既要进行 3D 的事实渲染，但更主要的是需要进行场景数据的存储与恢复。

`vis-three`提供的配置化开发模式有几个很实用的特性：

- **自定义配置化**：配置化开发模式除了使用官方预设的配置化模块之外，还具有完全的自定义配置化的能力，能够根据不同的业务需求，打造不同的配置与渲染场景。

- **前后一致性**：使用了配置化模块的之后，所形成的配置，在项目运行时和持久化存储时期，是完全一致的，不管是运行时的修改还是存取时候的修改，所带来的影响也是一致的。这能很好的降低开发的心智负担。

- **配置存储与资源隔离**：配置化模式的一大特点就是对持久化存储空间的优化，配置化模式下的存储不再是重复的打包`three.js`的场景，而是只存储简单的配置结构，可以选择将需要使用的模型、图片等资源当成外部资源，只进行连接存储，不进行打包。这种模式下，既能节省每个应用场景的存储空间，又能够复用各种外部资源。达到空间占用最小化，资源复用最大化。

- **模板化与组装**：配置化模式有模板的概念，在同一批外部资源的环境下，构建存储的各种各样的场景，能够当成模板进行复用，也就是说，不同的场景配置能够进行组合进而形成新的场景。如果业务需求中有原件、模板、可复用场景等业务需求概念，配置化模式能够很好的帮助您实现这些需求。

- **预处理和后处理**：配置化模式还有一大优势就是能够进行配置的预处理和后处理，加大灵活性。预处理就是在配置应用渲染成场景之前进行处理；后处理就是在配置进行持久化保存之前进行处理。预处理能够在不影响持久化数据的前提下规范配置，进行不同业务平台功能的场景兼容；后处理能够针对同一场景，进行不同业务平台需求的规范配置与持久化分发。

- **升级与版本管理**：配置化模式下进行功能的迭代，对于应用与用户来说，其实就是配置的升级，在进行升级与版本管理时，只用对比配置的更新修改即可，这大大降低了项目产品的迭代更新兼容的难度。

对比于原生化开发，配置化开发在继承了原生化开发**全部能力**的基础上，增加了配置化的全流程控制能力，配置化开发根据配置化去形成场景结构与可视化场景，在运行期通过对配置的更改去影响 3D 场景，能够为复杂应用的构建保驾护航。

## 案例查看

- [https://vis-three.github.io/examples.html?example=engine/EngineSupport.html](https://vis-three.github.io/examples.html?example=engine/EngineSupport.html)

## 引擎准备

配置化引擎与原生引擎一致，我们先安装下面的依赖：

```
npm i three
npm i @types/three

// vis-three的配置化核心
npm i @vis-three/tdcm

// three.js的 WebGLRenderer相关插件
npm i @vis-three/plugin-webgl-renderer

// 网格辅助插件，能对前期场景起到视觉辅助作用
npm i @vis-three/plugin-grid-helper

// 相机自适应插件，自动适配不同的渲染窗口大小
npm i @vis-three/plugin-camera-adaptive

// WebGLRenderer渲染策略
npm i @vis-three/strategy-webgl-render

```

:::tip
配置化引擎本身已经集成了一批基础的插件策略，我们只需要安装其他需要的插件策略即可，配置化引擎核心的内置插件策略请插件相关文档。
:::

安装完毕之后进行引擎构建，配置化引擎构建方式同原生引擎构建一致，也提供了两种构建方式：

```js
import { EngineSupport, defineEngineSupport } from "@vis-three/tdcm";
import { WebGLRendererPlugin } from "@vis-three/plugin-webgl-renderer";
import { GridHelperPlugin } from "@vis-three/plugin-grid-helper";
import { CameraAdaptivePlugin } from "@vis-three/plugin-camera-adaptive";
import { WebGLRenderStrategy } from "@vis-three/strategy-webgl-render";

// 类实例化
const engine = new EngineSupport()
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
const engine = defineEngineSupport({
  plugins: [
    WebGLRendererPlugin({
      antialias: true,
      alpha: true,
    }),
    CameraAdaptivePlugin(),
    GridHelperPlugin(),
  ],
  strategy: [WebGLRenderStrategy()],
});
```

如果就此进行开发，可以支持跟原生引擎构建一样的原生开发，但是我们既然使用的是配置化引擎，我按还需要安装配置化的依赖。

我们直接安装官方预置的配置化模块库，该库提供了单个的配置化模块，又提供了所有的配置化模块集合，可以根据自己的需要选取使用：

```
npm i @vis-three/library-module
```

```js
// import ...
import {
  light,
  geometry,
  material,
  // ...
  modules,
} from "@vis-three/library-module";

// 类实例化
const engine = new EngineSupport()
  .install(
    WebGLRendererPlugin({
      antialias: true,
      alpha: true,
    })
  )
  .install(CameraAdaptivePlugin())
  .install(GridHelperPlugin())
  .useModule(light)
  .useModule(geometry)
  .useModule(material)
  // ...
  .exec(WebGLRenderStrategy());

// 函数式
const engine = defineEngineSupport({
  plugins: [
    WebGLRendererPlugin({
      antialias: true,
      alpha: true,
    }),
    CameraAdaptivePlugin(),
    GridHelperPlugin(),
  ],
  strategy: [WebGLRenderStrategy()],
  modules: modules,
});
```

::: warning
如果你使用类形式的组装模式，注意按照`插件` -> `模块` -> `策略`的顺序进行引擎组装。因为`模块`其实是另外一种形式的`插件`。
:::

## 页面挂载

页面挂载的方式和[原生引擎](./native.md)构建一致。

## 添加物体

配置化引擎的物体添加等操作模式和原生引擎有很大的不同，您不用再关心`three.js`的类型和参数 API，只用生成相关的配置即可。

```js
// import ...
import {
  defineEngineSupport,
  generateConfig,
  CONFIG_TYPE,
  toSymbol,
} from "@vis-three/tdcm";

// engine code ...

// 我们需要通过generateConfig生成一个支撑配置化的场景对象
const defaultScene = generateConfig(CONFIG_TYPE.SCENE);

// 通过调用applyConfig能够应用生成的配置
// setSceneBySymbol可以通过配置的唯一标记vid去查找物体
engine.applyConfig(defaultScene).setSceneBySymbol(toSymbol(defaultScene));

const pointLight = generateConfig(CONFIG_TYPE.POINTLIGHT, {
  color: "rgb(255, 255, 255)",
  position: {
    y: 30,
  },
});

const commonGeometry = generateConfig(CONFIG_TYPE.BOXGEOMETRY, {
  width: 10,
  height: 10,
  depth: 10,
});

const boxMaterial = generateConfig(CONFIG_TYPE.MESHSTANDARDMATERIAL, {
  color: "rgb(255, 105, 100)",
});

const box = generateConfig(CONFIG_TYPE.MESH, {
  geometry: toSymbol(commonGeometry),
  material: toSymbol(boxMaterial),
  position: {
    x: 10,
  },
});

const lineBox = generateConfig(CONFIG_TYPE.LINE, {
  geometry: toSymbol(commonGeometry),
});

const pointsMaterial = generateConfig(CONFIG_TYPE.POINTSMATERIAL, {
  color: "rgb(255, 255, 255)",
});

const pointsBox = generateConfig(CONFIG_TYPE.POINTS, {
  geometry: toSymbol(commonGeometry),
  material: toSymbol(pointsMaterial),
  position: {
    x: -10,
  },
});

engine.applyConfig(
  pointLight,
  commonGeometry,
  boxMaterial,
  box,
  lineBox,
  pointsMaterial,
  pointsBox
);

defaultScene.children.push(
  toSymbol(pointLight),
  toSymbol(box),
  toSymbol(lineBox),
  toSymbol(pointsBox)
);
```

通过上面的代码我们发现：

1、不用再通过`import * as THREE from 'three'`然后`new`相关的对象就可以直接完成场景构建。

2、配置化的形式可以在生成配置的时候将所有的属性初始完成。

3、每一个配置都有其独有的`vid`标记，它可以代替配置完成整个对象的使用，我们可以通过`toSymbol`这个`api`进行获取。

4、配置化的基本开发思路就是：生成配置`generateConfig` -> 应用配置`engine.applyConfig`

::: tip

- `generateConfig`是生成配置的统一 api。
- `CONFIG_TYPE`中枚举了当下支持的所有物体配置单。
- 手动应用配置注意应用配置的先后顺序，比如`box`需要依赖`commonGeometry`, `boxMaterial`这两个配置，那么`box`的应用要在`commonGeometry`和`boxMaterial`之后。
  :::

## 自动注入

如果我们是简单场景开发，上面既要手动生成配置，又要手动应用配置，又要注意应用顺序的过程比较繁琐，我们可以使用自动注入的相关功能简化操作。

```js
// other code...
const defaultScene = generateConfig(CONFIG_TYPE.SCENE);

engine.applyConfig(defaultScene).setSceneBySymbol(toSymbol(defaultScene));

// 设置注入引擎
generateConfig.injectEngine = engine;
// 开启注入场景
generateConfig.injectScene = true;
// 开启自动注入
generateConfig.autoInject = true;

generateConfig(CONFIG_TYPE.POINTLIGHT, {
  color: "rgb(255, 255, 255)",
  position: {
    y: 30,
  },
});

const commonGeometry = generateConfig(CONFIG_TYPE.BOXGEOMETRY, {
  width: 10,
  height: 10,
  depth: 10,
});

const boxMaterial = generateConfig(CONFIG_TYPE.MESHSTANDARDMATERIAL, {
  color: "rgb(255, 105, 100)",
});

generateConfig(CONFIG_TYPE.MESH, {
  geometry: toSymbol(commonGeometry),
  material: toSymbol(boxMaterial),
  position: {
    x: 10,
  },
});

generateConfig(CONFIG_TYPE.LINE, {
  geometry: toSymbol(commonGeometry),
});

const pointsMaterial = generateConfig(CONFIG_TYPE.POINTSMATERIAL, {
  color: "rgb(255, 255, 255)",
});

generateConfig(CONFIG_TYPE.POINTS, {
  geometry: toSymbol(commonGeometry),
  material: toSymbol(commonGeometry),
  position: {
    x: -10,
  },
});
```

:::tip
自动注入的功能对于简单的场景构建是十分高效的，但是面对复杂的业务场景，还是建议采用手动应用配置的方式。
:::

## 编辑配置

对于绝大多数业务来说，运行期的属性更改是有必要的，对于原生的 three.js 我们可以通过调用相关的类型对象 api 进行，但是对于配置化来说，通过`generateConfig`生成的配置，其实就是一个很简单的配置对象，我们只用操作这个对象的相关属性，就能够影响 3D 场景中对象做出相关的变化，我们只用改变生成的配置即可。

```js
// other code
box.position.x = 40;

mesh.rotation.y = Math.PI / 2;

boxMaterial.color = "rgb(0, 0, 255)";

scene.children.pop();
```

::: warning
这里要注意，对于`generateConfig`生成的配置不要直接替换整个配置对象里面的引用对象，比如：

```js{2}
const mesh = generateConfig(CONFIG_TYPE.MESH);
mesh.position = { x: 10, y: 10, z: 10 };
```

主要是因为：

1. 直接替换掉整个引用，会造成额外性能开销(重复的 new object)。

2. 直接替换引用，在相应模块内可能会丢失对象的跟踪处理（引用类型的指针丢失）。

3. 在配置对象版本更新的时候，会缺失新版本的配置属性（新版本在 position 中新增了一个属性 w）。

正确处理：

```js
const mesh = generateConfig(CONFIG_TYPE.MESH);
mesh.position.x = 10;
mesh.position.y = 10;
mesh.position.z = 10;
```

:::

## 插件配置

有部分配置是不在`module`包中的，比如`WebGLRenderer`的配置，因为这些配置需要对应的插件才能进行，所以这部分配置能力也变成了相关插件策略，这部分插件策略大多以`@vis-three/xxxx-support`进行，我们现在来配置一下`WebGLRenderer`。

```
npm i @vis-three/strategy-webgl-renderer-support
```

```js
// import code...

import { WebGLRendererSupportStrategy } from "@vis-three/strategy-webgl-renderer-support";

const engine = defineEngineSupport({
  plugins: [
    //...
    WebGLRendererPlugin({
      antialias: true,
      alpha: true,
    }),
  ],
  strategy: [WebGLRenderStrategy(), WebGLRendererSupportStrategy()],
  modules: [
    //...
  ],
});

engine.applyConfig(
  generateConfig(CONFIG_TYPE.WEBGLRENDERER, {
    clearColor: "rgba(255 ,255 ,255 , 1)",
    shadowMap: {
      enabled: true,
    },
  })
);
```

## 物体动画

对于物体动画，按照原生的方式进行也可以实现，但是我们更希望利用配置化的优势去构建，这样在保存恢复场景的时候能够利用配置化的特性直接恢复。

在`vis-three`官方提供的动画中，目前分为两个类型的动画，一个是`脚本动画-ScriptAnimation`，一个是`混合器动画-MixerAnimation`。

对于一般性质的简单动画，或者说业务特征明显的动画，基本上使用`脚本动画`是十分方便高效的。但是对于脚本动画而言，需要预定的动画库与动画方法支持，我们要率先将需要的动画进行注册，再调用。

我们可以先安装官方提供的脚本动画库。

```
npm i @vis-three/library-animate-script
```

由于配置化的脚本动画能力是来自于动画模块，所以我们可以从`@vis-three/library-module`或`@vis-three/module-animation`中获取相关的管理器，进行相关的动画注册。

```js
// import ...

import { AniScriptGeneratorManager } from "@vis-three/library-module";

import { linearTime } from "@vis-three/library-animate-script";

AniScriptGeneratorManager.register(linearTime);

const engine = defineEngineSupport({
  //...
});

// ...
const box = generateConfig(CONFIG_TYPE.MESH, {
  geometry: toSymbol(commonGeometry),
  material: toSymbol(boxMaterial),
  position: {
    x: 10,
  },
});

// ...

generateConfig(
  CONFIG_TYPE.SCRIPTANIMATION,
  {
    target: toSymbol(box),
    attribute: ".rotation.y",
    script: AniScriptGeneratorManager.generateConfig("linearTime", {
      multiply: 1.5,
    }),
  },
  {
    strict: false,
  }
);
```

:::tip
这里注意我们对于未知的配置环境需要将`generateConfig`的严格模式关闭，不然无法进行配置的合并。

未知的配置环境就是不能提前的知道这个配置的全部，无法预先定义的配置。
:::

## 物体事件

对于物体事件，配置化的部分和物体动画的流程是一致的。我们需要把相关的事件方法率先进行注册。

下面是点击线框会让立方体往 x 轴实时移动。

```
npm i @vis-three/library-event
```

```js
// import ...
import { EventGeneratorManager } from "@vis-three/library-module";

import EventLibrary from "@vis-three/library-event";

EventGeneratorManager.register(EventLibrary.moveSpacing);

const engine = defineEngineSupport({
  //...
});

// ...
const box = generateConfig(CONFIG_TYPE.MESH, {
  geometry: toSymbol(commonGeometry),
  material: toSymbol(boxMaterial),
  position: {
    x: 10,
  },
});

const boxMoveEvent = EventGeneratorManager.generateConfig("moveSpacing", {
  params: {
    target: toSymbol(box),
    spacing: {
      x: 10,
      y: 0,
      z: 0,
    },
  },
});

generateConfig(
  CONFIG_TYPE.LINE,
  {
    geometry: toSymbol(commonGeometry),
    click: [boxMoveEvent],
  },
  {
    strict: false,
  }
);

// ...
```

## 模型导入

对于模型导入的部分，我们需要预先安装资源的解析器，为什么要使用解析器呢？

因为对于配置化开发，所有的物体对象都会以配置的形式进入引擎，那么对于不同的业务场景，我们可能会准备不同的配置模块而使用同一批模型等外部资源，那么我们可以通过安装不同的解析器去达成对应的业务需求。

也就是说在配置化的外部资源应用过程中需要经历这么一个过程：

`外部资源（模型等）加载` -> `解析器解析为对应的配置单` ->

`配置单预处理` -> `配置单应用`

但是对于通用的模型资源应用，官方准备了对应的解析器库可供选择使用：

```
npm i @vis-three/library-parser
```

```js
// import ...
import {
  // ...
  Template,
} from "@vis-three/tdcm";

//...

engine.loaderManager.setPath(import.meta.env.BASE_URL);
engine.resourceManager.addParser(new GLTFResourceParser());

//...

const shoe = "model/glb/MaterialsVariantsShoe/MaterialsVariantsShoe.gltf";

engine.loadResourcesAsync([shoe]).then((res) => {
  engine.loadConfig(Template.observable(res.resourceConfig[shoe]));

  const rootTemplate = res.configMap.get(shoe + ".scene");

  const root = engine.getConfigBySymbol(rootTemplate.vid);

  root.scale.x = 50;
  root.scale.y = 50;
  root.scale.z = 50;
});
```

:::tip

- 对于解析器，我们需要注册进 `engine.resourceManager` 也就是配置化引擎的**资源管理器**中。

- 对于加载完成后的物体，我们需要通过 url 去找的他的相关配置，因为有可能同时加载很多资源。

- 对于拿到的配置单，我们需要将他们处理成可供 `engine` 使用的响应式对象，这里我么你可以直接使用提供的`Template`对象中的方法。

- 其他的思路跟我们配置化开发的思路一样，你只用想方法找到相关的配置，就能够操作它。
  :::

## 生成资源

什么叫生成资源？就是没有持久化的，而是在运行期生成的资源，最典型的就是`CanvasTexture`这类资源。

生成资源有一个问题就是无法通过`Loader`进行资源访问的加载，`vis-three`将外部资源分为两类，一类是加载资源，一类是非加载资源。

加载资源：需要通过 `loader` 加载，如果要使用需要提供相关的加载 `loader` 注入到 `loaderManger` 中。

非加载资源：比如 `canvas` 和 `dom` 等等，一般是没有相关 `loader`，这种可以直接通过 `resourceManger` 进行资源注册。

```js
import {
  //...
  HTMLCanvasElementParser,
} from "@vis-three/library-parser";

import { CanvasGenerator } from "@vis-three/convenient";

const engine = defineEngineSupport({
  //...
});

engine.resourceManager.addParser(new HTMLCanvasElementParser());

const textCanvas = new CanvasGenerator()
  .draw((ctx) => {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 512, 512);
    ctx.translate(256, 256);
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillStyle = "black";
    ctx.font = " bold 52px 微软雅黑";
    ctx.fillText("Hello vis-three", 0, 0);
  })
  .preview()
  .getDom();

engine.registerResources({
  textCanvas,
});

const canvasTexture = generateConfig(CONFIG_TYPE.CANVASTEXTURE, {
  url: "textCanvas",
});

const boxMaterial = generateConfig(CONFIG_TYPE.MESHSTANDARDMATERIAL, {
  // color: "rgb(255, 105, 100)",
  map: toSymbol(canvasTexture),
});

const box = generateConfig(CONFIG_TYPE.MESH, {
  geometry: toSymbol(commonGeometry),
  material: toSymbol(boxMaterial),
  position: {
    x: 10,
  },
});

// ...
```

:::tip

- 对于 canvas 资源等，官方已经通过`@vis-three/convenient`集成了便利的工具。
- 生成的资源记得通过`engine.registerResources`进行注册，他们的`key`是在配置过程中的标识。
  :::

## 配置保存

配置化开发的一大特点就是，只要有相关的配置的，在哪里都能够复现当前的场景，那么首要的部分就是配置单的保存。

```js
// other code ...

const json = engine.toJSON(); // 直接导出json配置单

const jsObject = engine.exportConfig(); // 导出干净的js对象
```

::: tip
有很多的需求是在保存之前需要对配置单进行统一的操作，可以直接操作`jsObject`对象，`exportConfig`导出的 js 对象是深拷贝对象，不会影响运行期的配置。
:::

## 场景恢复

如何通过配置单还原整个场景？我们只用调用几个`api`就能搞定！

当然，如果是自建的`engine`，在导入前期别忘了将相关的`事件`、`动画`、`解析器`、`生成资源`等等提前准备好。

```js
import jsonConfig from "jsonConfig.json";
import { generateConfig, Template, JSONHanlder } from "@vis-three/middleware";

// import导入
const config = Template.observable(JSONHanlder.clone(jsonConfig));

// 接口获取
const res = await axios.get("url");
const config = Template.observable(JSONHanlder.clone(res));

// 应用配置
engine.loadConfig(config, (res) => {
  // do something
});

engine.loadConfigAsync(config).then((res) => {
  // do something
});
```

::: tip

1. 在应用配置单之前，我们需要通过`JSONHanlder`处理一次，因为比如`Infinity`, `-Infinity`等的数字对象在普通的`json`化过程中会丢失，所以需要特殊处理。

2. 有很多的需求是在导入配置完成之后，还会对配置进行相关处理，所以目前的加载函数不会对配置进行自动的响应式转译，需要手动进行，这里可以使用`Template`模板处理方法进行。
   :::

## 自定配置

有事时候我们希望在生成的配置中加入我们自定义的一些数据或配置项，可以供 UI 获取或者其他方法调节，但是这些自定义的配置项又不希望被配置化机制捕获，进而触发默认的响应方法，`vis-three`生成的配置中有一个默认的被忽略属性`meta`，可以不会被配置化机制影响，我们可以在里面添加相关的属性方法。

```js
// code...
const box = generateConfig(
  CONFIG_TYPE.MESH,
  {
    geometry: toSymbol(commonGeometry),
    material: toSymbol(boxMaterial),
    position: {
      x: 10,
    },
    meta: {
      userId: 123456,
      status: 200,
      data: {
        title: "节点1",
      },
    },
  },
  {
    strict: false,
  }
);

console.log(box);
// code...
```

我们可以通过 `console.log`的输出看到，`box.meta`下的数据是没有没`proxy`过的。

:::tip
注意关闭严格模式。
:::

## 业务模块

对于不同的业务需求，官方提供的配置化模块不可能全都能覆盖到，或者说使用起来不够便利，您可以根据自身的业务需求去编写相符的配置化模块。

```js
// ./MyModule.js
import { defineModel, defineModule } from "@vis-three/tdcm";

const board = defineModel({
  type: "Board",
  // ...
});

export default defineModule({
  type: "board",
  object: true,
  //...
  models: [board],
});
```

```js
import MyModule from "./MyModule.js";

const engine = defineEngineSupport({
  //...
  modules: [MyModule],
});

const board = generateConfig(CONFIG_TYPE.BOARD);
```

:::tip
具体的自定义模块开发流程介绍请查看文档：[自定义配置化模块](./module.md)
:::
