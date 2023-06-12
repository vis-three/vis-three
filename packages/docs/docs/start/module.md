# 自定义配置化模块

官方所预置的现有配置化模块，都是根据`three.js`所划分归类的模块进行，但是对于各式各样的需求项目：

- 官方所归类的模块会比较繁琐与复杂。
- 如何加入业务逻辑是一个很麻烦的问题。

这个时候我们会有需求，按照当前所经历的项目业务，开发自定义的配置化模块，期望更符合当下的业务体系，提高构建效率。

## 配置化原理

介绍自定义配置化构建之前先来简单介绍一下配置化原理：

- **响应式配置**：通过`generateConfig`生成的配置，在函数内部会生成配置对象对应的观察者对象，然后将通过`proxy`代理过的对象抛出，这个抛出对象会对所有的对象操作进行拦截。

- **操作拦截与通知**：在对`proxy`对象进行对象属性操作的时候，内部的观察者会将所有相关操作比如：`add`, `set`, `delete`按照一定格式形成通知并抛出。

- **规则翻译与执行**：抛出的所有通知会经过`rule`规则函数，通过`rule`将规则进行处理翻译，比如哪种通知可以忽略，哪种通知是需要执行`compiler`操作。

- **编译器与处理器调用**：编译器`compiler`是一个带有状态和内存空间的对象，一般只指定宏观的操作与调度，但是具体的操作执行`compiler`会交给每个`config`对应的处理器`processor`进行执行。
  ![/image/start/middleware-principle.png](/image/start/middleware-principle.png)

## 配置化模块选项

配置化模块选项是一个模块最终交给 engine 时所需要的选项对象，engine 会通过相关的选项进行该模块的注册，扩展处理。

```ts
export interface ModuleOptions<C extends Compiler<any, any>> {
  type: string; // 模块类型
  compiler: new () => C; // 该模块的编译器class
  rule: Rule<C>; // 模块规则函数
  processors: Processor<any, any, any, C>[]; // 模块下的处理器数组
  object?: boolean; // 该模块对应的3D对象是否会作为3D物体
  extend?: <E extends EngineSupport>(engine: E) => void; // 模块对engine的拓展方法
  lifeOrder?: number; // 模块所处的生命周期
  // @Experimental - 实验性的属性
  expand?: {
    // 安装该模块会如何对其他模块进行拓展
    processors: string[] | RegExp;
    command: ProcessorCommands<any, any, any, any>;
  }[];
}
```

## 定义配置

我们通过一个需求案例进行整个自定义配置化流程，比如我们当下有这样一个需求：

- 需要一个木板模块

- 需要场景可以添加删除木板

- 木板可以设置长宽高

- 木板可以设置他的位置，旋转

- 木板还可以设置相关的风格，比如：雅黑，棕黄，奶白

那么我们可以这样定义木板的配置：

```ts
// config.ts
import { SymbolConfig, getSymbolConfig } from "@vis-three/middleware";

export interface BoardConfig extends SymbolConfig {
  parent: string;
  width: number;
  height: number;
  depth: number;
  position: {
    x: number;
    y: number;
    z: number;
  };
  rotation: {
    x: number;
    y: number;
    z: number;
  };
  style: "elegant-black" | "light-brown" | "milky-white";
}

export const getBoardConfig = function: BoardConfig {
  return {
    ... getSymbolConfig(),
    parent: '',
    width: 10,
    height: 10,
    depth: 10,
    position: {
      x: 0,
      y: 0,
      z: 0,
    },
    rotation: {
      x: 0,
      y: 0,
      z: 0,
    },
    style: "light-brown"
  }
}
```

:::tip

- 我们定义的配置一定要继承`symbolConfig`接口，因为`symbolConfig`定义了整个配置化的公共属性，如果你使用的是`js`,记得调用合并`getSymbolConfig`的返回值。

- 在我们书写生成配置的方法时，也就是上面的`getBoardConfig`方法，它所`return`的对象中的属性值，就是我们这个配置的默认值，我们可以根据此特性调整我们的默认生成。

- 一个模块可以定义多个配置。
  :::

## 定义编译器

编译器就是我们整个模块的具体对象的存储空间和调度空间，一般情况下只用继承默认的编译器即可，如果当下模块需要有统一的操作方法，也可以自行对编译器中的方法进行拓展。

```ts
// compiler.ts
import { Mesh } from "three";
import { CompileNotice, Compiler } from "@vis-three/middleware";

export class BoardCompiler extends Compiler<BoardConfig, Mesh> {
  constructor() {
    super();
  }
}
```

::: tip
如果你使用`ts`进行编写，需要输入两个泛型，一个是这个编译器需要处理的所有**配置对象**，和配置对象所对应的**具体真实对象**。
:::

## 定义转换规则

转换规则就是当我们操作响应式配置对象时对所产生的通知进行处理，默认情况下我们可以直接使用默认的规则函数，有具体的转换需要，可以自行在函数内部进行拓展。

```ts
// rule.ts
import { ProxyNotice, Rule } from "@vis-three/middleware";
import { BoardCompiler } from "./Compiler";

export const BoardRule: Rule<BoardCompiler> = function (
  notice: ProxyNotice,
  compiler: BoardCompiler
) {
  // 父级属性跳过，因为父级属性时通过父级对象操作影响的，这里可以忽略编译
  if (notice.key === "parent") {
    return;
  }

  Rule(notice, compiler);
};
```

:::tip
具体的通知内容请查看 API 文档
:::

## 定义配置处理器

配置处理器是我们当前配置在进行属性变更，包括：**增，删，改**时候所对应的具体处理器，处理器是**不会记录状态**，一般情况下也**不会对配置，对象，属性进行存储**，它只会根据传入的相关对象配置属性进行处理。

### 配置类型

配置类型是我们这个处理器需要处理的配置的`type`类型，他会在处理器实例的时候，注入到配置生成的方法中，所以他会覆盖你在`getConfig`时所定义的`type`属性。

::: tip
配置类型建议使用大驼峰命名。
:::

### 命令链与运行时

命令链`commands`是在整一个配置生成到销毁之间也就是运行期间的所遇到的操作和与之对应的处理方法，命令链包括默认命令和自定义命令。

#### 默认命令

默认命令是当定义的配置，和真实对象的属性结构一致时的默认操作，比如：

```js
const config = {
  position: {
    x: 0,
    y: 0,
    z: 0,
  },
};

const mesh = new Mesh();
```

上方的 mesh 对象的`position`属性结构和`config`对象是一致的，这个时候我们可以直接使用默认命令，让处理器自动对操作通知进行处理。

#### 自定义命令

自定义命令是当配置和真实对象的属性结构不一致时所需要进行的自定义命令操作，或者说你有特殊的处理需求的自定义操作，自定义命令包括：**精确自定义命令**和**模糊自定义命令**。

- 精确自定义命令：是通过`commands`命令链精确到对应的属性，并赋予对应的自定义处理方法。

下面是一个限定物体位置 x 在 100 以内的自定义命令。

```js
const commands = {
  set: {
    position: {
      x({ target, config, key, value }) {
        if (value > 100) {
          config.position.x = 100;
        } else {
          target.position.x = value;
          target.updateMatrixWorld();
        }
      },
    },
  },
};
```

- 模糊自定义命令：是通过`commands`命令链的`$reg`列表进行模糊匹配与自定义处理方法。

下面是一个自动更新材质的特殊属性的自定义命令。

```js
const commands = {
  set: {
    $reg: [
      {
        reg: new RegExp("transparent|sizeAttenuation"),
        handler({ target, key, value }) {
          target[key] = value;
          target.needsUpdate = true;
        },
      },
    ],
  },
};
```

:::tip

- 模糊命令是在精确命令没有命中的时候才会执行。

- 模糊自定义命令是一个数组，它是从上往下对数组定义的`reg`进行匹配处理，只要匹配命中就会执行，并不再往下执行。
  :::

### 生成与销毁

生成与销毁是在相关配置加入与移出配置单所对应的操作，它包括对真实对象的初始构建与真实对象的内存销毁方法。

### 案例演示

那么我们上面所列举的需求案例的处理器该如何编写？

```ts
// processor.ts
import { defineProcessor, EngineSupport } from "@vis-three/middleware";
import { Mesh } from "three";
import { BoardCompiler } from "./compiler";
import { getBoardConfig, BoardConfig } from "./config";

const transColor = function (
  style: "elegant-black" | "light-brown" | "milky-white"
) {
  return style === "elegant-black"
    ? "rgb(0, 0, 0)"
    : style === "light-brown"
    ? "rgb(200, 200, 0)"
    : "rgb(255, 255, 255)";
};

const updateGeometry = function ({ config: BoardConfig, target: Mesh }) {
  const newGeometry = new BoxBufferGeometry(
    config.width,
    config.height,
    config.depth
  );
  target.geometry.copy(newGeometry);
  newGeometry.dispose();
};

export default defineProcessor<BoardConfig, Mesh, EngineSupport, BoardCompiler>(
  {
    type: "Board",
    config: getBoardConfig,
    commands: {
      set: {
        width: updateGeometry,
        height: updateGeometry,
        depth: updateGeometry,
        style({ target, value }) {
          target.material.color.setHex(new Color(transColor(value)).getHex());
        },
      },
    },
    create(config, engine) {
      const geometry = new BoxBufferGeometry(
        config.width,
        config.height,
        config.depth
      );

      const material = new MeshBasicMaterial({
        color: transColor(config.style),
      });
      const board = new Mesh(geometry, material);

      board.position.set(
        config.position.x,
        config.position.y,
        config.position.z
      );

      return board;
    },
    dispose(target) {
      target.removeFromParent();
      target.geometry.dispose();
      target.material.dispose();
    },
  }
);
```

:::tip
相关的处理器 API 请查看 API 文档。
:::

## 定义模块

当我们前面的模块成员都准备好时，我们就可以定义模块导出并使用了。

```ts
//module.ts
import { SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import { BoardCompiler } from "./compiler";
import BoardProcessor from "./processor";
import { BoardRule } from "./rule";

export default {
  type: "board",
  object: true,
  compiler: BoardCompiler,
  rule: BoardRule,
  processors: [BoardProcessor],
  lifeOrder: SUPPORT_LIFE_CYCLE.THREE,
};
```

引擎中使用。

```ts
// engine.ts
import { defineEngineSupport， generateConfig } from "@vis-three/middleware";
import BoardModule from "./module";

const engine = defineEngineSupport({
  plugins: [
    //...
  ],
  strategy: [
    //...
  ],
  modules: [BoardModule],
});

const board = generateConfig(CONFIGTYPE.BOARD, {
  width: 20,
  position: {
    y: 24
  }
})
```

### 模块类型

模块的类型`type`是整个模块的命名空间，建议使用**小驼峰**的命名方式。

### 模块声明周期

模块声明周期`lifeOrder`是对应于模块在应用配置单的时候的加载位置，比如我们当前使用`geometry`,`material`,`mesh`这三个模块，由于`mesh`需要使用另外两个模块进行构建，那么`mesh`模块的`lifeOrder`就要在另外两个后面。

:::tip
`lifeOrder `对应的是一个正整数，在加载时会对所有模块进行从小到大排序。
:::

## 模块引擎拓展

模块引擎拓展`extend`是当前模块加入后，会如何影响`engine`，下面举个例子。

我们现在有个需要是可以直接调用`engine`的一个`api`对应的往场景中加入一个木板，那我们可以这样进行拓展。

```ts
//module.ts
import { SUPPORT_LIFE_CYCLE, EngineSupport } from "@vis-three/middleware";
import { BoardCompiler } from "./compiler";
import BoardProcessor from "./processor";
import { BoardRule } from "./rule";

export interface BoardSupportEngine extends EngineSupport {
  addBoard: () => void;
}

export default {
  type: "board",
  object: true,
  compiler: BoardCompiler,
  rule: BoardRule,
  processors: [BoardProcessor],
  lifeOrder: SUPPORT_LIFE_CYCLE.THREE,
  extend(engine: BoardSupportEngine) {
    engine.addBoard = function () {
      const boardConfig = generateConfig(CONFIGTYPE.BOARD);
      const currentSceneConfig = this.getObjectConfig(this.scene);
      this.applyConfig(boardConfig);
      currentSceneConfig.children.push(boardConfig.vid);
    };
  },
};
```

## 模块处理器拓展-experimental

我们还有部分需求是，当我们增加一些模块的时候，希望能够拓展其他配置模块的配置属性和对应的处理方法，这里我们可以使用处理器拓展属性。

举个例子，比如我们有个辅助模块，当辅助模块应用之后我们希望给对应的模块配置加上辅助模块的配置标识，方便快速查找这个模块的对应辅助模块,但是我们不需要对该辅助操作进行相关响应。

```ts
export default {
  type: "helper",
  expand: [
    {
      processors: ["Board", "Mesh"],
      command: {
        add: {
          helper() {},
        },
        set: {
          helper() {},
        },
      },
    },
  ],
};
```

:::warning
此 API 目前属于试验阶段。
:::

## 全局防抖器

全局防抖器是一个增加额外处理线路的工具，主要是在区别于`lifeOrder`加载时间线的使用，目的是用来兼容无法通过`lifeOrder`区分前后的属性功能的辅助工具。

什么情况下会用到防抖器呢？也就是你无法确定该功能需要对象的加载时间，或者说是模块与模块间`lifeOrder`确定后，与模块内属性所需要的资源或者对象加载需要不符合的时候。

举个例子，顺便来看看防抖器的工作原理。

只要是符合`three.js`的`Object3D`对象，都有`children`这个属性，我们在划分模块的时候，划分了`mesh`、`line`、`light`、`scene`等等的物体模块，按照`three.js`的功能来讲，只要是物体模块，都能够往`children`对象下添加物体，而且是没有限制的，也就是在这个情况下，我们对于物体模块的`children`是无法推测出模块的先后顺序，这个时候我们就要用到防抖器了。

![/image/start/global-anti-shake.png](/image/start/global-anti-shake.png)

### 调用激活

一般情况下，都是在`processor`编写中，对需要的属性进行防抖兼容，拿上面`children`举例。我们只要调用`globalAntiShake.exec`就会自动激活防抖器开始工作。

```ts
import { globalAntiShake } from "@vis-three/middleware";

const commands = {
  add: {
    children({ target, config, value, engine }) {
      globalAntiShake.exec((finish) => {
        const childrenConfig = engine.getConfigBySymbol(value) as ObjectConfig;
        if (!childrenConfig) {
          if (finish) {
            console.warn(` can not foud object config in engine: ${value}`);
          }
          return false;
        }

        const childrenObject = engine.compilerManager.getObjectfromModules(
          OBJECTMODULE,
          value
        ) as Object3D;

        if (!childrenObject) {
          if (finish) {
            console.warn(`can not found this vid in engine: ${value}.`);
          }
          return false;
        }

        target.add(childrenObject);

        childrenObject.updateMatrixWorld(true);

        return true;
      });
    },
  },
};
```

### 执行与自动延迟

调用`exec`后，`globalAntiShake`会阻塞执行一次里面的方法，如果执行后返回的结果为`true`，这个方法就已经完成了，不会加入后面的过程。

如果执行为`false`，`globalAntiShake`会将该方法缓存进一个`list`中，等待下一个`timer`周期开始时再按顺序执行。

### 重试与自动排序

在`timer`按顺序执行缓存的方法中，如果这个方法在此次执行返回为`true`，就会被移出缓存`list`。在一个周期完成时，剩下的方法会形成新的`list`进入下一个`timer`周期。

### 失败与结束

在一个`timer`周期中，只要有一个方法的返回为`true`，`globalAntiShake`就会重新组织未完成的方法进入下一个`timer`周期。

如果一个`timer`周期中所有的方法返回值都是`false`，或者说已经完成了所有方法，`globalAntiShake`就会结束循环。

:::tip
`AntiShake`的 API 请查看 API 文档。
:::

## 编译事件总线

`vis-three`采用的是非侵入式的编程方式，尽可能的不会影响改变`three.js`对象的方法属性，我们知道，`three.js`的大多数对象都继承了`three.js`内部的`EventDispatcher`也就是事件派发器。这个事件派发器能够让我们直接通过`three.js`对象去发布相关事件。

但是`vis-three`特别是内部的`middleware`配置化模块的方法和事件派发都不会去使用`three.js`对象的事件派发器。这是为什么？

- **很容易造成事件冲突**：如果插件，配置化模块，运行时的各种方法都去使用同一个事件派发器，当模块插件功能复制起来之后，命名问题是一个很头疼的问题。

- **不能区分运行期与编译期事件**：如果使用同一个事件派发器去调度所有的发布订阅方法，什么事件是运行期间的事件，什么事件又是编译期的事件？这个不好区分。

- **不是所有的`three.js`对象都继承了事件派发器**：`three.js`有很多的类没有继承事件派发器，这个时候该怎么办。

`@vis-three/middleware`模块提供了事件总线的类`Bus`，这个类可以不入侵原本的对象，通过外链的形式发布订阅各种事件方法。

`@vis-three/middleware`内部预置了编译期的事件总线实例`compilerEvent`，将所有配置化模块需要的发布订阅通过该实例进行发布，对原本的对象进行了很好的隔离。

### compiler 自动发布事件

如果我们继承了默认的`compiler`类，在配置化运行期间的所有操作都会通过`compilerEvent`发布相关的事件。我们只要按照需要订阅即可。

下面是一个只要该 mesh 材质配置做出变化，mesh 的 x 位置会自动+1 的示例。

```ts
import { Mesh } from "three";
import { Bus, COMPILER_EVENT } from "@vis-three/middleware";

export default defineProcessor({
  create(config, engine) {
    const material = engine.getObjectBySymbol(config.material);
    const mesh = new Mesh(undefiend, material);

    Bus.compilerEvent.on(material, COMPILER_EVENT.UPDATE, () => {
      mesh.position.x += 1;
    });

    return mesh;
  },
});
```

:::tip
默认`compiler`发布的事件请查看 API 文档。
:::

### 自定义事件派发

在有些情况下，我们希望在自己所写的配置化模块中，自己根据需要发布一些事件。

```ts
import { Mesh } from "three";
import { Bus, COMPILER_EVENT } from "@vis-three/middleware";

export default defineProcessor({
  commands: {
    set: {
      position: {
        x({ target, value }) {
          Bus.compilerEvent.emit(target, "position-dispatch", {
            key: "x",
            value,
          });
        },
        y({ target, value }) {
          Bus.compilerEvent.emit(target, "position-dispatch", {
            key: "y",
            value,
          });
        },
        z({ target, value }) {
          Bus.compilerEvent.emit(target, "position-dispatch", {
            key: "z",
            value,
          });
        },
      },
    },
  },
});

// 使用
Bus.compilerEvent.on(target, "mesh-dispatch", (event) => {
  console.log(event);
});
```
