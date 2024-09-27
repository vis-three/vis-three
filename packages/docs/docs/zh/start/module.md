# 自定义配置化模块

## 配置化模块介绍

配置化模块是配置化开发模式的基准或分组，它会对一批类似的配置化模型进行统一的管理。同时它也是配置存储的单位，查找的单位。

> 本文使用的是 ts 进行插件编写。

## 案例引导

我们通过一个需求案例来实现配置化模块的构建，比如我们当下有这样一个需求：

- 我们有很多个板件类别，有木板，钢板，铝塑板

- 我们有很多个钉子类别，有长钉，螺纹钉，大头钉

## 配置化模块选项

下面是模块的相关选项：

```ts
export interface ModuleOptions<
  E extends EngineSupport = EngineSupport,
  O extends Compiler<E> = Compiler<E>
> {
  /** 模块类型 */
  type: string;
  /** 模块的编译器 */
  compiler?: new (...args) => O;
  /** 模块的编译规则 */
  rule?: Rule[];
  /** 模块所包含的模型 */
  models: ModelOption<any, any, any, any, E, O>[];
  /** 是否为一个物体模块 */
  object?: boolean;
  /** 安装该模块对engine产生的扩展 */
  extend?: (engine: E) => void;
  /** 模块的生命周期顺序 */
  lifeOrder?: number;
}
```

## 定义配置化模块

在开发过程中我们可以通过`defineModule`进行一个模块的定义：

```ts
// module/borad.ts
import { defineModule, SUPPORT_LIFE_CYCLE } from "@vis-three/tdcm";
import rule from "./rule.ts";

export default defineModule({
  type: "board",
  object: true,
  rule,
  models: [WoodenModel, SteelModel, AluminumPlasticModel],
  lifeOrder: SUPPORT_LIFE_CYCLE.THREE,
});
```

```ts
// module/nail.ts
import { defineModule, SUPPORT_LIFE_CYCLE } from "@vis-three/tdcm";

export default defineModule({
  type: "nail",
  object: true,
  models: [LongModel, ThreadenModel, LargeHeadModel],
  lifeOrder: SUPPORT_LIFE_CYCLE.THREE,
});
```

## 模块类型

模块的类型`type`是整个模块的命名空间，建议使用**小驼峰**的命名方式。

## 物体模块

物体模块`object`是用来标记这个模块是否属于 3D 物体类型，他会被计入默认的物体模块触发器中。

## 模块声明周期

模块声明周期`lifeOrder`是对应于模块在应用配置单的时候的加载位置，比如我们当前使用`geometry`,`material`,`mesh`这三个模块，由于`mesh`需要使用另外两个模块进行构建，那么`mesh`模块的`lifeOrder`就要在另外两个后面。

:::tip
`lifeOrder `对应的是一个正整数，在加载时会对所有模块进行从小到大排序。
:::

## 模块引擎拓展

模块引擎拓展`extend`是当前模块加入后，会如何影响`engine`，相当于是一种插件的功能，下面举个例子。

我们现在有个需要是可以直接调用`engine`的一个`api`对应的往场景中加入一个木板，那我们可以这样进行拓展。

```ts
//module.ts
import {
  defineModule,
  SUPPORT_LIFE_CYCLE,
  EngineSupport,
} from "@vis-three/tdcm";

export interface BoardSupportEngine extends EngineSupport {
  addWooden: () => void;
}

export default defineModule<BoardSupportEngine>({
  type: "board",
  object: true,
  models: [],
  lifeOrder: SUPPORT_LIFE_CYCLE.THREE,
  extend(engine) {
    engine.addWooden = function () {
      const boardConfig = generateConfig(CONFIG_TYPE.WOODEN);
      const currentSceneConfig = this.getObjectConfig(this.scene);
      this.applyConfig(boardConfig);
      currentSceneConfig.children.push(boardConfig.vid);
    };
  },
});
```

## 定义编译器

编译器是将配置转化成相应 3D 物体场景的主要执行对象，它会存储和管理该模块下的所有模型，并能够对多个模型进行统一的操作和处理。

一般情况下我们在定义模块时不传编译器属性，模块会自动使用默认的编译器进行。如果当下模块需要有统一的操作方法，也可以自行对编译器中的方法进行拓展。

```ts
// compiler.ts
import { Compiler, CompilerParameters } from "@vis-three/tdcm";

export class BoardCompiler extends Compiler<BoardSupportEngine> {
  constructor(params: CompilerParameters) {
    super(params);
  }

  updateAllBoard() {
    // ...
  }

  updateWoodenBoard() {
    // ...
  }
}
```

## 定义转换规则

转换规则就是当我们操作响应式配置对象时对所产生的通知进行处理，默认情况下我们可以不传，模块会直接使用默认的规则函数，有具体的转换需要，可以自行重新定义转换规则。

比如在该案例中我们的 parent 配置不需要当下的模块进行处理，只需要进行一个配置的信息存储，我们可以这样进行：

```ts
// rule.ts
import { DEFAULT_RULE, defineRule } from "@vis-three/tdcm";
import { BoardCompiler } from "./Compiler";

export default defineRule([
  DEFAULT_RULE.SYMBOL_VALIDATOR,
  function (input) {
    return input.key !== "parent";
  },
  DEFAULT_RULE.OPERATE_ADD,
  DEFAULT_RULE.OPERATE_DELETE,
  DEFAULT_RULE.OPERATE_COVER,
  DEFAULT_RULE.OPERATE_COMPILE,
]);
```

:::tip

- `rule` 使用的是规则链进行相关的规则校验，只有当前一个规则校验返回`true`时，才会继续向下执行。

- `@vis-three/tdcm`内部预置了一套基本的规则`DEFAULT_RULE`，如果不传 `rule` 的情况下，会自动使用此套规则进行。
  :::

## 模块的使用

```ts
// engine.ts
import { defineEngineSupport， generateConfig } from "@vis-three/tdcm";
import BoardModule from "./module/board.ts";
import nailModule from "./module/nail.ts";

const engine = defineEngineSupport({
  plugins: [
    //...
  ],
  strategy: [
    //...
  ],
  modules: [BoardModule ,nailModule],
});

const board = generateConfig(CONFIG_TYPE.WOODEN, {
  size: 'small',
  position: {
    y: 24
  }
})
```
