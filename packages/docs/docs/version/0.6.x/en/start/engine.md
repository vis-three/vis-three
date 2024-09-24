## Built-in Engines

`vis-three` provides several `engines` with common functionalities that can be directly downloaded and used.

### Native Engine

The Native Engine is designed to support the development of native three.js projects. Beyond the quickly integrated engine functionalities, other features can be developed in the same way as in a native three.js project.

### @vis-three/display-engine

A native `three.js` display engine primarily designed to help users quickly build display-oriented native `three.js` scene projects.

#### Installation

```
npm i three
npm i @vis-three/display-engine
```

#### Example Usage

```js
import * as THREE from "three";
import { DisplayEngine } from "@vis-three/display-engine";

const engine = new DisplayEngine()
  .setDom(document.getElementById("app"))
  .play();

engine.scene.add(THREE.AmbientLight());

engine.scene.add(
  new THREE.Mesh(
    new THREE.BoxBufferGeometry(10, 10, 10),
    new THREE.MeshStandardMaterial({ color: "rgb(255, 105, 100)" })
  )
);
```

#### Reference Links

- [engine/DisplayEngine.html](https://shiotsukikaedesari.github.io/vis-three/examples.html?example=engine/DisplayEngine.html)

#### Plugin List

- @vis-three/camera-adaptive-plugin
- @vis-three/css2d-renderer-plugin
- @vis-three/css3d-renderer-plugin
- @vis-three/effect-composer-plugin
- @vis-three/event-manager-plugin
- @vis-three/orbit-controls-plugin
- @vis-three/pointer-manager-plugin
- @vis-three/render-manager-plugin
- @vis-three/webgl-renderer-plugin

#### Strategy List

- @vis-three/css2d-render-strategy
- @vis-three/css3d-render-strategy
- @vis-three/effect-render-strategy
- @vis-three/orbit-render-strategy

### @vis-three/modeling-engine

A native `three.js` editor engine primarily designed to better support users in constructing native `three.js` scenes during the development phase, providing visual aids and certain adjustment and monitoring features.

#### Installation

```
npm i three
npm i @vis-three/modeling-engine
```

#### Example Usage

```js
import * as THREE from "three";
import { ModelingEngine } from "@vis-three/modeling-engine";

const engine = new ModelingEngine()
  .setDom(document.getElementById("app"))
  .setSize()
  .setStats(true)
  .play();

engine.scene.add(THREE.AmbientLight());

engine.scene.add(
  new THREE.Mesh(
    new THREE.BoxBufferGeometry(10, 10, 10),
    new THREE.MeshStandardMaterial({ color: "rgb(255, 105, 100)" })
  )
);
```

#### Reference Links

- [engine/ModelingEngine.html](https://shiotsukikaedesari.github.io/vis-three/examples.html?example=engine/ModelingEngine.html)

#### Plugin List

- @vis-three/axes-helper-plugin
- @vis-three/camera-adaptive-plugin
- @vis-three/css2d-renderer-plugin
- @vis-three/css3d-renderer-plugin
- @vis-three/effect-composer-plugin
- @vis-three/event-manager-plugin
- @vis-three/grid-helper-plugin
- @vis-three/keyboard-manager-plugin
- @vis-three/object-helper-plugin
- @vis-three/orbit-controls-plugin
- @vis-three/pointer-manager-plugin
- @vis-three/render-manager-plugin
- @vis-three/selection-plugin
- @vis-three/stats-plugin
- @vis-three/transform-controls-plugin
- @vis-three/viewpoint-plugin
- @vis-three/webgl-renderer-plugin

#### Strategy List

- @vis-three/css2d-render-strategy
- @vis-three/css3d-render-strategy
- @vis-three/effect-render-strategy
- @vis-three/grid-viewpoint-strategy
- @vis-three/helper-select-interact-strategy
- @vis-three/orbit-render-strategy
- @vis-three/orbit-viewpoint-strategy
- @vis-three/stats-render-strategy
- @vis-three/trans-select-event-strategy
- @vis-three/transform-keyboard-strategy

### Configurable Engine

The configurable engine not only supports native scene development but also integrates scene configuration capabilities. It transforms all native scene construction into configurations, so **you only need to focus on the scene configuration sheet**. The remaining code organization details and functionality implementation are handled by the engine.

### @vis-three/display-engine-support

Built on the native `three.js` display engine, this engine integrates configurable development capabilities, primarily enabling users to quickly build configurable display-oriented scene projects.

#### Installation

```
npm i three
npm i @vis-three/middleware
npm i @vis-three/display-engine-support
```

#### Example Usage

```js
import * as THREE from "three";
import { DisplayEngineSupport } from "@vis-three/display-engine-support";
import { generateConfig, CONFIGTYPE } from "@vis-three/middleware";

const engine = new DisplayEngineSupport()
  .setDom(document.getElementById("app"))
  .play();

generateConfig.injectEngine = engine;

const scene = generateConfig(CONFIGTYPE.SCENE);

engine.setSceneBySymbol(scene.vid);

generateConfig.injectScene = true;

generateConfig(CONFIGTYPE.POINTLIGHT, {
  position: {
    x: 30,
    y: 50,
  },
  distance: 100,
});

const material = generateConfig(CONFIGTYPE.MESHSTANDARDMATERIAL, {
  color: "rgb(255, 0, 0)",
});

const geometry = generateConfig(CONFIGTYPE.BOXGEOMETRY, {
  width: 20,
  height: 40,
  depth: 60,
});

generateConfig(CONFIGTYPE.MESH, {
  geometry: geometry.vid,
  material: material.vid,
});
```

#### Reference Links

- [engine/DisplayEngineSupport.html](https://shiotsukikaedesari.github.io/vis-three/examples.html?example=engine/DisplayEngineSupport.html)

#### Plugin List

- @vis-three/axes-helper-plugin
- @vis-three/camera-adaptive-plugin
- @vis-three/css2d-renderer-plugin
- @vis-three/css3d-renderer-plugin
- @vis-three/effect-composer-plugin
- @vis-three/event-manager-plugin
- @vis-three/grid-helper-plugin
- @vis-three/keyboard-manager-plugin
- @vis-three/object-helper-plugin
- @vis-three/orbit-controls-plugin
- @vis-three/pointer-manager-plugin
- @vis-three/render-manager-plugin
- @vis-three/selection-plugin
- @vis-three/stats-plugin
- @vis-three/transform-controls-plugin
- @vis-three/viewpoint-plugin
- @vis-three/webgl-renderer-plugin

#### Strategy List

- @vis-three/css2d-render-strategy
- @vis-three/css3d-render-strategy
- @vis-three/effect-render-strategy
- @vis-three/grid-viewpoint-strategy
- @vis-three/helper-select-interact-strategy
- @vis-three/orbit-render-strategy
- @vis-three/orbit-viewpoint-strategy
- @vis-three/stats-render-strategy
- @vis-three/trans-select-event-strategy
- @vis-three/transform-keyboard-strategy

### @vis-three/modeling-engine-support

Built on the native `three.js` editor engine, this engine integrates configurable development capabilities, primarily designed to better support users in constructing configurable scenes during the development phase. It provides visual aids and certain adjustment and monitoring features.

#### Installation

```
npm i three
npm i @vis-three/middleware
npm i @vis-three/modeling-engine-support
```

#### Example Usage

```js
import * as THREE from "three";
import { ModelingEngineSupport } from "@vis-three/modeling-engine-support";
import { generateConfig, CONFIGTYPE } from "@vis-three/middleware";

const engine = new ModelingEngineSupport()
  .setDom(document.getElementById("app"))
  .play();

generateConfig.injectEngine = engine;

const scene = generateConfig(CONFIGTYPE.SCENE);

engine.setSceneBySymbol(scene.vid);

generateConfig.injectScene = true;

generateConfig(CONFIGTYPE.POINTLIGHT, {
  position: {
    x: 30,
    y: 50,
  },
  distance: 100,
});

const material = generateConfig(CONFIGTYPE.MESHSTANDARDMATERIAL, {
  color: "rgb(255, 0, 0)",
});

const geometry = generateConfig(CONFIGTYPE.BOXGEOMETRY, {
  width: 20,
  height: 40,
  depth: 60,
});

generateConfig(CONFIGTYPE.MESH, {
  geometry: geometry.vid,
  material: material.vid,
});
```

#### Reference Links

- [engine/ModelingEngineSupport.html](https://shiotsukikaedesari.github.io/vis-three/examples.html?example=engine/ModelingEngineSupport.html)

#### Plugin List

- @vis-three/axes-helper-plugin
- @vis-three/camera-adaptive-plugin
- @vis-three/css2d-renderer-plugin
- @vis-three/css3d-renderer-plugin
- @vis-three/effect-composer-plugin
- @vis-three/grid-helper-plugin
- @vis-three/keyboard-manager-plugin
- @vis-three/object-helper-plugin
- @vis-three/orbit-controls-plugin
- @vis-three/selection-plugin
- @vis-three/stats-plugin
- @vis-three/transform-controls-plugin
- @vis-three/viewpoint-plugin
- @vis-three/webgl-renderer-plugin

#### Strategy List

- @vis-three/composer-support-strategy
- @vis-three/css2d-render-strategy
- @vis-three/css3d-render-strategy
- @vis-three/css3d-renderer-support-strategy
- @vis-three/effect-render-strategy
- @vis-three/grid-viewpoint-strategy
- @vis-three/helper-select-interact-strategy
- @vis-three/orbit-controls-support-strategy
- @vis-three/orbit-render-strategy
- @vis-three/orbit-viewpoint-strategy
- @vis-three/stats-render-strategy
- @vis-three/trans-select-event-strategy
- @vis-three/transform-controls-helper-filter-strategy
- @vis-three/transform-controls-support-strategy
- @vis-three/transform-keyboard-strategy
- @vis-three/webgl-renderer-support-strategy

## Custom Engine Assembly

In addition to the pre-configured `engines`, for different projects with varying requirements, we might also want the flexibility to customize the installation of plugins, inject strategies, and drag-and-drop to assemble the engine from scratch or extend an existing engine. The following section introduces how to customize engine assembly.

### Engine Core

For assembling native application engines, we need to import our engine core from the core package `@vis-three/core` and then proceed with the assembly.

```
npm i @vis-three/core
```

```js
import { Engine } from "@vis-three/core";

import { defineEngine } from "@vis-three/core";
```

::: tip
`vis-three` offers both class-based and functional assembly modes.
:::

### Configurable Engine Core

The configurable engine core adds the necessary dependencies and plugins for configuration on top of the basic engine core. While we can assemble everything from scratch, for the sake of consistency, we recommend importing the configurable engine core from the `@vis-three/middleware` package.

```
npm i @vis-three/middleware
```

```js
import { EngineSupport } from "@vis-three/middleware";
```

### Engine Plugin Assembly

We can select and install the plugins we need.

```
npm i @vis-three/webgl-renderer-plugin
npm i @vis-three/effect-composer-plugin
npm i @vis-three/camera-adaptive-plugin
npm i @vis-three/render-manager-plugin
npm i @vis-three/grid-helper-plugin
```

```js
import { WebGLRendererPlugin } from "@vis-three/plugin-webgl-renderer";
import { CameraAdaptivePlugin } from "@vis-three/plugin-camera-adaptive";
import { RenderManagerPlugin } from "@vis-three/plugin-render-manager";
import { EffectComposerPlugin } from "@vis-three/plugin-effect-composer";
import { GridHelperPlugin } from "@vis-three/plugin-grid-helper";
import { Engine, defineEngine } from "@vis-three/core";

// Class Instance Installation
const engine = new Engine()
  .install(RenderManagerPlugin())
  .install(
    WebGLRendererPlugin({
      antialias: true,
      alpha: true,
    })
  )
  .install(
    EffectComposerPlugin({
      WebGLMultisampleRenderTarget: true,
    })
  )
  .install(CameraAdaptivePlugin())
  .install(GridHelperPlugin());

// Functional Installation
const engine = defineEngine({
  plugins: [
    RenderManagerPlugin(),
    WebGLRendererPlugin({
      antialias: true,
      alpha: true,
    }),
    EffectComposerPlugin({
      WebGLMultisampleRenderTarget: true,
    }),
    CameraAdaptivePlugin(),
    GridHelperPlugin(),
  ],
});
```

::: tip
For information on writing plugins, please refer to the [Custom Plugins](/start/plugin) section.
:::

### Engine Strategy Assembly

We can select and install the strategies we need.

```
npm i @vis-three/webgl-renderer-plugin
npm i @vis-three/effect-composer-plugin
npm i @vis-three/orbit-controls-plugin
npm i @vis-three/render-manager-plugin

npm i @vis-three/effect-render-strategy
npm i @vis-three/orbit-render-strategy
```

```js
import { WebGLRendererPlugin } from "@vis-three/plugin-webgl-renderer";
import { EffectComposerPlugin } from "@vis-three/plugin-effect-composer";
import { OrbitControlsPlugin } from "@vis-three/orbit-controls-plugin";
import { RenderManagerPlugin } from "@vis-three/plugin-render-manager";

import { EffectRenderStrategy } from "@vis-three/strategy-effect-render";
import { OrbitRenderStrategy } from "@vis-three/orbit-render-strategy";
import { Engine, defineEngine } from "@vis-three/core";

// Class Instance Installation
const engine = new Engine()
  .install(RenderManagerPlugin())
  .install(
    WebGLRendererPlugin({
      antialias: true,
      alpha: true,
    })
  )
  .install(
    EffectComposerPlugin({
      WebGLMultisampleRenderTarget: true,
    })
  )
  .install(OrbitControlsPlugin())

  .exec(EffectRenderStrategy())
  .exec(OrbitRenderStrategy());

// Functional Installation
const engine = defineEngine({
  plugins: [
    RenderManagerPlugin(),
    WebGLRendererPlugin({
      antialias: true,
      alpha: true,
    }),
    EffectComposerPlugin({
      WebGLMultisampleRenderTarget: true,
    }),
    OrbitControlsPlugin(),
  ],

  strategy: [EffectRenderStrategy(), OrbitRenderStrategy()],
});
```

::: tip
For information on writing strategies, please refer to the [Custom Strategies](/start/strategy) section.
:::
