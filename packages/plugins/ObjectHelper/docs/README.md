# @vis-three/plugin-object-helper

物体辅助管理插件。

- 此插件会自动识别加入场景的物体，并生成该物体的相关辅助。
- 当物体移出场景时会删除该物体对应的辅助。

:::tip
对于配置化模块，可以不使用此插件，而是使用`@vis-three/module-helper`，会有更精细的辅助管理功能。
:::

## 最新版本

<img alt="version" src="https://img.shields.io/npm/v/@vis-three/plugin-object-helper">

## license

<img alt="NPM" src="https://img.shields.io/npm/l/@vis-three/plugin-object-helper?color=blue">

## 插件名称

`ObjectHelperPlugin`

:::tip
可以使用枚举：`OBJECT_HELPER_PLUGIN`
:::

## 插件依赖

无

## 插件传参

无

## 引擎拓展

```ts
export interface ObjectHelperEngine extends Engine {
  /**物体辅助管理器 */
  objectHelperManager: ObjectHelperManager;
  /**设置物体辅助显示隐藏 */
  setObjectHelper: (show: boolean) => ObjectHelperEngine;
}
```
