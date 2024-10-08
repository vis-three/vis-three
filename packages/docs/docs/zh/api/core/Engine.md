# Three.js 基础引擎

通过继承基座，并提供`three.js`的最基础设置和`api`的`engine`，进而可以开展相关的渲染工作。

## 示例

```ts
const engine = new Engine();

engine
  .install(WebGLRendererPlugin())
  .install(RenderManagerPlugin())
  .exec(WebGLRenderStrategy());

engine.scene.add(new Mesh(new BoxGeometry(), new MeshBasicMaterial()));

engine.render();
```

## 继承

[Base](./Base.md)

## 构造

无

## 属性

### dom

安装的插件集合。

- **类型**

```ts
Map<string, PluginOptions<Base>>;
```

### camera

安装的策略集合。

- **类型**

```ts
Map<string, StrategyOptions<Base>>;
```

### scene

安装的策略集合。

- **类型**

```ts
Map<string, StrategyOptions<Base>>;
```

## 方法

### setDom

- **详情**

```ts
/**
 * 安装插件
 * @param plugin 插件选项对象
 * @returns this
 */
install<E extends Base>(plugin: PluginOptions<E>): E
```

- **示例**

```ts
const engine = new Base();

engine.install(
  CesiumRendererPlugin({
    alpha: true,
  })
);
```

### setSize

- **详情**

```ts
/**
 * 卸载插件
 * @param name 插件名称
 * @returns this
 */
uninstall(name: string): this
```

- **示例**

```ts
const engine = new Base();

engine.uninstall("CesiumRendererPlugin");
```

### setCamera

- **详情**

```ts
/**
 * 执行策略
 * @param strategy 策略选项对象
 * @returns this
 */
exec<E extends Base>(strategy: StrategyOptions<E>): E
```

- **示例**

```ts
const engine = new Base();

engine.exec(CesiumRenderStrategy());
```

### setScene

- **详情**

```ts
/**
 * 回滚策略
 * @param name 策略名称
 * @returns this
 */
rollback(name: string): this
```

- **示例**

```ts
const engine = new Base();

engine.rollback("CesiumRenderStrategy");
```

### render

- **详情**

```ts
/**
 * 回滚策略
 * @param name 策略名称
 * @returns this
 */
rollback(name: string): this
```

- **示例**

```ts
const engine = new Base();

engine.rollback("CesiumRenderStrategy");
```

### dispose

- **详情**

```ts
/**
 * 回滚策略
 * @param name 策略名称
 * @returns this
 */
rollback(name: string): this
```

- **示例**

```ts
const engine = new Base();

engine.rollback("CesiumRenderStrategy");
```
