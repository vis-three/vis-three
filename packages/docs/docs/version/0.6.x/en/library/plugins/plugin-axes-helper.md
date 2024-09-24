# @vis-three/plugin-axes-helper

A plugin for scene world coordinate axes.

- The axes cannot be picked up by rays.
- The axes will automatically be added to the switched scene.

## Latest Version

<img alt="version" src="https://img.shields.io/npm/v/@vis-three/plugin-axes-helper">

## License

<img alt="NPM" src="https://img.shields.io/npm/l/@vis-three/plugin-axes-helper?color=blue">

## Plugin Name

`AxesHelperPlugin`

:::tip
You can use the exported enumeration: `AXES_HELPER_PLUGIN`
:::

## Plugin Dependencies

None

## Plugin Parameters

```ts
export interface AxesHelperParameters {
  /** The length of the axes */
  length?: number;
}
```

## Engine Extensions

```ts
export interface AxesHelperEngine extends Engine {
  /** The axes helper object */
  axesHelper: AxesHelper;
  /** Method to show or hide the axes */
  setAxesHelper: (show: boolean) => AxesHelperEngine;
}
```

### axesHelper

Reference: [https://threejs.org/docs/index.html?q=axe#api/zh/helpers/AxesHelper](https://threejs.org/docs/index.html?q=axe#api/zh/helpers/AxesHelper)

### setAxesHelper

Usage

```ts
engine.setAxesHelper(false);
```
