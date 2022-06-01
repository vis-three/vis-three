## 介绍

为了提高可拓展性，引擎本身只提供拔插能力和功能属性空间，剩下的实现交给各个插件进行。

## 自定义插件

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

## WebGLRenderer

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

## CSS3DRenderer

CSS3D 渲染器插件

```js
const engine = new Vis.Engine().install(Vis.ENGINEPLUGIN.CSS3DRENDERER);
```

## Scene

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

## EffectComposer

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

## PointerManager

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

## EventManager

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

## RenderManager

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

## LoaderManager

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

## ResourceManager

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

## KeyboardManager

快捷键管理插件

## DataSupportManager

数据支持管理器插件

```js
const engine = new Vis.Engine().install(Vis.ENGINEPLUGIN.DATASUPPORTMANAGER, {
  //module DataSupport
  lightDataSupport: new Vis.LightDataSupport(),
  // ...
});

// event
```

## CompilerManager

编译管理器插件

```js
const engine = new Vis.Engine().install(Vis.ENGINEPLUGIN.COMPILERMANAGER);

// event
```

## OrbitControls

轨道控制器插件

## TransformControls

变换控制器插件

## Stats

资源监视器插件

## AxesHelper

坐标轴辅助插件

## GridHelper

网格辅助插件

## ObjectHelper

物体辅助插件

## Viewpoint

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

## DisplayMode

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

## Selection

物体选择插件

```js
const engine = new Vis.Engine().install(Vis.ENGINEPLUGIN.SELECTION);

// event
engine.addEventListener("selected", (event) => {
  // event.objects
  // event.objectSymbols
});
```
