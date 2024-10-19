# 编译器

配置化模块的编译器，提供了统一的模型处理`api`，还有相关的存储查找功能。

## 示例

```ts
class MyCompiler extends Compiler {
  constructor(params) {
    super(params);
  }

  renderAllModel() {}

  // @override
  add() {}
}

export default defineModule({
  compiler: MyCompiler,
});
```

## 构造

- **类型**

```ts
/** 编译器参数 */
export interface CompilerParameters<E extends EngineSupport = EngineSupport> {
  /**所属的模块类型 */
  module: string;
  /**可用的配置化模型 */
  models: ModelOption<any, any, any, any, E>[];
}
```

- **示例**

```ts
const compiler = new MyCompiler({ module: "mesh", models: [MeshModel] });
```

## 属性

### MODULE

该编译器的模块类型。

- **类型**

```ts
string;
```

### builders

该编译器下的模型构建对象合集。

- **类型**

```ts
Map<string, Builder<E, Compiler<E>>>;
```

### target

该编译器的编译目标对象。

- **类型**

```ts
Record<string, BasicConfig>;
```

### map

该编译器的编译模型映射缓存。

- **类型**

```ts
Map<BasicConfig["vid"], Model<any, any, E>>;
```

### symbolMap

该编译器的最终编译物体与物体标识的映射缓存。

- **类型**

```ts
WeakMap<Model<any, any, E, this>["puppet"], BasicConfig["vid"]>;
```

### engine

该编译器所使用的`engine`。

- **类型**

```ts
E extends EngineSupport = EngineSupport
```

## 方法

### useEngine

- **详情**

```ts
/**
 * 使用引擎
 * @param engine 继承于EngineSupport的engine
 * @returns this
 */
useEngine(engine: E): this
```

- **示例**

```ts
const compiler = new Compiler({ module: "mesh", models: [] });

compiler.useEngine(new EngineSupport());
```

### setTarget

- **详情**

```ts
/**
 * 设置配置化编译目标
 * @param target 配置化编译对象结构
 * @returns this
 */
setTarget(target: Record<string, BasicConfig>): this
```

- **示例**

```ts
const compiler = new Compiler({ module: "mesh", models: [] });
```

### add

- **详情**

```ts
/**
 * 编译操作添加
 * @param config 添加的配置
 * @returns 该配置对应的模型puppet或者空
 */
add(config: BasicConfig): any | null
```

- **示例**

```ts
const compiler = new Compiler({ module: "mesh", models: [] });
```

### remove

- **详情**

```ts
/**
 * 编译操作移除
 * @param config 移除的配置
 * @returns this
 */
remove(config: BasicConfig): this
```

- **示例**

```ts
const compiler = new Compiler({ module: "mesh", models: [] });
```

### cover

- **详情**

```ts
/**
 * 编译操作覆盖
 * @param config 覆盖的配置
 * @returns this
 */
cover(config: BasicConfig): this
```

- **示例**

```ts
const compiler = new Compiler({ module: "mesh", models: [] });
```

### compile

- **详情**

```ts
/**
 * 编译操作运行时的编译处理
 * @param vid 配置标识
 * @param notice 运行时的操作通知
 * @returns this
 */
compile(vid: BasicConfig["vid"], notice: CtnNotice): this
```

- **示例**

```ts
const compiler = new Compiler({ module: "mesh", models: [] });
```

### compileAll

- **详情**

```ts
/**
 * 编译该实例目标下所有的配置
 * @returns this
 */
compileAll(): this
```

- **示例**

```ts
const compiler = new Compiler({ module: "mesh", models: [] });
```

### dispose

- **详情**

```ts
/**
 * 该编译器的销毁方法
 * @returns this
 */
dispose(): this
```

- **示例**

```ts
const compiler = new Compiler({ module: "mesh", models: [] });
```

### getObjectSymbol

- **详情**

```ts
/**
 * 获取一个对象的标识
 * @param object 物体对象
 * @returns vid |null
 */
getObjectSymbol(object: object): string | null
```

- **示例**

```ts
const compiler = new Compiler({ module: "mesh", models: [] });
```

### getObjectBySymbol

- **详情**

```ts
/**
 * 通过对象标识获取物体对象
 * @param vid 对象标识
 * @returns 物体对象 | null
 */
getObjectBySymbol(vid: string): any | null
```

- **示例**

```ts
const compiler = new Compiler({ module: "mesh", models: [] });
```

### getModelBySymbol

- **详情**

```ts
/**
 * 通过对象标识获取配置化模型
 * @param vid 对象标识
 * @returns 配置化模型 | null
 */
getModelBySymbol(vid: string): Model<any, any, E> | null
```

- **示例**

```ts
const compiler = new Compiler({ module: "mesh", models: [] });
```

### useModel

- **详情**

```ts
/**
 * 使用一个配置化模型
 * @param option 配置化模型选项
 * @param callback 使用后的回调函数
 * @returns this
 */
useModel(option: ModelOption<any, any, any, any, E>, callback?: (compiler: this) => void): this
```

- **示例**

```ts
const compiler = new Compiler({ module: "mesh", models: [] });
```
