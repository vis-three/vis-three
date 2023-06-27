# @vis-three/plugin-keyboard-manager

快捷键管理插件。

## 最新版本

<img alt="version" src="https://img.shields.io/npm/v/@vis-three/plugin-keyboard-manager">

## license

<img alt="NPM" src="https://img.shields.io/npm/l/@vis-three/plugin-keyboard-manager?color=blue">

## 插件名称

`KeyboardManagerPlugin`

:::tip
可以使用枚举：`KEYBOARD_MANAGER_PLUGIN`
:::

## 插件依赖

无

## 插件传参

```ts
interface KeyboardEntity {
  /**快捷键组合，比如 ['ctrl', 'z'] */
  shortcutKey: string[];
  /**快捷键功能描述 */
  desp: string;
  /**按下时触发功能 */
  keydown?: (event?: KeyEvent) => void;
  /**抬起时触发功能 */
  keyup?: (event?: KeyEvent) => void;
}

export interface KeyboardParameters {
  /**快捷键设置 */
  keyboards?: Array<KeyboardEntity>;
}
```

## 引擎拓展

```ts
export interface KeyboardManagerEngine extends Engine {
  keyboardManager: KeyboardManager;
}
```

## keyboardManager
