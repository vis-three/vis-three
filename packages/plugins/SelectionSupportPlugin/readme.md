# @vis-three/plugin-selection-support

配置化的选择支持插件。

此插件是在选择插件的基础上支持配置化的形式设置选中的物体。并且在交互选中的返回值中也会返回选中对象的配置 vid 信息。

## 最新版本

<img alt="version" src="https://img.shields.io/npm/v/@vis-three/plugin-selection-support">

## license

<img alt="NPM" src="https://img.shields.io/npm/l/@vis-three/plugin-selection-support?color=blue">

## 插件名称

`SelectionSupportPlugin`

:::tip
可以使用枚举：`SELECTION_SUPPORT_PLUGIN`
:::

## 插件依赖

- @vis-three/middleware
- @vis-three/plugin-selection

## 插件传参

无

## 引擎拓展

```ts
export interface SelectionSupportEngine extends SelectionEngine, EngineSupport {
  /**通过vid标识设置场景的选中对象 */
  setSelectionBoxBySymbol: (symbols: string[]) => SelectionSupportEngine;
}
```
