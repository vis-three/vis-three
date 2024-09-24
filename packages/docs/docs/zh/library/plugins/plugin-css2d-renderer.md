# @vis-three/plugin-css2d-renderer

css2D 渲染器插件。

此插件可以将 dom css 2d 变换的能力和 three.js 的变换能力结合，并且可以与 three.js 的物体处于同一变换体系和变换坐标下。

## 最新版本

<img alt="version" src="https://img.shields.io/npm/v/@vis-three/plugin-css2d-renderer">

## license

<img alt="NPM" src="https://img.shields.io/npm/l/@vis-three/plugin-css2d-renderer?color=blue">

## 插件名称

`CSS2DRendererPlugin`

## 插件依赖

无

## 插件传参

无

## 引擎拓展

```ts
export interface CSS2DRendererEngine extends Engine {
  css2DRenderer: CSS2DRenderer;
}
```

### css2DRenderer

参照： [https://threejs.org/docs/index.html?q=css#examples/zh/renderers/CSS2DRenderer](https://threejs.org/docs/index.html?q=css#examples/zh/renderers/CSS2DRenderer)
