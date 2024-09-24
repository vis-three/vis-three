# @vis-three/plugin-webgl-renderer

webgl 渲染器插件。

## 最新版本

<img alt="version" src="https://img.shields.io/npm/v/@vis-three/plugin-webgl-renderer">

## license

<img alt="NPM" src="https://img.shields.io/npm/l/@vis-three/plugin-webgl-renderer?color=blue">

## 插件名称

`WebGLRendererPlugin`

:::tip
可以使用枚举：`WEBGL_RENDERER_PLUGIN`
:::

## 插件依赖

无

## 插件传参

```ts
export interface WebGLRendererParameters {
  /**
   * A Canvas where the renderer draws its output.
   */
  canvas?: HTMLCanvasElement | OffscreenCanvas | undefined;

  /**
   * A WebGL Rendering Context.
   * (https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext)
   * Default is null
   */
  context?: WebGLRenderingContext | undefined;

  /**
   * shader precision. Can be "highp", "mediump" or "lowp".
   */
  precision?: string | undefined;

  /**
   * default is false.
   */
  alpha?: boolean | undefined;

  /**
   * default is true.
   */
  premultipliedAlpha?: boolean | undefined;

  /**
   * default is false.
   */
  antialias?: boolean | undefined;

  /**
   * default is true.
   */
  stencil?: boolean | undefined;

  /**
   * default is false.
   */
  preserveDrawingBuffer?: boolean | undefined;

  /**
   * Can be "high-performance", "low-power" or "default"
   */
  powerPreference?: string | undefined;

  /**
   * default is true.
   */
  depth?: boolean | undefined;

  /**
   * default is false.
   */
  logarithmicDepthBuffer?: boolean | undefined;

  /**
   * default is false.
   */
  failIfMajorPerformanceCaveat?: boolean | undefined;
}
```

## 引擎拓展

```ts
export interface Screenshot {
  width?: number;
  height?: number;
  mine?: string;
}
export interface WebGLRendererEngine extends Engine {
  /**webgl渲染器 */
  webGLRenderer: WebGLRenderer;
  /**获取webGL渲染截图 */
  getScreenshot: (params?: Screenshot) => Promise<string>;
}
```

## WebGLRenderer

参照：[https://threejs.org/docs/index.html#api/zh/renderers/WebGLRenderer](https://threejs.org/docs/index.html#api/zh/renderers/WebGLRenderer)
