# @vis-three/plugin-pointer-manager

Pointer Manager Plugin.

This plugin calculates the pointer from `DOM` to `normalized coordinates` in real-time and emits related mouse events.

## Latest Version

<img alt="version" src="https://img.shields.io/npm/v/@vis-three/plugin-pointer-manager">

## License

<img alt="NPM" src="https://img.shields.io/npm/l/@vis-three/plugin-pointer-manager?color=blue">

## Plugin Name

`PointerManagerPlugin`

:::tip
You can use the enumeration: `POINTER_MANAGER_PLUGIN`
:::

## Plugin Dependencies

None

## Plugin Parameters

```ts
export interface PointerManagerParameters {
  /** Target DOM element */
  dom?: HTMLElement;
  /** Throttle time for mouse events */
  throttleTime?: number;
}

```

## Engine Extensions

```ts
export interface PointerManagerEngine extends Engine {
    /** Pointer Manager */
    pointerManager: PointerManager;
}
```

## PointerManager

This class extends `Dispatcher` from `@vis-three/core`.

### mouse

• **mouse**: `Vector2`

Normalized mouse pointer.

### throttleTime

• **throttleTime**: `number`

Throttle time for mouse events.

### getNormalMouse

▸ **getNormalMouse**(): `Vector2`

Gets the normalized mouse pointer.

#### Returns

`Vector2`

Normalized mouse pointer.

### getWorldPosition

▸ **getWorldPosition**(`camera`, `offset`, `result?`): `Vector3`

Gets the world coordinates of the current pointer position from the given camera.

#### Parameters

| Name      | Type      |
| :-------- | :-------- |
| `camera`  | `Camera`  |
| `offset`  | `number`  |
| `result?` | `Vector3` |

#### Returns

`Vector3`

World coordinates of the pointer.

### intersectPlane

▸ **intersectPlane**(`camera`, `plane`, `result?`): `null` \| `Vector3`

Gets the intersection point of the current pointer with the given plane from the given camera.

#### Parameters

| Name      | Type      |
| :-------- | :-------- |
| `camera`  | `Camera`  |
| `plane`   | `Plane`   |
| `result?` | `Vector3` |

#### Returns

`null` \| `Vector3`

Intersection point or `null`.

### setDom

▸ **setDom**(`dom`): `PointerManager`

Sets the current target DOM element.

#### Parameters

| Name  | Type          |
| :---- | :------------ |
| `dom` | `HTMLElement` |

#### Returns

`PointerManager`

