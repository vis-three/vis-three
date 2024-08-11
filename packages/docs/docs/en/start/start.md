## Using Pre-built Native 3D Engines

The official pre-integrated native 3D engines include:

1. `@vis-three/engine-display` - Native 3D engine for display purposes, e.g., model showcasing.
2. `@vis-three/engine-modeling` - Native 3D engine for editing purposes, e.g., editor applications.

### Install Dependencies

```
npm i @vis-three/engine-display
// 或者
npm i @vis-three/engine-modeling


```

### 引擎使用

```js
import * as THREE from "three";
import { DisplayEngine } from "@vis-three/engine-display";
// import { ModelingEngine } from "@vis-three/engine-modeling";

const engine = new DisplayEngine()
  .setDom(document.getElementById("app"))
  .setSize()
  .play();

engine.scene.add(
  new THREE.Mesh(
    new THREE.BoxBufferGeometry(10, 10, 10),
    new THREE.MeshBasicMaterial({ color: "rgb(255, 105, 100)" })
  )
);
```

### Engine Function Expansion

The pre-built engines already provide most of the common functional modules. For third-party plugins and specific business functionalities, you will need to develop related plugins and strategies based on the specific requirements. At this point, additional expansion functionality needs to be installed.

```js
// controls.js

export const ControlsPlugin = function () {
  // ...
};
```

```js
import { ControlsPlugin } from "./controls.js";

import { LoaderManagerPlugin } from "@vis-three/plugin-loader-manager";
import { EffectRenderStrategy } from "@vis-three/strategy-effect-render";

const engine = new DisplayEngine()
  .install(LoaderManagerPlugin())
  .install(ControlsPlugin())
  .exec(EffectRenderStrategy())
  .setDom(document.getElementById("app"))
  .play();
```

### Engine Function Unregistration

Sometimes, we may encounter situations where certain features of the official engines are not needed or affect the current results. In such cases, we can dynamically modify the engine during use.

```js
const engine = new DisplayEngine()
  .uninstall("LoaderManagerPlugin")
  .rollback("EffectRenderStrategy")
  .setDom(document.getElementById("app"))
  .play();
```

::: tip
To unregister a function, simply input the `name` of the plugin or strategy. If you unregister a plugin directly, its dependent strategies will also be unregistered. However, this approach is not recommended. For unregistering plugins and strategies, it is advisable to **explicitly cascade unregistration in the order of dependencies** to facilitate troubleshooting.
:::

::: tip
For detailed information on pre-built engine features, please refer to the API documentation.
:::

## Using Pre-configured Configurable 3D Engines

The official pre-integrated configurable 3D engines include:

1. `@vis-three/engine-display-support` - Configurable 3D engine for display purposes, e.g., model showcasing.
2. `@vis-three/engine-modeling-support` - Configurable 3D engine for editing purposes, e.g., editor applications.

### Install Dependencies

```
npm i @vis-three/middleware
npm i @vis-three/engine-display-support
// Or
npm i @vis-three/engine-modeling-support

```

::: tip
Since using configurable engines requires configurable-related functionalities, and to ensure relevant suggestions in IDEs, we can pre-install `@vis-three/middleware`.
:::

### Engine Usage

```js
import { DisplayEngineSupport } from "@vis-three/engine-display-support";
// import { ModelingEngineSupport } from "@vis-three/engine-modeling-support";

import { generateConfig, CONFIGTYPE } from "@vis-three/middleware";

const engine = new DisplayEngineSupport()
  .setDom(document.getElementById("app"))
  .setSize()
  .play();

const material = generateConfig(CONFIGTYPE.MESHBASICMATERIAL, {
  color: "rgb(255, 0, 0)",
});

const geometry = generateConfig(CONFIGTYPE.BOXGEOMETRY, {
  width: 20,
  height: 40,
  depth: 60,
});

const mesh = generateConfig(CONFIGTYPE.MESH, {
  geometry: geometry.vid,
  material: material.vid,
  position: {
    x: 10,
  },
});

const scene = generateConfig(CONFIGTYPE.SCENE, {
  children: [mesh.vid],
});

engine.applyConfig(material, geometry, mesh, scene).setSceneBySymbol(scene.vid);
```

### Function Expansion and Unregistration are Consistent with Native Engines.

::: tip
For detailed information on pre-built engine features, please refer to the API documentation.
:::

## Customizing and Assembling Native 3D Engines as Needed

If your engine functionality requirements are minimal or the engine functionality is quite unique, and you prefer to build a 3D engine from scratch, you can follow the methods outlined below for custom engine construction:

### Install Native Engine Core

When constructing a custom engine, you need to prepare the engine core in advance. The engine core provides the integration mechanism for plugins and strategies, as well as the basic attributes and functionalities of the engine.

```
npm i @vis-three/core
```

### Select and Install Plugin and Strategy Dependencies

Prepare the relevant plugins and strategies based on the project's business requirements, such as installing them via `npm` or writing them locally.

```
npm i @vis-three/plugin-webgl-renderer
npm i @vis-three/plugin-camera-adaptive
npm i @vis-three/plugin-render-manager
npm i @vis-three/plugin-effect-composer

npm i @vis-three/strategy-effect-render
```

```js
// Local controls.js

export const ControlsPlugin = function () {
  // ...
};
```

### Native Engine Construction

`vis-three` provides both **class-based** and **functional** assembly modes.

```js
import { Engine, defineEngine } from "@vis-three/core";

import { WebGLRendererPlugin } from "@vis-three/webgl-renderer";
import { CameraAdaptivePlugin } from "@vis-three/plugin-camera-adaptive";
import { RenderManagerPlugin } from "@vis-three/plugin-render-manager";
import { EffectComposerPlugin } from "@vis-three/plugin-effect-composer";
import { ControlsPlugin } from "./controls.js";

import { EffectRenderStrategy } from "@vis-three/strategy-effect-render";

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
      MSAA: true,
    })
  )
  .install(CameraAdaptivePlugin())
  .install(ControlsPlugin())
  .exec(EffectRenderStrategy());

// Functional Installation
const engine = defineEngine({
  plugins: [
    RenderManagerPlugin(),
    WebGLRendererPlugin({
      antialias: true,
      alpha: true,
    }),
    EffectComposerPlugin({
      MSAA: true,
    }),
    CameraAdaptivePlugin(),
    ControlsPlugin(),
  ],
  strategy: [EffectRenderStrategy()],
});
```

If you are using `ts` and wish to have better `API` hints, you can also use the **class inheritance-based** assembly mode.

```ts
import {
  Screenshot,
  WebGLRendererEngine,
  WebGLRendererPlugin,
} from "@vis-three/plugin-webgl-renderer";
import {
  EffectComposerEngine,
  EffectComposerPlugin,
} from "@vis-three/plugin-effect-composer";
import {
  RenderManager,
  RenderManagerEngine,
  RenderManagerPlugin,
} from "@vis-three/plugin-render-manager";

import { EffectRenderStrategy } from "@vis-three/strategy-effect-render";

class MyEngine
  extends Engine
  implements WebGLRendererEngine, EffectComposerEngine, RenderManagerEngine
{
  declare dom: HTMLElement;
  declare webGLRenderer: WebGLRenderer;
  declare effectComposer: EffectComposer;
  declare renderManager: RenderManager;
  declare camera: Camera;
  declare scene: Scene;

  declare play: () => this;
  declare stop: () => this;
  declare render: () => this;

  declare getScreenshot: (params?: Screenshot | undefined) => Promise<string>;

  constructor() {
    super();
    this.install(RenderManagerPlugin())
      .install(
        WebGLRendererPlugin({
          antialias: true,
          alpha: true,
        })
      )
      .install(
        EffectComposerPlugin({
          MSAA: true,
        })
      )
      .exec(EffectRenderStrategy());
  }
}

export const engine = new MyEngine();
```

### Function Expansion and Unregistration are Consistent with the Previous Sections.

## Customizing and Assembling Configurable 3D Engines as Needed

Custom construction of configurable engines differs in some dependencies from native engines.

### Install Configurable Engine Core

When constructing a custom configurable engine, you need to use the engine core provided by `@vis-three/middleware`. This core not only inherits the functionalities of the `@vis-three/core` engine core but also supports configurable-related features.

```
npm i @vis-three/middleware
```

### Select and Install Plugin and Strategy Dependencies

Prepare the relevant plugins and strategies based on the project's business requirements, such as installing them via `npm` or writing them locally.

Note that if you need these plugins or strategies to also support configurable capabilities, you will need to install configurable enhancement plugins or configurable enhancement strategies. These plugins and strategies will have `support` in their names.

```
npm i @vis-three/plugin-webgl-renderer
npm i @vis-three/plugin-camera-adaptive
npm i @vis-three/plugin-render-manager
npm i @vis-three/plugin-effect-composer

npm i @vis-three/strategy-effect-render

npm i @vis-three/strategy-webgl-renderer-support
npm i @vis-three/strategy-composer-support
```

```js
// Local controls.js

export const ControlsPlugin = function () {
  // ...
};
```

### Select and Install Configurable Modules

Configurable modules allow you to choose which modules or functional objects can be configured based on the specific needs of your project. With this flexibility, you can build configurable scenes more efficiently and effectively.

Officially pre-configured modules are written in the format `@vis-three/module-xxx`. You can install the relevant modules as needed.

```
npm i @vis-three/module-scene
npm i @vis-three/module-camera
npm i @vis-three/module-geometry
npm i @vis-three/module-material
npm i @vis-three/module-mesh
```

You can also install the `@vis-three/library-module` module library and select from it.

```
npm i @vis-three/library-module
```

```js
import {
  scene,
  camera,
  geometry,
  material,
  mesh,
} from "@vis-three/library-module";
```

### Configurable Engine Construction

Configurable engine construction is essentially similar to native engine construction. However, you need to use the engine provided by `@vis-three/middleware` and don't forget to install the configurable modules.

```js{1,21,46}
import { EngineSupport, defineEngineSupport } from "@vis-three/middleware";

import sceneModule from "@vis-three/module-scene";
import cameraModule from "@vis-three/module-camera";
import geometryModule from "@vis-three/module-geometry";
import materialModule from "@vis-three/module-material";
import meshModule from "@vis-three/module-mesh";

import { WebGLRendererPlugin } from "@vis-three/webgl-renderer";
import { CameraAdaptivePlugin } from "@vis-three/plugin-camera-adaptive";
import { RenderManagerPlugin } from "@vis-three/plugin-render-manager";
import { EffectComposerPlugin } from "@vis-three/plugin-effect-composer";
import { ControlsPlugin } from "./controls.js";

import { EffectRenderStrategy } from "@vis-three/strategy-effect-render";

import { WebGLRendererSupportStrategy } from "@vis-three/strategy-webgl-renderer-support";
import { ComposerSupportStrategy } from "@vis-three/strategy-composer-support";

// Class Instance Installation
const engine = new EngineSupport()
  .registModule(sceneModule)
  .registModule(cameraModule)
  .registModule(geometryModule)
  .registModule(materialModule)
  .registModule(meshModule)
  .install(RenderManagerPlugin())
  .install(
    WebGLRendererPlugin({
      antialias: true,
      alpha: true,
    })
  )
  .install(
    EffectComposerPlugin({
      MSAA: true,
    })
  )
  .install(CameraAdaptivePlugin())
  .install(ControlsPlugin())
  .exec(EffectRenderStrategy())
  .exec(WebGLRendererSupportStrategy())
  .exec(ComposerSupportStrategy());

// Functional Installation
const engine = defineEngineSupport({
  plugins: [
    RenderManagerPlugin(),
    WebGLRendererPlugin({
      antialias: true,
      alpha: true,
    }),
    EffectComposerPlugin({
      MSAA: true,
    }),
    CameraAdaptivePlugin(),
    ControlsPlugin(),
  ],
  strategy: [EffectRenderStrategy()],
  modules: [
    sceneModule,
    cameraModule,
    geometryModule,
    materialModule,
    meshModule
  ]
});
```

::: warning
If you are using the class-based assembly mode, it is best to follow the order of `modules` -> `plugins` -> `strategies` for engine assembly.
:::

### Function Expansion and Unregistration are Consistent with the Previous Sections.
