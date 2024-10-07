# 事件派发器

公共的事件派发类，提供常见的发布订阅`api`，一般最为父类继承使用。

## 示例

```ts
const dispatcher = new EventDispatcher();

dispatcher.on("click", (event) => {
  // do...
});

dispatcher.addEventListener("click", (event) => {
  // do...
});

dispatcher.emit("click", { mouse: { x: 10, y: 10 } });
dispatcher.dispatchEvent({ type: "click", mouse: { x: 10, y: 10 } });

dispatcher.off("click");
```

## 构造

无

## 属性

### listeners（private）

内部的事件存储队列。

- **类型**

```ts
Map<string, Array<Function>>;
```

## 方法

### addEventListener

- **详情**

```ts
/**
 * 订阅一个事件
 * @param type 事件类型
 * @param listener 触发该类型时的执行函数
 * @returns
 */
type addEventListener<C extends BaseEvent>(
    type: string,
    listener: EventListener<C>
  ): void
```

- **示例**

```ts
const dispatcher = new EventDispatcher();

dispatcher.addEventListener("click", (event) => {
  // do...
});

const clickEvent = () => {
  // do...
};

dispatcher.addEventListener("click", clickEvent);
```

### hasEventListener

- **详情**

```ts
/**
 * 判断该事件类型下是否有相关方法
 * @param type 事件类型
 * @param listener 事件方法
 * @returns true or false
 */
type hasEventListener<C extends BaseEvent>(
    type: string,
    listener: EventListener<C>
  ): boolean
```

- **示例**

```ts
const dispatcher = new EventDispatcher();

const clickEvent = () => {
  // do...
};

dispatcher.hasEventListener("click", clickEvent);
```

### removeEventListener

### removeEvent

### dispatchEvent

### once

### emit

### on

### has

### off

### eventCount

### popLatestEvent

### clear

### useful
