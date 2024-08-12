# Configuration-Driven Development

Compared to the native three.js engine, the configurable engine not only inherits the **full capabilities** of the
native engine but also adds the ability to control the entire process through configuration. Configurable development
allows you to form the scene structure and visualization based on configurations, and influence the 3D scene at runtime
by modifying these configurations. This ensures robust support for complex application development.

> For code examples,
>
visit: [https://vis-three.github.io/examples.html?example=engine/EngineSupport.html](https://vis-three.github.io/examples.html?example=engine/EngineSupport.html)

## Engine Preparation

The configurable engine, like the native engine, requires us to first install the following dependencies:

```
npm i three
npm i @types/three

// Configurable core of vis-three
npm i @vis-three/middleware

// WebGLRenderer-related plugin for three.js
npm i @vis-three/plugin-webgl-renderer

// Grid helper plugin for visual assistance during early scene setup
npm i @vis-three/plugin-grid-helper

// Camera adaptive plugin for automatic adjustment to different rendering window sizes
npm i @vis-three/plugin-camera-adaptive

// WebGLRenderer rendering strategy
npm i @vis-three/strategy-webgl-render
```

:::tip
The configurable engine already includes a set of basic plugins and strategies. You only need to install additional
plugins and strategies as needed. For details on the built-in plugins and strategies of the configurable engine core,
please refer to the plugin documentation.
:::

After installation, you can build the engine. The construction method for the configurable engine is the same as for the
native engine and also provides two construction modes:

```js
import {EngineSupport, defineEngineSupport} from "@vis-three/middleware";
import {WebGLRendererPlugin} from "@vis-three/plugin-webgl-renderer";
import {GridHelperPlugin} from "@vis-three/plugin-grid-helper";
import {CameraAdaptivePlugin} from "@vis-three/plugin-camera-adaptive";
import {WebGLRenderStrategy} from "@vis-three/strategy-webgl-render";

// Class Instantiation
const engine = new EngineSupport()
    .install(
        WebGLRendererPlugin({
            antialias: true,
            alpha: true,
        })
    )
    .install(CameraAdaptivePlugin())
    .install(GridHelperPlugin())
    .exec(WebGLRenderStrategy());

// Functional
const engine = defineEngineSupport({
    plugins: [
        WebGLRendererPlugin({
            antialias: true,
            alpha: true,
        }),
        CameraAdaptivePlugin(),
        GridHelperPlugin(),
    ],
    strategy: [WebGLRenderStrategy()],
});
```

If you proceed with development, it will support native development similar to the native engine construction. However,
since we are using a configurable engine, you also need to install the configurable dependencies.

Configurable dependencies vary based on different business scenarios. First, let's install the following dependencies:

```
npm i @vis-three/module-light
npm i @vis-three/module-geometry
npm i @vis-three/module-material
npm i @vis-three/module-line
npm i @vis-three/module-points
npm i @vis-three/module-mesh
npm i @vis-three/module-scene
```

Alternatively, since there are many modules above, you can install the module library directly and then select the ones
you need:

```
npm i @vis-three/library-module
```

```js
// import ...
import {
    light,
    geometry,
    material,
    line,
    points,
    mesh,
    scene,
} from "@vis-three/library-module";

// Class Instantiation
const engine = new EngineSupport()
    .registModule(light)
    .registModule(geometry)
    .registModule(material)
    .registModule(line)
    .registModule(points)
    .registModule(mesh)
    .registModule(scene)
    .install(
        WebGLRendererPlugin({
            antialias: true,
            alpha: true,
        })
    )
    .install(CameraAdaptivePlugin())
    .install(GridHelperPlugin())
    .exec(WebGLRenderStrategy());

// Functional
const engine = defineEngineSupport({
    plugins: [
        WebGLRendererPlugin({
            antialias: true,
            alpha: true,
        }),
        CameraAdaptivePlugin(),
        GridHelperPlugin(),
    ],
    strategy: [WebGLRenderStrategy()],
    modules: [light, geometry, material, line, points, mesh, scene],
});
```

::: warning
If you use the class-based assembly mode, it's best to assemble the engine in the order
of `modules` -> `plugins` -> `strategies`.
:::

## Page Mounting

The method for mounting the page is the same as for the [native engine](./native.md) construction.

## Adding Objects

The process of adding objects and performing similar operations in the configurable engine differs significantly from
the native engine. You no longer need to worry about `three.js` types and parameter APIs; you only need to generate the
relevant configurations.

```js
// import ...
import {
    defineEngineSupport,
    generateConfig,
    CONFIGTYPE,
} from "@vis-three/middleware";

// engine code ...

// We need to generate a configurable scene object using generateConfig
const defaultScene = generateConfig(CONFIGTYPE.SCENE);

// By calling applyConfig, we can apply the generated configuration
// setSceneBySymbol allows us to find objects by the unique configuration identifier vid
engine.applyConfig(defaultScene).setSceneBySymbol(defaultScene.vid);

const pointLight = generateConfig(CONFIGTYPE.POINTLIGHT, {
    color: "rgb(255, 255, 255)",
    position: {
        y: 30,
    },
});

const commonGeometry = generateConfig(CONFIGTYPE.BOXGEOMETRY, {
    width: 10,
    height: 10,
    depth: 10,
});

const boxMaterial = generateConfig(CONFIGTYPE.MESHSTANDARDMATERIAL, {
    color: "rgb(255, 105, 100)",
});

const box = generateConfig(CONFIGTYPE.MESH, {
    geometry: commonGeometry.vid,
    material: boxMaterial.vid,
    position: {
        x: 10,
    },
});

const lineBox = generateConfig(CONFIGTYPE.LINE, {
    geometry: commonGeometry.vid,
});

const pointsMaterial = generateConfig(CONFIGTYPE.POINTSMATERIAL, {
    color: "rgb(255, 255, 255)",
});

const pointsBox = generateConfig(CONFIGTYPE.POINTS, {
    geometry: commonGeometry.vid,
    material: pointsMaterial.vid,
    position: {
        x: -10,
    },
});

engine.applyConfig(
    pointLight,
    commonGeometry,
    boxMaterial,
    box,
    lineBox,
    pointsMaterial,
    pointsBox
);

defaultScene.children.push(pointLight.vid, box.vid, lineBox.vid, pointsBox.vid);
```

From the code above, we can see:

1. You no longer need to use `import * as THREE from 'three'` and `new` related objects to complete the scene
   construction directly.

2. The configurable format allows you to initialize all properties when generating the configuration.

3. Each configuration has a unique `vid` identifier, which can be used to manage the entire object.

4. The basic development approach for configuration is: generate configuration with `generateConfig` -> apply
   configuration with `engine.applyConfig`.

::: tip

- `generateConfig` is the unified API for generating configurations.
- `CONFIGTYPE` enumerates all currently supported object configurations.
- When manually applying configurations, be mindful of the order of application. For example, if `box` depends
  on `commonGeometry` and `boxMaterial`, then `box` should be applied after `commonGeometry` and `boxMaterial`.

:::

## Automatic Injection

For simple scene development, manually generating and applying configurations and managing the application order can be
cumbersome. We can use automatic injection features to simplify these operations.

```js
// other code...
const defaultScene = generateConfig(CONFIGTYPE.SCENE);

engine.applyConfig(defaultScene).setSceneBySymbol(defaultScene.vid);

// Set up the injection engine
generateConfig.injectEngine = engine;
// Enable scene injection
generateConfig.injectScene = true;
// Enable automatic injection
generateConfig.autoInject = true;

generateConfig(CONFIGTYPE.POINTLIGHT, {
    color: "rgb(255, 255, 255)",
    position: {
        y: 30,
    },
});

const commonGeometry = generateConfig(CONFIGTYPE.BOXGEOMETRY, {
    width: 10,
    height: 10,
    depth: 10,
});

const boxMaterial = generateConfig(CONFIGTYPE.MESHSTANDARDMATERIAL, {
    color: "rgb(255, 105, 100)",
});

generateConfig(CONFIGTYPE.MESH, {
    geometry: commonGeometry.vid,
    material: boxMaterial.vid,
    position: {
        x: 10,
    },
});

generateConfig(CONFIGTYPE.LINE, {
    geometry: commonGeometry.vid,
});

const pointsMaterial = generateConfig(CONFIGTYPE.POINTSMATERIAL, {
    color: "rgb(255, 255, 255)",
});

generateConfig(CONFIGTYPE.POINTS, {
    geometry: commonGeometry.vid,
    material: pointsMaterial.vid,
    position: {
        x: -10,
    },
});
```

:::tip
Automatic injection is highly efficient for simple scene construction. However, for more complex business scenarios, it
is recommended to use manual configuration application.
:::

## Editing Configuration

For most business cases, runtime property changes are necessary. With native three.js, we can call relevant type object
APIs to make changes. In contrast, with configuration-based development, the configurations generated
by `generateConfig` are simple configuration objects. By modifying the properties of these objects, we can affect the 3D
scene and make changes to the objects. Simply update the generated configuration to reflect the changes.

```js
// other code
box.position.x = 40;

mesh.rotation.y = Math.PI / 2;

boxMaterial.color = "rgb(0, 0, 255)";

scene.children.pop();
```

::: warning
Note that you should avoid directly replacing the reference objects within the configuration object generated
by `generateConfig`. For example:

```js{2}
const mesh = generateConfig(CONFIGTYPE.MESH);
mesh.position = { x: 10, y: 10, z: 10 };
```

The main reasons are:

1. Replacing the entire reference directly can incur additional performance overhead (due to the creation of duplicate
   objects).

2. Directly replacing the reference may result in the loss of object tracking within the relevant module (loss of
   reference type pointers).

3. When updating the configuration object version, new configuration properties may be missing (the new version has
   added a property `w` in `position`).

Correct handling:

```js
const mesh = generateConfig(CONFIGTYPE.MESH);
mesh.position.x = 10;
mesh.position.y = 10;
mesh.position.z = 10;
```

:::

## Plugin Configuration

Some configurations are not part of the `module` package, such as the configuration for `WebGLRenderer`. Since these
configurations require corresponding plugins, the ability to configure them is handled through related plugin
strategies. Most of these plugin strategies are provided by `@vis-three/xxxx-support`. Let's configure `WebGLRenderer`
now.

```
npm i @vis-three/strategy-webgl-renderer-support
```

```js
// import code...

import {
    //...,
    renderer,
} from "@vis-three/library-module";

import {WebGLRendererSupportStrategy} from "@vis-three/strategy-webgl-renderer-support";

const engine = defineEngineSupport({
    plugins: [
        //...
        WebGLRendererPlugin({
            antialias: true,
            alpha: true,
        }),
    ],
    strategy: [WebGLRenderStrategy(), WebGLRendererSupportStrategy()],
    modules: [
        //...
        renderer,
    ],
});

engine.applyConfig(
    generateConfig(CONFIGTYPE.WEBGLRENDERER, {
        clearColor: "rgba(255 ,255 ,255 , 1)",
        shadowMap: {
            enabled: true,
        },
    })
);
```

:::tip
Even for plugin configurations, a corresponding configuration module is required as a foundation. For example, as shown
above: `import { renderer } from "@vis-three/library-module";`
:::

## Object Animation

Object animations can be implemented using the native approach, but we prefer to leverage the advantages of
configuration-based methods. This way, when saving and restoring scenes, we can take advantage of the configuration
features for direct recovery.

In the animations provided by `vis-three`, there are currently two types of animations: `ScriptAnimation`
and `MixerAnimation`.

For simple animations or those with clear business characteristics, `ScriptAnimation` is generally very convenient and
efficient. However, `ScriptAnimation` requires specific animation libraries and methods to be supported. We need to
first register the required animations before invoking them.

Let's start by installing the script animation library provided by the official documentation.

```
npm i @vis-three/library-animate-script
```

```js
// import ...

import {
    //...
    animation,
} from "@vis-three/library-module";

import {AniScriptGeneratorManager} from "@vis-three/middleware";

import {linearTime} from "@vis-three/library-animate-script";

AniScriptGeneratorManager.register(linearTime);

const engine = defineEngineSupport({
    //...
    modules: [
        // ...,
        animation,
    ],
});

// ...
const box = generateConfig(CONFIGTYPE.MESH, {
    geometry: commonGeometry.vid,
    material: boxMaterial.vid,
    position: {
        x: 10,
    },
});

// ...

generateConfig(
    CONFIGTYPE.SCRIPTANIMATION,
    {
        target: box.vid,
        attribute: ".rotation.y",
        script: AniScriptGeneratorManager.generateConfig("linearTime", {
            multiply: 1.5,
        }),
    },
    {
        strict: false,
    }
);
```

:::tip
Note that for unknown configuration environments, you need to disable the strict mode of `generateConfig`, otherwise,
configuration merging will not be possible.

Unknown configuration environments refer to those where the full configuration cannot be known in advance or predefined.
:::

## Object Events

For object events, the configuration process is similar to that of object animations. We need to register the relevant
event methods beforehand.

Below is an example where clicking on the wireframe will cause the cube to move along the x-axis in real-time.

```
npm i @vis-three/library-event
```

```js
// import ...
import {EventGeneratorManager} from "@vis-three/middleware";

import EventLibrary from "@vis-three/library-event";

EventGeneratorManager.register(EventLibrary.moveSpacing);

const engine = defineEngineSupport({
    //...
});

// ...
const box = generateConfig(CONFIGTYPE.MESH, {
    geometry: commonGeometry.vid,
    material: boxMaterial.vid,
    position: {
        x: 10,
    },
});

const boxMoveEvent = EventGeneratorManager.generateConfig("moveSpacing", {
    params: {
        target: box.vid,
        spacing: {
            x: 10,
            y: 0,
            z: 0,
        },
    },
});

generateConfig(
    CONFIGTYPE.LINE,
    {
        geometry: commonGeometry.vid,
        click: [boxMoveEvent],
    },
    {
        strict: false,
    }
);

// ...
```

## Model Import

For model import, we need to install resource parsers in advance. Why use parsers?

In configuration-based development, all object entities are introduced into the engine in a configuration form. For
different business scenarios, we might prepare different configuration modules while using the same batch of external
resources like models. Thus, we can use different parsers to meet specific business needs.

In other words, the process for applying external resources in a configuration-based approach involves:

`External resource (models, etc.) loading` -> `Parser parses into corresponding configuration sheet` ->

`Configuration sheet preprocessing` -> `Configuration sheet application`

For general model resource application, the official documentation provides corresponding parser libraries for use:

```
npm i @vis-three/library-parser
```

```js
// import ...
import {
    // ...
    Template,
} from "@vis-three/middleware";

import * as ModuleLibrary from "@vis-three/library-module";

const engine = defineEngineSupport({
    //...
    modules: Object.values(ModuleLibrary),
});

//...

engine.loaderManager.setPath(import.meta.env.BASE_URL);
engine.resourceManager.addParser(new GLTFResourceParser());

//...

const shoe = "model/glb/MaterialsVariantsShoe/MaterialsVariantsShoe.gltf";

engine.loadResourcesAsync([shoe]).then((res) => {
    engine.loadConfig(Template.observable(res.resourceConfig[shoe]));

    const rootTemplate = res.configMap.get(shoe + ".scene");

    const root = engine.getConfigBySymbol(rootTemplate.vid);

    root.scale.x = 50;
    root.scale.y = 50;
    root.scale.z = 50;
});
```

:::tip

- For parsers, we need to register them with `engine.resourceManager`, which is the **resource manager** of the
  configuration engine.

- For objects loaded after completion, you need to locate their relevant configurations via URL, as many resources may
  be loaded simultaneously.

- For the obtained configuration sheets, we need to process them into reactive objects that are usable by the `engine`.
  You can directly use methods from the provided `Template` object.

- Other approaches are similar to those in configuration-based development. You just need to find the relevant
  configurations to operate on them.
  :::

## Generated Resources

What are generated resources? These are resources that are not persistent but are generated at runtime, such
as `CanvasTexture`.

A key issue with generated resources is that they cannot be accessed through a `Loader`. `vis-three` classifies external
resources into two types: loadable resources and non-loadable resources.

- **Loadable Resources**: These need to be loaded through a `loader`. To use them, you must provide the
  appropriate `loader` and inject it into the `loaderManager`.

- **Non-Loadable Resources**: For example, `canvas` and `dom` elements, generally do not have related `loaders`. These
  can be directly registered through `resourceManager`.

```js
import {
    //...
    HTMLCanvasElementParser,
} from "@vis-three/library-parser";

import {CanvasGenerator} from "@vis-three/convenient";

const engine = defineEngineSupport({
    //...
});

engine.resourceManager.addParser(new HTMLCanvasElementParser());

const textCanvas = new CanvasGenerator()
    .draw((ctx) => {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, 512, 512);
        ctx.translate(256, 256);
        ctx.textBaseline = "middle";
        ctx.textAlign = "center";
        ctx.fillStyle = "black";
        ctx.font = " bold 52px 微软雅黑";
        ctx.fillText("Hello vis-three", 0, 0);
    })
    .preview()
    .getDom();

engine.registerResources({
    textCanvas,
});

const canvasTexture = generateConfig(CONFIGTYPE.CANVASTEXTURE, {
    url: "textCanvas",
});

const boxMaterial = generateConfig(CONFIGTYPE.MESHSTANDARDMATERIAL, {
    // color: "rgb(255, 105, 100)",
    map: canvasTexture.vid,
});

const box = generateConfig(CONFIGTYPE.MESH, {
    geometry: commonGeometry.vid,
    material: boxMaterial.vid,
    position: {
        x: 10,
    },
});

// ...
```

:::tip

- For resources like `canvas`, the official documentation provides convenient tools integrated
  through `@vis-three/convenient`.
- Remember to register generated resources using `engine.registerResources`. Their `key` is the identifier used during
  the configuration process.
  :::

## Configuration Saving

A key feature of configuration-based development is that as long as the relevant configurations are available, the
current scene can be replicated anywhere. Therefore, the primary task is to save the configuration sheets.

```js
// other code ...

const json = engine.toJSON(); // Export the JSON configuration directly

const jsObject = engine.exportConfig(); // Export a clean JavaScript object
```

::: tip
Many requirements involve performing unified operations on the configuration sheets before saving. You can directly
operate on the `jsObject` object. The `jsObject` exported by `exportConfig` is a deep copy and will not affect the
runtime configuration.
:::

## Scene Restoration

How can we restore an entire scene from a configuration sheet? We can achieve this with just a few `API` calls!

Of course, if you are using a custom `engine`, don’t forget to prepare the
related `events`, `animations`, `parsers`, `generated resources`, and so on, before importing.

```js
import jsonConfig from "jsonConfig.json";
import {generateConfig, Template, JSONHanlder} from "@vis-three/middleware";

// import
const config = Template.observable(JSONHanlder.clone(jsonConfig));

// Interface Fetching
axios.get("url").then((res) => {
    const config = Template.observable(JSONHanlder.clone(jsonConfig));
});

engine.loadConfig(config, (res) => {
    // do something
});

engine.loadConfigAsync(config).then((res) => {
    // do something
});
```

::: tip

1. Before applying the configuration, we need to process it using `JSONHandler` because certain numeric objects
   like `Infinity` and `-Infinity` may be lost during the standard `JSON` serialization process and require special
   handling.

2.

Many use cases involve additional processing of the configuration after it has been imported. Therefore, the current
loading function does not automatically convert the configuration to a reactive format. This needs to be done manually
using the `Template` methods.

:::

## Custom Configuration

Sometimes, we want to include custom data or configuration options in the generated configuration that can be used by
the UI or other methods for adjustments. However, we may not want these custom options to be captured by the
configuration mechanism and trigger default reactive methods. In `vis-three`, there is a default property called `meta`
in the generated configuration that is unaffected by the configuration mechanism. We can add relevant properties and
methods to this `meta` property.

```js
// code...
const box = generateConfig(
    CONFIGTYPE.MESH,
    {
        geometry: commonGeometry.vid,
        material: boxMaterial.vid,
        position: {
            x: 10,
        },
        meta: {
            userId: 123456,
            status: 200,
            data: {
                title: "节点1",
            },
        },
    },
    {
        strict: false,
    }
);

console.log(box);
// code...
```

We can see from the `console.log` output that the data under `box.meta` is not proxied.

::: tip
Make sure to disable strict mode.
:::

## Business Modules

The official configuration modules may not cover all business needs or might not be convenient for all scenarios. You
can create custom configuration modules tailored to your specific business requirements.

```js
// ./MyModule.js

const boardProcessor = defineProcessor({
    type: "Board",
    // ...
});

export default {
    type: "board",
    object: true,
    //...
    processor: [boardProcessor],
};
```

```js
import MyModule from "./MyModule.js";

const engine = defineEngineSupport({
    //...
    modules: [MyModule],
});

const board = generateConfig(CONFIGTYPE.BOARD);
```

::: tip
For detailed instructions on developing custom modules, please refer to the
documentation: [Custom Configuration Modules](./module.md)
:::
