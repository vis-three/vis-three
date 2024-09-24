# @vis-three/plugin-viewpoint

Camera Viewpoint Control Plugin.

- This plugin provides a default perspective camera and orthographic camera.

## Latest Version

<img alt="version" src="https://img.shields.io/npm/v/@vis-three/plugin-viewpoint">

## License

<img alt="NPM" src="https://img.shields.io/npm/l/@vis-three/plugin-viewpoint?color=blue">

## Plugin Name

`ViewpointPlugin`

:::tip
You can use the enumeration: `VIEWPOINT_PLUGIN`
:::

## Plugin Dependencies

None

## Plugin Parameters

```ts
export interface ViewpointParameters {
    /** Perspective camera settings */
    perspective?: {
        /** Initial position of the perspective camera */
        position?: Vector3Config;
        /** Point the perspective camera is looking at */
        lookAt?: Vector3Config;
        /** Up direction of the perspective camera */
        up?: Vector3Config;
    };
    /** Orthographic camera settings */
    orthographic?: {
        /** Distance from the camera to the observation plane */
        distance?: number;
        /** Up direction of the camera */
        up?: Vector3Config;
        /** Allow rotation */
        allowRotate?: boolean;
    };
}

```

## Engine Extensions

```ts
export enum VIEWPOINT {
    DEFAULT = "default",
    TOP = "top",
    BOTTOM = "bottom",
    LEFT = "left",
    RIGHT = "right",
    FRONT = "front",
    BACK = "back",
}

export interface ViewpointEngine extends Engine {
    /** Set the camera's viewpoint */
    setViewpoint: (viewpoint: VIEWPOINT) => Engine;
}
```
