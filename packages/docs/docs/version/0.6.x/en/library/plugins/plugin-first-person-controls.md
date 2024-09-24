# @vis-three/plugin-first-person-controls

First Person Controller Plugin. (The principles of this first-person control are somewhat different from those used in FPS games.)

- This plugin automatically adapts and switches between the scene, camera, and DOM.

## Latest Version

<img alt="version" src="https://img.shields.io/npm/v/@vis-three/plugin-first-person-controls
">

## License

<img alt="NPM" src="https://img.shields.io/npm/l/@vis-three/plugin-first-person-controls
?color=blue">

## Plugin Name

`FirstPersonControlsPlugin`

:::tip
You can use the enumeration: `FIRST_PERSON_CONTROLS_PLUGIN`
:::

## Plugin Dependencies

None

## Plugin Parameters

```ts
export interface FirstPersonControlsParameters {
    /** Movement Speed */
    movementSpeed?: number;
    /** Turning Speed */
    lookSpeed?: number;

    /** Vertical Look */
    lookVertical?: boolean;
    /** Auto Forward Movement */
    autoForward?: boolean;

    activeLook?: boolean;
    /** Height Speed */
    heightSpeed?: boolean;
    /** Height Coefficient */
    heightCoef?: number;
    /** Minimum Height */
    heightMin?: number;
    /** Maximum Height */
    heightMax?: number;
}
```

## Engine Extensions

```ts
export interface FirstPersonControlsEngine extends Engine {
  firstPersonControls: FirstPersonControls;
}
```

## FirstPersonControls

Reference：[https://threejs.org/docs/index.html#examples/zh/controls/FirstPersonControls](https://threejs.org/docs/index.html#examples/zh/controls/FirstPersonControls)
