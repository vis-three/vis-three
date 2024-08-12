# @vis-three/plugin-css2d-renderer

CSS2D Renderer Plugin.

This plugin combines the ability to apply CSS 2D transformations with three.js transformations, allowing objects to be part of the same transformation system and coordinate system as three.js objects.

## Latest Version

<img alt="version" src="https://img.shields.io/npm/v/@vis-three/plugin-css2d-renderer">

## License

<img alt="NPM" src="https://img.shields.io/npm/l/@vis-three/plugin-css2d-renderer?color=blue">

## Plugin Name

`CSS2DRendererPlugin`

## Plugin Dependencies

None

## Plugin Parameters

None

## Engine Extensions

```ts
export interface CSS2DRendererEngine extends Engine {
  css2DRenderer: CSS2DRenderer;
}
```

### css2DRenderer

Reference： [https://threejs.org/docs/index.html?q=css#examples/zh/renderers/CSS2DRenderer](https://threejs.org/docs/index.html?q=css#examples/zh/renderers/CSS2DRenderer)
