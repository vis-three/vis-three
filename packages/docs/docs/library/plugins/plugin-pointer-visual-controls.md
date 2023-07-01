# @vis-three/plugin-pointer-visual-controls

指针视角制器插件。

相比较轨道控制器，指针视角控制器通过鼠标交互仅控制的是相机的旋转，不会影响相机的位置。

## 最新版本

<img alt="version" src="https://img.shields.io/npm/v/@vis-three/plugin-pointer-visual-controls">

## license

<img alt="NPM" src="https://img.shields.io/npm/l/@vis-three/plugin-pointer-visual-controls?color=blue">

## 插件名称

`PointerVisualControlsPlugin`

:::tip
可以使用枚举：`POINTER_VISUAL_CONTROLS_PLUGIN`
:::

## 插件依赖

无

## 插件传参

```ts
export enum MOUSE_BUTTON {
  LEFT = 0,
  MID = 1,
  RIGHT = 2,
}

export interface PointerLockControlsPluginParams {
  /**触发控制器的鼠标键 */
  pointerButton?: MOUSE_BUTTON;
  /**最小极角 */
  minPolarAngle?: number;
  /**最大极角 */
  maxPolarAngle?: number;
  /**指针旋转速度 */
  pointerSpeed?: number;
}
```

## 引擎拓展

```ts
export interface PointerVisualControlsEngine extends Engine {
  pointerVisualControls: PointerVisualControls;
}
```
