# vis-three

three.js 库二次功能封装 + 配置化的 three.js 开发。

<p>
  <a href="https://www.npmjs.com/package/vis-three"><img src="https://img.shields.io/badge/Version-0.1.1-{}" alt="Version"></a>
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
// 基础配置单
const pointLight = Vis.generateConfig("PointLight", {
  position: {
    x: 10,
    y: 20,
    z: 20,
  },
});

// vis响应式
const engine = new Vis.ModelingEngineSupport();
const pointLight = engine.reactiveConfig(
  Vis.generateConfig("PointLight", {
    position: {
      x: 10,
      y: 20,
      z: 20,
    },
  })
);

// vue2 + vis响应式
const engine = new Vis.ModelingEngineSupport();
const pointLight = engine.reactiveConfig(
  Vue.observable(
    Vis.generateConfig("PointLight", {
      position: {
        x: 10,
        y: 20,
        z: 20,
      },
    })
  )
);

// vue3 + vis响应式
const engine = new Vis.ModelingEngineSupport();
const pointLight = reactive(
  engine.reactiveConfig(
    Vis.generateConfig("PointLight", {
      position: {
        x: 10,
        y: 20,
        z: 20,
      },
    })
  )
);
engine.applyConfig(pointLight);
```

### 配置使用

```js
// 动态载入
const engine = new Vis.ModelingEngineSupport();
engine.applyConfig(pointLight);

// 预设加入
const lightDataSupport = new Vis.LightDataSupport({
  [pointLight.vid]: pointLight,
});

const engine = new Vis.ModelingEngineSupport({
  lightDataSupport: lightDataSupport,
});
```

### 使用配置支持模块插件

```js
const lightDataSupport = new Vis.LightDataSupport({
  [pointLight.vid]: pointLight,
});
const cameraDataSupport = new Vis.CameraDataSupport({
  // ...
});

const engine = new Vis.ModelingEngineSupport({
  lightDataSupport,
  cameraDataSupport,
});
```

### 使用支持相关引擎

```js
const engine = new Vis.ModelingEngineSupport({
  lightDataSupport: lightDataSupport,
}).setDom(document.getElementById("app"));
```

### 指定渲染场景

```js
const scene = Vis.generateConfig("Scene", {
  children: [pointLight.vid],
});
engine.applyConfig(scene).setScene(scene.vid);
```

### 指定渲染相机

```js
const camera = Vis.generateConfig("PerspectiveCamera", {
  position: {
    x: 50,
    y: 50,
    z: 50,
  },
  far: 5000,
});

engine.applyConfig(camera).setCamera(camera.vid);
```

### 快速编辑场景物体

```html
<input type="number" v-model="pointLight.position.x" />
```

```js
data() {
  return {
    pointLight
  }
},

method: {
  movePointLight () {
    this.pointLight.position.x = 10;
    this.pointLight.position.y = 20;
  }
}

```

### 导出配置

```js
console.log(engineSupport.toJSON());
```

### 导入配置

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
 samples: 4 // 采样程度
 format: THREE.RGBAFormat // 后期编码
 MSAA: true
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

```js
const engine = new Vis.Engine().install(Vis.ENGINEPLUGIN.VIEWPOINT, {
  viewpoint: Vis.VIEWPOINT.DEFAULT, // default top bottom left right front back
  perspective: { // 初始的透视相机设置
    position: Vector3Config,
    lookAt: Vector3Config,
    up: Vector3Config,
  };
  orthograpbic: { //  初始的正交相机设置
    distance: number,
    up: Vector3Config,
    allowRotate: boolean,
  };
});

// event
```

#### DisplayMode

渲染模式插件

```js
const engine = new Vis.Engine().install(Vis.ENGINEPLUGIN.DISPLAYMODE, {
  mode: Vis.DISPLAYMODE.ENV, // 'geometry', 'material', 'light', 'env'
  overrideColor: "rgb(250, 250, 250)", // geometry模式下被替换的颜色
  defaultAmbientLightSetting: { // 默认环境光设置
    color: "rgb(255, 255, 255)",
    intensity: 0.5
  };
  defaultDirectionalLightSetting: { // 默认平行光设置
    color: "rgb(255, 255, 255)",
    intensity: 0.5,
    position: {
      x: -100,
      y: 100,
      z: 100,
    };
  };
});

// event
```

#### Selection

物体选择插件

```js
const engine = new Vis.Engine().install(Vis.ENGINEPLUGIN.SELECTION);

// event
engine.addEventListener("selected", (event) => {
  // event.objects
  // event.objectSymbols
});
```

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

## 原生 THREE 应用

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
- e2e 测试： `npm run e2e:open`
- 查看例子： `npm run examples`

## 提示

- 内置了 ID 检查，生成 id 请使用`npm i uuid`, `import {v4 as getUuid} from 'uuid'`

## 版本更新文档

- `/doc/**/*`

### 预设

- [ ] 物体约束器
- [ ] 几何修改器

## 项目案例

github:

- [https://github.com/Shiotsukikaedesari/three-vis-display-editor](https://github.com/Shiotsukikaedesari/three-vis-display-editor)
- [https://github.com/Shiotsukikaedesari/vis-model-generator](https://github.com/Shiotsukikaedesari/vis-model-generator)

gitee:

- [https://gitee.com/Shiotsukikaedesari/three-vis-display-editor](https://gitee.com/Shiotsukikaedesari/three-vis-display-editor)
- [https://gitee.com/Shiotsukikaedesari/vis-model-generator](https://gitee.com/Shiotsukikaedesari/vis-model-generator)
