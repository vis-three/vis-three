# 历史

通过增加动作管理整个操作历史的前进回退。

## 构造

- **详情**

```ts
/**
 * 历史缓存的记录数
 */
constructor History(step?: number): History
```

## 属性

### actionList

动作列表

- **类型**

```ts
Action[]
```

### index

当前执行动作的指针

- **类型**

```ts
number;
```

### step

当前历史的缓存数量。

- **类型**

```ts
number;
```

## 方法

### apply

- **详情**

```ts
/**
 * 注册动作
 * @param action new class extends BasicAction
 * @param exec 是否立即执行动作的next
 */
apply(action: Action, exec?: boolean): void
```

### redo

- **详情**

```ts
/**
 * 恢复动作，执行当前动作的next
 * @returns
 */
redo(): void
```

### undo

- **详情**

```ts
/**
 * 撤销动作，执行当前动作的prev
 * @returns
 */
undo(): void
```

### clear

- **详情**

```ts
/**
 * 清空整个历史动作缓存
 */
clear(): void
```

# 动作

所有的历史动作基类，提供基础的`api`。

## 方法

### next

- **详情**

```ts
/**
 * 该动作的下一步方法
 */
next(): void
```

### prev

- **详情**

```ts
/**
 * 该动作的上一步方法
 */
prev(): void
```
