# vis-three

three.js 库二次功能封装 + 配置化的 three.js 开发。

<p>
  <a href="https://www.npmjs.com/package/vis-three"><img src="https://img.shields.io/badge/Versioin-0.0.12-{}" alt="Version"></a>
  <a href="https://www.npmjs.com/package/vis-three"><img src="https://img.shields.io/badge/License-MIT-{}" alt="License"></a>
</p>

## 安装

```
npm i vis-three
```

## 导入

```js
// 整体导入
import * as Vis from "vis-three";

// 按需导入
import {
  ModelingEngineSupport,
  SupportDataGenerator,
  generateConfig,
} from "vis-three";
```

## 查看 demo 示例

1. 下载或者克隆 main 分支代码
2. 执行`npm i` 安装依赖
3. 执行`npm run examples`
4. 打开浏览器访问: [http://localhost:3000/examples/index.html](http://localhost:3000/examples/index.html)

5. demo 源码位于：`examples`文件夹下

## 备注

gitee 仓库为 github 的同步备份仓库
github 地址：[https://github.com/Shiotsukikaedesari/vis-three](https://github.com/Shiotsukikaedesari/vis-three)

## 基本用法

### 生成配置

```js
const pointLight = Vis.generateConfig("PointLight", {
  position: {
    x: 10,
    y: 20,
    z: 20,
  },
});
```

### 生成配置模块

```js
const lightMap = new Vis.SupportDataGenerator()
  .create(Vis.MODULETYPE.LIGHT)
  .add(pointLight)
  .get();
```

### 使用支持插件

```js
const lightDataSupport = new Vis.LightDataSupport(lightMap);
```

### 使用支持建模引擎

```js
const engine = new Vis.ModelingEngineSupport({
  lightDataSupport: lightDataSupport,
})
  .setDom(document.getElementById("app"))
  .setSize()
  .play();
```

### 快速编辑场景物体

```js
const lightSupportData = lightDataSupport.getData();
const pointLight = lightSupportData[pointLight.vid];
pointLight.position.x = 10;
pointLight.position.y = 20;
```

### 导出配置

```js
console.log(engine.toJSON());
```

### 导入配置生成场景

```js
import config from "/examples/config.json";

const handlerConfig = JSON.parse(JSON.stringify(config), Vis.JSONHandler.parse);

const engine = new Vis.ModelingEngineSupport()
  .setDom(document.getElementById("app"))
  .setSize()
  .play()
  .loadConfigAsync(handlerConfig)
  .then((event) => {
    // loaded do something...
  });
```

## 渲染引擎

### 引擎使用

```js
const ENGINEPLUGIN = Vis.ENGINEPLUGIN;

// ModelingEngine
const engine = new Vis.Engine()
  .install(ENGINEPLUGIN.WEBGLRENDERER, {
    antialias: true,
    alpha: true,
  })
  .install(ENGINEPLUGIN.SCENE)
  .install(ENGINEPLUGIN.POINTERMANAGER)
  .install(ENGINEPLUGIN.EVENTMANAGER)
  .install(ENGINEPLUGIN.EFFECTCOMPOSER, {
    WebGLMultisampleRenderTarget: true,
  })
  .install(ENGINEPLUGIN.SELECTION)
  .install(ENGINEPLUGIN.AXESHELPER)
  .install(ENGINEPLUGIN.GRIDHELPER)
  .install(ENGINEPLUGIN.OBJECTHELPER)
  .install(ENGINEPLUGIN.VIEWPOINT)
  .install(ENGINEPLUGIN.DISPLAYMODE)
  .install(ENGINEPLUGIN.RENDERMANAGER)
  .install(ENGINEPLUGIN.STATS)
  .install(ENGINEPLUGIN.ORBITCONTROLS)
  .install(ENGINEPLUGIN.KEYBOARDMANAGER)
  .install(ENGINEPLUGIN.TRANSFORMCONTROLS)
  .complete() // 安装插件完成后调用
  .setDom(document.getElementById("app"))
  .setSize()
  .setStats(true)
  .play();
```

### 引擎插件

#### WebGLRenderer

GL 渲染器插件

```js
const engine = new Vis.Engine().install(Vis.ENGINEPLUGIN.WEBGLRENDERER, {
  // WebGLRendererParameters
  antialias: true, // 抗锯齿
  alpha: true, // 允许透明度
  //...
});

// event
engine.addEventListener("setSize", (event) => {
  // event.width
  // event.height
});

engine.addEventListener("setCamera", (event) => {
  // event.camera
});
```

#### CSS3DRenderer（预）

CSS3D 渲染器插件

#### Scene

场景插件

```js
const engine = new Vis.Engine().install(Vis.ENGINEPLUGIN.SCENE);

// event
engine.addEventListener("afterAdd", (event) => {
  // event.objects
});

engine.addEventListener("afterRemove", (event) => {
  // event.objects
});
```

#### EffectComposer

后期处理器插件

```js
const engine = new Vis.Engine()
.install(Vis.ENGINEPLUGIN.EFFECTCOMPOSER ,{
 WebGLMultisampleRenderTarget: true // 137版本以下MSAA
 samples: 4 // 采样程度
 format: THREE.RGBAFormat // 后期编码
 MSAA: boolean // 预设
 FXAA: boolean // 预设
 SMAA: boolean // 预设
})

// event
```

#### PointerManager

指针，鼠标管理器插件

```js
const engine = new Vis.Engine().install(Vis.ENGINEPLUGIN.POINTERMANAGER, {
  throttleTime: number, // 节流时间
});

// event
engine.dom.addEventListener("pointerdown", (event) => {
  // mouseevent
});

engine.dom.addEventListener("pointermove", (event) => {
  // mouseevent
});

engine.dom.addEventListener("pointerup", (event) => {
  // mouseevent
});
```

#### EventManager

场景与物体的事件管理器插件

```js
const engine = new Vis.Engine().install(Vis.ENGINEPLUGIN.EVENTMANAGER, {
  recursive: false, // 是否可递归计算物体包括children
  penetrate: false, // 是否可以穿透触发事件委托
});

// event

// global
engine.eventManager.addEventListener("pointerdown", (event) => {
  // mouseevent
  // event.intersections
});

engine.eventManager.addEventListener("pointermove", (event) => {
  // mouseevent
  // event.intersections
});

engine.eventManager.addEventListener("pointerup", (event) => {
  // mouseevent
  // event.intersections
});

engine.eventManager.addEventListener("pointerenter", (event) => {
  // mouseevent
  // event.intersections
});

engine.eventManager.addEventListener("pointerleave", (event) => {
  // mouseevent
  // event.intersections
});

engine.eventManager.addEventListener("click", (event) => {
  // mouseevent
  // event.intersections
});

engine.eventManager.addEventListener("dblclick", (event) => {
  // mouseevent
  // event.intersections
});

engine.eventManager.addEventListener("contextmenu", (event) => {
  // mouseevent
  // event.intersections
});

// object
threeObject.addEventListener("pointerdown", (event) => {
  // event.intersections
});

threeObject.addEventListener("pointermove", (event) => {
  // mouseevent
  // event.intersection
});

threeObject.addEventListener("pointerup", (event) => {
  // mouseevent
  // event.intersection
});

threeObject.addEventListener("pointerenter", (event) => {
  // mouseevent
  // event.intersection
});

threeObject.addEventListener("pointerleave", (event) => {
  // mouseevent
  // event.intersection
});

threeObject.addEventListener("click", (event) => {
  // mouseevent
  // event.intersection
});

threeObject.addEventListener("dblclick", (event) => {
  // mouseevent
  // event.intersection
});

threeObject.addEventListener("contextmenu", (event) => {
  // mouseevent
  // event.intersection
});
```

#### RenderManager

渲染管理器插件

```js
const engine = new Vis.Engine().install(Vis.ENGINEPLUGIN.RENDERMANAGER, {
  fps: 0, //(预设) 帧率
});

// event
engine.renderManager.addEventListener("render", (event) => {
  // event.delta
  // event.total
});

engine.renderManager.addEventListener("play", () => {});

engine.renderManager.addEventListener("stop", () => {});
```

#### LoaderManager

加载器管理器插件

```js
const engine = new Vis.Engine().install(Vis.ENGINEPLUGIN.LOADERMANAGER, {
  loaderExtends: { diy: DIYLoader }, // 扩展的加载器 extends THREE.Loader
});

// event
engine.loaderManager.addEventListener("beforeLoad", (event) => {
  // event.urlList
});

engine.loaderManager.addEventListener("loading", (event) => {
  // event.loadTotal
  // event.loadSuccess,
  // event.loadError
});

engine.loaderManager.addEventListener("loaded", (event) => {
  // event.loadTotal,
  // event.loadSuccess
  // event.loadError
  // event.resourceMap
});

engine.loaderManager.addEventListener("detailLoading", (event) => {
  // event.detail
  // detail = {
  //   url,
  //   progress: 0,
  //   error: false,
  //   message: url
  // }
});

engine.loaderManager.addEventListener("detailLoaded", (event) => {
  // event.detail
  // detail = {
  //   url,
  //   progress: 0,
  //   error: false,
  //   message: url
  // }
});
```

#### ResourceManager

资源管理器插件

```js
const engine = new Vis.Engine().install(Vis.ENGINEPLUGIN.RESOURCEMANAGER);

// event
engine.resourceManager.addEventListener("mapped", (event) => {
  // event.structureMap: Map<string, unknown>
  // event.configMap: Map<string, unknown>
  // event.resourceMap: Map<string, unknown>
});
```

#### KeyboardManager

快捷键管理插件

#### DataSupportManager

数据支持管理器插件

```js
const engine = new Vis.Engine().install(Vis.ENGINEPLUGIN.DATASUPPORTMANAGER, {
  //module DataSupport
  lightDataSupport: new Vis.LightDataSupport(),
  // ...
});

// event
```

#### CompilerManager

编译管理器插件

```js
const engine = new Vis.Engine().install(Vis.ENGINEPLUGIN.COMPILERMANAGER);

// event
```

#### OrbitControls

轨道控制器插件

#### TransformControls

变换控制器插件

#### Stats

资源监视器插件

#### AxesHelper

坐标轴辅助插件

#### GridHelper

网格辅助插件

#### ObjectHelper

物体辅助插件

#### Viewpoint

视角切换插件

#### DisplayMode

渲染模式插件

#### Selection

物体选择插件

### 自定义插件

```js
const customPlugin = function (params) {
  // this is engine
  this.scene.add(new THREE.Mesh());

  this.completeSet.add(() => {
    // 稍微允许无须安装插件，所以部分逻辑放在completeSet中最后complete()调用完成
  });
};

Vis.Engine.register("customPlugin", customPlugin);

new Vis.Engine().install("customPlugin", params);
```

### 预设引擎

### ModelingEngine 开发下的渲染引擎

```js
const engine = new Vis.ModelingEngine();

// .install(ENGINEPLUGIN.WEBGLRENDERER, {
//   antialias: true,
//   alpha: true
// })
// .install(ENGINEPLUGIN.SCENE)
// .install(ENGINEPLUGIN.POINTERMANAGER)
// .install(ENGINEPLUGIN.EVENTMANAGER)
// .install(ENGINEPLUGIN.EFFECTCOMPOSER, {
//   WebGLMultisampleRenderTarget: true
// })
// .install(ENGINEPLUGIN.SELECTION)
// .install(ENGINEPLUGIN.AXESHELPER)
// .install(ENGINEPLUGIN.GRIDHELPER)
// .install(ENGINEPLUGIN.OBJECTHELPER)
// .install(ENGINEPLUGIN.VIEWPOINT)
// .install(ENGINEPLUGIN.DISPLAYMODE)
// .install(ENGINEPLUGIN.RENDERMANAGER)
// .install(ENGINEPLUGIN.STATS)
// .install(ENGINEPLUGIN.ORBITCONTROLS)
// .install(ENGINEPLUGIN.KEYBOARDMANAGER)
// .install(ENGINEPLUGIN.TRANSFORMCONTROLS)
// .complete()
```

### DisplayEngine 展示下的渲染引擎

```js
const engine = Vis.DisplayEngine();

// .install(ENGINEPLUGIN.WEBGLRENDERER, {
//   antialias: true,
//   alpha: true
// })
// .install(ENGINEPLUGIN.SCENE)
// .install(ENGINEPLUGIN.RENDERMANAGER)
// .install(ENGINEPLUGIN.EFFECTCOMPOSER, {
//   WebGLMultisampleRenderTarget: true
// })
// .install(ENGINEPLUGIN.ORBITCONTROLS)
// .install(ENGINEPLUGIN.POINTERMANAGER)
// .install(ENGINEPLUGIN.EVENTMANAGER)
// .complete()
```

### EngineSupport 配置化支持引擎

```js
// .install(ENGINEPLUGIN.LOADERMANAGER)
// .install(ENGINEPLUGIN.RESOURCEMANAGER)
// .install(ENGINEPLUGIN.DATASUPPORTMANAGER, parameters)
// .install(ENGINEPLUGIN.COMPILERMANAGER)
```

### ModelingEngineSupport

EngineSupport + ModelingEngine

```js
const engine = Vis.ModelingEngineSupport();
```

### DisplayEngineSupport

EngineSupport + DisplayEngine

```js
const engine = Vis.DisplayEngineSupport();
```

## 资源管理

### 加载管理器

```js
const assets = [
  "/examples/public/model/katana/katana.obj",
  "/examples/public/texture/katana/katana_BaseColor.png",
  "/examples/public/texture/katana/katana_Normal.png",
  "/examples/public/texture/katana/katana_Roughness.png",
  "/examples/public/texture/katana/katanal_Metallic.png",
];

const loaderManager = engineSupport.loaderManager;

loaderManager.addEventListener("loaded", (e) => {
  // do something...
});

engineSupport.loadResources(assets);
```

### 资源管理器

```js
engineSupport.registerResources({
  "examples.canvas": new document.createElement("canvas"),
});

const resourceManager = engineSupport.resourceManager;
// 额外资源映射

resourceManager.addEventListener("mapped", (e) => {
  // do something...
});
```

## 支持原生 THREE 应用

```js
const engine = new Vis.ModelingEngine()
  .setDom(document.getElementById("app"))
  .setSize()
  .play();

engine.scene.add(
  new THREE.Mesh(
    new THREE.BoxGeometry(5, 5, 5),
    new THREE.MeshStandardMaterial({ color: "red" })
  )
);

engine.scene.add(new THREE.PointLight("white", 1));
```

## 多窗口

```js

```

## 项目命令

- 开发：`npm run dev`
- 构建： `npm run build`
- 代码格式化： `npm run lint`
- 查看例子： `npm run examples`

## 提示

- 内置了 ID 检查，生成 id 请使用`npm i uuid`, `import {v4 as getUuid} from 'uuid'`

## 版本更新文档

- `/doc/**/*`

### 预设

- [ ] css3Renderer
- [ ] css3 相关物体模块
- [ ] 物体约束器

## 项目案例

github:

- [https://github.com/Shiotsukikaedesari/three-vis-display-editor](https://github.com/Shiotsukikaedesari/three-vis-display-editor)
- [https://github.com/Shiotsukikaedesari/vis-model-generator](https://github.com/Shiotsukikaedesari/vis-model-generator)

gitee:

- [https://gitee.com/Shiotsukikaedesari/three-vis-display-editor](https://gitee.com/Shiotsukikaedesari/three-vis-display-editor)
- [https://gitee.com/Shiotsukikaedesari/vis-model-generator](https://gitee.com/Shiotsukikaedesari/vis-model-generator)
