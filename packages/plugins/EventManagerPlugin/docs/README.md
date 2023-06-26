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

- POINTER_MANAGER_PLUGIN: @vis-three/plugin-pointer-manager

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

### eventManager
