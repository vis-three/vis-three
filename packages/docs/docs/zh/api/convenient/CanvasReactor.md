# canvas 反应器

构造一个可以通过配置生成控制的`canvas`对象。配置变化时会自动执行重绘。

## 继承

[EventDispatcher](../core/EventDispatcher.md)

## 构造

- **类型**

```ts
/**
 * 传入的配置
 */
constructor CanvasReactor<O extends BaseData = BaseData>(config: O): CanvasReactor<O>
```

## 属性

### canvas

当前反应器对应的`canvas`对象。

- **类型**

```ts
HTMLCanvasElement;
```

### data

当前反应器对应的配置对象。

- **类型**

```ts
export interface BaseData {
  width: number;
  height: number;
}
O extends BaseData = BaseData;
```

## 方法

### setSize

- **详情**

```ts
/**
 * 设置尺寸，会通过配置的width和height变化而自动触发
 * @returns this
 */
setSize(): this
```

### draw

- **详情**

```ts
/**
 * 重绘画布，会通过配置的变化自动触发
 * @returns this
 */
draw(): this
```
