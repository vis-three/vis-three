# Custom Strategy

`vis-three` provides support for pluggable plugins, but as our range of plugins grows, coordinating their interactions
can become challenging. For instance, if we have a `WebGLRendererPlugin` that manages WebGL rendering, and
a `RenderManagerPlugin` that oversees all rendering logic, how do we ensure these two plugins work in harmony?

This is where strategies come into play, as they are designed to coordinate functions between plugins based on certain
conditions. A strategy might depend on one plugin or several plugins to complete its functionality.

> This article uses TypeScript for strategy development.

## Strategy Options

Strategy options are the options object a strategy needs when handed over to the `engine`. The `engine` uses these
options to perform execution rollback operations.

```ts
export interface StrategyOptions<E extends Engine> {
    name: string; // Strategy name
    condition: string[]; // Strategy conditions
    exec: (engine: E) => void; // Strategy execution method
    rollback: (engine: E) => void; // Strategy rollback method
}
```

## Strategy Conditions

When implementing a strategy, conditions are necessary because our strategies are designed to accomplish different tasks
based on different plugins. Thus, the conditions for our strategies are the collection of plugins that can complete
these tasks, including our combined `engine`. For example, in the scenario below, we need the `RenderManagerPlugin`
and `WebGLRendererPlugin` to work together to implement the continuous rendering of the WebGL engine. Therefore, this
strategy depends on the extended engines and functionalities of these two plugins.

```ts
import {Strategy} from "@vis-three/core";
import {RenderManagerEngine} from "@vis-three/render-manager-plugin";
import {WebGLRendererEngine} from "@vis-three/webgl-renderer-plugin";

export interface WebGLRenderEngine
    extends WebGLRendererEngine,
        RenderManagerEngine {
}

export const WebGLRendererStrategy: Strategy<WebGLRenderEngine> = function () {
    return {
        name: "WebGLRendererStrategy",
        condition: ["RenderManagerPlugin", "WebGLRendererPlugin"],
        exec(engine) {
        },
        rollback(engine) {
        },
    };
};
```

## Writing Strategy Execution and Rollback Functions

In addition to installation, our strategies support rollback, consistent with the pluggable mechanism of plugins.
Therefore, it is crucial to properly organize the logic for strategy execution and strategy rollback.

```ts
import {Strategy} from "@vis-three/core";
import {
    RenderManagerEngine,
    RENDER_EVENT,
} from "@vis-three/render-manager-plugin";
import {WebGLRendererEngine} from "@vis-three/webgl-renderer-plugin";

export interface WebGLRenderEngine
    extends WebGLRendererEngine,
        RenderManagerEngine {
}

export const WebGLRendererStrategy: Strategy<WebGLRenderEngine> = function () {
    let renderFun: (event: RenderEvent) => void;

    return {
        name: "WebGLRendererStrategy",
        condition: ["RenderManagerPlugin", "WebGLRendererPlugin"],
        exec(engine) {
            renderFun = (event) => {
                engine.webGLRenderer.render(engine.scene, engine.camera);
            };

            engine.renderManager.addEventListener(RENDER_EVENT.RENDER, renderFun);
        },
        rollback(engine) {
            engine.renderManager.removeEventListener(RENDER_EVENT.RENDER, renderFun);
        },
    };
};
```

::: tip

- `Engine` and `Strategy` need to be imported from the core package `@vis-three/core`.

- For methods or certain properties, we can use JavaScript's closure feature to encapsulate logic or variables within
  the plugin, which are cleared upon destruction to prevent memory leaks.

- `name`, `condition`, `exec`, `rollback` are essential fields and cannot be empty.
  :::

## Strategy Parameters

Strategic development follows a functional programming style. Since it is functional, parameters can be passed, allowing
for the creation of more flexible strategies.

```ts
import {Strategy} from "@vis-three/core";
import {
    RenderManagerEngine,
    RENDER_EVENT,
} from "@vis-three/render-manager-plugin";
import {WebGLRendererEngine} from "@vis-three/webgl-renderer-plugin";

export interface WebGLRendererParameters {
    // ...
}

export interface WebGLRenderEngine
    extends WebGLRendererEngine,
        RenderManagerEngine {
}

export const WebGLRendererStrategy: Strategy<
    WebGLRenderEngine,
    WebGLRendererParameters
> = function (params: WebGLRendererParameters) {
    return {
        name: "WebGLRendererStrategy",
        condition: ["RenderManagerPlugin", "WebGLRendererPlugin"],
        exec(engine) {
            console.log(params);
            // do something
        },
        rollback(engine) {
            // do something
        },
    };
};
```
