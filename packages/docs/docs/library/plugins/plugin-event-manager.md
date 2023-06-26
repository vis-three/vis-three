# @vis-three/plugin-event-manager

物体事件管理器插件。

安装此插件可以为场景中的物体增加鼠标事件。

目前支持的事件枚举。

```ts
export enum EVENTNAME {
  POINTERDOWN = "pointerdown",
  POINTERUP = "pointerup",
  POINTERMOVE = "pointermove",
  POINTERENTER = "pointerenter",
  POINTERLEAVE = "pointerleave",
  CLICK = "click",
  DBLCLICK = "dblclick",
  CONTEXTMENU = "contextmenu",
}
```

使用案例。

```ts
import * as THREE from "three";
import { EventManagerPlugin } from "@vis-three/plugin-event-manager";

engine.install(EventManagerPlugin());

const box = new THREE.Mesh(new THREE.BoxGeometry(5, 5, 5));

box.addEventListener("click", (event) => {
  console.log(event);
});
```

## 最新版本

<img alt="version" src="https://img.shields.io/npm/v/@vis-three/plugin-event-manager">

## license

<img alt="NPM" src="https://img.shields.io/npm/l/@vis-three/plugin-event-manager?color=blue">

## 插件名称

`EventManagerPlugin`

:::tip
可以使用枚举：`EVENT_MANAGER_PLUGIN`
:::

## 插件依赖

- PointerManagerPlugin: @vis-three/plugin-pointer-manager

## 插件传参

```ts
export interface EventManagerParameters {
  /**指定事件触发场景 */
  scene: Scene;
  /**指定事件触发相机 */
  camera: Camera;
  /**是否递归场景物体子集 */
  recursive?: boolean;
  /**是否穿透触发事件，比如2个物体即使重叠都会触发 */
  penetrate?: boolean;
  // support?: boolean;
  /**射线设置 参考three.js的射线设置*/
  raycaster?: {
    params: {
      Line?: { threshold: number };
      Points?: { threshold: number };
    };
  };
}
```

## 引擎拓展

```ts
export interface EventManagerEngine extends PointerManagerEngine {
  eventManager: EventManager;
}
```

## EventManager

此类继承`@vis-three/core`的`EventDispatcher`。

### camera

• `Private` **camera**: `Camera`

目标相机

### delegation

• **delegation**: `boolean` = `false`

**`Todo`**

以事件委托的形式触发事件

### filter

• `Private` **filter**: `Set`<`Object3D`<`Event`\>\>

不会触发事件的过滤器

### penetrate

• **penetrate**: `boolean` = `false`

事件穿透

### propagation

• **propagation**: `boolean` = `false`

**`Todo`**

以事件冒泡的形式触发事件

### raycaster

• **raycaster**: `Raycaster`

射线发射器

### recursive

• **recursive**: `boolean` = `false`

递归子物体

### scene

• `Private` **scene**: `Scene`

目标场景

### addFilterObject

▸ **addFilterObject**(`object`): `EventManager`

添加不会触发事件的场景中的物体

#### 参数

| Name     | Type                 | Description |
| :------- | :------------------- | :---------- |
| `object` | `Object3D`<`Event`\> | Object3D    |

#### Returns

`EventManager`

### intersectObject

▸ `Private` **intersectObject**(`mouse`): `Intersection`<`Object3D`<`Event`\>\>[]

#### 参数

| Name    | Type      |
| :------ | :-------- |
| `mouse` | `Vector2` |

#### Returns

`Intersection`<`Object3D`<`Event`\>\>[]

### removeFilterObject

▸ **removeFilterObject**(`object`): `EventManager`

移除过滤器中的物体

#### 参数

| Name     | Type                 | Description |
| :------- | :------------------- | :---------- |
| `object` | `Object3D`<`Event`\> | Object3D    |

#### Returns

this

### setCamera

▸ **setCamera**(`camera`): `EventManager`

设置当前相机

#### 参数

| Name     | Type     |
| :------- | :------- |
| `camera` | `Camera` |

#### Returns

this

### setScene

▸ **setScene**(`scene`): `EventManager`

设置当前场景

#### 参数

| Name    | Type    |
| :------ | :------ |
| `scene` | `Scene` |

#### Returns

this

### use

▸ **use**(`pointerManager`): `EventManager`

使用 pointerManger

#### 参数

| Name             | Type             |
| :--------------- | :--------------- |
| `pointerManager` | `PointerManager` |

#### Returns

`EventManager`
