# 配置化引擎

该引擎类继承了核心引擎，并添加了相关的配置化支持插件与策略，与有关的`api`。

## 示例

```ts
const engine = new EngineSupport()
  .install(WebGLRendererPlugin())
  .exec(WebGLRenderStrategy())
  .play();
```

## 构造

- **类型**

```ts
/**EngineSupport参数 */
export interface EngineSupportParameters {
  LoaderManagerPlugin: LoaderManagerParameters;
  PointerManagerPlugin: PointerManagerParameters;
  EventManagerPlugin: EventManagerParameters;
  RenderManagerPlugin: RenderManagerPluginParams;
  ResourceManagerPlugin: ResourceManagerPluginParameters;
  DataSupportManagerPlugin: DataSupportPluginParameters;
  CompilerManagerPlugin: CompilerManagerPluginParameters;
}
```

- **示例**

```ts
const engine = new EngineSupport({
  RenderManagerPlugin: {
    fps: 1 / 30,
  },
});
```

## 继承

[Engine](../core/Engine.md)

## 集成插件

- [LoaderManagerPlugin](../../library/plugins/plugin-loader-manager.md)
- [PointerManagerPlugin](../../library/plugins/plugin-pointer-manager.md)
- [EventManagerPlugin](../../library/plugins/plugin-event-manager.md)
- [RenderManagerPlugin](../../library/plugins/plugin-render-manager.md)
- [CompilerManagerPlugin](./plugin-compiler-manager.md)
- [DataSupportManagerPlugin](./plugin-data-support-manager.md)
- [ResourceManagerPlugin](./plugin-resource-manager.md)

## 集成策略

- [CompilerSupportStrategy](./strategy-compiler-support.md)
- [LoaderDataSupportStrategy](./strategy-loader-data-support.md)
- [LoaderMappingStrategy](./strategy-loader-mapping.md)

## 属性

### moduleLifeCycle

各模块的生命周期缓存。

- **类型**

```ts
Array<{ module: string; order: number }>;
```

### triggers

引擎中含有的触发器。

- **类型**

```ts
Record<string, Trigger>;
```

## 方法

### loadLifeCycle(private)

- **详情**

```ts
/**
 * 导入配置的生命周期执行方法
 * @param config 配置
 */
loadLifeCycle(config: Omit<EngineSupportLoadOptions, "assets">): void
```

### removeLifeCycle(private)

- **详情**

```ts
/**
 * 移除配置时的生命周期执行方法
 * @param config 配置
 */
removeLifeCycle(config: EngineSupportLoadOptions): void
```

### loadConfig

- **详情**

```ts
/**
 * 加载一个配置
 * @param config 配置单
 * @param callback 加载完成后的回调
 * @returns this
 */
loadConfig(config: EngineSupportLoadOptions, callback?: (event?: MappedEvent) => void): this
```

### loadConfigAsync

- **详情**

```ts
/**
 * 异步的加载一个配置
 * @param config 配置单
 * @param pretreat 配置单预处理
 * @returns Promise<MappedEvent>
 */
loadConfigAsync(config: EngineSupportLoadOptions, pretreat?: (c: EngineSupportLoadOptions) => EngineSupportLoadOptions): Promise<MappedEvent>
```

### removeConfig

- **详情**

```ts
/**
 * 移除一个配置单
 * @param config 配置单
 */
removeConfig(config: EngineSupportLoadOptions): void
```

### getObjectConfig

- **详情**

```ts
/**
 * 获取一个对象的配置结构
 * @param object 物体对象
 * @returns 配置 | null
 */
getObjectConfig<O, C extends BasicConfig>(object: O): C | null
```

### useModule

- **详情**

```ts
/**
 * 使用一个配置化模块
 * @param options 配置化模块选项
 * @returns this
 */
useModule(options: ModuleOptions<any, any>): this
```

### addTrigger

- **详情**

```ts
/**
 * 添加一个触发器
 * @param name 触发器名称或者标识
 * @param trigger 触发器对象
 * @returns this
 */
addTrigger(name: string, trigger: Trigger): this
```

### getTrigger

- **详情**

```ts
/**
 * 获取一个触发器
 * @param name 触发器名称
 * @returns Trigger
 */
getTrigger(name: string): Trigger | null
```
