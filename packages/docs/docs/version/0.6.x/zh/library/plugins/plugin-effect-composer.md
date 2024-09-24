# @vis-three/plugin-effect-composer

后期处理插件。使用后可以增加后期处理过程连对画面进行后期处理。

## 最新版本

<img alt="version" src="https://img.shields.io/npm/v/@vis-three/plugin-effect-composer">

## license

<img alt="NPM" src="https://img.shields.io/npm/l/@vis-three/plugin-effect-composer?color=blue">

## 插件名称

`EffectComposerPlugin`

:::tip
可以使用枚举：`EFFECT_COMPOSER_PLUGIN`
:::

## 插件依赖

- WebGLRendererPlugin: @vis-three/plugin-webgl-renderer

## 插件传参

```ts
export interface EffectComposerParameters {
  /**如果three版本低于137需要支持MSAA请开启 */
  WebGLMultisampleRenderTarget?: boolean;
  /**采样数 */
  samples?: number;
  /**渲染格式 */
  format?: number;
  /**是否开启msaa */
  MSAA?: boolean;
}
```

## 引擎拓展

```ts
export interface EffectComposerEngine extends WebGLRendererEngine {
  effectComposer: EffectComposer;
}
```

### effectComposer

参照： [https://threejs.org/docs/index.html?q=eff#examples/zh/postprocessing/EffectComposer](https://threejs.org/docs/index.html?q=eff#examples/zh/postprocessing/EffectComposer)
