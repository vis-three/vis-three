## 自定义策略

`vis-three`提供了可拔插的插件支持功能，但是当我们的插件丰富起来之后，插件之前的工作协调会遇到问题，比如我们有一个`WebGLRendererPlugin`这个是管理`WebGL`渲染的插件，又有一个`RenderManagerPlugin`插件，这个是管理所有渲染逻辑的插件，那么我们该如何让这两个插件协调工作？

这个时候我们就需要策略去进行插件之间的功能协调，因为策略是讲究条件的，策略会以某一个插件，或者某几个插件为条件，去完成功能。

> 本文使用的是 ts 进行策略编写。

### 策略选项

策略选项是一个策略最终交给`engine`时所需要的选项对象，`engine`会通过相关的选项进行相关的执行回滚操作。

```ts
export interface StrategyOptions<E extends Engine> {
  name: string; // 策略名称
  condition: string[]; // 策略条件
  exec: (engine: E) => void; // 策略执行方法
  rollback: (engine: E) => void; // 策略回滚方法
}
```

### 策略条件

我们执行策略的时候，都是有条件的，因为我们策略的编写是根据不同的插件去完成不同的事情，所以我们策略的条件就是能完成这些事情的插件合集，包括我们的插件组合`engine`。
比如我们下面的例子，我们需要`RenderManagerPlugin`，`WebGLRendererPlugin`配合去实现`WebGL`3D 长的渲染，所以我们的这个策略需要依赖这两个插件的拓展引擎和功能。

```ts
import { Strategy } from "@vis-three/core";
import { RenderManagerEngine } from "@vis-three/render-manager-plugin";
import { WebGLRendererEngine } from "@vis-three/webgl-renderer-plugin";

export interface WebGLRenderEngine
  extends WebGLRendererEngine,
    RenderManagerEngine {}

export const WebGLRendererStrategy: Strategy<WebGLRenderEngine> = function () {
  return {
    name: "WebGLRendererStrategy",
    condition: ["RenderManagerPlugin", "WebGLRendererPlugin"],
    exec(engine) {},
    rollback(engine) {},
  };
};
```

### 策略执行，回滚功能编写

我们的策略除了安装之外，是支持策略的回滚的，也就是跟插件的可拔插机制一致，所以我们需要组织好策略执行和策略回滚时候的功能逻辑。

```ts
import { Strategy } from "@vis-three/core";
import {
  RenderManagerEngine,
  RENDER_EVENT,
} from "@vis-three/render-manager-plugin";
import { WebGLRendererEngine } from "@vis-three/webgl-renderer-plugin";

export interface WebGLRenderEngine
  extends WebGLRendererEngine,
    RenderManagerEngine {}

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

- `Engine`与`Strategy`需要从核心包中引入`@vis-three/core`。

- 对于方法或者部分属性，我们能够利用 js 的闭包形式，将逻辑或者变量内存封装在插件内，在销毁的时候一并清除，防止内存泄漏。

- `name`, `condition`, `exec`, `rollback`是必要的字段，不能为空。
  :::

### 策略传参

策略化是函数式的编写形式，既然是函数式，所以我们是可以进行参数的传递的，这样子我们就能够编写更灵活的策略。。

```ts
import { Strategy } from "@vis-three/core";
import {
  RenderManagerEngine,
  RENDER_EVENT,
} from "@vis-three/render-manager-plugin";
import { WebGLRendererEngine } from "@vis-three/webgl-renderer-plugin";

export interface WebGLRenderEngine
  extends WebGLRendererEngine,
    RenderManagerEngine {}

export const WebGLRendererStrategy: Strategy<WebGLRenderEngine> = function (
  params: any
) {
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
