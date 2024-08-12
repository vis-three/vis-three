# @vis-three/plugin-first-person-controls

Grid Helper Plugin.

- This plugin automatically adapts and switches between the scene and camera.
- The grid objects in this plugin cannot be selected.

## Latest Version

<img alt="version" src="https://img.shields.io/npm/v/@vis-three/plugin-first-person-controls">

## License

<img alt="NPM" src="https://img.shields.io/npm/l/@vis-three/plugin-first-person-controls?color=blue">

## Plugin Name

`GridHelperPlugin`

:::tip
You can use the enumeration: `GRID_HELPER_PLUGIN`
:::

## Plugin Dependencies

None

## Plugin Parameters

```ts
export interface GridHelperParameters {
    /** Grid Range */
    range?: number;
    /** Grid Spacing */
    spacing?: number;
    /** Axes Color */
    axesColor?: string;
    /** Grid Color */
    cellColor?: string;
    /** Grid Opacity */
    opacity?: number;
}
```

## Engine Extensions

```ts
export interface GridHelperEngine extends Engine {
    /** Grid Helper Object */
    gridHelper: GridHelper;
    /** Set Grid Helper */
    setGridHelper: (show: boolean) => GridHelperEngine;
}
```

## gridHelper

Reference：[https://threejs.org/docs/index.html?q=gridHelper#api/zh/helpers/GridHelper](https://threejs.org/docs/index.html?q=gridHelper#api/zh/helpers/GridHelper)

## setGridHelper

Set the visibility status of the grid.

```ts
engine.setGridHelper(false);
```
