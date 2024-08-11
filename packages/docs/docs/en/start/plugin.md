# Custom Plugins

To meet a variety of engine functionality needs, `vis-three` offers support for pluggable plugins. We'll explore the
pluginization process using the `WebGLRendererPlugin` as an example.

> This article uses TypeScript for plugin development.

## Plugin Options

Plugin options are the options object required by a plugin when handed over to the `engine`. The `engine` uses these
options to manage installation and teardown operations.

```ts
export interface PluginOptions<E extends Engine> {
  name: string; // Plugin name
  deps?: string | string[]; // Plugin dependencies
  install: (engine: E) => void; // Plugin installation function
  dispose: (engine: E) => void; // Plugin destruction function
}
```

## Plugin Engine Extension Declaration

Many features of our plugins are intended to be directly accessed and called through the `engine`. Before doing so, we
need to declare the extended `engine`, informing others what the `engine` will look like after using our plugin. This
includes any additional methods and properties to avoid conflicts during integration with other plugins.

With the following declaration, we will add a `webGLRenderer` property and a `getScreenshot` method to the `engine`.

```ts
import {Engine} from "@vis-three/core";

export interface WebGLRendererEngine extends Engine {
    webGLRenderer: WebGLRenderer;
    getScreenshot: (params?: Screenshot) => Promise<string>;
}
```

## Writing Plugin Installation and Destruction Functions

Once the above declarations are prepared, we need to write the functionality for the plugin. Since our plugins are
designed to be pluggable, it is crucial to properly organize the logic for plugin installation and destruction.

```ts
import {
    Engine,
    Plugin,
    SetDomEvent,
    ENGINE_EVENT,
    SetSizeEvent,
} from "@vis-three/core";
import {Optional} from "@vis-three/utils";

export const WebGLRendererPlugin: Plugin<WebGLRendererEngine> = function () {
    let setDomFun: (event: SetDomEvent) => void;
    let setSizeFun: (event: SetSizeEvent) => void;
    return {
        name: "WebGLRendererPlugin",
        install(engine: WebGLRendererEngine) {
            engine.webGLRenderer = new WebGLRenderer(params);
            engine.getScreenshot = async function (params: Screenshot = {}) {
                // DO some thing
                return DataURI;
            };

            setDomFun = (event) => {
                event.dom.appendChild(engine.webGLRenderer.domElement);
            };

            engine.addEventListener<SetDomEvent>(ENGINE_EVENT.SETDOM, setDomFun);

            setSizeFun = (event) => {
                engine.webGLRenderer.setSize(event.width, event.height, true);
            };

            engine.addEventListener<SetSizeEvent>(ENGINE_EVENT.SETSIZE, setSizeFun);
        },

        dispose(
            engine: Optional<WebGLRendererEngine, "webGLRenderer" | "getScreenshot">
        ) {
            engine.removeEventListener<SetDomEvent>(ENGINE_EVENT.SETDOM, setDomFun);
            engine.removeEventListener<SetSizeEvent>(
                ENGINE_EVENT.SETSIZE,
                setSizeFun
            );
            engine.webGLRenderer!.dispose();

            delete engine.webGLRenderer;
            delete engine.getScreenshot;
        },
    };
};
```

::: tip

- `Engine` and `Plugin` need to be imported from the core package `@vis-three/core`.

- For methods or certain properties, we can use JavaScript's closure feature to encapsulate logic or variables within
  the plugin. This helps ensure that they are cleared upon destruction to prevent memory leaks.

- `name`, `install`, `dispose` are essential fields and cannot be empty.
  :::

## Plugin Parameters

Plugin development follows a functional programming style. Being functional, it allows for the passing of parameters,
enabling the creation of more flexible plugins. As shown in the example below, we can pass the required `WebGLRenderer`
parameters when applying the plugin.

```ts
export interface WebGLRendererParameters

= {
    //...
}

export const WebGLRendererPlugin: Plugin<WebGLRendererEngine, WebGLRendererParameters> = function (
    params: WebGLRendererParameters
) {
    return {
        name: "WebGLRendererPlugin",
        install(engine: WebGLRendererEngine) {
            engine.webGLRenderer = new WebGLRenderer(params);
            // do something
        },
        dispose(
            engine: Optional<WebGLRendererEngine, "webGLRenderer" | "getScreenshot">
        ) {
            // do something
        };
    };
```

## Plugin Dependencies

Sometimes, a plugin may need to depend on another plugin or a set of plugins. This can help save on plugin logic and
avoid redundancy. We can specify dependencies using the `deps` field in the plugin, allowing the `engine` to perform
dependency checks and reminders when using the plugin. For example, our `EffectComposerPlugin` must depend on
the `WebGLRendererPlugin`.

```ts
import {Engine, Plugin} from "@vis-three/core";
import {Optional} from "@vis-three/utils";
import {WebGLRendererEngine} from "@vis-three/webgl-renderer-plugin";

export interface EffectComposerEngine extends WebGLRendererEngine {
    effectComposer: EffectComposer;
}

export const EffectComposerPlugin: Plugin<EffectComposerEngine> = function () {
    return {
        name: "EffectComposerPlugin",
        deps: "WebGLRendererPlugin",
        install(engine) {
            // do something
        },
        dispose(engine: Optional<EffectComposerEngine, "effectComposer">) {
            // do something
        },
    };
};
```
