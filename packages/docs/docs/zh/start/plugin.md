# 自定义插件

## 插件介绍

插件就是为`engine`提供各种各样的能力模块，更简单的理解就是提供各式各样的`api`。

`vis-three`提供了可拔插的插件支持功能，我们通过`WebGLRendererPlugin`插件带大家了解实现以下插件化的过程。

> 本文使用的是 ts 进行插件编写。

## 插件选项

插件选项是一个插件最终交给`engine`时所需要的选项对象，`engine`会通过相关的选项进行相关的安装销毁操作。

```ts
export interface PluginOptions<E extends Engine> {
  name: string; // 插件名称
  deps?: string | string[]; // 插件依赖
  install: (engine: E) => void; // 插件安装函数
  dispose: (engine: E) => void; // 插件销毁函数
}
```

## 插件引擎拓展声明

我们编写插件的很多功能，都希望能够直接通过`engine`直接访问调用，那么在此之前，我们需要对拓展后的`engine`进行声明，告诉别人使用了我们这个插件之后，`engine`会变成什么样子，会多出那些方法和属性，避免其他插件联调的时候撞车。

通过下面的声明书写，我们会在`engine`上增加一个`webGLRenderer`属性和一个`getScreenshot`的方法。

```ts
import { Engine } from "@vis-three/core";

export interface WebGLRendererEngine extends Engine {
  webGLRenderer: WebGLRenderer;
  getScreenshot: (params?: Screenshot) => Promise<string>;
}
```

## 插件安装，销毁

当上面相关声明准备完成之后，我们需要对插件功能进行编写，由于我们的插件化是可拔插的，所以我们需要组织好插件安装和插件销毁时候的功能逻辑。

```ts
import {
  Engine,
  Plugin,
  SetDomEvent,
  ENGINE_EVENT,
  SetSizeEvent,
} from "@vis-three/core";
import { Optional } from "@vis-three/utils";

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

- `Engine`与`Plugin`需要从核心包中引入`@vis-three/core`。

- 对于方法或者部分属性，我们能够利用 js 的闭包形式，将逻辑或者变量内存封装在插件内，在销毁的时候一并清除，防止内存泄漏。

- `name`, `install`, `dispose`是必要的字段，不能为空。
  :::

## 插件传参

插件化是函数式的编写形式，既然是函数式，所以我们是可以进行参数的传递的，这样子我们就能够编写更灵活的插件。如下面的例子，我们能够在插件应用的时候传入需要的`WebGLRenderer`参数。

```ts
export interface WebGLRendererParameters = {
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
}
```

## 插件依赖

有时候我们会遇到一个插件必须依赖另一个插件，或者另外一些插件的情况，这样子能够节省插件逻辑，避免逻辑冗余，我们可以通过插件的`deps`字段进行, 这样`engine`在使用插件的时候会帮我们进行依赖校验和提醒。比如我们的`EffectComposerPlugin`插件，它是必须依赖于我们的`WebGLRendererPlugin`插件进行。

```ts
import { Engine, Plugin } from "@vis-three/core";
import { Optional } from "@vis-three/utils";
import { WebGLRendererEngine } from "@vis-three/webgl-renderer-plugin";

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
