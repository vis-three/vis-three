# 自定义配置化模型

## 案例引导

我们通过一个需求案例来属性整个自定义配置化模型流程，比如我们当下有这样一个需求：

- 需要一个木板配置模块

- 需要场景可以添加删除木板

- 木板有三种尺寸：小、中、大

- 木板还可以设置相关的颜色风格，比如：雅黑，棕黄，奶白

- 木板可以设置他的位置，旋转

## 配置化模型选项

```ts
export interface ModelOption<
  Cf extends BasicConfig = BasicConfig,
  Obj extends object = object,
  Ctx extends object = object,
  Srd extends object = object,
  Eg extends EngineSupport = EngineSupport,
  Cpl extends Compiler<Eg> = Compiler<Eg>
> {
  /**模型类型 */
  type: string;
  /**模型的配置结构 */
  config: () => Cf;
  /**模型实例的共享属性方法 */
  shared?: Srd;
  /**模型实例的特有属性方法 */
  context?: (
    this: Model<Cf, Obj, Eg, Cpl> & Readonly<Srd> & Ctx,
    params: {
      model: Model<Cf, Obj, Eg, Cpl> & Readonly<Srd> & Ctx;
    }
  ) => Ctx;
  /**模型的命令链 */
  commands?: ModelCommands<
    Cf,
    Obj,
    Eg,
    Cpl,
    Model<Cf, Obj, Eg, Cpl> & Readonly<Srd> & Ctx
  >;
  /**模型的生成方法 */
  create: (
    this: Model<Cf, Obj, Eg, Cpl> & Readonly<Srd> & Ctx,
    params: {
      model: Model<Cf, Obj, Eg, Cpl> & Readonly<Srd> & Ctx;
      config: Cf;
      engine: Eg;
      compiler: Cpl;
    }
  ) => Obj;
  /**模型的销毁方法 */
  dispose: (
    this: Model<Cf, Obj, Eg, Cpl> & Readonly<Srd> & Ctx,
    params: {
      model: Model<Cf, Obj, Eg, Cpl> & Readonly<Srd> & Ctx;
      target: Obj;
      puppet: Obj;
      config: Cf;
      engine: Eg;
      compiler: Cpl;
    }
  ) => void;
  /**该模型应用时对其他模型产生的扩展 */
  expand?: [
    {
      models: string | string[] | RegExp;
      config: () => object;
      commands: ModelCommands<any, any, any, any, any>;
    }
  ];
}
```

## 定义木板模型

木板模型实际上就是 3D 的配置化模型，在这个模型内处理各种配置对应的 3D 物体的变化，包括出生、销毁、更改等等。

## 定义模型配置结构

定义模型配置结构可以根据我们的业务需要进行。

```ts
// config.ts
import { BasicConfig, getBasicConfig } from "@vis-three/tdcm";

export interface BoardConfig extends BasicConfig {
  parent: string;// 木板的父级存储
  size: "large" | "medium" | 'small'; // 木板的尺寸
  style: "elegant-black" | "light-brown" | "milky-white"; // 木板的风格
  position: { // 木板的位置
    x: number;
    y: number;
    z: number;
  };
  rotation: {// 木板的旋转
    x: number;
    y: number;
    z: number;
  };
}

export const getBoardConfig = function: BoardConfig {
  return {
    ... getBasicConfig(),
    parent: '',
    size: 'medium',
    style: "light-brown",
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
  }
}
```

:::tip

- 我们定义的配置一定要继承`BasicConfig`接口，因为`BasicConfig`定义了整个配置化的公共属性，如果你使用的是`js`,记得调用合并`getBasicConfig`的返回值。

- 在我们书写生成配置的方法时，也就是上面的`getBoardConfig`方法，它所`return`的对象中的属性值，就是我们这个配置的默认值，我们可以根据此特性调整我们的默认生成。
  :::

## 定义配置模型

定义配置模型，我们可以通过`defineModel`这个方法进行：

```ts
import { defineModel } from "@vis-three/tdcm";
import { getBoardConfig } from "./config.ts";
import { Mesh, BoxGeometry } from "three";

export default defineModel<
  BoardConfig,
  Mesh,
  {},
  {
    changeSize: (size: string, target: Mesh) => void;
    transColor: (style: string) => string;
  }
>({
  type: "Board",
  config: getBoardConfig,
  shared: {
    changeSize(size, target) {
      const newGeometry = new BoxGeometry(
        size === "large" ? 100 : size === "medium" ? 80 : 50,
        30,
        size === "large" ? 50 : size === "medium" ? 40 : 30
      );

      target.geometry.copy(newGeometry);
      newGeometry.dispose();
    },
    transColor(style) {
      return style === "elegant-black"
        ? "rgb(0, 0, 0)"
        : style === "light-brown"
        ? "rgb(200, 200, 0)"
        : "rgb(255, 255, 255)";
    },
  },
  commands: {
    set: {
      size({ model, target, value }) {
        model.chageSize(value, target);
      },
      style({ model, target, value }) {
        target.material.color.setHex(
          new Color(model.transColor(value)).getHex()
        );
      },
    },
  },
  create({ model, config, engine }) {
    const geometry = new BoxGeometry();

    const material = new MeshBasicMaterial({
      color: model.transColor(config.style),
    });
    const board = new Mesh(geometry, material);

    model.changeSize(config.size, board);

    board.position.set(config.position.x, config.position.y, config.position.z);
    board.rotation.set(config.rotation.x, config.rotation.y, config.rotation.z);

    return board;
  },
  dispose(target) {
    target.removeFromParent();
    target.geometry.dispose();
    target.material.dispose();
  },
});
```

## 配置类型

配置类型是我们这个处理器需要处理的配置的`type`类型，他会在处理器实例的时候，注入到配置生成的方法中，所以他会覆盖你在`getConfig`时所定义的`type`属性。

::: tip
配置类型建议使用大驼峰命名。
:::

## 共享属性方法

共享的属性方法我们可以放到`shared`属性中，该属性中的方法可以在`create`, `dispose`, `commands`方法中通过解构的`model`访问。`shared`中的属性方法，在`model`中使用的时候是只读的，不能进行修改。

```ts
defineModel({
  shared: {
    initPositon: {
      x: 10,
      y: 10,
      z: 10,
    },
    setInitPosition(target) {
      target.position.set(
        this.initPosition.x,
        this.initPosition.y,
        this.initPosition.z
      );
    },
  },
  commands: {
    position({ model, target, value }) {
      if (value.x > 100) {
        target.position.x = model.initPosition.x;
      } else {
        target.position.x = value.x;
      }

      if (value.y > 200) {
        model.setInitPosition(target);
      }
    },
  },
});
```

:::tip
如果您想在共享的属性方法中访问其他的共享属性方法，而这些属性方法没有通过参数传入，可以通过`this`获取。
:::

## 实例属性方法

实例的属性放啊我们可以放到`context`属性中，该属性是一个`function`，可以在构造器访问整个`model`对象，获取各种属性方法。他们是可以进行修改的，而且一个实例一份，不影响其他实例。

```ts
defineModel({
  context({ model }) {
    return {
      updateVersion: 0,
      updateMatrix: () => {
        if (model.updateVersion >= 10) {
          return;
        }

        model.puppet.updateMatrixWorld();
        model.updateVersion += 1;
      },
    };
  },
});
```

## 命令链与运行时

命令链`commands`是在整一个配置生成到销毁之间也就是运行期间的所遇到的操作和与之对应的处理方法，命令链包括默认命令和自定义命令。

### 默认命令

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
/**
 * mesh: {
 *  position: {
 *    x: 0,
 *    y: 0,
 *    z: 0
 *  }
 * }
 */
```

上方的 mesh 对象的`position`属性结构和`config`对象是一致的，这个时候我们可以直接使用默认命令，让处理器自动对操作通知进行处理。

### 自定义命令

自定义命令是当配置和真实对象的属性结构不一致时所需要进行的自定义命令操作，或者说你有特殊的处理需求的自定义操作。自定义命令包括：精确自定义命令和模糊自定义命令。

**精确自定义命令**：是通过`commands`命令链精确到对应的属性，并赋予对应的自定义处理方法。

下面是一个限定物体位置 x 在 100 以内的自定义命令。

```js
defineModel({
  commands: {
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
        y() {},
      },
      rotation() {},
    },
  },
});
```

**模糊自定义命令**：是通过`commands`命令链的`$reg`列表进行模糊匹配与自定义处理方法。

下面是一个自动更新材质的特殊属性的自定义命令。

```js
defineModel({
  commands: {
    set: {
      color() {},
      map() {},
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
  },
});
```

:::tip

- 模糊命令是在精确命令没有命中的时候才会执行。

- 模糊自定义命令是一个数组，它是从上往下对数组定义的`reg`进行匹配处理，只要匹配命中就会执行，并不再往下执行。
  :::

## 生成与销毁

生成`create`与销毁`dispose`是在相关配置加入与移出配置单所对应的操作，它包括对真实对象的初始构建与真实对象的内存销毁方法。

## 模型拓展

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

## 模块触发

## 异步执行

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

## 模型事件

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
Bus.compilerEvent.on(target, "position-dispatch", (event) => {
  console.log(event);
});
```
