# @vis-three/plugin-pointer-lock-controls

指针锁控制器插件。

模拟 FPS 游戏固定鼠标准星的鼠标交互效果。

- 此插件需要通过用户交互触发。
- 此插件会自动跟随场景，相机，dom 的变化而进行自动适配。

```ts
engine.install(PointerLockControlsPlugin());

document.getElementById("button").click = () => {
  engine.pointerLockControls.lock();
};
```

## 最新版本

<img alt="version" src="https://img.shields.io/npm/v/@vis-three/plugin-pointer-lock-controls">

## license

<img alt="NPM" src="https://img.shields.io/npm/l/@vis-three/plugin-pointer-lock-controls?color=blue">

## 插件名称

`PointerLockControlsPlugin`

:::tip
可以使用枚举：`POINTER_LOCK_CONTROLS_PLUGIN`
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

## PointerLockControls

参照：[https://threejs.org/docs/index.html?q=point#examples/zh/controls/PointerLockControls](https://threejs.org/docs/index.html?q=point#examples/zh/controls/PointerLockControls)
