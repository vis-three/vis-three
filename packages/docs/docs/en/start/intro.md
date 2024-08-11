# Why Use VIS-THREE?

## Challenges in Developing Projects with three.js

### Project Organization and Iteration

When developing web3D projects with `three.js`, whether referring to examples on
the [three.js official site](https://threejs.org/), other plugin demos, or working on similar projects, a significant
issue often encountered is **code organization**.

- How can we ensure long-term stability and smooth iteration of the project with various requirements, different levels
  of developer experience, and diverse front-end technology stacks and frameworks?

- When requirements change or new features are added, how can we modify our existing code to avoid extensive disruptions
  and enable quick issue resolution?

- For teams with varying levels of developer experience and high turnover, how long will it take for new developers to
  get up to speed?

### Flexibility and Common Pitfalls

`three.js` is a web3D library that provides only the most basic or primitive project construction tools. While its
simplicity and fundamental nature make it powerful, they also mean that there are many intricate details to address,
leading to numerous "pitfalls."

- How can we avoid falling into common pitfalls?

- How can we help others avoid these pitfalls?

### Framework Integration and Rendering Performance

The rise of data-driven view frameworks has elevated front-end development to a new level of complexity and team size.
These frameworks make it easier for developers to focus more on business functionality with lower technical costs.

However, 3D projects, especially those centered around real-time rendering, introduce significant changes in development
approach and technical requirements. When using popular front-end frameworks with web3D projects:

- How can we effectively manage the relationship between 3D components and popular front-end frameworks?

- How can we ensure real-time 3D rendering performance?

Efficient development relies on popular front-end frameworks, but maintaining real-time 3D rendering performance or
overall web performance is highly demanding. This creates a significant challenge for many front-end developers,
increasing both the skill requirements and the mental burden during development.

## VIS-THREE Framework Introduction

### Modular Plugin System

To address the code organization issues in `three.js` projects, reduce coupling between functional components, enhance
reusability, and improve extensibility, `VIS-THREE` introduces the concept of functional plugins. By adopting a
plugin-based organization, `VIS-THREE` core engine provides plug-and-play functionality, allowing for decoupled
development of modules and features, continuous integration, and compatibility with extensions.

```js
import {defineEngine} from "@vis-three/core";
import {WebGLRendererPlugin} from "@vis-three/plugin-webgl-renderer";

const engine = defineEngine({
    plugins: [
        WebGLRendererPlugin({
            antialias: true,
            alpha: true,
        }),
    ],
});
```

### Logical Strategy

- How can we address issues of inter-function connectivity and compatibility?

- How can we ensure that plugins can meet and implement various business requirements?

- `VIS-THREE` introduces the concept of logical strategy, providing capabilities for strategy injection and rollback.
  Strategies are methods for organizing different plugins to achieve a complete functional logic, decoupling logic from
  plugins, enhancing plugin compatibility, and improving business function compatibility, thus enabling better
  continuous integration.

```js
import {defineEngine} from "@vis-three/core";
import {WebGLRendererPlugin} from "@vis-three/plugin-webgl-renderer";
import {RenderManagerPlugin} from "@vis-three/plugin-render-manager";
import {EffectComposerPlugin} from "@vis-three/plugin-effect-composer";

import {EffectRenderStrategy} from "@vis-three/strategy-effect-render";

const engine = defineEngine({
    plugins: [
        WebGLRendererPlugin({
            antialias: true,
            alpha: true,
        }),
        RenderManagerPlugin(),
        EffectComposerPlugin({
            WebGLMultisampleRenderTarget: true,
        }),
    ],
    strategy: [EffectRenderStrategy()],
});
```

### Scene Configuration

While modular and strategic approaches improve code organization, they don't fundamentally change the development
challenges of `three.js`. The inherent complexity of `three.js`, such as understanding graphics principles, object
properties, and various APIs, remains high and requires substantial knowledge and experience.

To lower the development threshold of `three.js` and avoid common pitfalls, `VIS-THREE` provides a configuration-based
middleware layer. This approach allows you to configure all `three.js` object actions without needing to focus on the
details of `three.js` itself. Instead, you can concentrate on the structure of your scene configuration files.

`VIS-THREE` also offers a suite of tools and capabilities to simplify managing configuration files, mapping the entire
3D
scene and its interactions through these files, thereby reducing development complexity and improving efficiency.

**Focus on configuration, and leave the rest to us.**

```js
import {DisplayEngineSupport} from "@vis-three/engine-display-support";
import {generateConfig, CONFIGTYPE} from "@vis-three/middleware";

const engine = new DisplayEngineSupport()
    .setDom(document.getElementById("app"))
    .play();

generateConfig.injectEngine = engine;

const scene = generateConfig(CONFIGTYPE.SCENE);

engine.setSceneBySymbol(scene.vid);

generateConfig.injectScene = true;

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

### Component-Based Engineering (Alpha)

## Advantages of VIS-THREE

### Robust Compatibility

From a framework perspective, `VIS-THREE` provides a set of development processes and mechanisms to standardize and
enhance web3D project development. This allows for the selection or customization of plugins, strategies, and
configuration modules based on specific business needs and development complexity.

Within this framework, `VIS-THREE` supports both native `three.js` project development and development using its own
configuration and component-based approach.

### Flexible Integration and Migration

The 3D engine built with the `VIS-THREE` framework integrates various plugins and strategies, which are pluggable and
removable. This flexibility allows for convenient control over changes in engine functionality by installing or
uninstalling different plugins and strategies. For engine migration, simply introducing the same plugins and strategies
completes the migration process.

### More Robust Version Upgrades

`VIS-THREE` uses modularity, strategy, and configuration to isolate application projects from `three.js`, providing a
good
buffer against updates.

In native `three.js` projects, once the `three.js` dependency version is set, updating to a major new version can be
costly and challenging. It often results in incompatibility issues and requires extensive project refactoring, leading
to high upgrade costs and risks.

With `VIS-THREE`, updating `three.js` versions is almost seamless for application projects. You only need to update the
relevant plugins, strategies, or configuration modules, and the compatibility is handled through these updates. This
significantly ensures the stability and smooth iteration of application projects.

### Broader Framework Integration

`VIS-THREE`, through its scene configuration feature, importantly decouples UI logic from the 3D rendering layer.

For UI frameworks, the 3D real-time rendering component is no longer part of the 3D library. Instead, it is managed
through configuration files similar to `json`, where all UI operations interact with a simple `json` configuration.

This means that, in most cases, the UI framework no longer directly manipulates the objects and properties required for
3D real-time rendering. By decoupling the 3D and UI components, `VIS-THREE` ensures high UI development efficiency,
maintains 3D real-time rendering performance, reduces development complexity, and enhances the overall efficiency of
web3D project development and operation.

`VIS-THREE` does not enforce specific UI frameworks, such as `vue2`, `vue3`, or `react`. From a design perspective,
`VIS-THREE` is compatible with any front-end framework.

### Smoother Development Transition

If you have experience developing web3D projects with `three.js`, transitioning to using `VIS-THREE` for project
development will feel natural and seamless.

The official plugins, strategies, and configuration modules provided are designed with a non-intrusive development
approach. This means they strive not to impact or alter the native `three.js` objects, properties, and concepts. In this
mode, developers familiar with `three.js` can quickly adapt to and get up to speed with various functions and modules.

## Advantages of Configuration-Based Development

### Reduced Development Pressure

### Templates & Assembly

### Preprocessing & Postprocessing

### Configuration & Logic Upgrades

### Persistence & Runtime

### Native Rendering Performance