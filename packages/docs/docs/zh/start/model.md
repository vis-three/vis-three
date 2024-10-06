# 自定义配置化模型

## 配置化模型介绍

配置化模型是将配置与`3D`对象联系起来的模型对象，每当配置变更，或者新增、删除配置时，与之对应的 `3D` 对象都会完成真实的操作或者对应的业务功能。在响应配置变化的基础上，还集成了许多额外的便利功能去增强配置化的优势。

## 案例引导

我们通过一个需求案例来熟悉整个自定义配置化模型流程，比如我们当下有这样一个需求：

- 需要一个木板配置模块

- 需要场景可以添加删除木板

- 木板有三种尺寸：小、中、大

- 木板还可以设置相关的颜色风格，比如：雅黑，棕黄，奶白

- 木板可以设置他的位置，旋转

## 配置化模型选项

配置化模型选项是最终定义这个模型的选项单，可以使用下面的`defineModel`进行定义。

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
  dispose({ target }) {
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

```ts
export default defineModel<BoardConfig, Mesh>({
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
  dispose({ target }) {
    target.removeFromParent();
    target.geometry.dispose();
    target.material.dispose();
  },
});
```

:::tip
在生成方法中需要将生成的目标物体进行`return`。
:::

## 模型拓展

我们还有部分需求是，当我们增加一些模块的时候，希望能够拓展其他配置模块的配置属性和对应的处理方法，这里我们可以在定义模型时使用拓展属性。

举个例子，比如我们有个辅助模块，当辅助模块应用之后我们希望给对应的模块配置加上辅助模块的配置标识，方便快速查找这个模块的对应辅助模块,但是我们不需要对该辅助操作进行相关响应。

```ts
export default defineModel({
  type: "helper",
  expand: [
    {
      // 这个模型会去影响哪些模型配置
      models: new RegExp("Mesh|Light|Line|Points|Group|Object3D"),
      //会对这些模型配置做进行什么属性的更新
      config: () => ({
        helper: "",
      }),
      // 新增的配置对应的命令链
      commands: {
        add: {
          helper() {},
        },
        set: {
          helper() {},
        },
      },
    },
  ],
});
```

## 模块触发器

模块触发器是当规定的相关模块加载完成后，统一触发的一种钩子方法。目前配置化层的模块触发器内置了一个物体模块触发器，当所有的物体模块加载完成后，会触发这个触发器事先添加的方法函数。

下面是一个在`skinnedMesh`生成时，会等待所有物体模块执行完成后，进行骨架的绑定。

```ts
export default defineModel({
  create({ model, config }) {
    const skinnedMesh = new SkinnedMesh();

    model.toTrigger("object", () => {
      if (config.bindMatrix.length) {
        const matrix = new Matrix4();
        matrix.elements = (<number[]>[]).concat(
          config.bindMatrix
        ) as unknown as Matrix4Tuple;
        skinnedMesh.bind(skeleton, matrix);
      } else {
        skinnedMesh.bind(skeleton, skinnedMesh.matrixWorld);
      }

      return false;
    });

    return skinnedMesh;
  },
});
```

## 异步执行

异步执行是一个增加额外处理线路的工具，主要是在区别于`lifeOrder`加载时间线的使用，目的是用来兼容无法通过`lifeOrder`区分前后的属性功能的辅助工具。

什么情况下会用到异步执行呢？无法确定该功能需要对象的加载时间，或者说是模块与模块间`lifeOrder`确定后，与模块内属性所需要的资源或者对象加载需要不符合的时候。

### 调用激活

我们可以调用`model.toAsync`这个方法，就会自动激活异步执行开始工作。

```ts
export default defineModel({
  commands: {
    add: {
      children({ model, target, config, value, engine }) {
        model.toAsync((finish) => {
          const childrenConfig = engine.getConfigBySymbol(
            value
          ) as ObjectConfig;
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
  },
});
```

### 执行与自动延迟

调用` model.toAsync`后，会同步执行一次里面的方法，如果执行后返回的结果为`true`，这个方法就已经完成了，不会加入异步队列进行后面的过程。

如果执行返回为`false`，该方法就会缓存加入异步队列中，等待下一个`timer`周期开始时再按顺序执行。

### 重试与自动排序

在`timer`按顺序执行异步队列的方法中，如果这个方法在此次执行返回为`true`，就会被移出异步队列。在一个周期完成时，剩下的方法会形成新的异步队列进入下一个`timer`周期。

### 失败与结束

在一个`timer`周期中，只要有一个方法的返回为`true`，异步执行就会重新组织未完成的方法进入下一个`timer`周期。

如果一个`timer`周期中所有的方法返回值都是`false`，或者说已经完成了所有方法，异步执行就会结束。

## 模型事件

模型在执行对应的配置转为 3D 对象业务操作时，会形成相关的操作事件，这能够让我们完成一些监听同步变更的业务。我们可以通过`model.on`，`model.off`，去进行相关模型事件的新增和销毁。

比如在`PathGeometry`的相关`path`配置变化的时候，我们怎么去更新`PathGeometry`让他进行一个同步的运算：

```ts
export default defineModel({
  type: "PathGeometry",
  config: () => ({
    path: "",
    divisions: 128,
    space: false,
  }),
  context() {
    return {
      pathEvent: () => {},
    };
  },
  create({ model, config, engine }) {
    const path =
      (engine.compilerManager.getObjectFromModule(
        MODULE_TYPE.PATH,
        config.path
      ) as Path) || undefined;

    const geometry = new PathGeometry(path, config.divisions, config.space);

    if (path) {
      model.pathEvent = () => {
        config.path = config.path;
      };
      model.toModel(config.path)?.on(MODEL_EVENT.COMPILED_UPDATE, pathEvent);
    }

    return PathGeometry;
  },
  dispose({ model, config, target }) {
    model
      .toModel(config.path)
      ?.off(MODEL_EVENT.COMPILED_UPDATE, model.pathEvent);

    target.dispose();
  },
});
```

### 配置更新事件

配置更新事件时在我们`config`进行变化后就会触发的事件，很多时候`config`的变化并不一定会去触发`3D`对象的业务更新，但是这个变化又有对应的业务需求，我们可以通过`MODEL_EVENT.NOTICED`进行。

### 物体编译事件

物体编译事件是在我们`config`变化，进而影响到`3D`对象更新所触发的事件，它包括：

- `MODEL_EVENT.COMPILED_ADD`: 配置加入后的事件。
- `MODEL_EVENT.COMPILED_REMOVE`: 配置被移除后的事件。
- `MODEL_EVENT.COMPILED_ATTR`: 配置的某一个属性更新后的事件名前置，比如我们物体的`position.x`进行了更新，可以这样进行监听`${MODEL_EVENT.COMPILED_ATTR}:position.x`
- `MODEL_EVENT.COMPILED_UPDATE`: 配置编译后的事件，所有配置属性更新都会触发。
- `MODEL_EVENT.COMPILED`:配置编译后的事件，包括前面的四个事件触发后，都会触发这个。

## 模型继承

当我们有很多模型存在公共的属性，方法，命令链等的时候，我们可以通过`defineModel.extend`定义一个公共的模型定义函数，将公共的属性方法等内容进行一个提取，将最终的配置化模型进行一个继承定义，进行一个便捷开发和优化。

比如我们可以定义一个公共的木板定义函数，这个函数里面有公共的位移、选择、销毁方法：

```ts
const defineBoardModel = defineModel.extend({
  shared: {
    syncPostion(target, value) {
      target.position.set(value, value, value);
    },
  },
  commands: {
    set: {
      position({ model, value, target }) {
        model.syncPostion(target, value);
      },
      rotation({ value, target }) {
        target.rotation.x = value;
      },
    },
  },
  dispose({ target }) {
    target.removeFromParent();
    target.material.dispose();
    target.geometry.dispose();
  },
});
```

后面我们就可以通过这个方法去定义相关的木板配置化模型：

```ts
const WoodenModel = defineBoardModel((boardModel) => {
  type: "Wooden",
  create({model, config}) {

    const wooden = new Mesh(new BoxGeometry(100, 50, 20))

    model.syncPosition(wooden, config.position.x)
    // ...
    return wooden
  },
  dispose({target}) {
    boardModel.dispose({target});
    target.parent.position.set(0, 0, 0)
  }
});
```

:::tip

- 通过继承模型方法定义的模型，对于`create`，`dispose`属性不会直接进行继承，而是提供了一种比较灵活的方式，按照需要进行方法的调用。

- 其他的属性都可以通过继承进行合并，如果父级的属性与当下的需求属性冲突，可以进行覆盖。

```ts
const WoodenModel = defineBoardModel((boardModel) => {
  type: "Wooden",
  commands: {
    set: {
      position() {
        // do...
      }
    }
  }
});
```

:::
