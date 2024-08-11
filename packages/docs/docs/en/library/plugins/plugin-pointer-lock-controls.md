# @vis-three/plugin-pointer-lock-controls

Pointer Lock Controls Plugin.

Simulates the fixed crosshair mouse interaction effect typical in FPS games.

- This plugin requires user interaction to be triggered.
- This plugin automatically adapts to changes in the scene, camera, and DOM.

```ts
engine.install(PointerLockControlsPlugin());

document.getElementById("button").click = () => {
  engine.pointerLockControls.lock();
};
```

## Latest Version

<img alt="version" src="https://img.shields.io/npm/v/@vis-three/plugin-pointer-lock-controls">

## License

<img alt="NPM" src="https://img.shields.io/npm/l/@vis-three/plugin-pointer-lock-controls?color=blue">

## Plugin Name

`PointerLockControlsPlugin`

:::tip
You can use the enumeration: `POINTER_LOCK_CONTROLS_PLUGIN`
:::

## Plugin Dependencies

None

## Plugin Parameters

None

## Engine Extensions


```ts
export interface OrbitControlsEngine extends Engine {
  orbitControls: VisOrbitControls;
}
```

## PointerLockControls

Reference：[https://threejs.org/docs/index.html?q=point#examples/zh/controls/PointerLockControls](https://threejs.org/docs/index.html?q=point#examples/zh/controls/PointerLockControls)
