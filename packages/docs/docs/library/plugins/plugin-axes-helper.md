# @vis-three/plugin-axes-helper

场景世界坐标轴插件。

- 该轴无法被射线拾取。
- 该轴会自动加入切换的场景中。

## 最新版本

<img alt="version" src="https://img.shields.io/npm/v/@vis-three/plugin-axes-helper">

## license

<img alt="NPM" src="https://img.shields.io/npm/l/@vis-three/plugin-axes-helper?color=blue">

## 插件名称

`AxesHelperPlugin`

:::tip
可使用导出枚举：`AXES_HELPER_PLUGIN`
:::

## 插件依赖

无

## 插件传参

```ts
export interface AxesHelperParameters {
  /**坐标轴长度 */
  length?: number;
}
```

## 引擎拓展

```ts
export interface AxesHelperEngine extends Engine {
  /**坐标轴物体 */
  axesHelper: AxesHelper;
  /** 设置显示隐藏坐标轴方法。*/
  setAxesHelper: (show: boolean) => AxesHelperEngine;
}
```

### axesHelper

参照：[https://threejs.org/docs/index.html?q=axe#api/zh/helpers/AxesHelper](https://threejs.org/docs/index.html?q=axe#api/zh/helpers/AxesHelper)

### setAxesHelper

使用

```ts
engine.setAxesHelper(false);
```
