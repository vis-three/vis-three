# @vis-three/plugin-render-manager

渲染管理器插件。

更好的控制整体帧率和进行统一的渲染控制。

- 此插件会覆盖原本`engine`的`render`方法。

## 最新版本

<img alt="version" src="https://img.shields.io/npm/v/@vis-three/plugin-render-manager">

## license

<img alt="NPM" src="https://img.shields.io/npm/l/@vis-three/plugin-render-manager?color=blue">

## 插件名称

`RenderManagerPlugin`

:::tip
可以使用枚举：`RENDER_MANAGER_PLUGIN`
:::

## 插件依赖

无

## 插件传参

```ts
export interface RenderManagerPluginParams {
  fps?: number;
}
```

## 引擎拓展

```ts
export interface RenderManagerEngine extends Engine {
  /**渲染管理器 */
  renderManager: RenderManager;
  /**开始渲染函数 */
  play: () => void;
  /**停止渲染函数 */
  stop: () => void;
}
```

## RenderManager

此类继承`@vis-three/core`的`EventDispatcher`。
