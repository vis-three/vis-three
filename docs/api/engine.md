### ModelingEngine 开发下的渲染引擎

```js
const engine = new Vis.ModelingEngine();

.install(ENGINEPLUGIN.WEBGLRENDERER, {
  antialias: true,
  alpha: true
})
.install(ENGINEPLUGIN.SCENE)
.install(ENGINEPLUGIN.POINTERMANAGER)
.install(ENGINEPLUGIN.EVENTMANAGER)
.install(ENGINEPLUGIN.EFFECTCOMPOSER, {
  WebGLMultisampleRenderTarget: true
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
.complete()
```

### DisplayEngine 展示下的渲染引擎

```js
const engine = Vis.DisplayEngine();

.install(ENGINEPLUGIN.WEBGLRENDERER, {
  antialias: true,
  alpha: true
})
.install(ENGINEPLUGIN.SCENE)
.install(ENGINEPLUGIN.RENDERMANAGER)
.install(ENGINEPLUGIN.EFFECTCOMPOSER, {
  WebGLMultisampleRenderTarget: true
})
.install(ENGINEPLUGIN.ORBITCONTROLS)
.install(ENGINEPLUGIN.POINTERMANAGER)
.install(ENGINEPLUGIN.EVENTMANAGER)
.complete()
```

### EngineSupport 配置化支持引擎

```js
.install(ENGINEPLUGIN.LOADERMANAGER)
.install(ENGINEPLUGIN.RESOURCEMANAGER)
.install(ENGINEPLUGIN.DATASUPPORTMANAGER, parameters)
.install(ENGINEPLUGIN.COMPILERMANAGER)
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
