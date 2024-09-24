# @vis-three/plugin-first-person-controls

第一人称控制器插件。（此第一人称控件原理和我们玩 FPS 的第一人称原理有些不同。）

- 此插件会跟随场景，相机，dom 进行自动适配和切换。

## 最新版本

<img alt="version" src="https://img.shields.io/npm/v/@vis-three/plugin-first-person-controls
">

## license

<img alt="NPM" src="https://img.shields.io/npm/l/@vis-three/plugin-first-person-controls
?color=blue">

## 插件名称

`FirstPersonControlsPlugin`

:::tip
可以使用枚举：`FIRST_PERSON_CONTROLS_PLUGIN`
:::

## 插件依赖

无

## 插件传参

```ts
export interface FirstPersonControlsParameters {
  /**移动速度 */
  movementSpeed?: number;
  /**转向速度 */
  lookSpeed?: number;

  /**垂直查看 */
  lookVertical?: boolean;
  /**是否会自动前进 */
  autoForward?: boolean;

  activeLook?: boolean;
  /**升高速度 */
  heightSpeed?: boolean;
  /**升高系数 */
  heightCoef?: number;
  /**最低高度 */
  heightMin?: number;
  /**最高高度 */
  heightMax?: number;
}
```

## 引擎拓展

```ts
export interface FirstPersonControlsEngine extends Engine {
  firstPersonControls: FirstPersonControls;
}
```

## FirstPersonControls

参照：[https://threejs.org/docs/index.html#examples/zh/controls/FirstPersonControls](https://threejs.org/docs/index.html#examples/zh/controls/FirstPersonControls)
