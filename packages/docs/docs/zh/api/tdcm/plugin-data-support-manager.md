# DataSupportManagerPlugin

数据转换器管理插件，统筹所有转换器，提供相关的`api`。

## 插件依赖

无

## 插件传参

无

## 引擎拓展

```ts
export interface DataSupportEngine extends Engine {
  /**转换器管理器 */
  dataSupportManager: DataSupportManager;
  /**应用配置 */
  applyConfig: (...args: BasicConfig[]) => DataSupportEngine;
  /**通过vid标识获取配置 */
  getConfigBySymbol: <C extends BasicConfig = any>(vid: string) => C | null;
  /**通过vid标识移除配置 */
  removeConfigBySymbol: (...args: string[]) => DataSupportEngine;
  /**从一个模块中通过vid标识获取配置*/
  getConfigFromModule: <C extends BasicConfig = any>(
    module: string,
    vid: string
  ) => C | null;
  /**从多个模块中通过vid标识获取配置*/
  getConfigFromModules: <C extends BasicConfig = any>(
    modules: string[] | Record<string, any>,
    vid: string
  ) => C | null;
  /**导出为json */
  toJSON: () => string;
  /**导出为js对象 */
  exportConfig: () => LoadOptions;
}
```

# DataSupportManager

转换器管理器

## 继承

- [EventDispatcher](../core/EventDispatcher.md)

## 构造

无

## 属性

### dataSupportMap

当前注册的所有转换器集合。

- **类型**

```ts
Map<string, Converter<any, any>>;
```

## 方法

### extend

- **详情**

```ts
/**
 * 转换器拓展
 * @param dataSupport 转换器
 * @param focus 是否强制覆盖
 */
extend(dataSupport: Converter<any, any>, focus?: boolean): void
```

### getDataSupport

- **详情**

```ts
/**
 * 获取该模块下的转换器
 * @param type MODULETYPE
 * @returns Converter
 */
getDataSupport<D>(type: string): D | null
```

### getConfigBySymbol

- **详情**

```ts
/**
 * 通过vid标识获取相应配置对象
 * @param vid vid标识
 * @returns config || null
 */
getConfigBySymbol<T extends BasicConfig>(vid: string): T | null
```

### getConfigFromModule

- **详情**

```ts
/**
 * 从一个模块中通过vid标识获取配置
 * @param module 模块类型
 * @param vid vid标识
 * @returns 配置
 */
getConfigFromModule<T extends BasicConfig>(module: string, vid: string): T | null
```

### getConfigFromModules

- **详情**

```ts
/**
 * 从多个模块中通过vid标识获取配置
 * @param modules 模块类型
 * @param vid vid标识
 * @returns 配置
 */
getConfigFromModules<T extends BasicConfig>(modules: string[] | Record<string, any>, vid: string): T | null
```

### removeConfigBySymbol

- **详情**

```ts
/**
 * 通过vid标识移除相关配置对象
 * @param vid ...vid标识
 * @returns this
 */
removeConfigBySymbol(...vids: string[]): this
```

### getModuleBySymbol

- **详情**

```ts
/**
 * 通过vid标识获取该标识所处的模块
 * @param vid vid标识
 * @returns MODULETYPE || null
 */
getModuleBySymbol(vid: string): string | null
```

### applyConfig

- **详情**

```ts
/**
 * 应用配置对象
 * @param config vis相关配置对象
 * @returns this
 */
applyConfig<T extends BasicConfig>(...configs: T[]): this
```

### load

- **详情**

```ts
/**
 * 根据配置单加载对象
 * @param config 符合vis配置选项的配置单对象
 * @returns this
 */
load(config: LoadOptions): this
```

### loadByModule

- **详情**

```ts
/**
 * 根据模块加载配置
 * @param config
 * @param module
 * @returns
 */
loadByModule(config: BasicConfig[], module: string): this
```

### remove

- **详情**

```ts
/**
 * 根据配置单移除相关对象
 * @param config  符合vis配置选项的配置单对象
 * @returns this
 */
remove(config: LoadOptions): this
```

### toJSON

- **详情**

```ts
/**
 * 获取JSON化的配置单
 * @param extendsConfig 需要额外JSON化的配置对象，会被dataSupport的对象覆盖
 * @param compress 是否压缩配置单 default true
 * @returns JSON string
 */
toJSON(extendsConfig?: Record<string, Array<any>>, compress?: boolean): string
```

### exportConfig

- **详情**

```ts
/**
 * 导出配置单
 * @param extendsConfig 拓展配置对象
 * @param compress 是否压缩配置单 default true
 * @returns LoadOptions
 */
exportConfig(extendsConfig?: Record<string, Array<any>>, compress?: boolean): LoadOptions
```
