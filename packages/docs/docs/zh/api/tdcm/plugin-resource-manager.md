# ResourceManagerPlugin

资源管理器插件，管理所有的外部资源，外部资源转化，对接配置。

## 插件依赖

无

## 插件传参

无

## 引擎拓展

```ts
export interface ResourceManagerEngine extends Engine {
  /**资源管理器 */
  resourceManager: ResourceManager;
  /**注册资源 */
  registerResources: (
    resourceMap: Record<string, unknown>
  ) => ResourceManagerEngine;
}
```

# ResourceManager

资源管理器

## 继承

- [EventDispatcher](../core/EventDispatcher.md)

## 构造

无

## 属性

### configMap

url 配置映射 url -> config。

- **类型**

```ts
Map<string, BasicConfig>;
```

### resourceMap

url 到资源映射 url -> resource。

- **类型**

```ts
Map<string, any>;
```

## 方法

### addParser

- **详情**

```ts
/**
 * 添加解析器
 * @param parser  extends Parser
 * @returns this
 */
addParser(parser: Parser): this
```

### mappingResource

- **详情**

```ts
/**
 *  根据加载好的资源拆解映射为最小资源单位与形成相应的配置与结构
 * @param loadResourceMap loaderManager的resourceMap
 * @param options options.handler: {url, hanlder}可以根据特定的url指定特定的解析器
 * @returns this
 */
mappingResource(loadResourceMap: Map<string, unknown>, options?: MappingOptions): this
```

### getResourceConfig

- **详情**

```ts
/**
 * 获取资源的配置单，该配置单根据资源结构生成
 * @param url 资源url
 * @returns LoadOptions
 */
getResourceConfig(url: string): LoadOptions
```

### hasResource

- **详情**

```ts
/**
 * 是否有此资源
 * @param url 资源 url
 * @returns boolean
 */
hasResource(url: string): boolean
```

### remove

- **详情**

```ts
/**
 * 移除url下的所有资源
 * @param url url
 * @returns this
 */
remove(url: string): this
```

### dispose

- **详情**

```ts
/**
 * 清空所有资源
 */
dispose(): void
```

# Parser

资源解析器基类。

- **详情**

```ts
export interface ParseParams {
  url: string;
  resource: any;
  configMap: Map<string, BasicConfig>;
  resourceMap: Map<string, any>;
}

export type ResourceHanlder = (
  url: string,
  resource: any,
  parseMap: Map<Function, Parser>
) => Parser | null;

export abstract class Parser {
  /**资源选择器，通过怎么样的方式选择这个资源交给这个解析器解析 */
  abstract selector: ResourceHanlder;
  /**解析方法 */
  abstract parse(params: ParseParams): void;
}
```
