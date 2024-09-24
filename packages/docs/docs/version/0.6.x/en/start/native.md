# Native Development

If you already have experience or a development habit with `three.js` and prefer a development approach that leans
towards native `three.js`, this guide will help you use `vis-three` for more efficient project development while
maintaining native `three.js` development practices.

> View the code
>
example: [https://vis-three.github.io/examples.html?example=engine/Engine.html](https://vis-three.github.io/examples.html?example=engine/Engine.html)

## Engine Setup

Setting up the `vis-three` engine is highly efficient compared to native `three.js`. First, install the following
dependencies:

```
npm i three
npm i @types/three

# VIS-THREE Core Engine
npm i @vis-three/core

# Plugin for three.js WebGLRenderer
npm i @vis-three/plugin-webgl-renderer

# Grid Helper Plugin for visual assistance in early stage scenes
npm i @vis-three/plugin-grid-helper

# Camera Adaptive Plugin for automatic adaptation to different render window sizes
npm i @vis-three/plugin-camera-adaptive
```

After installation, you can proceed directly to engine construction. `VIS-THREE` offers two engine construction
methods: `class instantiation` and `functional` construction. Each approach has its own advantages depending on the use
case:

 ```js
import {Engine, defineEngine} from "@vis-three/core";
import {WebGLRendererPlugin} from "@vis-three/plugin-webgl-renderer";
import {GridHelperPlugin} from "@vis-three/plugin-grid-helper";
import {CameraAdaptivePlugin} from "@vis-three/plugin-camera-adaptive";

// class instantiation
const engine = new Engine()
    .install(
        WebGLRendererPlugin({
            antialias: true,
            alpha: true,
        })
    )
    .install(CameraAdaptivePlugin())
    .install(GridHelperPlugin());

// functional
const engine = defineEngine({
    plugins: [
        WebGLRendererPlugin({
            antialias: true,
            alpha: true,
        }),
        CameraAdaptivePlugin(),
        GridHelperPlugin(),
    ],
});
```

:::tip
Different plugins can have various input parameters. You can refer to the plugin documentation to review the parameters
for each plugin.
:::

## Page Mounting

Once you have the engine, you'll need to bind it to a DOM element on the page. Since DOM elements come in various sizes,
we want the engine to automatically adapt to these dimensions:

```html

<div id="app"></div>
```

```js
engine.setDom(document.getElementById("app")).setSize();
```

Since no intermediate APIs are required, we can directly use chainable calls. This applies to both engine construction
methods:

```js
const engine = defineEngine({
    plugins: [
        WebGLRendererPlugin({
            antialias: true,
            alpha: true,
        }),
        CameraAdaptivePlugin(),
        GridHelperPlugin(),
    ],
})
    .setDom(document.getElementById("app"))
    .setSize();
```

## Adding Objects

The engine comes with a default scene and a perspective camera. You can directly add objects to it, but don't forget to
import the `three.js` dependencies:

```js
// import ...
import * as THREE from "three";

// engine code

const pointLight = new THREE.PointLight("rgb(255, 255, 255)", 1, 300, 0);
pointLight.position.y = 30;

const box = new THREE.Mesh(
    new THREE.BoxBufferGeometry(10, 10, 10),
    new THREE.MeshStandardMaterial({color: "rgb(255, 105, 100)"})
);
box.position.x = 10;

const line = new THREE.Line(box.geometry);

const points = new THREE.Points(box.geometry);

points.position.x = -10;

engine.scene.add(pointLight, box, line, points);
```

## Rendering the Scene

Once our scene is ready, we can proceed to render it:

```js
engine.render();
```

## Object Animation

We want the box in the scene to have a rotation animation, but currently, we can only render it frame by frame. Handling
animation this way might require manually writing timers for rendering control. Is there a more convenient and reliable
method for integrating animations?

It’s simple—just look for a relevant functionality plugin. For this requirement, you can use:

`@vis-three/plugin-render-manager`

This plugin manages and controls all rendering functions.

However, simply importing this plugin won’t connect the `WebGLRenderer` to the rendering process. We also need a
strategy that integrates `WebGLRenderer` rendering with `RenderManager`.

```
npm i @vis-three/plugin-render-manager

npm i @vis-three/strategy-webgl-render
```

```js
// import ...
import {RenderManagerPlugin} from "@vis-three/plugin-render-manager";
import {WebGLRenderStrategy} from "@vis-three/strategy-webgl-render";

const engine = defineEngine({
    plugins: [
        WebGLRendererPlugin({
            antialias: true,
            alpha: true,
        }),
        CameraAdaptivePlugin(),
        GridHelperPlugin(),
        RenderManagerPlugin(),
    ],
    strategy: [WebGLRenderStrategy()],
})
    .setDom(document.getElementById("app"))
    .setSize()
    .play();
```

:::tip
If you have installed the `@vis-three/plugin-render-manager` plugin, you can simply call the `play` method, and the
plugin will automatically manage all rendering.
:::

At this point, you just need to add your animation.

```js
engine.renderManager.on("render", (event) => {
    box.rotation.y += event.delta * 3;
});
```

## View Controls

We want to be able to explore the scene from all angles using the mouse. How can we achieve this? Easy, just look for a
relevant plugin.

```
npm i @vis-three/plugin-orbit-controls
```

```js
// import
import {OrbitControlsPlugin} from "@vis-three/plugin-orbit-controls";

const engine = defineEngine({
    plugins: [
        // plugin
        OrbitControlsPlugin(),
    ],
    // strategy
});
// some code
```

## Object Events

A key feature of web projects is rich user interactions. How can we implement this? The answer is simple.

```
npm i @vis-three/plugin-event-manager
```

```js
// import
import {EventManagerPlugin} from "@vis-three/plugin-event-manager";

const engine = defineEngine({
    plugins: [
        // plugin
        EventManagerPlugin(),
    ],
    // strategy
});
// some code
```

However, installing this plugin directly will result in an error:

:::danger
EventManagerPlugin must install this plugin before: PointerManagerPlugin.
:::

This means that `EventManagerPlugin` needs to be installed before `PointerManagerPlugin`. This example illustrates that
plugins can have interdependencies. You can check the dependencies of each plugin through the console or documentation.
Make sure to install the plugins in the **correct order** as indicated by the prompts during installation.

```
npm i @vis-three/plugin-pointer-manager
npm i @vis-three/plugin-event-manager
```

```js
// import
import {PointerManagerPlugin} from "@vis-three/plugin-pointer-manager";
import {EventManagerPlugin} from "@vis-three/plugin-event-manager";

const engine = defineEngine({
    plugins: [
        // plugin
        PointerManagerPlugin(),
        EventManagerPlugin(),
    ],
    // strategy
});
// some code
```

The `EventManagerPlugin` plugin provides interaction patterns that are consistent with our DOM interaction habits, so we
can use it in the following way:

```js
box.addEventListener("click", (event) => {
    alert("hello vis-three");
});
```

## Model Import

An important feature of web3D is the ability to import external model resources. Here, we can also look for relevant
plugins to achieve this.

```
npm i plugin-loader-manager
```

```js
// import
import {LoaderManagerPlugin} from "@vis-three/plugin-loader-manager";

const engine = defineEngine({
    plugins: [
        // plugin
        LoaderManagerPlugin({
            path: import.meta.env.BASE_URL,
        }),
    ],
    // strategy
});
// some code

engine.loaderManager.addEventListener("loaded", (event) => {
    const model = event.resourceMap.get("/model/katana/katana.obj");

    model.scale.set(20, 20, 20);

    engine.scene.add(model);
});

engine.loaderManager.load(["/model/katana/katana.obj"]);
```

:::tip
We can preconfigure our loading base path. For example, Vite allows you to configure the path using
**import.meta.env.BASE_URL**. For detailed parameters and usage, please refer to the relevant documentation.
:::

## Pre-configured Engines

From the examples above, we can appreciate the continuous integration capabilities of `VIS-THREE`. But for general
projects, is there a quicker way to get started?

In such cases, you can use our pre-configured engines.

```
npm i @vis-three/engine-display
```

```js
import * as THREE from "three";
import {DisplayEngine} from "@vis-three/engine-display";

const engine = new DisplayEngine()
    .setDom(document.getElementById("app"))
    .setSize()
    .play();

engine.scene.add(
    new THREE.Mesh(
        new THREE.BoxBufferGeometry(10, 10, 10),
        new THREE.MeshBasicMaterial({color: "rgb(255, 105, 100)"})
    )
);

// do something
```

:::tip
For information on the plugins and strategies available with pre-configured engines, please refer to the relevant
documentation.
:::

## Business Plugins

The official plugins and strategies may not cover all business needs. You can write custom plugins or strategies based
on your specific business requirements.

```js
// ./Plugin.js
export const MyPlugin = function () {
    return {
        name: "MyPlugin",
        install() {
            // ...
        },

        dispose() {
            // ...
        },
    };
};
```

:::tip
For a detailed guide on developing custom plugins and strategies, please refer to the
documentation: [Custom Plugins](./plugin.md) and [Custom Strategies](./strategy.md).
:::

How to integrate plugins? It's actually the same as integrating other plugins.

```js
// import ...
import {MyPlugin} from "./Plugin.js";

const engine = new Engine().install(MyPlugin());
```

## Engine Modification

Sometimes, you might encounter situations where certain features in the official pre-configured engines are not needed
or affect the current results. In such cases, you can dynamically modify the engine during use.

```js
// import ...
import {MyPlugin} from "./Plugin.js";

const engine = new DisplayEngine()
    .uninstall("LoaderManagerPlugin")
    .rollback("EffectRenderStrategy")
    .install(MyPlugin())
    .setDom(document.getElementById("app"))
    .play();
```

:::tip
To unregister a feature, you only need to specify the `name` of the plugin or strategy. If you unregister a plugin
directly, its dependent strategies will also be unregistered. However, it is not recommended to do so. When
unregistering plugins or strategies, **explicitly follow the dependency order for cascading unregistration** to
facilitate troubleshooting.
:::
