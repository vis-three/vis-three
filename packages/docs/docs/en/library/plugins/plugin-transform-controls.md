# @vis-three/plugin-transform-controls

Object Transformation Controller Plugin.

- This plugin automatically adapts to changes in the camera, scene, and DOM.

## Latest Version

<img alt="version" src="https://img.shields.io/npm/v/@vis-three/plugin-transform-controls">

## License

<img alt="NPM" src="https://img.shields.io/npm/l/@vis-three/plugin-transform-controls?color=blue">

## Plugin Name

`TransformControlsPlugin`

:::tip
You can use the enumeration: `TRANSFORM_CONTROLS_PLUGIN`
:::

## Plugin Dependencies

None

## Plugin Parameters

None

## Engine Extensions

```ts
export interface TransformControlsEngine extends Engine {
    /** Whether the transform controller is in transformation mode */
    transing: boolean;
    /** Transform controller */
    transformControls: VisTransformControls;
    /** Set the visibility of the transform controller */
    setTransformControls: (show: boolean) => TransformControlsEngine;
}
```

## VisTransformControls

Reference: [https://threejs.org/docs/index.html#examples/en/controls/TransformControls](https://threejs.org/docs/index.html#examples/en/controls/TransformControls)

:::tip
To set transformation objects, use `transformControls.setAttach`, which allows you to attach multiple objects for transformation.
:::

