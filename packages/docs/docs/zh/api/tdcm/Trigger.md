# 触发器

在模块生命周期中，对执行的模块进行存储，当触发器内所有的模块都被执行后，进行触发执行储存的方法。

## 示例

```ts
export const ObjectTrigger = new Trigger((module) => {
  return Boolean(OBJECT_MODULE[module]);
});
```

## 构造

- **类型**

```ts
/**
 * 模块认证器，允许哪些模块作为触发器的触发条件。
 */
constructor Trigger(validator?: (module: string) => boolean): Trigger
```

- **示例**

```ts
export const materialTrigger = new Trigger((module) => {
  return module === "material";
});
```

## 属性

### condition（private）

条件模块集合。

- **类型**

```ts
Record<string, boolean>;
```

### list（private）

触发的缓存函数列表。

- **类型**

```ts
((immediate: boolean) => boolean)[];
```

### validator（private）

当前触发器的条件认证器。

- **类型**

```ts
(module: string) => boolean;
```

## 方法

### add

- **详情**

```ts
/**
 * 模块条件追加，追加的模块在内部通过校验后会作为触发器的条件模块
 * @param module 模块类型
 * @returns this
 */
add(module: string): this
```

### reach

- **详情**

```ts
/**
 * 将一个模块标记为已完成，如果所有的模块都完成会自动触发内部的缓存方法执行。
 * @param module 模块类型
 * @returns this
 */
reach(module: string): this
```

### register

- **详情**

```ts
/**
 * 注册一个触发器触发时需要执行的方法
 * @param fun immediate是一个立即执行的标识
 * 这个方法在加入触发器之前会立即执行一次，如果返回为true，就不会加入触发器
 * 如果返回为false就会加入触发器
 * 函数内部可以通过immediate判断是否需要使用该功能
 */
register(fun: (immediate: boolean) => boolean): void
```

### trig

- **详情**

```ts
/**
 * 触发器的执行方法，执行完之后会自动情况缓存方法列表，不建议手动执行。
 */
trig(): void
```

### reset

- **详情**

```ts
/**
 * 触发器的重置方法，会重置条件与缓存方法列表。
 */
reset(): void
```

### check

- **详情**

```ts
/**
 * 触发器的检测方法，检测所有的条件是否达成。
 * @returns boolean
 */
check(): boolean
```
