# 事件派发器

公共的事件派发类，提供常见的发布订阅`api`，一般为父类继承使用。

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
addEventListener<C extends BaseEvent>(type: string, listener: EventListener<C>): void
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
hasEventListener<C extends BaseEvent>(type: string, listener: EventListener<C>): boolean
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

- **详情**

```ts
  /**
   * 移除事件
   * @param type 事件类型
   * @param listener 事件方法
   * @returns
   */
removeEventListener<C extends BaseEvent>(type: string, listener: EventListener<C>): void
```

- **示例**

```ts
const dispatcher = new EventDispatcher();

const clickEvent = () => {
  // do...
};

dispatcher.removeEventListener("click", clickEvent);
```

### removeEvent

- **详情**

```ts
  /**
   * 移除该类型的所有事件
   * @param type 事件类型
   * @returns
   */
removeEvent(type: string): void
```

- **示例**

```ts
const dispatcher = new EventDispatcher();

const clickEvent = () => {
  // do...
};

dispatcher.addEventListener("click", clickEvent);

dispatcher.addEventListener("click", () => {
  // do...
});

dispatcher.removeEvent("click");
```

### dispatchEvent

- **详情**

```ts
  /**
   * 触发事件
   * @param event
   * event.type 必传，为需要触发的事件类型
   * event.xxx 为其他需要传入的数据
   * @returns
   */
dispatchEvent<C extends BaseEvent>(event: C): void
```

- **示例**

```ts
const dispatcher = new EventDispatcher();

dispatcher.dispatchEvent({
  type: "click",
  offset: {
    x: 10,
    y: 20,
  },
});
```

### once

- **详情**

```ts
  /**
   * 一次性事件触发，触发一次之后会自动被移除
   * @param type 事件类型
   * @param listener 事件方法
   */
once<C extends BaseEvent>(type: string, listener: EventListener<C>): void
```

- **示例**

```ts
const dispatcher = new EventDispatcher();

dispatcher.once("click", (event) => {
  // do...
});
```

### emit

- **详情**

```ts
  /**
   * 触发事件
   * @param name 事件类型
   * @param params 其他的事件参数
   */
emit<C extends BaseEvent>(name: C["type"], params: Omit<C, "type"> = {} as Omit<C, "type">): void
```

- **示例**

```ts
const dispatcher = new EventDispatcher();

dispatcher.emit("click", {
  offset: {
    x: 10,
    y: 20,
  },
});
```

### on

- **详情**

```ts
  /**
   * 订阅事件
   * @param type 事件类型
   * @param listener 事件方法
   */
  on<C extends BaseEvent>(type: C["type"], listener: EventListener<C>): void
```

- **示例**

```ts
const dispatcher = new EventDispatcher();

dispatcher.on("click", (event) => {
  // do...
});
```

### has

- **详情**

```ts
  /**
   * 判断该事件类型下是否有此事件
   * @param type 事件类型
   * @param listener 事件方法
   * @returns
   */
has<C extends BaseEvent>(type: C["type"], listener: EventListener<C>): boolean
```

- **示例**

```ts
const dispatcher = new EventDispatcher();

const clickEvent = () => {};

dispatcher.has("click", clickEvent);
```

### off

- **详情**

```ts
/**
 * 移除事件，如果不传listener就会移除整个type事件类型下的事件
 * @param type 事件类型
 * @param listener 事件方法
 * @returns
 */
off<C extends BaseEvent>(type: C["type"], listener?: EventListener<C>): void
```

- **示例**

```ts
const dispatcher = new EventDispatcher();

const clickEvent = () => {};

dispatcher.off("click", clickEvent);

dispatcher.off("click");
```

### eventCount

- **详情**

```ts
/**
 * 获取该事件类型下的事件数量
 * @param type 事件类型
 * @returns 数量
 */
eventCount(type: string): number
```

- **示例**

```ts
const dispatcher = new EventDispatcher();

const clickEvent = () => {};

dispatcher.addEventListener("click", clickEvent);

dispatcher.addEventListener("click", () => {});

console.log(dispatcher.eventCount("click")); // 2
```

### popLatestEvent

- **详情**

```ts
/**
 * 销毁该类型的最后一个事件
 * @param type 事件类型
 * @returns
 */
popLatestEvent(type: string): void
```

- **示例**

```ts
const dispatcher = new EventDispatcher();

const clickEvent = () => {};

dispatcher.addEventListener("click", clickEvent);

dispatcher.addEventListener("click", () => {});

dispatcher.popLatestEvent("click");
```

### clear

- **详情**

```ts
/**
 * 清空所有事件类型的事件
 */
clear(): void
```

- **示例**

```ts
const dispatcher = new EventDispatcher();

const clickEvent = () => {};

dispatcher.addEventListener("click", clickEvent);

dispatcher.addEventListener("remove", () => {});

dispatcher.clear();
```

### useful

- **详情**

```ts
/**
 * 当前派发器是否使用
 * @returns true or false
 */
useful(): boolean
```

- **示例**

```ts
const dispatcher = new EventDispatcher();

console.log(dispatcher.useful()); // false

dispatcher.addEventListener("remove", () => {});

console.log(dispatcher.useful()); // true
```
