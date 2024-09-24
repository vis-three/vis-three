# @vis-three/plugin-viewpoint

相机视角控制插件。

- 此插件会提供默认透视相机和正交相机。

## 最新版本

<img alt="version" src="https://img.shields.io/npm/v/@vis-three/plugin-viewpoint">

## license

<img alt="NPM" src="https://img.shields.io/npm/l/@vis-three/plugin-viewpoint?color=blue">

## 插件名称

`ViewpointPlugin`

:::tip
可以使用枚举：`VIEWPOINT_PLUGIN`
:::

## 插件依赖

无

## 插件传参

```ts
export interface ViewpointParameters {
  /**透视相机设置 */
  perspective?: {
    /**透视相机的初始位置 */
    position?: Vector3Config;
    /**透视相机的看向点 */
    lookAt?: Vector3Config;
    /**透视相机的正方向 */
    up?: Vector3Config;
  };
  /**正交相机设置 */
  orthograpbic?: {
    /**相机距离观察面的距离 */
    distance?: number;
    /**相机正方向 */
    up?: Vector3Config;
    /**允许旋转 */
    allowRotate?: boolean;
  };
}
```

## 引擎拓展

```ts
export enum VIEWPOINT {
  DEFAULT = "default",
  TOP = "top",
  BOTTOM = "bottom",
  LEFT = "left",
  RIGHT = "right",
  FRONT = "front",
  BACK = "back",
}

export interface ViewpointEngine extends Engine {
  /**设置相机的观察视角 */
  setViewpoint: (viewpoint: VIEWPOINT) => Engine;
}
```
