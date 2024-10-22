# CompilerManagerPlugin

编译器管理器插件，统筹所有编译器，提供相关的`api`。

## 插件依赖

无

## 插件传参

无

## 引擎拓展

```ts
export interface CompilerManagerEngine extends Engine {
  /**编译器管理器 */
  compilerManager: CompilerManager;
  /**通过物体对象获取唯一标识 */
  getObjectSymbol: (object: any) => string | null;
  /**通过唯一标识获取物体对象 */
  getObjectBySymbol: <O = any>(vid: string) => O | null;
  /**从一个模块中通过唯一标识获取物体 */
  getObjectFromModule: <O = any>(module: string, vid: string) => O | null;
  /**从多个模块中通过唯一标识获取物体 */
  getObjectFromModules: <O = any>(
    modules: string[] | Record<string, any>,
    vid: string
  ) => O | null;
  /**通过唯一标识获取3D物体对象 */
  getObject3D: <O extends Object3D = Object3D>(vid: string) => O | null;
}
```

# CompilerManager

编译器管理器

## 继承

- [EventDispatcher](../core/EventDispatcher.md)

## 构造

无

## 属性

### compilerMap

当前注册的所有编译器集合。

- **类型**

```ts
Map<string, Compiler<any>>;
```

## 方法

### extend

- **详情**

```ts
/**
 * 编译器拓展
 * @param compiler 拓展的编译器
 * @param focus 强制覆盖
 */
extend<C extends Compiler<any>>(compiler: C, focus?: boolean): void
```

### getCompiler

- **详情**

```ts
/**
 * 获取编译器
 * @param module 编译器所属的模块
 * @returns compiler | null
 */
getCompiler<D extends Compiler<any> = Compiler<EngineSupport>>(module: string): D | null
```

### getObjectSymbol

- **详情**

```ts
/**
 * 获取该three物体的vid标识
 * @param object three object
 * @returns vid or null
 */
getObjectSymbol(object: object): BasicConfig["vid"] | null
```

### getObjectBySymbol

- **详情**

```ts
/**
 * 通过vid标识获取相应的three对象
 * @param vid vid标识
 * @returns three object || null
 */
getObjectBySymbol(vid: string): any | null
```

### getModelBySymbol

- **详情**

```ts
/**
 * 通过vid标识获取相应的配置化模型
 * @param vid vid标识
 * @returns model
 */
getModelBySymbol<M extends Model<any, any, any> = Model<any, any, any, Compiler<any>>>(vid: string): M | null
```

### getObjectFromModule

- **详情**

```ts
/**
 * 从一个模块中通过vid获取物体对象
 * @param module 指定模块
 * @param vid vid标识
 * @returns object | null
 */
getObjectFromModule(module: string, vid: string): any
```

### getObjectFromModules

- **详情**

```ts
/**
 * 从多个模块中通过vid获取物体
 * @param modules 指定的多个模块
 * @param vid vid标识
 * @returns object | null
 */
getObjectFromModules<O extends object = object>(modules: string[] | Record<string, any>, vid: string): O | null
```

### dispose

- **详情**

```ts
/**
 * 整个编译器的销毁方法
 * @returns this
 */
dispose(): this
```
