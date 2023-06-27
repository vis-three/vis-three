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

此类继承`@vis-three/core`的`Dispatcher`

### cancel

▸ **cancel**(`keyArray`): `KeyboardManager`

注销快捷键

#### Parameters

| Name       | Type       | Description |
| :--------- | :--------- | :---------- |
| `keyArray` | `string`[] | 快捷键组合  |

#### Returns

this

### getDocs

▸ **getDocs**(): `Pick`<`KeyboardEntity`, `"shortcutKey"` \| `"desp"`\>[]

获取快捷键文档

#### Returns

### register

▸ **register**(`entity`): `KeyboardManager`

注册快捷键

#### Parameters

| Name     | Type             |
| :------- | :--------------- |
| `entity` | `KeyboardEntity` |

#### Returns

this

### update

▸ **update**(`entity`): `KeyboardManager`

更新快捷键

#### Parameters

| Name     | Type             |
| :------- | :--------------- |
| `entity` | `KeyboardEntity` |

#### Returns

`KeyboardManager`

### watch

▸ **watch**(`dom`): `KeyboardManager`

限定捷键监听 dom- 默认 document

#### Parameters

| Name  | Type                         |
| :---- | :--------------------------- |
| `dom` | `undefined` \| `HTMLElement` |

#### Returns

this
