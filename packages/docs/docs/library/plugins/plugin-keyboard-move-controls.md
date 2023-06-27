# @vis-three/plugin-keyboard-move-controls

键盘物体移动控制插件。

- `w`, `a`, `s`, `d`移动。
- `shift`加速。
- 此控件会跟随相机、场景 dom 的变化自动适配。

## 最新版本

<img alt="version" src="https://img.shields.io/npm/v/@vis-three/plugin-keyboard-move-controls">

## license

<img alt="NPM" src="https://img.shields.io/npm/l/@vis-three/plugin-keyboard-move-controls?color=blue">

## 插件名称

`KeyboardMoveControlsPlugin`

:::tip
可以使用枚举：`KEYBOARD_MOVE_CONTROLS_PLUGIN`
:::

## 插件依赖

无

## 插件传参

```ts
export interface KeyboardMoveControlsParameters {
  /**被控制目标物体 */
  target?: Object3D;
  /**物体移动速度 */
  movementSpeed?: number;
  /**物体加速时的速度 */
  quickenSpeed?: number;
  /**移动方向是基于物体矩阵还是世界矩阵 */
  space?: "local" | "world";
  /**物体的正前方朝向，可以通过方法获取 */
  forwrad?: Vector3 | ((object: Object3D) => Vector3);
  /**扩展的键盘按下时的方法 */
  extendKeyDown?: (event: KeyboardEvent) => void;
  /**扩展的键盘抬起的方法 */
  extendKeyUp?: (event: KeyboardEvent) => void;
  /**在物体位置更新前的扩展处理方法 */
  beforeUpdate?: (event: BeforeUpdateEvent) => void;
  /**在物体位置更新后的扩展处理方法 */
  afterUpdate?: (event: AfterUpdateEvent) => void;
}
```

## 引擎拓展

```ts
export interface KeyboardMoveControlsEngine extends Engine {
  keyboardMoveControls: KeyboardMoveControls;
}
```

## KeyboardMoveControls

此类继承`@vis-three/core`的`Dispatcher`
