# @vis-three/plugin-orbit-controls

轨道控制器插件。

- 此插件会自动跟随场景，相机，dom 的变化而进行自动适配。

## 最新版本

<img alt="version" src="https://img.shields.io/npm/v/@vis-three/plugin-orbit-controls">

## license

<img alt="NPM" src="https://img.shields.io/npm/l/@vis-three/plugin-orbit-controls?color=blue">

## 插件名称

`OrbitControlsPlugin`

:::tip
可以使用枚举：`ORBIT_CONTROLS_PLUGIN`
:::

## 插件依赖

无

## 插件传参

无

## 引擎拓展

```ts
export interface OrbitControlsEngine extends Engine {
  orbitControls: VisOrbitControls;
}
```
## VisOrbitControls
参照：[https://threejs.org/docs/index.html?q=orb#examples/zh/controls/OrbitControls](https://threejs.org/docs/index.html?q=orb#examples/zh/controls/OrbitControls)