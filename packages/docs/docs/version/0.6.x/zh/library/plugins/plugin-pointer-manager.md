# @vis-three/plugin-pointer-manager

指针管理器插件。

此插件会实时计算`dom` -> `归一化坐标`的指针，并抛出相关鼠标事件。

## 最新版本

<img alt="version" src="https://img.shields.io/npm/v/@vis-three/plugin-pointer-manager">

## license

<img alt="NPM" src="https://img.shields.io/npm/l/@vis-three/plugin-pointer-manager?color=blue">

## 插件名称

`PointerManagerPlugin`

:::tip
可以使用枚举：`POINTER_MANAGER_PLUGIN`
:::

## 插件依赖

无

## 插件传参

```ts
export interface PointerManagerParameters {
  /**目标dom */
  dom?: HTMLElement;
  /**鼠标事件的节流时间 */
  throttleTime?: number;
}
```

## 引擎拓展

```ts
export interface PointerManagerEngine extends Engine {
  /**指针管理器 */
  pointerManager: PointerManager;
}
```

## PointerManager

此类继承`@vis-three/core`的`Dispatcher`

### mouse

• **mouse**: `Vector2`

归一化鼠标指针

### throttleTime

• **throttleTime**: `number`

鼠标事件的节流时间

### getNormalMouse

▸ **getNormalMouse**(): `Vector2`

获取归一化的鼠标指针

#### Returns

`Vector2`

mouse

### getWorldPosition

▸ **getWorldPosition**(`camera`, `offset`, `result?`): `Vector3`

获取当前指针位置从给定相机出发的世界坐标

#### Parameters

| Name      | Type      |
| :-------- | :-------- |
| `camera`  | `Camera`  |
| `offset`  | `number`  |
| `result?` | `Vector3` |

#### Returns

`Vector3`

### intersectPlane

▸ **intersectPlane**(`camera`, `plane`, `result?`): `null` \| `Vector3`

获取当前指针从给定相机出发与给定平面的焦点

#### Parameters

| Name      | Type      |
| :-------- | :-------- |
| `camera`  | `Camera`  |
| `plane`   | `Plane`   |
| `result?` | `Vector3` |

#### Returns

`null` \| `Vector3`

### setDom

▸ **setDom**(`dom`): `PointerManager`

设置当前作用的 dom

#### Parameters

| Name  | Type          |
| :---- | :------------ |
| `dom` | `HTMLElement` |

#### Returns

`PointerManager`
