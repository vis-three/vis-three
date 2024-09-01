# @vis-three/plugin-transform-controls

物体变换控制器插件。

- 此插件会跟随相机、场景、dom 的变化而进行自动适配。

## 最新版本

<img alt="version" src="https://img.shields.io/npm/v/@vis-three/plugin-transform-controls">

## license

<img alt="NPM" src="https://img.shields.io/npm/l/@vis-three/plugin-transform-controls?color=blue">

## 插件名称

`TransformControlsPlugin`

:::tip
可以使用枚举：`TRANSFORM_CONTROLS_PLUGIN`
:::

## 插件依赖

无

## 插件传参

无

## 引擎拓展

```ts
export interface TransformControlsEngine extends Engine {
  /**是否处于变换控制器的变换状态 */
  transing: boolean;
  /**变换控制器 */
  transformControls: VisTransformControls;
  /**设置变换控制器的显示隐藏 */
  setTransformControls: (show: boolean) => TransformControlsEngine;
}
```

## VisTransformControls

参照: [https://threejs.org/docs/index.html#examples/zh/controls/TransformControls](https://threejs.org/docs/index.html#examples/zh/controls/TransformControls)

:::tip
设置变换物体请通过`transformControls.setAttach`进行，可以传入多个物体进行变换。
:::
