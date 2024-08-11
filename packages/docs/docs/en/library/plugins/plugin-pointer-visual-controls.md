# @vis-three/plugin-pointer-visual-controls

Pointer Visual Controls Plugin.

Unlike the Orbit Controls, the Pointer Visual Controls plugin only affects the rotation of the camera through mouse interactions and does not affect the camera's position.

## Latest Version

<img alt="version" src="https://img.shields.io/npm/v/@vis-three/plugin-pointer-visual-controls">

## License

<img alt="NPM" src="https://img.shields.io/npm/l/@vis-three/plugin-pointer-visual-controls?color=blue">

## Plugin Name

`PointerVisualControlsPlugin`

:::tip
You can use the enumeration: `POINTER_VISUAL_CONTROLS_PLUGIN`
:::

## Plugin Dependencies

None

## Plugin Parameters

```ts
export enum MOUSE_BUTTON {
  LEFT = 0,
  MID = 1,
  RIGHT = 2,
}

export interface PointerLockControlsPluginParams {
    /** Mouse button that triggers the controller */
    pointerButton?: MOUSE_BUTTON;
    /** Minimum polar angle */
    minPolarAngle?: number;
    /** Maximum polar angle */
    maxPolarAngle?: number;
    /** Pointer rotation speed */
    pointerSpeed?: number;
}
```

## Engine Extensions

```ts
export interface PointerVisualControlsEngine extends Engine {
  pointerVisualControls: PointerVisualControls;
}
```
