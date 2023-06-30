# @vis-three/plugin-pointer-manager

指针管理器插件。

此插件会实时计算`dom` -> `归一化坐标`的指针，并抛出相关鼠标事件。

## 最新版本

<img alt="version" src="https://img.shields.io/npm/v/@vis-three/plugin-pointer-manager">

## license

<img alt="NPM" src="https://img.shields.io/npm/l/@vis-three/plugin-pointer-manager?color=blue">

## 插件名称

`PointerManagerPlugin`

:::tip
可以使用枚举：`POINTER_MANAGER_PLUGIN`
:::

## 插件依赖

无

## 插件传参

```ts
export interface PointerManagerParameters {
  /**目标dom */
  dom?: HTMLElement;
  /**鼠标事件的节流时间 */
  throttleTime?: number;
}
```

## 引擎拓展

```ts
export interface PointerManagerEngine extends Engine {
  /**指针管理器 */
  pointerManager: PointerManager;
}
```

## PointerManager

此类继承`@vis-three/core`的`Dispatcher`
