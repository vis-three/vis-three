# Component-Based Development Model

After extensive market and project validation, the component-based development model has significantly enhanced web
development efficiency. `vis-three` draws inspiration from this model. `vis-three` itself features a configuration-based
development layer and, by integrating with the core `@vue/reactivity` of the popular `vue` framework, offers a
development model similar to Vue's component-based approach. It also includes many features specific to 3D development
for developers to utilize. The goal is to elevate web3D projects to a new level through component-based development.

> View code examples
>
at: [https://vis-three.github.io/examples.html?example=widget/widget.html](https://vis-three.github.io/examples.html?example=widget/widget.html)

::: tip

- The current version is in the alpha testing phase. We welcome feedback and suggestions or encourage participation in
  its development.
- The current component-based development is for the browser runtime version.

:::

## Engine Setup

The component-based engine and configuration are consistent with the native engine. First, install the following
dependencies:

```
npm i three
npm i @types/three

// Core component-based module of vis-three
npm i @vis-three/widget

// Configuration module library
npm i @vis-three/library-module

// WebGLRenderer related plugins for three.js
npm i @vis-three/plugin-webgl-renderer

// Grid helper plugin for visual assistance during scene setup
npm i @vis-three/plugin-grid-helper

// Camera adaptive plugin for automatically adjusting to different render window sizes
npm i @vis-three/plugin-camera-adaptive

// Orbit controls plugin for freely rotating the view
npm i @vis-three/plugin-orbit-controls

// WebGLRenderer rendering strategy
npm i @vis-three/strategy-webgl-render
```

::: tip
The component-based engine is derived from the configuration-based engine and possesses **all capabilities** of the
configuration-based engine.
:::

After installation, proceed with building the engine. The component-based engine uses the same build methods as the
configuration-based engine and the native engine, offering two build methods:

```js
import {EngineWidget, defineEngineWidget} from "@vis-three/widget";

import {WebGLRendererPlugin} from "@vis-three/plugin-webgl-renderer";
import {CameraAdaptivePlugin} from "@vis-three/plugin-camera-adaptive";
import {RenderManagerPlugin} from "@vis-three/plugin-render-manager";
import {GridHelperPlugin} from "@vis-three/plugin-grid-helper";
import {OrbitControlsPlugin} from "@vis-three/plugin-orbit-controls";

import {WebGLRenderStrategy} from "@vis-three/strategy-webgl-render";

import * as ModuleLibrary from "@vis-three/library-module";

// Class Instance
const engine = new EngineWidget()
    .registModule(ModuleLibrary.light)
    .registModule(ModuleLibrary.geometry)
    .registModule(ModuleLibrary.material)
    //...
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
const engine = new defineEngineWidget({
    plugins: [
        WebGLRendererPlugin({
            antialias: true,
            alpha: true,
        }),
        CameraAdaptivePlugin(),
        GridHelperPlugin(),
        OrbitControlsPlugin(),
    ],
    strategy: [WebGLRenderStrategy(), WebGLRendererSupportStrategy()],
    modules: Object.values(ModuleLibrary),
});
```

## Page Mounting

The page mounting process is consistent with the [native engine](./native.md) build method. Here, we add one additional
step, which is directly rendering the component.

```js
engine.play();
```

## Defining Components

The first step in component-based development is defining the relevant components. We can import `defineComponent`
from `@vis-three/widget` to do this.

```js
import {defineComponent} from "@vis-three/widget";

const root = defineComponent({
    render() {
    },
    setup() {
    },
});
```

Of course, it's possible to define components without using the `defineComponent` API, but `defineComponent` provides
excellent type hints.

```js
export default {
    render() {
    },
    setip() {
    },
};
```

## Component Mounting

We can mount components using the relevant `engine` APIs. The `mount` function does not require any parameters.

```js
engine.createWidget(root).mount();
```

## Rendering Templates

If you’ve used Vue before, you’re likely familiar with using `template` for defining your component structure.
Additionally, Vue provides a `render` function, which offers full programmatic control. Those familiar with Vue’s
internals will know that the `template` is parsed and compiled into a `render` function during the build process.

The `render` function in `vis-three` is similar to Vue’s, with some optimizations in certain areas.

### Basic Template

You can create the structure using the `h` function, which can be seen as an alternative way to write `generateConfig`.

```js
import {h} from "@vis-three/widget";

const root = defineComponent({
    render() {
        const geometry = h("BoxGeometry", {
            width: 5,
            height: 1,
            depth: 5,
        });

        const material = h("MeshStandardMaterial", {
            transparent: true,
            opacity: 0.8,
        });

        h("Mesh", {
            geometry,
            material,
        });
    },
});
```

There are a few important points to note:

1. The main difference between the structure of 3D component templates and `DOM` is that, for now, nesting is not
   supported. Therefore, the writing process is top-down.

2. Due to the first point, our `render` function does not require a `return` statement. Any content created using
   the `h` function within `render` will be automatically recognized as the current component structure.

3. Unlike configuration-based development, where only a `vid` is passed, in this approach, you can pass the entire
   structure.

Based on these points, we can simplify it as follows:

```js
import {h} from "@vis-three/widget";

const root = defineComponent({
    render() {
        h("Mesh", {
            geometry: h("BoxGeometry", {
                width: 5,
                height: 1,
                depth: 5,
            }),
            material: h("MeshStandardMaterial", {
                transparent: true,
                opacity: 0.8,
            }),
        });
    },
});
```

### Conditional Templates

If certain parts of the template need to be rendered based on specific conditions, we should place these parts within
the `v-if` method. This ensures that these parts are optimized during the template rendering process.

```js
import {h, vif} from "@vis-three/widget";

const root = defineComponent({
    render() {
        let geometry;

        vif(() => {
            if (Math.random() > 0.5) {
                geometry = h("BoxGeometry");
            } else if (Math.random() > 0.7) {
                geometry = h("ConeGeometry");
            } else {
                geometry = h("SpheraGeometry");
            }
        });

        h("Mesh", {
            geometry,
            material: h("MeshStandardMaterial", {
                transparent: true,
                opacity: 0.8,
            }),
        });
    },
});
```

### List Templates

If certain parts of the template need to be rendered based on a list of items, we should place these parts within
the `v-for` method. This ensures that these parts are optimized during the template rendering process.

```js
import {h, vfor} from "@vis-three/widget";

const root = defineComponent({
    render() {
        const geometry = h("BoxGeometry", {
            width: 5,
            height: 1,
            depth: 5,
        });
        const material = h("MeshStandardMaterial", {
            transparent: true,
            opacity: 0.8,
        });

        vfor(() => {
            for (let i = 0; i < 10; i += 1) {
                h("Mesh", {
                    geometry,
                    material,
                    position: {
                        x: i * 5,
                    },
                });
            }
        });

        vfor(() => {
            [1, 2, 3, 4].forEach((item) => {
                h("Mesh", {
                    geometry,
                    material,
                    position: {
                        x: item + 2,
                    },
                });
            });
        });
    },
});
```

### Component Templates

For component templates, we can obtain them from the `components` parameter in the `render` function:

```js
import {h} from "@vis-three/widget";

const child = defineComponent({
    render() {
        h("Mesh", {
            geometry: h("BoxGeometry", {
                width: 5,
                height: 1,
                depth: 5,
            }),
            material: h("MeshStandardMaterial", {
                transparent: true,
                opacity: 0.8,
            }),
        });
    },
});

const root = defineComponent({
    components: {child},
    render({components}) {
        h(components.child, {
            // prop
        });
    },
});
```

## Reactive Data

In the componentized development using the `MVVM` pattern, the primary objective is to drive changes in the view through
data. Since `vis-three` is implemented using `@vue/reactivity`, the construction of reactive data is essentially the
same as in `vue`.

However, it is important to note that within the `render` function, `this` is directed to the object returned
by `setup`. You can access the data from `setup` using `this.xxx`.

```js
import {h, ref, reactive, computed} from "@vis-three/widget";

const root = defineComponent({
    render() {
        h("Mesh", {
            position: {
                x: this.positionX,
            },
            scale: this.scale,
            rotation: this.rotation,
        });
    },
    setup() {
        const positionX = ref(0);
        const scale = reactive({x: 1, y: 1.2, z: 1.5});
        const rotation = computed(() => {
            return {
                x: scale.x + 0.2,
                y: scale.y + 0.1,
                z: scale.z,
            };
        });

        return {
            positonX,
            scale,
            rotation,
        };
    },
});
```

:::tip
When accessing variables constructed by `ref` within the `render` function, you can directly access their values
using `this.xxx` without needing to use `this.xxx.value`. This feature is consistent with `vue`.
:::

## Parent-Child Components

A crucial feature of componentization is the ability to encapsulate and reuse components. The use of nested components
has been mentioned before, and there are essentially two ways to utilize components:

### Direct Use

Direct use involves using the required components directly in the desired locations through the `h` function.

```js
import {h} from "@vis-three/widget";

const child = defineComponent({});

const root = defineComponent({
    render() {
        h(child, {});
    },
});
```

### Registered Use

Registered use involves registering the components before they are needed and then calling them through the `components`
structure parameter in the `render` function. This method is more recommended.

```js
import {h} from "@vis-three/widget";

const child = defineComponent({});

const root = defineComponent({
    components: {child},
    render({components}) {
        h(components.child, {});
    },
});
```

## Component Props

For child components, you can preset `props` parameters, which allow the parent component to pass data as needed. When
used in the template, this can be understood to be consistent with `setup`, allowing direct access via `this`.

```js
import {h} from "@vis-three/widget";

const child = defineComponent({
    props: {
        positionX: {
            type: Number,
            default: 0,
        },
    },
    render() {
        h("Mesh", {
            position: {
                x: this.positionX,
            },
        });
    },
});

const root = defineComponent({
    components: {child},
    render({components}) {
        h(components.child, {
            positionX: 100,
        });
    },
});
```

:::tip
It's important to note that the preset structure of `props` is fixed, meaning you need to specify `type` and `default`
to prevent unexpected issues.

Also, be aware of naming conflicts. If the `props` names are the same as those in `setup`, conflicts will occur.
:::

## Component Events

We want components to be able to handle relevant events directly. Let's see how to go about this.

### Basic Events

Basic events are those inherently available to basic elements, and can be added using the `on` prefix followed by the
event name in camel case.

```js
import {h} from "@vis-three/widget";

const root = defineComponent({
    render() {
        h("Mesh", {
            onClick: this.handler,
        });
    },

    setup() {
        return {
            handler() {
                console.log(alert("hello world"));
            },
        };
    },
});
```

### Component Events

Beyond basic events, for components, it is desirable for the component itself to emit events. For instance, we might
want the parent component to react to changes in the child component. This can be accomplished through component events.

```js
import {h, ref} from "@vis-three/widget";

const child = defineComponent({
    emits: {
        show: true,
    },
    render() {
        h("Mesh", {
            visible: {
                x: this.status,
            },
            onClick: this.triggle,
        });
    },

    setup({emit}) {
        const status = ref(true);
        const triggle = () => {
            status.value = !status.value;
            emit("show", status.value);
        };
        return {
            status,
            triggle,
        };
    },
});

const root = defineComponent({
    components: {child},
    render({components}) {
        h(components.child, {
            onShow: (status) => console.log(alert("child " + status)),
        });
    },
});
```

From the examples above, we can see:

1. The gradual events need to be declared within the component's `emits` property.
2. How to trigger these can be done through the `emit` object in the `setup` structural parameter.

:::tip
Currently, the component `emit` method can only provide one parameter, so for multiple parameters, you can format them
as an object.
:::

## Resource Usage

The `vis-three` component provides an object for registering and using external resources, which can create related
resources within the component for use in the template.

Let's take a look at an example of using an external Canvas object as a template texture.

```js
import {
    defineComponent,
    h,
    ref,
    computed,
    onMounted,
    watch,
} from "@vis-three/widget";
import {CanvasGenerator} from "@vis-three/convenient";

const root = defineComponent({
    render({resources}) {
        const texture = h("CanvasTexture", {
            url: resources.text,
            ref: "texture",
        });

        h("Mesh", {
            material: h("MeshBasicMaterial", {
                ref: "box",
                color: "rgb(255, 0, 0)",
                map: texture,
            }),
        });
    },
    resources() {
        return {
            text: this.textGenerator.getDom(),
        };
    },
    setup({resources}) {
        return {
            textGenerator: new CanvasGenerator().draw((ctx) => {
                ctx.fillStyle = "white";
                ctx.fillRect(0, 0, 512, 512);
                ctx.translate(256, 256);
                ctx.textBaseline = "middle";
                ctx.textAlign = "center";
                ctx.fillStyle = "black";
                ctx.font = " bold 52px 微软雅黑";
                ctx.fillText("Hello vis-three", 0, 0);
                ctx.translate(-256, -256);
            }),
        };
    },
});
```

From the examples above, we can see:

1. We can write the methods for generating external resources in `setup`, which has the benefit of allowing the
   resources to change based on reactive data, while also being in the same scope.

2. External resources need to be registered to `resources`, and currently, the `this` in `resources` is the same as
   in `render`.

3. To use resources within `render`, we can access them from the `resources` structural parameter in `render`.

## Preset Engines

Component-based development also includes corresponding preset engines:

- `@vis-three/engine-display-widget`

