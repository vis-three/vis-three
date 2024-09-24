# @vis-three/plugin-keyboard-move-controls

Keyboard Object Movement Control Plugin.

- Move with `w`, `a`, `s`, `d`.
- Accelerate with `shift`.
- This control automatically adapts to changes in the camera and scene DOM.

## Latest Version

<img alt="version" src="https://img.shields.io/npm/v/@vis-three/plugin-keyboard-move-controls">

## License

<img alt="NPM" src="https://img.shields.io/npm/l/@vis-three/plugin-keyboard-move-controls?color=blue">

## Plugin Name

`KeyboardMoveControlsPlugin`

:::tip
You can use the enumeration: `KEYBOARD_MOVE_CONTROLS_PLUGIN`
:::

## Plugin Dependencies

None

## Plugin Parameters

```ts
export interface KeyboardMoveControlsParameters {
    /** Target Object to be Controlled */
    target?: Object3D;
    /** Object Movement Speed */
    movementSpeed?: number;
    /** Speed during Object Acceleration */
    quickenSpeed?: number;
    /** Movement Direction based on Object Matrix or World Matrix */
    space?: "local" | "world";
    /** Forward Direction of the Object, can be obtained through a method */
    forwrad?: Vector3 | ((object: Object3D) => Vector3);
    /** Method to handle extended key down events */
    extendKeyDown?: (event: KeyboardEvent) => void;
    /** Method to handle extended key up events */
    extendKeyUp?: (event: KeyboardEvent) => void;
    /** Method for additional processing before object position update */
    beforeUpdate?: (event: BeforeUpdateEvent) => void;
    /** Method for additional processing after object position update */
    afterUpdate?: (event: AfterUpdateEvent) => void;
}
```

## Engine Extensions

```ts
export interface KeyboardMoveControlsEngine extends Engine {
  keyboardMoveControls: KeyboardMoveControls;
}
```

## KeyboardMoveControls

This class extends `@vis-three/core`'s `Dispatcher`.
