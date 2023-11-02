# 配置化引擎构建

对比于原生的 three.js 和引擎构建，配置化引擎在继承了原生引擎**全部能力**的基础上，增加了配置化的全流程控制能力，配置化开发根据配置化去形成场景结构与可视化面，在运行期通过对配置的更改去影响 3D 场景，能够为复杂应用的构建保驾护航。

## 引擎准备

配置化引擎与原生引擎一致，我们先安装下面的依赖：

```
npm i three
npm i @types/three

// vis-three的配置化核心
npm i @vis-three/middleware

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
import { EngineSupport, defineEngineSupport } from "@vis-three/middleware";
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

配置化的依赖面对不同的业务场景可以有不同的选择，我们可以先安装这部分依赖：

```
npm i @vis-three/module-light
npm i @vis-three/module-geometry
npm i @vis-three/module-material
npm i @vis-three/module-line
npm i @vis-three/module-points
npm i @vis-three/module-mesh
npm i @vis-three/module-scene
```

或者说上面的模块较多，我们可以直接安装模块库然后从中选取：

```
npm i @vis-three/library-module
```

```js
// import ...
import {
  light,
  geometry,
  material,
  line,
  points,
  mesh,
  scene,
} from "@vis-three/library-module";

// 类实例化
const engine = new EngineSupport()
  .registModule(light)
  .registModule(geometry)
  .registModule(material)
  .registModule(line)
  .registModule(points)
  .registModule(mesh)
  .registModule(scene)
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
  modules: [light, geometry, material, line, points, mesh, scene],
});
```

::: warning
如果你使用类形式的组装模式，注意最好按照`模块` -> `插件` -> `策略`的顺序进行引擎组装。
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
  CONFIGTYPE,
} from "@vis-three/middleware";

// engine code ...

// 我们需要通过generateConfig生成一个支撑配置化的场景对象
const defaultScene = generateConfig(CONFIGTYPE.SCENE);

// 通过调用applyConfig能够应用生成的配置
// setSceneBySymbol可以通过配置的唯一标记vid去查找物体
engine.applyConfig(defaultScene).setSceneBySymbol(defaultScene.vid);

const pointLight = generateConfig(CONFIGTYPE.POINTLIGHT, {
  color: "rgb(255, 255, 255)",
  position: {
    y: 30,
  },
});

const commonGeometry = generateConfig(CONFIGTYPE.BOXGEOMETRY, {
  width: 10,
  height: 10,
  depth: 10,
});

const boxMaterial = generateConfig(CONFIGTYPE.MESHSTANDARDMATERIAL, {
  color: "rgb(255, 105, 100)",
});

const box = generateConfig(CONFIGTYPE.MESH, {
  geometry: commonGeometry.vid,
  material: boxMaterial.vid,
  position: {
    x: 10,
  },
});

const lineBox = generateConfig(CONFIGTYPE.LINE, {
  geometry: commonGeometry.vid,
});

const pointsMaterial = generateConfig(CONFIGTYPE.POINTSMATERIAL, {
  color: "rgb(255, 255, 255)",
});

const pointsBox = generateConfig(CONFIGTYPE.POINTS, {
  geometry: commonGeometry.vid,
  material: pointsMaterial.vid,
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

defaultScene.children.push(pointLight.vid, box.vid, lineBox.vid, pointsBox.vid);
```

通过上面的代码我们发现：

1、不用再通过`import * as THREE from 'three'`然后`new`相关的对象就可以直接完成场景。

2、配置化的形式可以在生成配置的时候将所有的属性初始完成。

3、每一个配置都有其独有的`vid`标记，它可以代替配置完成整个对象的使用。

4、配置化的基本开发思路就是：生成配置`generateConfig` -> 应用配置`engine.applyConfig`

::: tip

- `generateConfig`是生成配置的统一 api。
- `CONFIGTYPE`中枚举了当下支持的所有物体配置单。
- 手动应用配置注意应用配置的先后顺序，比如`box`需要依赖`commonGeometry`, `boxMaterial`这两个配置，那么`box`的应用要在`commonGeometry`和`boxMaterial`之后。
  :::

## 自动注入

如果我们是简单场景开发，上面既要手动生成配置，又要手动应用配置，又要注意应用顺序的过程比较繁琐，我们可以使用自动注入的相关功能简化操作。

```js
// other code...
const defaultScene = generateConfig(CONFIGTYPE.SCENE);

engine.applyConfig(defaultScene).setSceneBySymbol(defaultScene.vid);

// 设置注入引擎
generateConfig.injectEngine = engine;
// 开启注入场景
generateConfig.injectScene = true;
// 开启自动注入
generateConfig.autoInject = true;

generateConfig(CONFIGTYPE.POINTLIGHT, {
  color: "rgb(255, 255, 255)",
  position: {
    y: 30,
  },
});

const commonGeometry = generateConfig(CONFIGTYPE.BOXGEOMETRY, {
  width: 10,
  height: 10,
  depth: 10,
});

const boxMaterial = generateConfig(CONFIGTYPE.MESHSTANDARDMATERIAL, {
  color: "rgb(255, 105, 100)",
});

generateConfig(CONFIGTYPE.MESH, {
  geometry: commonGeometry.vid,
  material: boxMaterial.vid,
  position: {
    x: 10,
  },
});

generateConfig(CONFIGTYPE.LINE, {
  geometry: commonGeometry.vid,
});

const pointsMaterial = generateConfig(CONFIGTYPE.POINTSMATERIAL, {
  color: "rgb(255, 255, 255)",
});

generateConfig(CONFIGTYPE.POINTS, {
  geometry: commonGeometry.vid,
  material: pointsMaterial.vid,
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
const mesh = generateConfig(CONFIGTYPE.MESH);
mesh.position = { x: 10, y: 10, z: 10 };
```

主要是因为：

1. 直接替换掉整个引用，会造成额外性能开销(重复的 new object)。

2. 直接替换引用，在相应模块内可能会丢失对象的跟踪处理（引用类型的指针丢失）。

3. 在配置对象版本更新的时候，会缺失新版本的配置属性（新版本在 position 中新增了一个属性 w）。

正确处理：

```js
const mesh = generateConfig(CONFIGTYPE.MESH);
mesh.position.x = 10;
mesh.position.y = 10;
mesh.position.z = 10;
```

:::

## 插件配置

有部分配置是不在`module`包重的，比如`WebGLRenderer`的配置，因为这些配置需要对应的插件才能进行，所以这部分配置能力也变成了相关插件策略，这部分插件策略大多以`@vis-three/xxxx-support`进行，我们现在来配置一下`WebGLRenderer`。

```
npm i @vis-three/strategy-webgl-renderer-support
```

```js
// import code...

import {
  //...,
  renderer,
} from "@vis-three/library-module";

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
    renderer,
  ],
});

engine.applyConfig(
  generateConfig(CONFIGTYPE.WEBGLRENDERER, {
    clearColor: "rgba(255 ,255 ,255 , 1)",
    shadowMap: {
      enabled: true,
    },
  })
);
```

:::tip
就算是引入插件的配置，也需要有相应的配置化模块作为基础，比如上方的: `import {renderer} from "@vis-three/library-module";`
:::

## 物体动画

## 物体事件

## 模型导入

## 配置保存

## 场景恢复

## 业务模块
