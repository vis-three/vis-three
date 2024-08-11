# @vis-three/plugin-effect-composer

Post-processing plugin. This plugin adds post-processing effects to enhance the final image.

## Latest Version

<img alt="version" src="https://img.shields.io/npm/v/@vis-three/plugin-effect-composer">

## License

<img alt="NPM" src="https://img.shields.io/npm/l/@vis-three/plugin-effect-composer?color=blue">

## Plugin Name

`EffectComposerPlugin`

:::tip
You can use the enum: `EFFECT_COMPOSER_PLUGIN`
:::

## Plugin Dependencies

- WebGLRendererPlugin: @vis-three/plugin-webgl-renderer

## Plugin Parameters

```ts
export interface EffectComposerParameters {
  /** Enable if using Three.js version lower than 137 and MSAA support is needed */
  WebGLMultisampleRenderTarget?: boolean;
  /** Number of samples */
  samples?: number;
  /** Render format */
  format?: number;
  /** Enable MSAA */
  MSAA?: boolean;
}
```

## Engine Extensions

```ts
export interface EffectComposerEngine extends WebGLRendererEngine {
  effectComposer: EffectComposer;
}
```

### effectComposer

Reference： [https://threejs.org/docs/index.html?q=eff#examples/zh/postprocessing/EffectComposer](https://threejs.org/docs/index.html?q=eff#examples/zh/postprocessing/EffectComposer)
