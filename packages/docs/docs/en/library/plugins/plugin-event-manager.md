# @vis-three/plugin-event-manager

Object Event Manager Plugin.

Installing this plugin allows you to add mouse events to objects in the scene.

Currently supported event enumerations.

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

## Usage Examples

<img alt="version" src="https://img.shields.io/npm/v/@vis-three/plugin-event-manager">

## license

<img alt="NPM" src="https://img.shields.io/npm/l/@vis-three/plugin-event-manager?color=blue">

## Plugin Name

`EventManagerPlugin`

:::tip
You can use the enum: `EVENT_MANAGER_PLUGIN`
:::

## Plugin Dependencies

- PointerManagerPlugin: @vis-three/plugin-pointer-manager

## Plugin Parameters

```ts
export interface EventManagerParameters {
    /** Specify the scene where events are triggered */
    scene: Scene;
    /** Specify the camera that triggers the events */
    camera: Camera;
    /** Whether to recursively check child objects in the scene */
    recursive?: boolean;
    /** Whether to allow event triggering through overlapping objects */
    penetrate?: boolean;
    /** Raycaster settings, refer to Three.js raycaster settings */
    raycaster?: {
        params: {
            Line?: { threshold: number };
            Points?: { threshold: number };
        };
    };
}
```

## Engine Extensions

```ts
export interface EventManagerEngine extends PointerManagerEngine {
  eventManager: EventManager;
}
```

## EventManager

This class extends `EventDispatcher` from `@vis-three/core`.

### camera

• `Private` **camera**: `Camera`

Target camera

### delegation

• **delegation**: `boolean` = `false`

**`Todo`**

Triggers events using event delegation

### filter

• `Private` **filter**: `Set`<`Object3D`<`Event`\>\>

Objects in the scene that will not trigger events

### penetrate

• **penetrate**: `boolean` = `false`

Event penetration

### propagation

• **propagation**: `boolean` = `false`

**`Todo`**

Triggers events using event bubbling

### raycaster

• **raycaster**: `Raycaster`

Raycaster

### recursive

• **recursive**: `boolean` = `false`

Recursively checks child objects

### scene

• `Private` **scene**: `Scene`

Target scene

### addFilterObject

▸ **addFilterObject**(`object`): `EventManager`

Adds objects in the scene that will not trigger events

#### Parameters

| Name     | Type                 | Description |
| :------- | :------------------- | :---------- |
| `object` | `Object3D`<`Event`\> | Object3D    |

#### Returns

`EventManager`

### intersectObject

▸ `Private` **intersectObject**(`mouse`): `Intersection`<`Object3D`<`Event`\>\>[]

#### Parameters

| Name    | Type      |
| :------ | :-------- |
| `mouse` | `Vector2` |

#### Returns

`Intersection`<`Object3D`<`Event`\>\>[]

### removeFilterObject

▸ **removeFilterObject**(`object`): `EventManager`

Removes objects from the filter

#### Parameters

| Name     | Type                 | Description |
| :------- | :------------------- | :---------- |
| `object` | `Object3D`<`Event`\> | Object3D    |

#### Returns

this

### setCamera

▸ **setCamera**(`camera`): `EventManager`

Sets the current camera

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `camera` | `Camera` |

#### Returns

this

### setScene

▸ **setScene**(`scene`): `EventManager`

Sets the current scene

#### Parameters

| Name    | Type    |
| :------ | :------ |
| `scene` | `Scene` |

#### Returns

this

### use

▸ **use**(`pointerManager`): `EventManager`

Uses the pointerManager

#### Parameters

| Name             | Type             |
| :--------------- | :--------------- |
| `pointerManager` | `PointerManager` |

#### Returns

`EventManager`

