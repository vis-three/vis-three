# @vis-three/plugin-webgl-renderer

WebGL Renderer Plugin.

## Latest Version

<img alt="version" src="https://img.shields.io/npm/v/@vis-three/plugin-webgl-renderer">

## License

<img alt="NPM" src="https://img.shields.io/npm/l/@vis-three/plugin-webgl-renderer?color=blue">

## Plugin Name

`WebGLRendererPlugin`

:::tip
You can use the enumeration: `WEBGL_RENDERER_PLUGIN`
:::

## Plugin Dependencies

None

## Plugin Parameters

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

## Engine Extensions

```ts
export interface Screenshot {
    width?: number;
    height?: number;
    mime?: string;
}

export interface WebGLRendererEngine extends Engine {
    /** WebGL renderer */
    webGLRenderer: WebGLRenderer;
    /** Get a screenshot from the WebGL renderer */
    getScreenshot: (params?: Screenshot) => Promise<string>;
}
```

## WebGLRenderer

Reference: [https://threejs.org/docs/index.html#api/en/renderers/WebGLRenderer](https://threejs.org/docs/index.html#api/en/renderers/WebGLRenderer)
