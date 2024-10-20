# 配置化模型对象

配置化模型的公共对象，提供了配置化模型工作中需要用到相关`api`。

## 属性

### puppet

该配置化模型所影响的最终目标对象。

- **类型**

```ts
P extends object = object;
```

### config

该配置化模型对应的配置。

- **类型**

```ts
C extends BasicConfig = BasicConfig;
```

### engine

该配置化模型使用的引擎。

- **类型**

```ts
E extends EngineSupport = EngineSupport;
```

### compiler

该配置化模型使用的编译器。

- **类型**

```ts
O extends Compiler<E> = Compiler<E>;
```

### commands

该配置化模型所使用的命令链。

- **类型**

```ts
ModelCommands<C, P, E, O>;
```

## 方法

### createPuppet

- **详情**

```ts
/**
 * 该配置化模型的对象生成方法。对应defineModel.create
 * @param this model本身
 * @param params 参数对象
 * params.model model本身
 * params.config model对应的配置
 * params.engine model使用的enigne
 * params.compiler model使用的compiler
 * @returns puppet 通过配置单生成的目标对象
 */
createPuppet: (
  this: any,
  params: { model: any; config: C; engine: E; compiler: O }
) => P;
```

### disposePuppet

- **详情**

```ts
/**
 * 该配置化模型的对象销毁方法。对应defineModel.dispose
 * @param this model本身
 * @param params 参数对象
 * params.model model本身
 * params.target model.puppet
 * params.puppet model.puppet
 * params.config model对应的配置
 * params.engine model使用的enigne
 * params.compiler model使用的compiler
 */
disposePuppet: (
  this: any,
  params: { model: any; target: P; puppet: P; config: C; engine: E; compiler: O;}
) => void;
```

### create

- **详情**

```ts
/**
 * 模型生成方法内部会调用createPuppet
 */
create(): void
```

### dispose

- **详情**

```ts
/**
 * 模型销毁方法内部会调用disposePuppet
 */
dispose(): void
```

### toConfig

- **详情**

```ts
/**
 * 转化为目标配置
 * @param vid vid标识
 * @returns Config | null
 */
toConfig<CO extends BasicConfig>(vid: string): CO | null
```

### toModel

- **详情**

```ts
/**
 * 转化为目标模型
 * @param vid vid标识或者 目标对象
 * @returns model | null
 */
toModel<MO extends Model<any, any, any>>(vid: string | object): MO | null
```

### toObject

- **详情**

```ts
/**
 * 转化为目标物体
 * @param vid vid标识
 * @returns object
 */
toObject<OB extends object>(vid: string): OB
```

### toPuppet

- **详情**

```ts
/**
 * 转化为目标物体
 * @param vid vid标识
 * @returns object
 */
toPuppet<OB extends object>(vid: string): OB
```

### toAsync

- **详情**

```ts
/**
 * 转化为异步执行
 * @param fun 所需要执行的函数方法
 */
toAsync(fun: (finish: boolean) => boolean): void
```

### asyncNextTick

- **详情**

```ts
/**
 * 将函数方法加入到下一个异步队列中
 * @param fun 函数方法
 */
asyncNextTick(fun: () => boolean): void
```

### toTrigger

- **详情**

```ts
/**
 * 转化为触发器触发
 * @param name 触发器名称
 * @param fun 需要触发器触发的函数方法
 */
toTrigger(name: string, fun: (immediate: boolean) => boolean): void
```

### process

- **详情**

```ts
/**
 * 通用的处理方法
 * @param params 操作通知参数
 * @returns
 */
process(params: CtnNotice): void
```

### add

- **详情**

```ts
/**
 * 通用的操作添加方法
 * @param params 操作通知参数
 * @returns
 */
add(params: ModelNotice): void
```

### set

- **详情**

```ts
/**
 * 通用的操作设置方法
 * @param params 操作通知参数
 * @returns
 */
set(params: ModelNotice): void
```

### delete

- **详情**

```ts
/**
 * 通用的操作设置方法
 * @param params 操作通知参数
 * @returns
 */
delete(params: ModelNotice): void
```
