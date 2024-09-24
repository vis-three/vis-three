# @vis-three/plugin-first-person-controls

网格辅助插件。

- 此插件会跟随场景，相机进行自动适配和切换。
- 此插件中的网格物体无法被选中。

## 最新版本

<img alt="version" src="https://img.shields.io/npm/v/@vis-three/plugin-first-person-controls">

## license

<img alt="NPM" src="https://img.shields.io/npm/l/@vis-three/plugin-first-person-controls?color=blue">

## 插件名称

`GridHelperPlugin`

:::tip
可以使用枚举：`GRID_HELPER_PLUGIN`
:::

## 插件依赖

无

## 插件传参

```ts
export interface GridHelperParameters {
  /**网格范围 */
  range?: number;
  /**网格大小 */
  spacing?: number;
  /**网格中轴颜色 */
  axesColor?: string;
  /**网格颜色 */
  cellColor?: string;
  /**网格透明度 */
  opacity?: number;
}
```

## 引擎拓展

```ts
export interface GridHelperEngine extends Engine {
  /**网格物体对象 */
  gridHelper: GridHelper;
  /**设置网格物体 */
  setGridHelper: (show: boolean) => GridHelperEngine;
}
```

## gridHelper

参照：[https://threejs.org/docs/index.html?q=gridHelper#api/zh/helpers/GridHelper](https://threejs.org/docs/index.html?q=gridHelper#api/zh/helpers/GridHelper)

## setGridHelper

设置网格的查看状态。

```ts
engine.setGridHelper(false);
```
